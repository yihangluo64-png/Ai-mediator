
export type Screen = 'home' | 'mediator' | 'vault' | 'mediation-input' | 'mediation-result';

export interface Agreement {
  id: string;
  title: string;
  category: 'Household' | 'Finances' | 'Intimacy' | 'Chores';
  date: string;
  summary: string;
  resolvedFrom: string;
  users: string[];
}

export interface MediationAnalysis {
  summary: string;
  facts: string[];
  feelings: {
    partnerA: string[];
    partnerB: string[];
  };
  suggestions: Suggestion[];
}

export interface Suggestion {
  id: string;
  type: string;
  tags: string[];
  title: string;
  description: string;
  script: string;
}

export interface MediationSession {
  partnerAInput: string;
  partnerBInput: string;
  status: 'drafting' | 'ready' | 'analyzing' | 'completed';
  currentPartner: 'A' | 'B';
}
