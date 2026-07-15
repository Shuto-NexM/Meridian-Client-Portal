'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import s from './journey-review.module.css';

type Step = 'review' | 'confirm' | 'confirming' | 'success' | 'request' | 'request-success';

const CATEGORIES = [
  'Accommodation',
  'Transport',
  'Dining',
  'Experiences',
  'Dates',
  'Pace',
  'Special request',
  'Other',
] as const;

type Category = typeof CATEGORIES[number] | '';

export interface ChangeRequestData {
  category: Category;
  message: string;
}

interface Props {
  journeyTitle: string;
  journeySubtitle: string;
  nights: number;
  destinations: string[];
  lastUpdated: string;
  version?: string;
  onClose(): void;
  onApprove(): void;
  onRequestChanges(data: ChangeRequestData): void;
}

function Dots({ current }: { current: number }) {
  return (
    <div className={s.dots} aria-hidden="true">
      {[0, 1, 2].map(i => (
        <div key={i} className={`${s.dot}${i === current ? ' ' + s.dotActive : ''}`} />
      ))}
    </div>
  );
}

function BackIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true">
      <path d="M6 2L3 5l3 3" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#7AB87A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12l5 5L18 7" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#C8A96A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 11h14M12 5l6 6-6 6" />
    </svg>
  );
}

function now(): string {
  const d = new Date();
  const day = d.getDate().toString().padStart(2, '0');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  const h = d.getHours().toString().padStart(2, '0');
  const m = d.getMinutes().toString().padStart(2, '0');
  return `${day} ${month} ${year} · ${h}:${m}`;
}

