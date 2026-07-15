'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

export type ReviewableStage = 'in-review' | 'approved' | 'changes-requested';

export interface ChangeRequest {
  journeyTitle: string;
  category: string;
  message: string;
  time: string; // e.g. '14 Jul 2026 · 15:42'
}

interface JourneyCtxValue {
  japanStage: ReviewableStage;
  approveJapan(): void;
  requestJapanChanges(r: ChangeRequest): void;
  moroccoStage: ReviewableStage;
  approveMorocco(): void;
  requestMoroccoChanges(r: ChangeRequest): void;
  changeRequests: ChangeRequest[];
}

const JourneyCtx = createContext<JourneyCtxValue | null>(null);

export function JourneyProvider({ children }: { children: ReactNode }) {
  const [japanStage, setJapanStage] = useState<ReviewableStage>('in-review');
  const [moroccoStage, setMoroccoStage] = useState<ReviewableStage>('in-review');
  const [changeRequests, setChangeRequests] = useState<ChangeRequest[]>([]);

  function add(r: ChangeRequest) {
    setChangeRequests(prev => [...prev, r]);
  }

  return (
    <JourneyCtx.Provider value={{
      japanStage,
      approveJapan: () => setJapanStage('approved'),
      requestJapanChanges: (r) => { setJapanStage('changes-requested'); add(r); },
      moroccoStage,
      approveMorocco: () => setMoroccoStage('approved'),
      requestMoroccoChanges: (r) => { setMoroccoStage('changes-requested'); add(r); },
      changeRequests,
    }}>
      {children}
    </JourneyCtx.Provider>
  );
}

export function useJourneyCtx(): JourneyCtxValue {
  const ctx = useContext(JourneyCtx);
  if (!ctx) throw new Error('useJourneyCtx must be used within JourneyProvider');
  return ctx;
}
