'use client';
import { useState, useCallback } from 'react';
import Link from 'next/link';
import s from './PlanningWorkspace.module.css';
import { useJourneyCtx } from '@/context/JourneyContext';
import JourneyReview from './JourneyReview';
import BookingDetailModal from './BookingDetailModal';
import { getJourneyBookings } from '@/data/bookings-v2';

interface Props {
  title: string;
  subtitle: string;
  stage: string;
  nights: number;
  destinations: string[];
  updated: string;
  sofiaNote: string;
  journeyId?: 'morocco' | 'scotland';
}

export default function PlanningWorkspace({ title, subtitle, stage, nights, destinations, updated, sofiaNote, journeyId }: Props) {
  const isReview = stage === 'Awaiting Review';
  const [showReview, setShowReview] = useState(false);
  const [viewingBookingId, setViewingBookingId] = useState<string | null>(null);

  const ctx = useJourneyCtx();
  const moroccoStage = ctx.moroccoStage;
  const approveMorocco = ctx.approveMorocco;
  const requestMoroccoChanges = ctx.requestMoroccoChanges;

  const isMorocco = journeyId === 'morocco';
  const moroccoBookings = isMorocco ? getJourneyBookings('morocco') : [];

  // For Morocco, resolve the effective stage from context; for Scotland use prop
  let effectiveStage = stage;
  if (isMorocco) {
    if (moroccoStage === 'approved') effectiveStage = 'Approved';
    else if (moroccoStage === 'changes-requested') effectiveStage = 'Changes Requested';
    else effectiveStage = 'Awaiting Review';
  }

  const canReview = isMorocco && effectiveStage === 'Awaiting Review';
  const changesRequested = isMorocco && effectiveStage === 'Changes Requested';
  const approvedState = isMorocco && effectiveStage === 'Approved';

  const handleApprove = useCallback(() => {
    if (isMorocco) approveMorocco();
  }, [isMorocco, approveMorocco]);

  const handleRequestChanges = useCallback(({ category, message }: { category: string; message: string }) => {
    if (isMorocco) {
      requestMoroccoChanges({
        journeyTitle: title,
        category,
        message,
        time: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      });
    }
  }, [isMorocco, title, requestMoroccoChanges]);

  const badgeClass = approvedState ? 'badgeGreen' : changesRequested ? 'badgeMuted' : isReview ? 'badgeGold' : 'badgeMuted';

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
            <span className={`badge ${badgeClass}`}>{effectiveStage}</span>
          </div>
          <div className={s.meta}>{nights} Nights · {destinations.join(' · ')}</div>
        </div>
        <div className={s.headerRight}>
          {canReview ? (
            <button className="btnGold" onClick={() => setShowReview(true)}>Review Proposal</button>
          ) : !approvedState && !changesRequested ? (
            <Link href="/portal/messages" className="btnGold">Message Sofia</Link>
          ) : null}
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

          {/* Proposed bookings — Morocco only */}
          {isMorocco && moroccoBookings.length > 0 && (
            <div className={s.proposedSection}>
              <div className={s.proposedLabel}>Proposed Bookings</div>
              <p className={s.proposedNote}>These reservations are provisional — Sofia is holding them subject to your approval.</p>
              {moroccoBookings.map(b => (
                <button
                  key={b.id}
                  type="button"
                  className={s.proposedItem}
                  onClick={() => setViewingBookingId(b.id)}
                  aria-label={`View details: ${b.title}`}
                >
                  <div className={s.proposedItemLeft}>
                    <span className={s.proposedItemTitle}>{b.title}</span>
                    {b.subtitle && <span className={s.proposedItemSub}>{b.subtitle}</span>}
                  </div>
                  <span className={`badge badgeMuted`} style={{flexShrink:0}}>Pending</span>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" style={{flexShrink:0,color:'var(--p-muted)'}} aria-hidden="true">
                    <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5"/>
                  </svg>
                </button>
              ))}
            </div>
          )}

          {/* Status card — adapts to effective state */}
          {approvedState ? (
            <div className={s.statusCard}>
              <div className={s.statusTitle}>Journey Approved</div>
              <p className={s.statusText}>
                You have approved the {title} proposal. Sofia will begin confirming bookings and will keep you updated via Messages and Documents.
              </p>
              <div className={s.statusActions}>
                <Link href="/portal/messages" className="btnGold">View Messages</Link>
                <Link href="/portal/journeys" className="btnGhost">Back to Journeys</Link>
              </div>
            </div>
          ) : changesRequested ? (
            <div className={s.statusCard}>
              <div className={s.statusTitle}>Changes Requested</div>
              <p className={s.statusText}>
                Your change request has been sent to Sofia. She will review it and follow up in Messages, usually within the hour on working days.
              </p>
              <div className={s.statusActions}>
                <Link href="/portal/messages" className="btnGold">View Messages</Link>
                <Link href="/portal/journeys" className="btnGhost">Back to Journeys</Link>
              </div>
            </div>
          ) : (
            <div className={s.statusCard}>
              <div className={s.statusTitle}>
                {isReview ? 'Proposal Ready for Review' : 'Proposal in Progress'}
              </div>
              <p className={s.statusText}>
                {isReview
                  ? 'Sofia has prepared a journey proposal for your review. Open a conversation to share your thoughts, or review and approve it directly.'
                  : 'Sofia is currently researching and curating your journey. You will be notified when the proposal is ready.'}
              </p>
              <div className={s.statusActions}>
                {canReview ? (
                  <>
                    <button className="btnGold" onClick={() => setShowReview(true)}>Review Proposal</button>
                    <Link href="/portal/messages" className="btnGhost">Message Sofia</Link>
                  </>
                ) : (
                  <>
                    <Link href="/portal/messages" className="btnGold">Open Conversation</Link>
                    <Link href="/portal/journeys" className="btnGhost">Back to Journeys</Link>
                  </>
                )}
              </div>
            </div>
          )}
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

      {/* Journey Review overlay — Morocco only */}
      {showReview && isMorocco && (
        <JourneyReview
          journeyTitle={title}
          journeySubtitle={subtitle}
          nights={nights}
          destinations={destinations}
          lastUpdated={updated}
          onClose={() => setShowReview(false)}
          onApprove={handleApprove}
          onRequestChanges={handleRequestChanges}
        />
      )}

      {/* Booking detail modal — Morocco proposed items */}
      {viewingBookingId && (() => {
        const b = moroccoBookings.find(x => x.id === viewingBookingId) ?? null;
        return b ? <BookingDetailModal booking={b} onClose={() => setViewingBookingId(null)} /> : null;
      })()}
    </>
  );
}
