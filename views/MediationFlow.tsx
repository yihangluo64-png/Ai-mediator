
import React, { useState } from 'react';
import { MediationAnalysis, MediationSession, Agreement } from '../types';
import { analyzeMediation } from '../services/geminiService';

interface MediationFlowProps {
  onComplete: () => void;
  onBack: () => void;
  partnerNames: { partnerA: string; partnerB: string };
  session: MediationSession;
  setSession: React.Dispatch<React.SetStateAction<MediationSession>>;
  analysis: MediationAnalysis | null;
  setAnalysis: React.Dispatch<React.SetStateAction<MediationAnalysis | null>>;
  isSaved: boolean;
  onSaveAgreement: (agreement: Agreement) => void;
}

export const MediationFlow: React.FC<MediationFlowProps> = ({ 
  onComplete, 
  onBack, 
  partnerNames,
  session,
  setSession,
  analysis,
  setAnalysis,
  isSaved,
  onSaveAgreement
}) => {
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    if (session.currentPartner === 'A') {
      setSession({ ...session, currentPartner: 'B' });
    } else {
      setLoading(true);
      try {
        const result = await analyzeMediation(session.partnerAInput, session.partnerBInput);
        setAnalysis(result);
        setSession({ ...session, status: 'completed' });
      } catch (e) {
        alert("Mediation analysis failed. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSaveToVault = () => {
    if (!analysis) return;

    // Use current date
    const now = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dateStr = `${months[now.getMonth()]} ${now.getDate()}`;

    const newAgreement: Agreement = {
      id: Math.random().toString(36).substr(2, 9),
      category: 'Household', // Default or derived from analysis tags if available
      date: dateStr,
      title: analysis.suggestions[0]?.title || 'Mediated Agreement',
      resolvedFrom: session.partnerAInput.substring(0, 80) + '...',
      summary: analysis.summary.substring(0, 150) + '...',
      users: [partnerNames.partnerA[0], partnerNames.partnerB[0]]
    };

    onSaveAgreement(newAgreement);
  };

  if (session.status === 'completed' && analysis) {
    return (
      <div className="flex-1 overflow-y-auto no-scrollbar pb-32 animate-in slide-in-from-right duration-500">
        <header className="sticky top-0 z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-terracotta-100">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-terracotta-50 transition-colors text-terracotta-600">
            <span className="material-icons-round text-2xl">arrow_back</span>
          </button>
          <h1 className="text-lg font-serif font-semibold text-terracotta-900 tracking-tight">Mediation Result</h1>
          <div className="w-10 h-10 -mr-2 flex items-center justify-center rounded-full overflow-hidden border border-terracotta-200">
            <img alt="AI Avatar" className="w-full h-full object-cover" src="https://picsum.photos/100/100" />
          </div>
        </header>

        <main className="px-5 pt-6 space-y-8">
          <section className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="material-icons-round text-terracotta-500 text-lg">psychology</span>
              <h2 className="text-sm font-bold text-terracotta-800 uppercase tracking-widest">Analysis Summary</h2>
            </div>
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-terracotta-500 to-terracotta-600 p-6 shadow-soft text-white">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
              
              <div className="flex justify-between items-start relative z-10 mb-3">
                <h3 className="font-serif text-xl font-medium">We heard you both.</h3>
                <button 
                  onClick={handleSaveToVault}
                  disabled={isSaved}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md transition-all active:scale-95
                    ${isSaved 
                      ? 'bg-emerald-500 text-white cursor-default shadow-inner' 
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'}`}
                >
                  <span className="material-icons-round text-sm">{isSaved ? 'check' : 'bookmark_border'}</span>
                  {isSaved ? 'Saved to Vault' : 'Save to Vault'}
                </button>
              </div>

              <p className="text-terracotta-50 text-sm leading-relaxed relative z-10 font-light opacity-95">
                {analysis.summary}
              </p>
              <div className="mt-4 flex items-center gap-2 relative z-10">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-indigo-200 border-2 border-terracotta-500 flex items-center justify-center text-[10px] text-indigo-800 font-bold">
                    {partnerNames.partnerA[0]}
                  </div>
                  <div className="w-6 h-6 rounded-full bg-emerald-200 border-2 border-terracotta-500 flex items-center justify-center text-[10px] text-emerald-800 font-bold">
                    {partnerNames.partnerB[0]}
                  </div>
                </div>
                <span className="text-xs text-terracotta-100 font-medium">Both perspectives integrated</span>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-terracotta-100 shadow-sm overflow-hidden">
              <div className="grid grid-cols-2 divide-x divide-terracotta-50">
                <div className="p-4 bg-cream-50/50 dark:bg-gray-900/50">
                  <h4 className="text-xs font-bold text-terracotta-600 uppercase mb-3 flex items-center gap-1">
                    <span className="material-icons-round text-sm">fact_check</span> Facts
                  </h4>
                  <ul className="space-y-2">
                    {analysis.facts.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-terracotta-400 mt-1.5 shrink-0"></span>
                        <p className="text-xs text-gray-700 dark:text-gray-300 leading-snug">{f}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4">
                  <h4 className="text-xs font-bold text-terracotta-400 uppercase mb-3 flex items-center gap-1">
                    <span className="material-icons-round text-sm">favorite</span> Feelings
                  </h4>
                  <ul className="space-y-2">
                    {analysis.feelings.partnerA.map((f, i) => (
                      <li key={`a-${i}`} className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-terracotta-300 mt-1.5 shrink-0"></span>
                        <p className="text-xs text-gray-700 dark:text-gray-300 leading-snug">{partnerNames.partnerA}: {f}</p>
                      </li>
                    ))}
                    {analysis.feelings.partnerB.map((f, i) => (
                      <li key={`b-${i}`} className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-terracotta-300 mt-1.5 shrink-0"></span>
                        <p className="text-xs text-gray-700 dark:text-gray-300 leading-snug">{partnerNames.partnerB}: {f}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="material-icons-round text-terracotta-500 text-lg">alt_route</span>
                <h2 className="text-sm font-bold text-terracotta-800 uppercase tracking-widest">Choose Your Path</h2>
              </div>
              <span className="text-xs text-terracotta-400 font-medium">{analysis.suggestions.length} Suggestions</span>
            </div>
            
            <div className="space-y-3">
              {analysis.suggestions.map((suggestion, idx) => (
                <div key={suggestion.id} className={`group relative bg-white dark:bg-gray-800 rounded-xl p-5 border shadow-sm transition-all cursor-pointer ${idx === 0 ? 'border-2 border-terracotta-400 shadow-md' : 'border-terracotta-100 hover:border-terracotta-300 hover:shadow-md'}`}>
                  {idx === 0 && (
                    <div className="absolute top-4 right-4">
                      <span className="material-icons-round text-terracotta-500">check_circle</span>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {suggestion.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider border border-emerald-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-gray-900 dark:text-white mb-1">{suggestion.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
                    {suggestion.description}
                  </p>
                  <div className="bg-cream-100 dark:bg-gray-900 rounded-lg p-3 border border-cream-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 font-medium italic">Script: "{suggestion.script}"</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-background-dark animate-in slide-in-from-bottom duration-500">
      <div className="px-6 pt-6 pb-4">
        <div className="flex justify-between items-center mb-6">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-surface-highlight transition-colors text-gray-500">
            <span className="material-icons-round">arrow_back_ios_new</span>
          </button>
          <div className="flex items-center gap-1 bg-surface-dark px-3 py-1 rounded-full border border-gray-800">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
            <span className="text-xs font-medium text-primary">Live Session</span>
          </div>
          <button className="p-2 -mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-surface-highlight transition-colors text-gray-500">
            <span className="material-icons-round">more_horiz</span>
          </button>
        </div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">Open Mediation</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          This is a safe space. The AI mediator listens to both sides to find common ground without judgment.
        </p>
      </div>

      <div className="flex-1 flex flex-col px-6 overflow-y-auto pb-44">
        <div className="flex items-center gap-2 mb-6">
          <div className={`h-1 flex-1 rounded-full ${session.currentPartner === 'A' ? 'bg-primary' : 'bg-primary/50'}`}></div>
          <div className={`h-1 flex-1 rounded-full ${session.currentPartner === 'B' ? 'bg-primary' : 'bg-gray-200 dark:bg-surface-highlight'}`}></div>
          <div className="h-1 flex-1 bg-gray-200 dark:bg-surface-highlight rounded-full"></div>
          <span className="ml-2 text-xs font-medium text-gray-400">Step {session.currentPartner === 'A' ? '1' : '2'} of 3</span>
        </div>

        <div className="bg-gray-100 dark:bg-surface-dark p-1 rounded-xl flex mb-6 relative border border-gray-200 dark:border-gray-800">
          <button 
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 
              ${session.currentPartner === 'A' ? 'bg-white dark:bg-surface-highlight shadow-sm text-primary' : 'text-gray-500'}`}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${session.currentPartner === 'A' ? 'bg-primary/20' : 'bg-gray-200 dark:bg-gray-700'}`}>
              {partnerNames.partnerA[0]}
            </div>
            {partnerNames.partnerA}
          </button>
          <button 
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 
              ${session.currentPartner === 'B' ? 'bg-white dark:bg-surface-highlight shadow-sm text-primary' : 'text-gray-500'}`}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${session.currentPartner === 'B' ? 'bg-primary/20' : 'bg-gray-200 dark:bg-gray-700'}`}>
              {partnerNames.partnerB[0]}
            </div>
            {partnerNames.partnerB}
          </button>
        </div>

        <div className="bg-white dark:bg-surface-dark rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-800 glow-primary flex flex-col gap-4 relative">
          <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
              <span className="material-icons-round text-primary text-base">edit_note</span>
              {session.currentPartner === 'A' ? partnerNames.partnerA : partnerNames.partnerB}'s Perspective
            </label>
            <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full font-medium">Drafting</span>
          </div>
          <div className="relative">
            <textarea 
              value={session.currentPartner === 'A' ? session.partnerAInput : session.partnerBInput}
              onChange={(e) => {
                const val = e.target.value;
                if (session.currentPartner === 'A') setSession({...session, partnerAInput: val});
                else setSession({...session, partnerBInput: val});
              }}
              className="w-full h-48 bg-transparent border-0 p-0 text-base text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-0 resize-none leading-relaxed" 
              placeholder={`Describe the situation from ${session.currentPartner === 'A' ? partnerNames.partnerA : partnerNames.partnerB}'s point of view. Focus on how it made you feel...`}
            ></textarea>
            <button className="absolute bottom-0 right-0 p-2 bg-primary/10 hover:bg-primary/20 rounded-full text-primary transition-colors">
              <span className="material-icons-round text-xl">mic</span>
            </button>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between bg-gray-50 dark:bg-surface-dark/50 p-4 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-gray-200 dark:bg-surface-highlight rounded-lg text-gray-500">
              <span className="material-icons-round text-xl">lock</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">Private Draft</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Don't show to partner yet</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input defaultChecked className="sr-only peer" type="checkbox" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
          </label>
        </div>
      </div>

      <div className="absolute bottom-28 left-0 w-full px-6 z-10">
        <button 
          onClick={handleNext}
          disabled={loading || (session.currentPartner === 'A' ? !session.partnerAInput : !session.partnerBInput)}
          className={`w-full font-semibold py-4 rounded-xl shadow-lg shadow-primary/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group
            ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary/90 text-white'}`}
        >
          {loading ? (
            <span className="animate-spin material-icons-round">sync</span>
          ) : (
            <>
              <span className="material-icons-round group-hover:translate-x-1 transition-transform">
                {session.currentPartner === 'A' ? 'arrow_forward' : 'auto_awesome'}
              </span>
              {session.currentPartner === 'A' ? `Next: ${partnerNames.partnerB}` : 'Analyze Statement'}
            </>
          )}
        </button>
        <p className="text-center mt-3 text-xs text-gray-400 dark:text-gray-600 flex items-center justify-center gap-1">
          <span className="material-icons-round text-[10px]">verified_user</span> 
          End-to-end encrypted session
        </p>
      </div>
    </div>
  );
};
