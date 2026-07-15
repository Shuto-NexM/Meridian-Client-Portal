'use client';
import Link from 'next/link';
import s from './PlanningWorkspace.module.css';

interface Props {
  title: string;
  subtitle: string;
  stage: string;
  nights: number;
  destinations: string[];
  updated: string;
  sofiaNote: string;
}

export default function PlanningWorkspace({ title, subtitle, stage, nights, destinations, updated, sofiaNote }: Props) {
  const isReview = stage === 'Awaiting Review';

  return (
    <>
      {/* Header */}
      <div className={s.header}>
        <div className={s.headerLeft}>
          <Link href="/portal/journeys" className={s.back}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
              <path d="M6 2L3 5l3 3"/>
            </svg>
            My Journeys
          </Link>
          <div className={s.titleRow}>
            <h1 className={s.title}>{title}</h1>
            <span className={`badge ${isReview ? 'badgeGold' : 'badgeMuted'}`}>{stage}</span>
          </div>
          <div className={s.meta}>{nights} Nights · {destinations.join(' · ')}</div>
        </div>
        <div className={s.headerRight}>
          <Link href="/portal/messages" className="btnGold">Message Sofia</Link>
        </div>
      </div>

      {/* Body */}
      <div className={s.body}>
        <div className={s.main}>
          <div className={s.sofiaNote}>
            <div className={s.sofiaRow}>
              <div className={s.sofiaAvatar}>SL</div>
              <div>
                <div className={s.sofiaName}>Sofia Laurent</div>
                <div className={s.sofiaRole}>Private Travel Concierge</div>
              </div>
              <span className={s.sofiaUpdated}>Last updated {updated}</span>
            </div>
            <p className={s.sofiaText}>{sofiaNote}</p>
          </div>

          <div className={s.statusCard}>
            <div className={s.statusTitle}>
              {isReview ? 'Proposal Ready for Review' : 'Proposal in Progress'}
            </div>
            <p className={s.statusText}>
              {isReview
                ? 'Sofia has prepared a journey proposal for your review. Open a conversation to share your thoughts.'
                : 'Sofia is currently researching and curating your journey. You will be notified when the proposal is ready.'}
            </p>
            <div className={s.statusActions}>
              <Link href="/portal/messages" className="btnGold">Open Conversation</Link>
              <Link href="/portal/journeys" className="btnGhost">Back to Journeys</Link>
            </div>
          </div>
        </div>

        <aside className={s.aside}>
          <div className={`${s.asideCard} card`}>
            <div className={s.asideLabel}>Journey Details</div>
            <div className={s.asideTitle}>{title}</div>
            <div className={s.asideSub}>{subtitle}</div>
            <div className={s.asideStats}>
              <span>{nights} Nights</span>
              <span>·</span>
              <span>{destinations.join(' & ')}</span>
            </div>
          </div>
          <div className={`${s.asideCard} card`}>
            <div className={s.asideLabel}>Your Concierge</div>
            <div className={s.concRow}>
              <div className={s.concAvatar}>SL</div>
              <div>
                <div className={s.concName}>Sofia Laurent</div>
                <div className={s.concStatus}>Available</div>
              </div>
            </div>
            <Link href="/portal/messages" className={s.msgBtn}>Send a message</Link>
          </div>
        </aside>
      </div>
    </>
  );
}
