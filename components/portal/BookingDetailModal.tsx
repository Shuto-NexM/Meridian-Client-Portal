'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import s from './booking-detail.module.css';
import type { Booking, BookingAction } from '@/data/bookings-v2';

// ─── Type labels ──────────────────────────────────────────────────────────────
const TYPE_LABELS: Record<string, string> = {
  accommodation: 'Accommodation',
  flight:        'Flight',
  rail:          'Rail',
  transfer:      'Private Transfer',
  dining:        'Dining Reservation',
  experience:    'Experience',
  wellness:      'Wellness',
};

// ─── Status badge config ──────────────────────────────────────────────────────
function StatusBadge({ status }: { status: Booking['status'] }) {
  const cls = {
    confirmed: s.statusConfirmed,
    pending:   s.statusPending,
    updated:   s.statusUpdated,
    awaiting:  s.statusAwaiting,
    cancelled: s.statusCancelled,
  }[status] ?? s.statusAwaiting;

  const label = {
    confirmed: 'Confirmed',
    pending:   'Pending',
    updated:   'Updated',
    awaiting:  'Awaiting confirmation',
    cancelled: 'Cancelled',
  }[status] ?? status;

  return (
    <span className={`${s.statusBadge} ${cls}`}>
      <span className={s.statusDot} aria-hidden="true" />
      {label}
    </span>
  );
}

// ─── ICS calendar generation ──────────────────────────────────────────────────
function formatIcsDate(date: string, time: string, tz: string): string {
  return `TZID=${tz}:${date}T${time}00`;
}

function dtstampNow(): string {
  const d = new Date();
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

function generateICS(booking: Booking): string {
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Meridian Private Travel//Client Portal//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Meridian Travel',
    'BEGIN:VEVENT',
    `UID:${booking.id}@meridian-travel.com`,
    `DTSTAMP:${dtstampNow()}Z`,
  ];

  if (booking.calendarDate && booking.calendarStart) {
    const tz = booking.timezone ?? 'Europe/London';
    lines.push(`DTSTART;${formatIcsDate(booking.calendarDate, booking.calendarStart, tz)}`);
    if (booking.calendarEnd) {
      lines.push(`DTEND;${formatIcsDate(booking.calendarDate, booking.calendarEnd, tz)}`);
    }
  } else if (booking.calendarDate) {
    lines.push(`DTSTART;VALUE=DATE:${booking.calendarDate}`);
  }

  lines.push(`SUMMARY:${booking.title}`);

  if (booking.location) {
    lines.push(`LOCATION:${booking.location}`);
  }

  const desc = [
    booking.subtitle,
    booking.confirmationRef ? `Ref: ${booking.confirmationRef}` : null,
    booking.notes,
  ].filter(Boolean).join(' — ');
  if (desc) lines.push(`DESCRIPTION:${desc.replace(/\n/g, '\\n')}`);

  lines.push('END:VEVENT', 'END:VCALENDAR');
  return lines.join('\r\n');
}

