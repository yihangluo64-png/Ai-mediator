
import React from 'react';
import { Screen } from '../types';

interface HomeProps {
  onStartMediation: () => void;
  partnerNames: { partnerA: string; partnerB: string };
  setPartnerNames: (names: { partnerA: string; partnerB: string }) => void;
  sectionLabels: { pulse: string; discussions: string; growth: string };
  setSectionLabels: (labels: { pulse: string; discussions: string; growth: string }) => void;
}

export const Home: React.FC<HomeProps> = ({ 
  onStartMediation, 
  partnerNames, 
  setPartnerNames,
  sectionLabels,
  setSectionLabels
}) => {
  return (
    <div className="flex-1 overflow-y-auto no-scrollbar pb-32 px-5 animate-in fade-in duration-500">
      <header className="flex justify-between items-start mt-6 mb-8">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Thursday, Nov 14</p>
          <div className="flex items-center gap-1 text-2xl font-bold leading-tight group">
            <span className="text-gray-900 dark:text-gray-100">Hi,</span>
            <input 
              value={partnerNames.partnerA}
              onChange={(e) => setPartnerNames({ ...partnerNames, partnerA: e.target.value })}
              className="w-20 bg-transparent border-0 p-0 text-primary focus:ring-0 hover:bg-primary/5 rounded transition-colors"
              placeholder="Partner A"
            />
            <span className="text-primary">&</span>
            <input 
              value={partnerNames.partnerB}
              onChange={(e) => setPartnerNames({ ...partnerNames, partnerB: e.target.value })}
              className="w-24 bg-transparent border-0 p-0 text-primary focus:ring-0 hover:bg-primary/5 rounded transition-colors"
              placeholder="Partner B"
            />
          </div>
        </div>
        <button className="relative p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 transition-colors">
          <span className="material-icons-round text-gray-600 dark:text-gray-300">notifications_none</span>
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-white dark:border-gray-800"></span>
        </button>
      </header>

      <section className="mb-6">
        <div className="glass-panel p-5 rounded-2xl relative overflow-hidden group shadow-sm">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/10 blur-3xl rounded-full pointer-events-none"></div>
          <div className="flex justify-between items-center mb-4 relative z-10">
            <div className="flex items-center gap-2">
              <span className="material-icons-round text-primary text-xl">favorite</span>
              <input 
                value={sectionLabels.pulse}
                onChange={(e) => setSectionLabels({ ...sectionLabels, pulse: e.target.value })}
                className="bg-transparent border-0 p-0 font-semibold text-lg focus:ring-0 hover:bg-black/5 dark:hover:bg-white/5 rounded px-1 transition-colors w-full max-w-[180px]"
              />
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 font-medium border border-emerald-500/20">
              Balanced
            </span>
          </div>
          <div className="flex items-end gap-3 mb-2 relative z-10">
            <div className="flex-1">
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
                <span>Mood</span>
                <span>Good</span>
              </div>
              <div className="h-12 flex items-center justify-between gap-1">
                <div className="w-1.5 h-4 bg-primary/30 rounded-full"></div>
                <div className="w-1.5 h-6 bg-primary/40 rounded-full"></div>
                <div className="w-1.5 h-8 bg-primary/60 rounded-full"></div>
                <div className="w-1.5 h-5 bg-primary/50 rounded-full"></div>
                <div className="w-1.5 h-10 bg-primary rounded-full pulse-shadow"></div>
                <div className="w-1.5 h-7 bg-primary/60 rounded-full"></div>
                <div className="w-1.5 h-4 bg-primary/40 rounded-full"></div>
                <div className="w-1.5 h-5 bg-primary/30 rounded-full"></div>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 leading-relaxed relative z-10">
            You've resolved <span className="text-gray-900 dark:text-white font-medium">2 conflicts</span> this week. Empathy levels are up by 15%.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <button 
          onClick={onStartMediation}
          className="w-full bg-primary hover:bg-primary/90 text-white p-4 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
        >
          <span className="material-icons-round text-xl">add_circle_outline</span>
          <span className="font-semibold text-lg">Start New Mediation</span>
        </button>
      </section>

      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <input 
            value={sectionLabels.discussions}
            onChange={(e) => setSectionLabels({ ...sectionLabels, discussions: e.target.value })}
            className="bg-transparent border-0 p-0 font-semibold text-gray-900 dark:text-white focus:ring-0 hover:bg-black/5 dark:hover:bg-white/5 rounded px-1 transition-colors w-full max-w-[200px]"
          />
          <button className="text-xs text-primary font-medium hover:underline">View All</button>
        </div>
        <div className="space-y-3">
          <div className="bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 p-4 rounded-xl flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center flex-shrink-0 text-orange-600 dark:text-orange-400">
                <span className="material-icons-round text-xl">flight_takeoff</span>
              </div>
              <div>
                <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100">Holiday Budget</h4>
                <p className="text-xs text-orange-500 mt-1 flex items-center gap-1">
                  <span className="animate-pulse">●</span> Partner typing...
                </p>
              </div>
            </div>
            <span className="material-icons-round text-gray-400 text-lg">chevron_right</span>
          </div>
          <div className="bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 p-4 rounded-xl flex items-center justify-between shadow-sm border-l-4 border-l-primary">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                <span className="material-icons-round text-xl">cleaning_services</span>
              </div>
              <div>
                <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100">Chore Division</h4>
                <p className="text-xs text-primary mt-1 font-medium">AI Suggestion Ready</p>
              </div>
            </div>
            <button className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-lg font-medium hover:bg-primary/20 transition-colors">
              Review
            </button>
          </div>
        </div>
      </section>

      <section className="mb-6">
        <input 
          value={sectionLabels.growth}
          onChange={(e) => setSectionLabels({ ...sectionLabels, growth: e.target.value })}
          className="bg-transparent border-0 p-0 font-semibold text-gray-900 dark:text-white focus:ring-0 mb-4 hover:bg-black/5 dark:hover:bg-white/5 rounded px-1 transition-colors w-full"
        />
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Current Level</p>
              <h4 className="text-base font-bold mt-1 text-gray-900 dark:text-white">Level 3: Deep Listening</h4>
            </div>
            <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-300">
              <span className="material-icons-round text-sm">psychology</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1.5 font-medium">
              <span className="text-gray-500 dark:text-gray-400">Progress</span>
              <span className="text-primary">80%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-primary h-2 rounded-full transition-all duration-500" style={{ width: '80%' }}></div>
            </div>
            <p className="text-xs text-gray-400 mt-2">Next milestone: Emotional Validations Badge</p>
          </div>
        </div>
      </section>
    </div>
  );
};
