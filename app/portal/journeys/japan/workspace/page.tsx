'use client';
import { useState, useCallback } from 'react';
import Link from 'next/link';
import styles from './workspace.module.css';
import { ACTIVE_JOURNEY, STAGE_LABELS } from '@/data/portal';
import { useJourneyCtx } from '@/context/JourneyContext';
import JourneyReview from '@/components/portal/JourneyReview';
import BookingDetailModal from '@/components/portal/BookingDetailModal';
import { getBooking } from '@/data/bookings-v2';

// ─── Types ────────────────────────────────────────────────────────────────────
interface HighlightItem {
  text: string;
  bookingId?: string;
}

interface ItineraryDay {
  id: string;
  dest: string;
  days: string;
  nights: number;
  accommodation: string;
  accommodationBookingId: string;
  highlights: HighlightItem[];
  description: string;
  notes?: string;
  pending?: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const ITINERARY: ItineraryDay[] = [
  {
    id: 'd1',
    dest: 'Tokyo',
    days: '12–15 Sep',
    nights: 3,
    accommodation: 'Park Hyatt Tokyo',
    accommodationBookingId: 'japan-hotel-tokyo',
    highlights: [
      { text: 'BA 4 · LHR–NRT · 12 Sep · Business Class',            bookingId: 'japan-flight-out'       },
      { text: 'Private transfer · NRT Arrivals → Park Hyatt',         bookingId: 'japan-transfer-arr'     },
      { text: 'Tsukiji Outer Market · Private early access · 06:00',  bookingId: 'japan-exp-tsukiji'      },
      { text: 'teamLab Planets · Private after-hours · 21:00',        bookingId: 'japan-exp-teamlab'      },
      { text: 'Yanaka neighbourhood walk · Local guide · 10:00',      bookingId: 'japan-exp-yanaka'       },
      { text: 'Ikebana class · Studio Wakou · 14 Sep · 14:00',        bookingId: 'japan-wellness-ikebana' },
      { text: 'Dinner at Den · 13 Sep · 20:00',                       bookingId: 'japan-dining-den'       },
      { text: 'Dinner at Narisawa · 14 Sep · 19:30',                  bookingId: 'japan-dining-narisawa'  },
    ],
    description:
      'Three nights in Shinjuku, high above the city. Tokyo rewards patience — the pace is fast, but the details that matter are quiet ones. Time here to settle before Kyoto.',
  },
  {
    id: 'd2',
    dest: 'Kyoto',
    days: '15–20 Sep',
    nights: 5,
    accommodation: 'Aman Kyoto',
    accommodationBookingId: 'japan-hotel-kyoto',
    highlights: [
      { text: 'Nozomi 9 Shinkansen · Tokyo–Kyoto · 09:30',           bookingId: 'japan-transfer-shinkansen' },
      { text: 'Nanzen-ji at dawn · Private access · 16 Sep · 06:00', bookingId: 'japan-exp-nanzenji'        },
      { text: 'Okutan tofu breakfast · 16 Sep · 07:30',              bookingId: 'japan-dining-okutan'       },
      { text: 'Private Tea Ceremony · Urasenke · 16 Sep · 15:00',    bookingId: 'japan-wellness-tea'        },
      { text: 'Kinkaku-ji · 17 Sep afternoon',                       bookingId: 'japan-exp-kinkakuji'      },
      { text: 'Kikunoi Honten · 17 Sep · 19:00',                     bookingId: 'japan-dining-kikunoi'     },
      { text: 'Guided forest walk · Aman grounds · 18 Sep · 07:00',  bookingId: 'japan-wellness-forest'    },
      { text: 'Arashiyama bamboo · Dusk walk · 18 Sep · 17:00',      bookingId: 'japan-exp-arashiyama'    },
    ],
    description:
      "Five nights in Aman Kyoto's forest garden, north of the city. The property sits within a cedar and moss landscape — it doesn't feel like a hotel so much as a place apart.",
    notes: 'Morning programme revised 14 Jul — Nanzen-ji at dawn now opens Wednesday. Kinkaku-ji moved to Thursday afternoon.',
  },
  {
    id: 'd3',
    dest: 'Hakone',
    days: '20–24 Sep',
    nights: 4,
    accommodation: 'Gōra Kadan',
    accommodationBookingId: 'japan-ryokan-hakone',
    highlights: [
      { text: 'Private car · Kyoto → Hakone · 20 Sep · 10:00',           bookingId: 'japan-transfer-kyt-hk' },
      { text: 'Hakone Open-Air Museum' },
      { text: 'Fuji viewing from Lake Ashi · 22 Sep',                    bookingId: 'japan-exp-fuji'         },
      { text: 'Private outdoor onsen · Gōra Kadan · 22 Sep · 18:00',     bookingId: 'japan-wellness-onsen'   },
      { text: 'Kaiseki dinner · Ryokan kitchen each evening' },
      { text: 'BA 5 · NRT–LHR · 24 Sep · Business Class',               bookingId: 'japan-flight-ret'       },
      { text: 'Private transfer · Gōra Kadan → NRT · 06:30',            bookingId: 'japan-transfer-dep'     },
    ],
    description:
      "The Kanagawa mountains in autumn. Gōra Kadan is a former imperial villa turned ryokan — unhurried, precise, and very quiet. Four nights before the flight home.",
    pending: 'Gōra Kadan reservation confirmation expected by 18 Jul.',
  },
];

const SOFIA_NOTES = [
  "I've moved Nanzen-ji to Wednesday morning and held Kinkaku-ji for Thursday afternoon — the light there is better after 3pm in September.",
  "Gōra Kadan confirmation is expected by 18 July. I'll update the itinerary the moment it comes through.",
  "Tokyo dining: Den on the 12th and Narisawa on the 14th are both provisionally held. I'm working on a third evening — will confirm by end of week.",
];

const STAGE_BADGE_CLASS: Record<string, string> = {
  'in-review': 'badgeGold',
  'approved': 'badgeGreen',
  'changes-requested': 'badgeMuted',
};

const STAGE_BADGE_LABEL: Record<string, string> = {
  'in-review': 'In Review',
  'approved': 'Approved',
  'changes-requested': 'Changes Requested',
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function JapanWorkspacePage() {
  const [expandedDay, setExpandedDay]         = useState<string | null>('d2');
  const [activeTab, setActiveTab]             = useState<'itinerary' | 'notes' | 'sofia'>(() => {
    if (typeof window === 'undefined') return 'itinerary';
    const p = new URLSearchParams(window.location.search).get('tab');
    return (p === 'notes' || p === 'sofia') ? p : 'itinerary';
  });
  const [showReview, setShowReview]           = useState(false);
  const [viewingBookingId, setViewingBookingId] = useState<string | null>(null);

  const { japanStage, approveJapan, requestJapanChanges } = useJourneyCtx();

  const handleApprove = useCallback(() => { approveJapan(); }, [approveJapan]);

  const handleRequestChanges = useCallback(({ category, message }: { category: string; message: string }) => {
    requestJapanChanges({
      journeyTitle: 'Japan',
      category,
      message,
      time: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    });
  }, [requestJapanChanges]);

  const stageLabel = STAGE_BADGE_LABEL[japanStage] ?? STAGE_LABELS[ACTIVE_JOURNEY.stage];
  const stageBadge = STAGE_BADGE_CLASS[japanStage] ?? 'badgeGold';

  const viewingBooking = viewingBookingId ? getBooking(viewingBookingId) ?? null : null;

  return (
    <>
      {/* Workspace header */}
      <div className={styles.wsHeader}>
        <div className={styles.wsHeaderLeft}>
          <Link href="/portal/journeys" className={styles.backLink}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
              <path d="M6 2L3 5l3 3"/>
            </svg>
            My Journeys
          </Link>
          <div className={styles.wsTitle}>
            <span className={styles.wsKanji}>日本</span>
            <div>
              <h1 className={styles.wsName}>Japan</h1>
              <div className={styles.wsMeta}>{ACTIVE_JOURNEY.nights} Nights · {ACTIVE_JOURNEY.destinations.join(' · ')} · 12–24 Sep 2026</div>
            </div>
          </div>
        </div>
        <div className={styles.wsHeaderRight}>
          <span className={`badge ${stageBadge}`}>{stageLabel}</span>
        </div>
      </div>

      <div className={styles.wsBody}>
        {/* Left: Itinerary */}
        <div className={styles.itineraryCol}>
          {/* Tab nav */}
          <div className={styles.tabBar}>
            {(['itinerary', 'notes', 'sofia'] as const).map(t => (
              <button
                key={t}
                className={`${styles.tabBtn}${activeTab === t ? ' ' + styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab(t)}
              >
                {t === 'itinerary' ? 'Itinerary' : t === 'notes' ? 'Your Notes' : "Sofia's Notes"}
              </button>
            ))}
          </div>

          {activeTab === 'itinerary' && (
            <div className={styles.daysList}>
              {ITINERARY.map((day) => (
                <div
                  key={day.id}
                  className={`${styles.dayCard}${expandedDay === day.id ? ' ' + styles.dayCardExpanded : ''}`}
                >
                  <button
                    className={styles.dayHeader}
                    onClick={() => setExpandedDay(expandedDay === day.id ? null : day.id)}
                    aria-expanded={expandedDay === day.id}
                  >
                    <div className={styles.dayLeft}>
                      <div className={styles.dayDest}>{day.dest}</div>
                      <div className={styles.dayMeta}>{day.days} · {day.nights} nights · {day.accommodation}</div>
                    </div>
                    <div className={styles.dayRight}>
                      {day.notes && <span className="badge badgeGold">Updated</span>}
                      {day.pending && <span className="badge badgeMuted">Pending</span>}
                      <svg className={`${styles.dayChevron}${expandedDay === day.id ? ' ' + styles.dayChevronOpen : ''}`} width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M2 4l4 4 4-4"/>
                      </svg>
                    </div>
                  </button>

                  {expandedDay === day.id && (
                    <div className={styles.dayBody}>
                      <p className={styles.dayDescription}>{day.description}</p>

                      {day.notes && (
                        <div className={styles.dayNotice}>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#C8A96A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0,marginTop:1}} aria-hidden="true">
                            <path d="M8.5 1.5l2 2L4 10H2v-2L8.5 1.5z"/>
                          </svg>
                          {day.notes}
                        </div>
                      )}

                      {day.pending && (
                        <div className={`${styles.dayNotice} ${styles.dayNoticePending}`}>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#D49B50" strokeWidth="1.2" strokeLinecap="round" style={{flexShrink:0,marginTop:1}} aria-hidden="true">
                            <circle cx="6" cy="6" r="4.5"/>
                            <path d="M6 4v2.5M6 8.5v.2"/>
                          </svg>
                          {day.pending}
                        </div>
                      )}

                      {/* Accommodation quick link */}
                      <div className={styles.accommodationBar}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#9A9080" strokeWidth="1.1" strokeLinecap="round" aria-hidden="true">
                          <path d="M2 11V5.5L6 3l4 2.5V11"/>
                          <rect x="4.5" y="7" width="3" height="4"/>
                        </svg>
                        <span className={styles.accommodationName}>{day.accommodation}</span>
                        <button
                          className={styles.accommodationLink}
                          onClick={() => setViewingBookingId(day.accommodationBookingId)}
                          aria-label={`View details for ${day.accommodation}`}
                        >
                          View details
                          <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" aria-hidden="true">
                            <path d="M1.5 4.5h6M4.5 2L7 4.5 4.5 7"/>
                          </svg>
                        </button>
                      </div>

                      {/* Highlights */}
                      <div className={styles.highlights}>
                        <div className={styles.highlightsLabel}>Programme</div>
                        {day.highlights.map((h, i) => (
                          h.bookingId ? (
                            <button
                              key={i}
                              type="button"
                              className={styles.highlightRowBtn}
                              onClick={() => setViewingBookingId(h.bookingId!)}
                              aria-label={`View details: ${h.text}`}
                            >
                              <span className={styles.highlightDot} aria-hidden="true" />
                              <span className={styles.highlightText}>{h.text}</span>
                              <svg className={styles.highlightArrow} width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" aria-hidden="true">
                                <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5"/>
                              </svg>
                            </button>
                          ) : (
                            <div key={i} className={styles.highlightRow}>
                              <span className={styles.highlightDot} aria-hidden="true" />
                              {h.text}
                            </div>
                          )
                        ))}
                      </div>

                      <div className={styles.dayActions}>
                        <button className={styles.dayActionBtn}>Add a note</button>
                        <button className={styles.dayActionBtn}>Mark as favourite</button>
                        <button
                          className={styles.dayActionBtn}
                          onClick={() => setShowReview(true)}
                          disabled={japanStage !== 'in-review'}
                        >
                          Request change
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'notes' && (
            <div className={styles.notesArea}>
              <div className={styles.emptyNotes}>
                <div className={styles.emptyTitle}>Your personal notes</div>
                <p className={styles.emptyText}>Add notes, preferences, or questions to any day in the itinerary. Sofia will see them when preparing your journey.</p>
              </div>
              <textarea className={styles.noteInput} placeholder="Write a note for this journey…" rows={6} />
              <button className={styles.saveNoteBtn}>Save note</button>
            </div>
          )}

          {activeTab === 'sofia' && (
            <div className={styles.sofiaNotes}>
              <div className={styles.sofiaHeader}>
                <div className={styles.sofiaAvatar}>SL</div>
                <div>
                  <div className={styles.sofiaName}>Sofia Laurent</div>
                  <div className={styles.sofiaRole}>Private Travel Concierge</div>
                </div>
              </div>
              {SOFIA_NOTES.map((note, i) => (
                <div key={i} className={styles.sofiaNote}>
                  <div className={styles.sofiaNoteDot} />
                  <p className={styles.sofiaNoteTxt}>{note}</p>
                </div>
              ))}
              <Link href="/portal/messages" className={styles.replyBtn}>Reply to Sofia</Link>
            </div>
          )}
        </div>

        {/* Right: Summary panel */}
        <aside className={styles.summaryPanel}>

          {japanStage === 'in-review' && (
            <div className={`${styles.panelCard} ${styles.reviewCard}`}>
              <div className={styles.panelLabel}>Journey Review</div>
              <p className={styles.reviewText}>
                Your Japan proposal is ready for review. Approve to proceed with confirmed bookings, or request any adjustments.
              </p>
              <button className={styles.reviewOpenBtn} onClick={() => setShowReview(true)}>
                Review Proposal
              </button>
            </div>
          )}

          {japanStage === 'changes-requested' && (
            <div className={`${styles.panelCard} ${styles.changesCard}`}>
              <div className={styles.panelLabel}>Journey Review</div>
              <div className={styles.changesBadgeRow}>
                <span className="badge badgeMuted">Changes Requested</span>
              </div>
              <p className={styles.reviewText}>
                Your change request has been sent to Sofia. She will follow up in Messages.
              </p>
              <Link href="/portal/messages" className={styles.reviewMsgLink}>
                View in Messages
              </Link>
            </div>
          )}

          {japanStage === 'approved' && (
            <div className={`${styles.panelCard} ${styles.approvedCard}`}>
              <div className={styles.panelLabel}>Journey Review</div>
              <div className={styles.approvedRow}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#7AB87A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M2.5 7.5l3.5 3.5L11.5 4" />
                </svg>
                <span className={styles.approvedText}>Approved by you</span>
              </div>
              <p className={styles.reviewText}>
                Sofia is now confirming bookings and will send updates in Messages and Documents.
              </p>
            </div>
          )}

          <div className={styles.panelCard}>
            <div className={styles.panelLabel}>Journey Summary</div>
            <div className={styles.panelStat}>
              <span className={styles.panelStatNum}>{ACTIVE_JOURNEY.nights}</span>
              <span className={styles.panelStatUnit}>nights</span>
            </div>
            <div className={styles.panelDests}>
              {ACTIVE_JOURNEY.destinations.map(d => (
                <div key={d} className={styles.panelDest}>
                  <span className={styles.panelDestDot} />
                  {d}
                </div>
              ))}
            </div>
            <div className={styles.panelDeparture}>
              <span className={styles.panelDepartNum}>{ACTIVE_JOURNEY.daysUntil}</span>
              <div>
                <div className={styles.panelDepartLabel}>days until departure</div>
                <div className={styles.panelDepartDate}>{ACTIVE_JOURNEY.startDate}</div>
              </div>
            </div>
          </div>

          <div className={styles.panelCard}>
            <div className={styles.panelLabel}>Your Concierge</div>
            <div className={styles.conciergeRow}>
              <div className={styles.concAvatar}>SL</div>
              <div>
                <div className={styles.concName}>Sofia Laurent</div>
                <div className={styles.concStatus}>Available now</div>
              </div>
            </div>
            <Link href="/portal/messages" className={styles.msgBtn}>Send a message</Link>
          </div>

          <div className={styles.panelCard}>
            <div className={styles.panelLabel}>Quick Links</div>
            <div className={styles.quickLinks}>
              <Link href="/portal/documents?open=1" className={styles.quickLink}>
                <span>Travel Book</span>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" aria-hidden="true">
                  <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5"/>
                </svg>
              </Link>
              <Link href="/portal/payments" className={styles.quickLink}>
                <span>Payments</span>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" aria-hidden="true">
                  <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5"/>
                </svg>
              </Link>
              <Link href="/portal/travellers" className={styles.quickLink}>
                <span>Travellers</span>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" aria-hidden="true">
                  <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5"/>
                </svg>
              </Link>
              <Link href="/portal/documents?open=9" className={styles.quickLink}>
                <span>Emergency contacts</span>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" aria-hidden="true">
                  <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5"/>
                </svg>
              </Link>
              {/* Outbound flight quick link */}
              <button
                className={styles.quickLink}
                onClick={() => setViewingBookingId('japan-flight-out')}
                aria-label="View outbound flight details"
              >
                <span>Outbound flight · BA 4</span>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" aria-hidden="true">
                  <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5"/>
                </svg>
              </button>
            </div>
          </div>

          <Link href="/portal" className={styles.backToDashBtn}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" aria-hidden="true">
              <path d="M6 2L3 5l3 3"/>
            </svg>
            Back to Dashboard
          </Link>
        </aside>
      </div>

      {/* Journey Review overlay */}
      {showReview && (
        <JourneyReview
          journeyTitle="Japan"
          journeySubtitle="Autumn 2026 · Tokyo, Kyoto, Hakone"
          nights={ACTIVE_JOURNEY.nights}
          destinations={ACTIVE_JOURNEY.destinations}
          lastUpdated="14 Jul 2026"
          version="2.1"
          onClose={() => setShowReview(false)}
          onApprove={handleApprove}
          onRequestChanges={handleRequestChanges}
        />
      )}

      {/* Booking Detail Modal */}
      {viewingBooking && (
        <BookingDetailModal
          booking={viewingBooking}
          onClose={() => setViewingBookingId(null)}
        />
      )}
    </>
  );
}
