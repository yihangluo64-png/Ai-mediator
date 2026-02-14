
import React from 'react';
import { Screen } from '../types';

interface NavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentScreen, onNavigate }) => {
  const isActive = (screen: Screen) => currentScreen === screen || 
    (screen === 'mediator' && (currentScreen === 'mediation-input' || currentScreen === 'mediation-result'));

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/95 dark:bg-[#101922]/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 pb-8 pt-3 px-6 z-50 flex justify-around items-center">
      <button 
        onClick={() => onNavigate('home')}
        className={`flex flex-col items-center gap-1.5 transition-colors w-16 ${isActive('home') ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}
      >
        <span className={`material-icons-round text-[26px] ${isActive('home') ? 'fill-current' : ''}`}>home</span>
        <span className="text-[11px] font-medium leading-none">Home</span>
      </button>
      
      <button 
        onClick={() => onNavigate('mediator')}
        className={`flex flex-col items-center gap-1.5 transition-colors w-16 ${isActive('mediator') ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}
      >
        <span className={`material-symbols-outlined text-[26px] ${isActive('mediator') ? 'fill font-variation-settings-fill' : ''}`}>handshake</span>
        <span className="text-[11px] font-medium leading-none">Mediator</span>
      </button>
      
      <button 
        onClick={() => onNavigate('vault')}
        className={`flex flex-col items-center gap-1.5 transition-colors w-16 ${isActive('vault') ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}
      >
        <span className={`material-symbols-outlined text-[26px] ${isActive('vault') ? 'fill font-variation-settings-fill' : ''}`}>lock</span>
        <span className="text-[11px] font-medium leading-none">Vault</span>
      </button>
      
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
    </nav>
  );
};