export default function JourneyReview({
  journeyTitle,
  journeySubtitle,
  nights,
  destinations,
  lastUpdated,
  version,
  onClose,
  onApprove,
  onRequestChanges,
}: Props) {
  const [step, setStep] = useState<Step>('review');
  const [category, setCategory] = useState<Category>('');
  const [message, setMessage] = useState('');
  const [msgError, setMsgError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [timestamp, setTimestamp] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      if (timer.current) clearTimeout(timer.current);
    };
  }, [onClose]);

  const handleConfirmApprove = useCallback(() => {
    setStep('confirming');
    timer.current = setTimeout(() => {
      setStep('success');
      onApprove();
    }, 1800);
  }, [onApprove]);

  function handleSubmitRequest() {
    if (!message.trim()) {
      setMsgError('Please describe what you would like us to adjust.');
      textareaRef.current?.focus();
      return;
    }
    if (submitted) return;
    setTimestamp(now());
    setSubmitted(true);
    setStep('request-success');
    onRequestChanges({ category, message });
  }

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) onClose();
  }

  const stepIdx = step === 'review' ? 0 : (step === 'confirm' || step === 'confirming') ? 1 : 2;
  const isTerminal = step === 'success' || step === 'request-success';
  const isConfirming = step === 'confirming';

  return (
    <div
      className={s.overlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="jr-heading"
    >
      <div className={s.panel}>

        {/* ── Panel header ────────────────────────────────────────────────────── */}
        <div className={s.panelHeader}>
          {isTerminal ? (
            <button className={s.navBtn} onClick={onClose}>Close</button>
          ) : isConfirming ? (
            <div />
          ) : (
            <button
              className={s.navBtn}
              onClick={() => {
                if (step === 'confirm' || step === 'request') setStep('review');
                else onClose();
              }}
            >
              {step === 'review' ? null : <BackIcon />}
              {step === 'review' ? 'Close' : 'Back'}
            </button>
          )}

          {!isTerminal && !isConfirming && <Dots current={stepIdx} />}
        </div>

        {/* ── Step: Review ────────────────────────────────────────────────────── */}
        {step === 'review' && (
          <div className={s.stepBody}>
            <div className={s.stepEyebrow}>Journey Review</div>
            <div className={s.stepTitle} id="jr-heading">{journeyTitle}</div>
            <div className={s.stepSub}>{journeySubtitle}</div>

            <div className={s.reviewMeta}>
              <div className={s.reviewMetaItem}>
                <span className={s.reviewMetaDot} />
                {nights} Nights
              </div>
              {destinations.map(d => (
                <div key={d} className={s.reviewMetaItem}>
                  <span className={s.reviewMetaDot} />
                  {d}
                </div>
              ))}
            </div>

            <div className={s.reviewSection}>
              <div className={s.reviewSectionLabel}>Journey Details</div>
              <div className={s.reviewRow}>
                <span className={s.reviewRowLabel}>Duration</span>
                <span className={s.reviewRowValue}>{nights} Nights</span>
              </div>
              <div className={s.reviewRow}>
                <span className={s.reviewRowLabel}>Destinations</span>
                <span className={s.reviewRowValue}>{destinations.join(', ')}</span>
              </div>
              <div className={s.reviewRow}>
                <span className={s.reviewRowLabel}>Concierge</span>
                <span className={s.reviewRowValue}>Sofia Laurent</span>
              </div>
              <div className={s.reviewRow}>
                <span className={s.reviewRowLabel}>Travellers</span>
                <span className={s.reviewRowValue}>3 Travellers</span>
              </div>
            </div>

            <div className={s.reviewNotice}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="#C8A96A" strokeWidth="1.2" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 2 }} aria-hidden="true">
                <circle cx="6.5" cy="6.5" r="5" />
                <path d="M6.5 4.5v3M6.5 9v.2" />
              </svg>
              <span>
                Please review the proposal carefully. Once approved, Sofia will begin confirmed bookings. You can request changes before approving.
              </span>
            </div>

            <div className={s.reviewMeta2}>
              Last updated by Sofia Laurent · {lastUpdated}
              {version && <> · Version {version}</>}
            </div>

            <div className={s.reviewActions}>
              <button className={s.approveBtn} onClick={() => setStep('confirm')}>
                Approve Journey
              </button>
              <button className={s.requestBtn} onClick={() => setStep('request')}>
                Request Changes
              </button>
            </div>
          </div>
        )}

        {/* ── Step: Confirm ────────────────────────────────────────────────────── */}
        {step === 'confirm' && (
          <div className={s.stepBody}>
            <div className={s.stepEyebrow}>Confirm Approval</div>
            <div className={s.stepTitle} id="jr-heading">Approve this journey?</div>
            <div className={s.stepSub}>This action tells Sofia to proceed with confirmed bookings.</div>

            <div className={s.confirmCard}>
              <div className={s.confirmCardTitle}>{journeyTitle}</div>
              <div className={s.confirmCardSub}>Last updated · {lastUpdated}</div>
              <p className={s.confirmNote}>
                Once approved, Sofia will begin confirming reservations and arrangements on your behalf. You will receive confirmation details in Documents and Messages.
              </p>
            </div>

            <div className={s.confirmActions}>
              <button className={s.confirmBtn} onClick={handleConfirmApprove}>
                Confirm Approval
              </button>
              <button className={s.requestBtn} onClick={() => setStep('review')}>
                Back to Review
              </button>
            </div>
          </div>
        )}

        {/* ── Step: Confirming ────────────────────────────────────────────────── */}
        {step === 'confirming' && (
          <div className={s.confirmingBody}>
            <div className={s.loadingDots} role="status" aria-label="Processing approval">
              <span /><span /><span />
            </div>
            <div className={s.confirmingLabel}>Submitting approval…</div>
          </div>
        )}

        {/* ── Step: Success ────────────────────────────────────────────────────── */}
        {step === 'success' && (
          <div className={s.successBody}>
            <div className={s.successIcon}><CheckIcon /></div>
            <div className={s.successTitle} id="jr-heading">Journey approved</div>
            <div className={s.successDate}>Approved {lastUpdated}</div>

            <div className={s.successCard}>
              <div className={s.successCardTitle}>What happens next</div>
              <p className={s.successCardText}>
                Sofia will begin confirming bookings and will send you updated documents as each reservation is locked in. All confirmations will appear in your Documents library and in Messages.
              </p>
            </div>

            <div className={s.successActions}>
              <button className={s.returnBtn} onClick={onClose}>
                Return to Journey
              </button>
            </div>
          </div>
        )}

        {/* ── Step: Request ────────────────────────────────────────────────────── */}
        {step === 'request' && (
          <div className={s.requestBody}>
            <div className={s.stepEyebrow}>Request Changes</div>
            <div className={s.stepTitle} id="jr-heading">{journeyTitle}</div>
            <div className={s.stepSub}>
              Describe what you would like Sofia to adjust. She will review your request and follow up in Messages.
            </div>

            <div className={s.fieldGroup}>
              <label className={s.fieldLabel} htmlFor="jr-category">
                Category
                <span className={s.fieldOptional}>(optional)</span>
              </label>
              <select
                id="jr-category"
                className={s.fieldSelect}
                value={category}
                onChange={e => setCategory(e.target.value as Category)}
              >
                <option value="">Select a category…</option>
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className={s.fieldGroup}>
              <label className={s.fieldLabel} htmlFor="jr-message">
                What would you like us to adjust?
              </label>
              <textarea
                id="jr-message"
                ref={textareaRef}
                className={`${s.fieldTextarea}${msgError ? ' ' + s.fieldTextareaError : ''}`}
                rows={5}
                placeholder="Describe the changes you have in mind…"
                value={message}
                onChange={e => { setMessage(e.target.value); if (msgError) setMsgError(''); }}
              />
              {msgError && <div className={s.fieldError} role="alert">{msgError}</div>}
            </div>

            <div className={s.requestActions}>
              <button className={s.submitBtn} onClick={handleSubmitRequest}>
                Send Request
              </button>
              <button className={s.requestBtn} onClick={() => setStep('review')}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* ── Step: Request success ────────────────────────────────────────────── */}
        {step === 'request-success' && (
          <div className={s.reqSuccessBody}>
            <div className={s.reqSuccessIcon}><SendIcon /></div>
            <div className={s.reqSuccessTitle} id="jr-heading">Change request sent</div>
            <div className={s.reqSuccessTimestamp}>{timestamp}</div>

            <div className={s.reqSummaryCard}>
              <div className={s.reqSummaryLabel}>Your request</div>
              <div className={s.reqSummaryRow}>
                <span className={s.reqSumRowLabel}>Journey</span>
                <span>{journeyTitle}</span>
              </div>
              {category && (
                <div className={s.reqSummaryRow}>
                  <span className={s.reqSumRowLabel}>Category</span>
                  <span>{category}</span>
                </div>
              )}
              <p className={s.reqSummaryMsg}>{message}</p>
            </div>

            <p className={s.reqSofiaNote}>
              Sofia will review your request and follow up in Messages, usually within the hour on working days.
            </p>

            <div className={s.reqSuccessActions}>
              <Link href="/portal/messages" className={s.viewMsgsBtn} onClick={onClose}>
                View Messages
              </Link>
              <button className={s.returnBtn} onClick={onClose}>
                Return to Journey
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
