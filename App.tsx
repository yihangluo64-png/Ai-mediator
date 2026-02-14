
import React, { useState } from 'react';
import { Screen, MediationSession, MediationAnalysis, Agreement } from './types';
import { Navigation } from './components/Navigation';
import { Home } from './views/Home';
import { Vault } from './views/Vault';
import { MediationFlow } from './views/MediationFlow';

const INITIAL_AGREEMENTS: Agreement[] = [
  {
    id: '1',
    category: 'Household',
    date: 'Oct 24',
    title: 'Morning Routine Sync',
    resolvedFrom: 'Feeling rushed and unheard during breakfast time conflicts...',
    summary: 'Established a 15-minute buffer and clear duty rotation.',
    users: ['A', 'J']
  },
  {
    id: '2',
    category: 'Finances',
    date: 'Oct 12',
    title: 'Monthly Budget Review',
    resolvedFrom: 'Disagreement on discretionary spending limits for hobbies...',
    summary: 'Agreed on a fixed monthly "fun money" allowance for both.',
    users: ['A', 'J']
  }
];

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [partnerNames, setPartnerNames] = useState({ partnerA: 'Alex', partnerB: 'Jordan' });
  const [sectionLabels, setSectionLabels] = useState({
    pulse: 'Relationship Pulse',
    discussions: 'Active Discussions',
    growth: 'Shared Growth'
  });

  // Vault State
  const [agreements, setAgreements] = useState<Agreement[]>(INITIAL_AGREEMENTS);

  // Persisted Mediation State
  const [mediationSession, setMediationSession] = useState<MediationSession>({
    partnerAInput: '',
    partnerBInput: '',
    status: 'drafting',
    currentPartner: 'A'
  });
  const [mediationAnalysis, setMediationAnalysis] = useState<MediationAnalysis | null>(null);
  const [isSavedInVault, setIsSavedInVault] = useState(false);

  const startNewMediation = () => {
    setMediationSession({
      partnerAInput: '',
      partnerBInput: '',
      status: 'drafting',
      currentPartner: 'A'
    });
    setMediationAnalysis(null);
    setIsSavedInVault(false);
    setCurrentScreen('mediation-input');
  };

  const saveAgreement = (agreement: Agreement) => {
    setAgreements(prev => [agreement, ...prev]);
    setIsSavedInVault(true);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <Home 
            onStartMediation={startNewMediation} 
            partnerNames={partnerNames}
            setPartnerNames={setPartnerNames}
            sectionLabels={sectionLabels}
            setSectionLabels={setSectionLabels}
          />
        );
      case 'vault':
        return <Vault agreements={agreements} />;
      case 'mediator':
      case 'mediation-input':
      case 'mediation-result':
        return (
          <MediationFlow 
            onComplete={() => setCurrentScreen('vault')} 
            onBack={() => setCurrentScreen('home')} 
            partnerNames={partnerNames}
            session={mediationSession}
            setSession={setMediationSession}
            analysis={mediationAnalysis}
            setAnalysis={setMediationAnalysis}
            isSaved={isSavedInVault}
            onSaveAgreement={saveAgreement}
          />
        );
      default:
        return (
          <Home 
            onStartMediation={startNewMediation} 
            partnerNames={partnerNames}
            setPartnerNames={setPartnerNames}
            sectionLabels={sectionLabels}
            setSectionLabels={setSectionLabels}
          />
        );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-0 sm:p-4 font-display">
      <div className="relative w-full max-w-md h-screen sm:h-[844px] bg-background-light dark:bg-background-dark overflow-hidden sm:rounded-[2.5rem] sm:shadow-2xl border-x sm:border border-gray-200 dark:border-gray-800 flex flex-col">
        {/* Status Bar Mock */}
        <div className="w-full h-12 flex justify-between items-center px-8 pt-2 z-50 shrink-0 bg-transparent select-none">
          <span className="text-sm font-semibold tracking-wide">9:41</span>
          <div className="flex items-center gap-1.5">
            <span className="material-icons-round text-xs">signal_cellular_alt</span>
            <span className="material-icons-round text-xs">wifi</span>
            <span className="material-icons-round text-xs">battery_full</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 relative flex flex-col overflow-hidden">
          {renderScreen()}
        </div>

        {/* Persistent Nav */}
        <Navigation 
          currentScreen={currentScreen} 
          onNavigate={setCurrentScreen} 
        />
      </div>
    </div>
  );
};

export default App;
