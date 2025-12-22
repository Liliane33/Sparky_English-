
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';
import { createPcmBlob, decode, decodeAudioData } from '../services/audioService.ts';
import Mascot from './Mascot.tsx';

interface SparkyVoiceProps {
  onClose: () => void;
  systemPrompt?: string;
  initialInstruction?: string;
}

const SparkyVoice: React.FC<SparkyVoiceProps> = ({ onClose, systemPrompt, initialInstruction }) => {
  const [status, setStatus] = useState<'connecting' | 'listening' | 'talking' | 'error' | 'suspended'>('connecting');
  const [transcript, setTranscript] = useState('');
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const startSession = useCallback(async () => {
    try {
      // On crée les contextes audio
      const inCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      audioContextRef.current = inCtx;
      outputAudioContextRef.current = outCtx;

      // Si le contexte est suspendu (politique navigateur), on affiche le bouton d'activation
      if (outCtx.state === 'suspended') {
        setStatus('suspended');
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const defaultSystemInstruction = `
        Tu es Bumble, un ami imaginaire tout doux et très joyeux pour un enfant de 3 ans.
        TON OBJECTIF : Parler de façon NATURELLE et INTERACTIVE.

        LE SCÉNARIO OBLIGATOIRE :
        1. Tu commences TOUJOURS par : "Coucou ! Comment tu vas aujourd'hui ?"
        2. Si l'enfant répond "Bien" ou "Ça va", tu réponds TOUJOURS : "Moi aussi je vais très bien ! Je suis tellement content de jouer avec toi !"
        3. APRÈS ce petit dialogue, tu parles de l'objet ou de l'animal que l'enfant a choisi.

        STYLE DE CONVERSATION :
        - Parle lentement et avec enthousiasme.
        - Utilise le français pour rassurer, et l'anglais pour apprendre.
        - Exemple : "Oh ! Regarde ce petit chien ! A DOG ! Est-ce que tu peux dire DOG ?"
        - Si l'enfant fait un bruit, réagis joyeusement !
      `;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            if (outCtx.state !== 'suspended') setStatus('listening');
            
            const source = inCtx.createMediaStreamSource(stream);
            const processor = inCtx.createScriptProcessor(4096, 1, 1);
            
            processor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createPcmBlob(inputData);
              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            
            source.connect(processor);
            processor.connect(inCtx.destination);

            // Envoi de l'instruction initiale pour forcer Bumble à parler de suite
            if (initialInstruction) {
              sessionPromise.then(session => {
                session.sendRealtimeInput({ text: initialInstruction });
              });
            }
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.modelTurn?.parts[0]?.inlineData?.data) {
              setStatus('talking');
              const base64 = message.serverContent.modelTurn.parts[0].inlineData.data;
              
              // On s'assure que le contexte de sortie est bien actif
              if (outCtx.state === 'suspended') await outCtx.resume();
              
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outCtx.currentTime);
              const buffer = await decodeAudioData(decode(base64), outCtx, 24000, 1);
              const source = outCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(outCtx.destination);
              
              source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
                if (sourcesRef.current.size === 0) setStatus('listening');
              });
              
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => { try { s.stop(); } catch(e){} });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
              setStatus('listening');
            }

            if (message.serverContent?.outputTranscription) {
              setTranscript(prev => prev + message.serverContent?.outputTranscription?.text);
            }
            if (message.serverContent?.turnComplete) {
              setTranscript('');
            }
          },
          onerror: (e) => {
            console.error('Bumble error:', e);
            setStatus('error');
          },
          onclose: () => {
            console.log('Bumble is sleeping');
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } }
          },
          systemInstruction: systemPrompt ? `${defaultSystemInstruction}\nCONTEXTE : ${systemPrompt}` : defaultSystemInstruction,
          outputAudioTranscription: {}
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }, [systemPrompt, initialInstruction]);

  const handleWakeUp = async () => {
    if (outputAudioContextRef.current) {
      await outputAudioContextRef.current.resume();
      setStatus('listening');
      // On renvoie l'instruction si Bumble n'a pas encore parlé
      if (initialInstruction && sessionRef.current) {
        sessionRef.current.sendRealtimeInput({ text: initialInstruction });
      }
    }
  };

  useEffect(() => {
    startSession();
    return () => {
      if (sessionRef.current) sessionRef.current.close();
      if (mediaStreamRef.current) mediaStreamRef.current.getTracks().forEach(t => t.stop());
      if (audioContextRef.current) audioContextRef.current.close();
      if (outputAudioContextRef.current) outputAudioContextRef.current.close();
    };
  }, [startSession]);

  return (
    <div className="fixed inset-0 bg-black/95 flex flex-col items-center justify-center p-6 z-50 backdrop-blur-xl">
      <div className="bg-white rounded-[80px] p-12 max-w-xl w-full flex flex-col items-center shadow-2xl border-[16px] border-yellow-400 relative overflow-hidden">
        
        <Mascot mood={status === 'talking' ? 'talking' : status === 'listening' ? 'happy' : 'idle'} size="lg" className="mb-10 z-10" />
        
        <div className="text-center mb-10 z-10">
          <h2 className="text-4xl font-black text-yellow-600 mb-4 tracking-tight">
            {status === 'connecting' && "Bumble arrive..."}
            {status === 'suspended' && "Bumble est là !"}
            {status === 'listening' && "Bumble t'écoute ! 👂"}
            {status === 'talking' && "Bumble te parle ! ✨"}
            {status === 'error' && "Oups ! Bumble a un souci."}
          </h2>
        </div>

        {status === 'suspended' && (
          <button 
            onClick={handleWakeUp}
            className="mb-10 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-black py-8 px-12 rounded-full text-4xl shadow-[0_15px_0_rgb(234,179,8)] animate-bounce transform active:translate-y-2 active:shadow-none transition-all"
          >
            PARLER À BUMBLE ! 🔊
          </button>
        )}

        {transcript && (
          <div className="w-full bg-yellow-50 p-8 rounded-[40px] mb-10 border-4 border-dashed border-yellow-200 z-10">
            <p className="text-yellow-900 text-center font-black text-2xl leading-relaxed italic">"{transcript}"</p>
          </div>
        )}

        <button 
          onClick={onClose}
          className="bg-red-500 hover:bg-red-600 text-white font-black py-5 px-12 rounded-full text-2xl shadow-[0_10px_0_rgb(185,28,28)] transition-all active:translate-y-2 active:shadow-none z-10"
        >
          AU REVOIR 👋
        </button>
      </div>
    </div>
  );
};

export default SparkyVoice;
