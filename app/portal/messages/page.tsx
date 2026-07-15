'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import s from './messages.module.css';
import { MESSAGES, CONCIERGE, ACTIVE_JOURNEY } from '@/data/portal';

function ArrowSm({ stroke = '#1A1510' }: { stroke?: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5" />
    </svg>
  );
}

function DocFileIcon({ stroke = '#7A9A8A' }: { stroke?: string }) {
  return (
    <svg width="20" height="24" viewBox="0 0 20 24" fill="none" stroke={stroke} strokeWidth="1.1">
      <path d="M3 1h10l5 5v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
      <path d="M13 1v5h5" />
      <rect x="4" y="11" width="12" height="1" fill={stroke} stroke="none" />
      <rect x="4" y="14" width="9" height="1" fill={stroke} stroke="none" />
    </svg>
  );
}

function PdfFileIcon() {
  return (
    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" stroke="#9A8AB0" strokeWidth="1.1">
      <path d="M2 1h8l4 4v13a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
      <path d="M10 1v4h4" />
      <rect x="3" y="10" width="10" height="1" fill="#9A8AB0" stroke="none" rx="0.3" />
      <rect x="3" y="13" width="7" height="1" fill="#9A8AB0" stroke="none" rx="0.3" />
    </svg>
  );
}

function ImgPlaceholderIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#B0A898" strokeWidth="1.1">
      <rect x="2" y="2" width="24" height="24" rx="1" />
      <circle cx="9" cy="9" r="2.5" />
      <path d="M2 19l7-7 5 5 3-3 9 9" />
    </svg>
  );
}

const QUICK_REPLIES = [
  { label: 'Request itinerary update', text: "I'd like to request an update to the itinerary. Could you please review the following days and let me know what adjustments are possible?" },
  { label: 'Ask about dining',         text: "I have a question about the dining arrangements. Could you tell me more about the restaurant selections for the Tokyo evenings?" },
  { label: 'Flight question',          text: "I have a question about the flight details. Could you confirm the departure time and any arrangements for the connection?" },
  { label: 'General enquiry',          text: "I'd like to discuss something when you have a moment." },
];

