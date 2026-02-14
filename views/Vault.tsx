
import React, { useState } from 'react';
import { Agreement } from '../types';

interface VaultProps {
  agreements: Agreement[];
}

export const Vault: React.FC<VaultProps> = ({ agreements }) => {
  const [filter, setFilter] = useState('All Agreements');
  const categories = ['All Agreements', 'Household', 'Finances', 'Intimacy', 'Chores'];

  const filteredAgreements = agreements.filter(a => filter === 'All Agreements' || a.category === filter);

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar pb-32 animate-in fade-in duration-500">
      <header className="sticky top-0 z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md px-6 py-6 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
        <h1 className="text-xl font-bold tracking-tight text-gray-800 dark:text-gray-100">Growth Vault</h1>
        <div className="flex items-center space-x-2">
          <button className="p-2 -mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500">
            <span className="material-icons-round">search</span>
          </button>
        </div>
      </header>

      <div className="px-6 py-4 sticky top-[73px] z-40 bg-background-light/95 dark:bg-background-dark/95">
        <div className="flex space-x-3 overflow-x-auto pb-2 no-scrollbar -mx-6 px-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat 
                ? 'bg-primary text-white shadow-md shadow-primary/20' 
                : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 space-y-8 relative mt-4">
        <div className="absolute left-[38px] top-4 bottom-0 w-px bg-gray-200 dark:bg-gray-800"></div>
        
        <div className="relative z-10 flex items-center mb-6">
          <div className="bg-background-light dark:bg-background-dark pr-4 py-1 text-xs font-bold uppercase tracking-wider text-gray-400">
            Recent Agreements
          </div>
          <div className="h-px bg-gray-200 dark:bg-gray-800 flex-grow"></div>
        </div>

        {filteredAgreements.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400">
              <span className="material-icons-round text-3xl">inbox</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">No agreements found in this category yet.</p>
          </div>
        ) : (
          filteredAgreements.map((agreement) => (
            <div key={agreement.id} className="relative pl-10 group animate-in slide-in-from-left duration-300">
              <div className={`absolute left-0 top-6 w-6 h-6 rounded-full bg-white dark:bg-gray-800 border-2 border-primary flex items-center justify-center z-10 shadow-sm`}>
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden transition-all hover:shadow-md">
                <div className="flex justify-between items-start mb-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider
                    ${agreement.category === 'Household' ? 'bg-emerald-100 text-emerald-800' : 
                      agreement.category === 'Finances' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                    {agreement.category}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">{agreement.date}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-1 leading-tight">{agreement.title}</h3>
                <div className="flex items-start gap-2 mt-3 mb-4 bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border border-gray-100 dark:border-gray-700/50">
                  <span className="material-icons-round text-gray-400 text-sm mt-0.5">psychology</span>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5">Summary</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                      {agreement.summary}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex -space-x-2">
                    {agreement.users.map((initial, i) => (
                      <div key={i} className={`w-6 h-6 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center text-[10px] font-bold 
                        ${i === 0 ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {initial}
                      </div>
                    ))}
                  </div>
                  <button className="text-xs font-medium text-gray-400 hover:text-primary transition-colors flex items-center gap-1">
                    Details
                    <span className="material-icons-round text-sm">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}

        <div className="relative pl-10 pb-8 flex items-center">
          <div className="absolute left-0 top-1 w-6 h-6 flex items-center justify-center z-10">
            <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></div>
          </div>
          <p className="text-xs text-gray-400 italic">Vault tracking shared growth</p>
        </div>
      </div>
      
      <button className="fixed bottom-24 right-5 w-14 h-14 bg-primary text-white rounded-full shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform z-40">
        <span className="material-icons-round text-3xl">add</span>
      </button>
    </div>
  );
};
