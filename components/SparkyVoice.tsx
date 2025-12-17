
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
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const inCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      audioContextRef.current = inCtx;
      outputAudioContextRef.current = outCtx;

      // Gestion de la politique d'auto-play des navigateurs
      if (outCtx.state === 'suspended') {
        setStatus('suspended');
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const defaultSystemInstruction = `
        You are Bumble, a warm, fuzzy, and enthusiastic playmate for a 3-year-old child. 
        Your goal is to have a NATURAL, FLOWING CONVERSATION.

        MANDATORY GREETING FLOW:
        1. Start by saying: "Coucou ! Comment tu vas aujourd'hui ?"
        2. If the user says "Bien", "Ça va bien" or "Good", you MUST reply: "Moi aussi je vais très bien ! Je suis super content de te voir !"
        3. Only then, move to the activity.

        CONVERSATIONAL STYLE:
        - Talk like a real friend. If the user clicks something, be excited!
        - Use French for comfort, and repeat important words in English.
        - Example: "Oh, un petit chien ! A DOG ! Tu peux dire DOG ?"
        - Be slow, clear, and very encouraging.
      `;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            if (outCtx.state !== 'suspended') {
              setStatus('listening');
            }
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

            // Déclencher la parole de Bumble immédiatement
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
              sourcesRef.current.forEach(s => s.stop());
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
          systemInstruction: systemPrompt ? `${defaultSystemInstruction}\nCONTEXT: ${systemPrompt}` : defaultSystemInstruction,
          outputAudioTranscription: {}
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }, [systemPrompt, initialInstruction]);

  const resumeAudio = async () => {
    if (outputAudioContextRef.current) {
      await outputAudioContextRef.current.resume();
      setStatus('listening');
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
    <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center p-6 z-50 backdrop-blur-md">
      <div className="bg-white rounded-[70px] p-12 max-w-xl w-full flex flex-col items-center shadow-2xl border-[12px] border-yellow-400 relative">
        <Mascot mood={status === 'talking' ? 'talking' : status === 'listening' ? 'happy' : 'idle'} size="lg" className="mb-10 z-10" />
        
        <div className="text-center mb-10 z-10">
          <h2 className="text-4xl font-black text-yellow-600 mb-4 tracking-tight">
            {status === 'connecting' && "Bumble arrive..."}
            {status === 'suspended' && "Bumble t'attend !"}
            {status === 'listening' && "Bumble t'écoute ! 👂"}
            {status === 'talking' && "Bumble te parle ! ✨"}
            {status === 'error' && "Oups ! Recommence ?"}
          </h2>
        </div>

        {status === 'suspended' && (
          <button 
            onClick={resumeAudio}
            className="mb-10 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-black py-8 px-12 rounded-full text-3xl shadow-[0_12px_0_rgb(234,179,8)] animate-bounce"
          >
            ACTIVER LE SON 🔊
          </button>
        )}

        {transcript && (
          <div className="w-full bg-yellow-50 p-8 rounded-[40px] mb-10 border-4 border-dashed border-yellow-200 z-10">
            <p className="text-yellow-900 text-center font-black text-2xl leading-relaxed italic">"{transcript}"</p>
          </div>
        )}

        <button 
          onClick={onClose}
          className="bg-red-500 hover:bg-red-600 text-white font-black py-6 px-16 rounded-full text-3xl shadow-[0_12px_0_rgb(185,28,28)] transition-all active:translate-y-3 active:shadow-none z-10"
        >
          AU REVOIR 👋
        </button>
      </div>
    </div>
  );
};

export default SparkyVoice;