export default function MessagesPage() {
  const [activeId, setActiveId] = useState(MESSAGES[0].id);
  const [search, setSearch] = useState('');
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  const active = MESSAGES.find(m => m.id === activeId) ?? MESSAGES[0];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeId]);

  return (
    <div className={s.page}>

      {/* ── Conversation list ───────────────────────────────────────────────── */}
      <div className={s.convList}>
        <div className={s.listHeader}>
          <div className={s.listDate}>Monday, 14 July 2026</div>
          <h1 className={s.listTitle}>Messages</h1>
          <div className={s.searchWrap}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#9A9080" strokeWidth="1.2">
              <circle cx="5" cy="5" r="3.5" /><path d="M8 8l2.5 2.5" />
            </svg>
            <input
              className={s.searchInput}
              type="search"
              aria-label="Search conversations"
              placeholder="Search conversations..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className={s.convCards}>
          {/* Sofia card (active) */}
          <button
            className={`${s.convCard} ${activeId === 'm1' ? s.convCardActive : ''}`}
            onClick={() => setActiveId('m1')}
          >
            {activeId === 'm1' && <div className={s.convActiveBorder} />}
            <div className={s.convAvatarSofia}>SL</div>
            <div className={s.convBody}>
              <div className={s.convTop}>
                <span className={s.convFrom}>Sofia Laurent</span>
                <span className={s.convTime}>12:10</span>
              </div>
              <div className={s.convPreview}>Your revised Travel Book is ready — Kyoto now begins with Nanzen-ji.</div>
              <div className={s.unreadBadge}>1 unread</div>
            </div>
          </button>

          {/* Meridian Team */}
          <button
            className={`${s.convCard} ${activeId === 'm2' ? s.convCardActive : ''}`}
            onClick={() => setActiveId('m2')}
          >
            {activeId === 'm2' && <div className={s.convActiveBorder} />}
            <div className={s.convAvatarTeam}>M</div>
            <div className={s.convBody}>
              <div className={s.convTop}>
                <span className={s.convFromMuted}>Meridian Team</span>
                <span className={s.convTime}>3 Jul</span>
              </div>
              <div className={s.convPreviewMuted}>Welcome to your Client Portal...</div>
            </div>
          </button>

          {/* Journey Updates */}
          <button className={s.convCard}>
            <div className={s.convAvatarUpdates}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#5A5040" strokeWidth="1.1">
                <circle cx="7" cy="7" r="5.5" /><path d="M7 3.5v4l2.5 1.5" />
              </svg>
            </div>
            <div className={s.convBody}>
              <div className={s.convTop}>
                <span className={s.convFromMuted}>Journey Updates</span>
                <span className={s.convTime}>10 Jul</span>
              </div>
              <div className={s.convPreviewMuted}>Your Travel Book has been updated</div>
            </div>
          </button>
        </div>
      </div>

      {/* ── Main conversation ───────────────────────────────────────────────── */}
      <div className={s.conversation}>

        {/* Header */}
        <div className={s.convHeader}>
          <div className={s.convHeaderLeft}>
            <div className={s.convAvatarLg}>SL</div>
            <div>
              <div className={s.convName}>Sofia Laurent</div>
              <div className={s.convMeta}>
                <span className={s.convRole}>Private Travel Concierge</span>
                <span className={s.convDot}>·</span>
                <span className={s.convAvail}>
                  <span className={s.convAvailDot} />
                  Available now
                </span>
                <span className={s.convDot}>·</span>
                <span className={s.convReviewed}>Personally reviewed</span>
              </div>
            </div>
          </div>
          <div className={s.journeyChip}>
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="#9A9080" strokeWidth="1.1">
              <circle cx="7" cy="7" r="5.5" />
              <path d="M7 1.5v11M1.5 7h11" />
              <path d="M3 3.5C4.5 5 9.5 5 11 3.5M3 10.5C4.5 9 9.5 9 11 10.5" />
            </svg>
            <span>Japan · 12 Nights</span>
          </div>
        </div>

        {/* Messages scroll */}
        <div className={s.msgScroll}>
          {(() => {
            const items: React.ReactElement[] = [];
            let lastDate = '';
            active.thread.forEach((msg, i) => {
              if (msg.date !== lastDate) {
                lastDate = msg.date;
                items.push(
                  <div key={`date-${i}`} className={s.dateDivider}>
                    <span className={s.dateLine} />
                    <span className={s.dateLabel}>{msg.date}</span>
                    <span className={s.dateLine} />
                  </div>
                );
              }

              const paras = (msg as any).paragraphs as string[] | undefined;

              if (msg.role === 'sofia') {
                items.push(
                  <div key={i} className={s.msgSofia}>
                    <div className={s.msgMeta}>
                      <span className={s.msgSender}>Sofia Laurent</span>
                      <span className={s.msgTime}>{msg.time}</span>
                      {(msg as any).badge && (
                        <span className={s.newBadge}>{(msg as any).badge}</span>
                      )}
                    </div>
                    <div className={s.bubbleSofia}>
                      {(paras ?? [msg.text]).map((p, pi) => (
                        <p key={pi} className={`${s.bubbleText} ${pi > 0 ? s.bubbleTextP2 : ''}`}>{p}</p>
                      ))}

                      {/* Image attachment */}
                      {(msg as any).imageAttachment !== false && i === 2 && (
                        <div className={s.imgAttach}>
                          <div className={s.imgPlaceholder}><ImgPlaceholderIcon /></div>
                          <div className={s.imgCaption}>
                            <span className={s.imgCaptionText}>Nanzen-ji, before dawn</span>
                            <span className={s.imgView}>View</span>
                          </div>
                        </div>
                      )}

                      {/* PDF attachment */}
                      {(msg as any).attachment && (
                        <div className={s.pdfAttach}>
                          <div className={s.pdfIcon}><PdfFileIcon /></div>
                          <div className={s.pdfBody}>
                            <div className={s.pdfName}>{(msg as any).attachment.name}</div>
                            <div className={s.pdfMeta}>PDF · {(msg as any).attachment.size} · Personally selected</div>
                          </div>
                          <ArrowSm stroke="#9A9080" />
                        </div>
                      )}

                      {/* Journey update card */}
                      {(msg as any).journeyUpdate && (() => {
                        const ju = (msg as any).journeyUpdate;
                        return (
                          <div className={s.juCard}>
                            <div className={s.juCardTop}>
                              <span className={s.juEyebrow}>Journey Update</span>
                              <span className={s.juBadge}>Proposed</span>
                            </div>
                            <div className={s.juTitle}>{ju.title}</div>
                            <div className={s.juDate}>Wed 16 Sep · Kyoto</div>
                            <div className={s.juDetail}>Morning programme revised. Nanzen-ji at dawn replaces Kinkaku-ji. Okutan breakfast confirmed at 7:30.</div>
                            <Link href="/portal/journeys/japan/workspace" className={s.juCta}>
                              Review in Workspace <ArrowSm />
                            </Link>
                          </div>
                        );
                      })()}

                      {/* Shared doc card */}
                      {(msg as any).docCard && (() => {
                        const dc = (msg as any).docCard;
                        return (
                          <div className={s.docCard}>
                            <div className={s.docCardTop}>
                              <DocFileIcon />
                              <div className={s.docCardInfo}>
                                <div className={s.docCardName}>{dc.name}</div>
                                <div className={s.docCardMeta}>Itinerary · Updated {dc.updated} · Personally reviewed</div>
                              </div>
                            </div>
                            <div className={s.docCardBottom}>
                              <Link href="/portal/documents" className={s.docCardCta}>
                                Open in Documents <ArrowSm />
                              </Link>
                              <span className={s.docCardReviewed}>Personally reviewed by Sofia</span>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                );
              } else {
                items.push(
                  <div key={i} className={s.msgUser}>
                    <div className={s.msgMetaUser}>
                      <span className={s.msgTime}>{msg.time}</span>
                      <span className={s.msgSender}>You</span>
                    </div>
                    <div className={s.bubbleUser}>
                      <p className={s.bubbleText}>{msg.text}</p>
                    </div>
                  </div>
                );
              }
            });
            return items;
          })()}
          <div ref={bottomRef} />
        </div>

        {/* Quick replies */}
        <div className={s.quickReplies}>
          {QUICK_REPLIES.map(q => (
            <button key={q.label} className={s.quickBtn} onClick={() => setInput(q.text)}>
              {q.label}
            </button>
          ))}
        </div>

        {/* Compose */}
        <div className={s.compose}>
          <textarea
            className={s.composeInput}
            rows={3}
            aria-label="Compose message"
            placeholder="Write your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <div className={s.composeRow}>
            <button className={s.attachBtn} title="Attach">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#6A6050" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13.5 7.5L7 14a4 4 0 0 1-5.657-5.657L8.5 1.5a2.5 2.5 0 0 1 3.536 3.536L4.879 12.18a1 1 0 0 1-1.415-1.414L10.5 3.5" />
              </svg>
            </button>
            <button
              className={s.sendBtn}
              onClick={() => setInput('')}
            >
              <span>Send</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#F4EFE8" strokeWidth="1.3" strokeLinecap="round">
                <path d="M1.5 6h9M7.5 3.5L10 6l-2.5 2.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Right info sidebar ──────────────────────────────────────────────── */}
      <aside className={s.rightPane}>
        {/* Journey card (dark) */}
        <div className={s.rJourneyCard}>
          <div className={s.rJEyebrow}>Current Journey</div>
          <div className={s.rJTitle}>Japan</div>
          <div className={s.rJNights}>12 Nights</div>
          <div className={s.rJDeparture}>
            <div className={s.rJDepLabel}>Departure</div>
            <div className={s.rJDepCount}>
              <span className={s.rJDays}>{ACTIVE_JOURNEY.daysUntil}</span>
              <span className={s.rJDaysLabel}>days</span>
            </div>
            <div className={s.rJDepDate}>{ACTIVE_JOURNEY.startDate}</div>
          </div>
        </div>

        {/* Quick Access */}
        <div className={s.rSection}>
          <div className={s.rSectionLabel}>Quick Access</div>
          <div className={s.rLinks}>
            {[
              { label: 'Open Documents',    href: '/portal/documents' },
              { label: 'Journey Workspace', href: '/portal/journeys/japan/workspace' },
              { label: 'Emergency Contacts', href: '/portal/messages' },
            ].map((lk, i, arr) => (
              <Link key={lk.label} href={lk.href} className={`${s.rLink} ${i < arr.length - 1 ? s.rLinkBorder : ''}`}>
                <span>{lk.label}</span>
                <ArrowSm stroke="#C8B89A" />
              </Link>
            ))}
          </div>
        </div>

        {/* Concierge */}
        <div className={s.rSection}>
          <div className={s.rSectionLabel}>Your Concierge</div>
          <div className={s.rConcName}>{CONCIERGE.name}</div>
          <div className={s.rConcRole}>{CONCIERGE.role}</div>
          <p className={s.rConcNote}>{CONCIERGE.note}</p>
        </div>

        {/* Response time */}
        <div className={s.rSection}>
          <div className={s.rSectionLabel}>Response time</div>
          <p className={s.rRespText}>{CONCIERGE.responseTime}</p>
          <div className={s.urgentCard}>
            <div className={s.urgentLabel}>Urgent contact</div>
            <p className={s.urgentText}>Meridian 24h line is available for time-sensitive matters during your journey.</p>
          </div>
        </div>
      </aside>

    </div>
  );
}