function downloadICS(booking: Booking) {
  const content = generateICS(booking);
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `meridian-${booking.id}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ─── Icons ────────────────────────────────────────────────────────────────────
function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" aria-hidden="true">
      <path d="M2 2l10 10M12 2L2 12"/>
    </svg>
  );
}

function BackIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true">
      <path d="M6 2L3 5l3 3"/>
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#C8A96A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9h12M10 4l5 5-5 5"/>
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" aria-hidden="true">
      <rect x="1" y="2" width="9" height="8" rx=".5"/>
      <path d="M3.5 1v2M7.5 1v2M1 5h9"/>
    </svg>
  );
}

function DocIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" aria-hidden="true">
      <path d="M2 1h5l2 2v7H2V1z"/>
      <path d="M7 1v2h2M3.5 5.5h4M3.5 7.5h3"/>
    </svg>
  );
}

function MapIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" aria-hidden="true">
      <path d="M5.5 9.5C5.5 9.5 2 6.8 2 4.5a3.5 3.5 0 0 1 7 0C9 6.8 5.5 9.5 5.5 9.5z"/>
      <circle cx="5.5" cy="4.5" r="1.2"/>
    </svg>
  );
}

function MsgIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" aria-hidden="true">
      <path d="M9.5 7A1.5 1.5 0 0 1 8 8.5H3L1 10.5V2A1.5 1.5 0 0 1 2.5.5h6A1.5 1.5 0 0 1 10 2z"/>
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7.5 1.5l2 2L3 10H1V8L7.5 1.5z"/>
    </svg>
  );
}

// ─── Request-change form ───────────────────────────────────────────────────────
const CHANGE_CATEGORIES = [
  'Date or time',
  'Room or seat preference',
  'Dietary requirement',
  'Guest count',
  'Cancellation',
  'Special request',
  'Other',
] as const;

type ChangeCategory = typeof CHANGE_CATEGORIES[number] | '';

interface RequestFormProps {
  booking: Booking;
  onBack: () => void;
  onSubmit: () => void;
}

function RequestForm({ booking, onBack, onSubmit }: RequestFormProps) {
  const [category, setCategory] = useState<ChangeCategory>('');
  const [message, setMessage]   = useState('');
  const [error, setError]       = useState('');
  const textRef = useRef<HTMLTextAreaElement>(null);

  function handleSubmit() {
    if (!message.trim()) {
      setError('Please describe what you would like us to adjust.');
      textRef.current?.focus();
      return;
    }
    onSubmit();
  }

  return (
    <div className={s.requestView}>
      <button className={s.backNav} onClick={onBack} aria-label="Back to booking details">
        <BackIcon /> Back
      </button>

      <div className={s.requestEyebrow} style={{ marginTop: 18 }}>Request a Change</div>
      <div className={s.requestTitle}>{booking.title}</div>
      <div className={s.requestSub}>
        Describe what you would like Sofia to adjust. She will follow up in Messages.
      </div>

      <div className={s.fieldGroup}>
        <label className={s.fieldLabel} htmlFor="bm-category">
          Category <span className={s.fieldOptional}>(optional)</span>
        </label>
        <select
          id="bm-category"
          className={s.fieldSelect}
          value={category}
          onChange={e => setCategory(e.target.value as ChangeCategory)}
        >
          <option value="">Select a category…</option>
          {CHANGE_CATEGORIES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className={s.fieldGroup}>
        <label className={s.fieldLabel} htmlFor="bm-message">
          What would you like us to adjust?
        </label>
        <textarea
          id="bm-message"
          ref={textRef}
          className={`${s.fieldTextarea}${error ? ' ' + s.fieldTextareaError : ''}`}
          rows={5}
          placeholder="Describe the changes you have in mind…"
          value={message}
          onChange={e => { setMessage(e.target.value); if (error) setError(''); }}
        />
        {error && <div className={s.fieldError} role="alert">{error}</div>}
      </div>

      <div className={s.requestActions}>
        <button className={`${s.actionBtn} ${s.actionBtnPrimary}`} onClick={handleSubmit}>
          Send Request
        </button>
        <button className={`${s.actionBtn} ${s.actionBtnSecondary}`} onClick={onBack}>
          Cancel
        </button>
      </div>
    </div>
  );
}

// ─── Main modal ───────────────────────────────────────────────────────────────
interface Props {
  booking: Booking;
  onClose: () => void;
}

type SubView = null | 'request' | 'request-sent';

export default function BookingDetailModal({ booking, onClose }: Props) {
  const [subView, setSubView] = useState<SubView>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Focus close button on open
  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  // Escape to close (or go back from sub-view)
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        if (subView) setSubView(null);
        else onClose();
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose, subView]);

  // Body scroll lock
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  // Action handler
  function handleAction(action: BookingAction) {
    switch (action) {
      case 'add-to-calendar':
        downloadICS(booking);
        break;
      case 'view-location':
        // handled inline as <a> tag — nothing extra needed
        break;
      case 'request-change':
        setSubView('request');
        break;
      case 'message-sofia':
      case 'view-document':
        // handled as links
        break;
    }
  }

  const docHref = booking.relatedDocId
    ? `/portal/documents?open=${booking.relatedDocId}`
    : '/portal/documents';

  const mapHref = booking.mapQuery
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(booking.mapQuery)}`
    : null;

  // ── Render action button
  function renderAction(action: BookingAction, idx: number) {
    const isPrimary = idx === 0;
    const cls = isPrimary ? `${s.actionBtn} ${s.actionBtnPrimary}` : `${s.actionBtn} ${s.actionBtnSecondary}`;

    switch (action) {
      case 'view-document':
        return (
          <Link key={action} href={docHref} className={cls} onClick={onClose}>
            <DocIcon /> View Confirmation
          </Link>
        );
      case 'message-sofia':
        return (
          <Link key={action} href="/portal/messages" className={cls} onClick={onClose}>
            <MsgIcon /> Message Sofia
          </Link>
        );
      case 'request-change':
        return (
          <button key={action} className={cls} onClick={() => setSubView('request')}>
            <EditIcon /> Request a Change
          </button>
        );
      case 'add-to-calendar':
        return (
          <button key={action} className={cls} onClick={() => handleAction(action)}>
            <CalendarIcon /> Add to Calendar
          </button>
        );
      case 'view-location':
        if (!mapHref) return null;
        return (
          <a
            key={action}
            href={mapHref}
            target="_blank"
            rel="noopener noreferrer"
            className={cls}
            aria-label={`View location for ${booking.title} (opens in new tab)`}
          >
            <MapIcon /> View Location
          </a>
        );
      default:
        return null;
    }
  }

  // ── Main details view
  function renderMainView() {
    return (
      <div className={s.mainView}>
        {/* Core details grid */}
        {booking.details.length > 0 && (
          <div className={s.section}>
            <div className={s.sectionLabel}>Booking Details</div>
            <div className={s.detailsGrid}>
              {booking.details.map((row, i) => (
                <div key={i} className={`${s.detailItem}${row.span ? ' ' + s.span2 : ''}`}>
                  <span className={s.detailLabel}>{row.label}</span>
                  <span className={`${s.detailValue}${row.mono ? ' ' + s.mono : ''}`}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Inclusions */}
        {booking.inclusions && booking.inclusions.length > 0 && (
          <div className={s.section}>
            <div className={s.sectionLabel}>Inclusions</div>
            <div className={s.inclusionList}>
              {booking.inclusions.map((inc, i) => (
                <div key={i} className={s.inclusionItem}>
                  <span className={s.inclusionDot} aria-hidden="true" />
                  {inc}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* What to bring */}
        {booking.whatToBring && booking.whatToBring.length > 0 && (
          <div className={s.section}>
            <div className={s.sectionLabel}>What to Bring</div>
            <div className={s.inclusionList}>
              {booking.whatToBring.map((item, i) => (
                <div key={i} className={s.inclusionItem}>
                  <span className={s.inclusionDot} aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Operational notes */}
        {booking.notes && (
          <div className={s.section}>
            <div className={s.sectionLabel}>Notes</div>
            <p className={s.noteText}>{booking.notes}</p>
          </div>
        )}

        {/* Concierge note */}
        {booking.conciergeNote && (
          <div className={s.section}>
            <div className={s.conciergeNote}>
              <div className={s.conciergeNoteRow}>
                <span className={s.conciergeInitials} aria-hidden="true">SL</span>
                <span className={s.conciergeLabel}>Sofia's note</span>
              </div>
              <p className={s.conciergeText}>{booking.conciergeNote}</p>
            </div>
          </div>
        )}

        {/* Cancellation terms */}
        {booking.cancellationTerms && (
          <div className={s.section}>
            <div className={s.sectionLabel}>Cancellation</div>
            <div className={s.cancellationNote}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#9A9080" strokeWidth="1.2" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 1 }} aria-hidden="true">
                <circle cx="6" cy="6" r="4.5"/>
                <path d="M6 4v2.5M6 8.2v.2"/>
              </svg>
              {booking.cancellationTerms}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={s.overlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="bdm-title"
    >
      <div className={s.panel}>

        {/* ── Panel header ── */}
        <div className={s.panelHeader}>
          <div className={s.headerLeft}>
            <span className={s.eyebrow}>{TYPE_LABELS[booking.type] ?? booking.type}</span>
            <StatusBadge status={booking.status} />
          </div>
          <button
            ref={closeRef}
            className={s.closeBtn}
            onClick={onClose}
            aria-label="Close booking details"
          >
            <CloseIcon />
          </button>
        </div>

        {/* ── Title block (always visible) ── */}
        {subView === null && (
          <div className={s.titleBlock}>
            <div className={s.title} id="bdm-title">{booking.title}</div>
            {booking.subtitle && <div className={s.subtitle}>{booking.subtitle}</div>}
          </div>
        )}

        {/* ── Scrollable body ── */}
        <div className={s.panelBody}>
          {subView === null && renderMainView()}

          {subView === 'request' && (
            <RequestForm
              booking={booking}
              onBack={() => setSubView(null)}
              onSubmit={() => setSubView('request-sent')}
            />
          )}

          {subView === 'request-sent' && (
            <div className={s.successView}>
              <div className={s.successIcon}><SendIcon /></div>
              <div className={s.successTitle} id="bdm-title">Request sent</div>
              <div className={s.successSub}>
                Sofia has received your change request for <strong>{booking.title}</strong>. She will follow up in Messages, usually within the hour on working days.
              </div>
              <div className={s.successActions}>
                <Link
                  href="/portal/messages"
                  className={`${s.actionBtn} ${s.actionBtnPrimary}`}
                  onClick={onClose}
                >
                  View Messages
                </Link>
                <button
                  className={`${s.actionBtn} ${s.actionBtnSecondary}`}
                  onClick={() => setSubView(null)}
                >
                  Return to Booking
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Actions footer (main view only) ── */}
        {subView === null && booking.actions.length > 0 && (
          <div className={s.actionsFooter}>
            {booking.actions.map((action, idx) => renderAction(action, idx))}
          </div>
        )}
      </div>
    </div>
  );
}
