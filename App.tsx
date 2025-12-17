
import React, { useState, useEffect } from 'react';
import { AppView, Lesson, Progress } from './types';
import { LESSONS, SONGS } from './constants';
import Mascot from './components/Mascot';
import SparkyVoice from './components/SparkyVoice';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.LOGIN);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [progress, setProgress] = useState<Progress>({ wordsLearned: [], sessionsCompleted: 0 });
  const [parentGateAnswer, setParentGateAnswer] = useState<string>('');
  const [parentGateEquation, setParentGateEquation] = useState<{a: number, b: number}>({a: 0, b: 0});
  const [isChatting, setIsChatting] = useState(false);
  const [chatContext, setChatContext] = useState<{ prompt: string, instruction: string } | null>(null);
  
  // Login State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const savedProgress = localStorage.getItem('bumble_progress');
    if (savedProgress) setProgress(JSON.parse(savedProgress));
  }, []);

  const saveProgress = (newProgress: Progress) => {
    setProgress(newProgress);
    localStorage.setItem('bumble_progress', JSON.stringify(newProgress));
  };

  const handleParentGate = () => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    setParentGateEquation({a, b});
    setView(AppView.PARENT_GATE);
  };

  const checkParentGate = () => {
    if (parseInt(parentGateAnswer) === parentGateEquation.a + parentGateEquation.b) {
      setView(AppView.PARENT_DASHBOARD);
    } else {
      alert("Demande à un adulte !");
      setParentGateAnswer('');
    }
  };

  const startLessonChat = (lesson: Lesson, item?: any) => {
    const prompt = item 
      ? `The child just clicked on "${item.english}" (${item.french}). Guide them to repeat it. If they say "${item.french}", acknowledge it and ask for "${item.english}".`
      : `The child is starting the "${lesson.title}" lesson. Introduce the theme in French first, then teach words: ${lesson.items.map(i => i.english).join(', ')}.`;
    
    const instruction = item
      ? `Explique en français : "C'est un ${item.french} ! On dit : ${item.english}. À toi !"`
      : `Dis en français : "Coucou ! On va apprendre ${lesson.frenchTitle} ! C'est parti !"`;

    setChatContext({ prompt, instruction });
    setIsChatting(true);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setView(AppView.HOME);
    } else {
      alert("S'il te plaît, entre un nom !");
    }
  };

  const renderLogin = () => (
    <div className="min-h-screen flex items-center justify-center p-6 bg-yellow-100">
      <div className="bg-white p-12 rounded-[60px] shadow-2xl max-md w-full text-center border-t-[16px] border-yellow-400">
        <Mascot size="md" mood="happy" className="mx-auto mb-8" />
        <h2 className="text-4xl font-black text-yellow-600 mb-8">Bonjour ! 👋</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-left text-xl font-bold text-gray-500 mb-2 ml-4">Ton nom :</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full text-center text-3xl font-bold p-5 border-4 border-yellow-100 rounded-[30px] focus:border-yellow-400 focus:outline-none transition"
              placeholder="Ex: Léo"
              required
            />
          </div>
          <div>
            <label className="block text-left text-xl font-bold text-gray-500 mb-2 ml-4">Mot de passe (optionnel) :</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-center text-3xl font-bold p-5 border-4 border-yellow-100 rounded-[30px] focus:border-yellow-400 focus:outline-none transition"
              placeholder="••••"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-black py-6 rounded-[30px] text-3xl shadow-[0_10px_0_rgb(234,179,8)] transition-all active:translate-y-2 active:shadow-none mt-4"
          >
            JOUE AVEC MOI !
          </button>
        </form>
      </div>
    </div>
  );

  const renderHome = () => (
    <div className="max-w-5xl mx-auto p-6 space-y-12">
      <header className="flex flex-col items-center justify-center space-y-4 pt-10">
        <div className="flex items-center gap-4">
            <Mascot size="md" mood="happy" className="mb-4" />
            <div className="text-left">
                <h1 className="text-5xl text-yellow-600 tracking-tight drop-shadow-sm">Salut {username} !</h1>
                <p className="text-xl text-blue-500 font-bold bg-white px-4 py-1 rounded-full shadow-sm">Prêt pour l'aventure ?</p>
            </div>
        </div>
      </header>

      <section className="grid grid-cols-2 lg:grid-cols-3 gap-8">
        {LESSONS.map((lesson) => (
          <button
            key={lesson.id}
            onClick={() => { setSelectedLesson(lesson); setView(AppView.LESSON); }}
            className={`${lesson.color} p-10 rounded-[50px] shadow-2xl text-white transform transition hover:scale-105 active:scale-95 flex flex-col items-center justify-center space-y-4 border-b-[12px] border-black/20`}
          >
            <span className="text-8xl">{lesson.icon}</span>
            <div className="text-center">
              <span className="block text-3xl font-bold">{lesson.title}</span>
              <span className="block text-lg font-medium opacity-80 italic">{lesson.frenchTitle}</span>
            </div>
          </button>
        ))}
        <button
          onClick={() => {
            setChatContext({ 
              prompt: `A friendly, human-like chat with ${username}. Start with the greeting: "Coucou ${username} ! Comment tu vas aujourd'hui ?". If they say "Bien", you must respond that you are doing great too. Be a real buddy!`, 
              instruction: `Coucou ${username} ! Comment tu vas aujourd'hui ?` 
            });
            setIsChatting(true);
          }}
          className="bg-yellow-400 p-10 rounded-[50px] shadow-2xl text-yellow-900 transform transition hover:scale-105 active:scale-95 flex flex-col items-center justify-center space-y-4 border-b-[12px] border-yellow-600/30"
        >
          <span className="text-8xl">🐝</span>
          <div className="text-center">
            <span className="block text-3xl font-bold">Talk to Bumble</span>
            <span className="block text-lg font-medium opacity-80 italic">Discute avec Bumble</span>
          </div>
        </button>
        <button
          onClick={() => setView(AppView.SONGS)}
          className="bg-purple-500 p-10 rounded-[50px] shadow-2xl text-white transform transition hover:scale-105 active:scale-95 flex flex-col items-center justify-center space-y-4 border-b-[12px] border-black/20"
        >
          <span className="text-8xl">🎵</span>
          <div className="text-center">
            <span className="block text-3xl font-bold">Sing Songs</span>
            <span className="block text-lg font-medium opacity-80 italic">Chansons</span>
          </div>
        </button>
      </section>

      <footer className="pt-20 flex justify-center gap-6">
        <button onClick={() => setView(AppView.LOGIN)} className="text-gray-400 font-bold flex items-center gap-3 border-4 border-gray-200 px-6 py-3 rounded-full hover:bg-white bg-white/50">
          <span>🚪</span>
          <span>Changer de profil</span>
        </button>
        <button onClick={handleParentGate} className="text-gray-500 font-bold flex items-center gap-3 border-4 border-gray-200 px-10 py-4 rounded-full hover:bg-white bg-white/50">
          <span className="text-2xl">🔒</span>
          <span className="text-xl uppercase tracking-widest">Espace Parents</span>
        </button>
      </footer>
    </div>
  );

  const renderLesson = () => {
    if (!selectedLesson) return null;
    return (
      <div className="min-h-screen bg-white p-6 md:p-12">
        <button onClick={() => setView(AppView.HOME)} className="mb-10 text-3xl font-bold text-blue-500 flex items-center gap-3">
          <span className="bg-blue-100 p-3 rounded-full">⬅️</span> <span>Retour</span>
        </button>

        <div className="max-w-5xl mx-auto">
          <div className={`${selectedLesson.color} rounded-[60px] p-12 text-white mb-16 flex flex-col md:flex-row items-center justify-between shadow-xl relative overflow-hidden`}>
            <div className="relative z-10 text-center md:text-left">
              <h2 className="text-6xl mb-4 drop-shadow-md">{selectedLesson.title}</h2>
              <p className="text-2xl font-semibold opacity-90 italic">{selectedLesson.frenchTitle}</p>
            </div>
            <span className="text-9xl md:text-[10rem] drop-shadow-2xl z-10">{selectedLesson.icon}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {selectedLesson.items.map((item, idx) => (
              <div 
                key={idx}
                className="bg-yellow-50 rounded-[40px] p-10 flex flex-col items-center shadow-lg hover:shadow-2xl transition-all group cursor-pointer border-4 border-transparent hover:border-yellow-200"
                onClick={() => {
                  const newProgress = { ...progress, wordsLearned: [...new Set([...progress.wordsLearned, item.english])] };
                  saveProgress(newProgress);
                  startLessonChat(selectedLesson, item);
                }}
              >
                <div className="relative mb-8">
                  <img src={item.imageUrl} alt={item.english} className="w-64 h-64 rounded-[40px] object-cover shadow-xl group-hover:scale-105 transition" />
                  <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-full shadow-lg text-3xl animate-pulse">🔊</div>
                </div>
                <h3 className="text-6xl text-blue-600 mb-2">{item.english}</h3>
                <p className="text-2xl text-gray-500 font-bold uppercase">{item.french}</p>
              </div>
            ))}
          </div>

          <div className="mt-24 pb-20 flex flex-col items-center">
            <button 
              onClick={() => startLessonChat(selectedLesson)}
              className="bg-green-500 hover:bg-green-600 text-white font-black py-8 px-16 rounded-full text-4xl shadow-[0_12px_0_rgb(21,128,61)] transition-all active:translate-y-2 active:shadow-none flex items-center gap-6"
            >
              <span>JOUER AVEC BUMBLE</span>
              <span className="text-6xl">💬</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderSongs = () => (
    <div className="min-h-screen bg-purple-50 p-6 md:p-12">
        <button onClick={() => setView(AppView.HOME)} className="mb-10 text-3xl font-bold text-purple-500 flex items-center gap-3">
          <span className="bg-purple-100 p-3 rounded-full">⬅️</span> <span>Retour</span>
        </button>

        <div className="max-w-5xl mx-auto">
            <h2 className="text-6xl text-purple-600 mb-12 text-center">Sing Along! 🎵</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {SONGS.map((song) => (
                    <button 
                        key={song.id}
                        onClick={() => {
                            setChatContext({
                                prompt: `Sing the lyrics of "${song.title}" slowly for the child to follow. Encouraging tone.`,
                                instruction: `C'est parti ! Chantons ensemble "${song.title}" !`
                            });
                            setIsChatting(true);
                        }}
                        className={`${song.color} p-12 rounded-[50px] shadow-xl text-white flex items-center gap-8 transform transition hover:scale-105 border-b-[10px] border-black/20`}
                    >
                        <span className="text-7xl">{song.icon}</span>
                        <span className="text-4xl font-black">{song.title}</span>
                    </button>
                ))}
            </div>
        </div>
    </div>
  );

  const renderParentGate = () => (
    <div className="min-h-screen flex items-center justify-center p-6 bg-blue-50">
      <div className="bg-white p-14 rounded-[60px] shadow-2xl max-w-lg w-full text-center border-t-[16px] border-blue-500">
        <h2 className="text-4xl mb-6 text-blue-600">Espace Parents 🔒</h2>
        <p className="text-gray-500 mb-10 text-xl font-medium">Résous ce calcul pour entrer :</p>
        <div className="text-7xl font-black text-blue-800 mb-10 bg-blue-50 p-10 rounded-full">{parentGateEquation.a} + {parentGateEquation.b}</div>
        <input type="number" value={parentGateAnswer} onChange={(e) => setParentGateAnswer(e.target.value)} className="w-full text-center text-5xl font-black p-6 border-8 border-blue-100 rounded-[30px] mb-10" placeholder="?" autoFocus />
        <div className="flex gap-6">
          <button onClick={() => setView(AppView.HOME)} className="flex-1 py-6 text-2xl font-black text-gray-400 bg-gray-100 rounded-[30px]">Annuler</button>
          <button onClick={checkParentGate} className="flex-1 py-6 text-2xl font-black text-white bg-blue-500 rounded-[30px]">Entrer</button>
        </div>
      </div>
    </div>
  );

  const renderParentDashboard = () => (
    <div className="min-h-screen bg-gray-100 p-8 lg:p-16">
      <div className="max-w-6xl mx-auto bg-white rounded-[60px] shadow-2xl overflow-hidden">
        <div className="bg-blue-600 p-12 text-white flex justify-between items-center">
          <h2 className="text-5xl font-black">Tableau de bord</h2>
          <button onClick={() => setView(AppView.HOME)} className="bg-white text-blue-600 px-10 py-4 rounded-full font-black text-xl">Quitter 🏠</button>
        </div>
        <div className="p-12 lg:p-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
            <div className="bg-blue-50 p-10 rounded-[40px] flex flex-col items-center">
              <span className="text-2xl font-black text-blue-600 mb-4 uppercase">Mots Appris</span>
              <div className="text-8xl font-black text-blue-800">{progress.wordsLearned.length}</div>
            </div>
            <div className="bg-green-50 p-10 rounded-[40px] flex flex-col items-center">
              <span className="text-2xl font-black text-green-600 mb-4 uppercase">Sessions AI</span>
              <div className="text-8xl font-black text-green-800">{progress.sessionsCompleted}</div>
            </div>
            <div className="bg-yellow-50 p-10 rounded-[40px] flex flex-col items-center">
              <span className="text-2xl font-black text-yellow-600 mb-4 uppercase">Progression</span>
              <div className="text-8xl font-black text-yellow-800">100%</div>
            </div>
          </div>
          <section>
            <h3 className="text-3xl font-black mb-8 text-gray-800 border-l-8 border-yellow-400 pl-6">Vocabulaire acquis</h3>
            <div className="flex flex-wrap gap-4">
              {progress.wordsLearned.map((word, i) => (
                <span key={i} className="bg-white border-4 border-blue-50 px-8 py-4 rounded-3xl text-2xl font-bold text-blue-700 shadow-md">{word} ✅</span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen font-quicksand bg-[#fef9c3]">
      {view === AppView.LOGIN && renderLogin()}
      {view === AppView.HOME && renderHome()}
      {view === AppView.LESSON && renderLesson()}
      {view === AppView.SONGS && renderSongs()}
      {view === AppView.PARENT_GATE && renderParentGate()}
      {view === AppView.PARENT_DASHBOARD && renderParentDashboard()}
      
      {isChatting && (
        <SparkyVoice 
          onClose={() => {
            setIsChatting(false);
            setChatContext(null);
            const newProgress = { ...progress, sessionsCompleted: progress.sessionsCompleted + 1 };
            saveProgress(newProgress);
          }}
          systemPrompt={chatContext?.prompt}
          initialInstruction={chatContext?.instruction}
        />
      )}
    </div>
  );
};

export default App;
