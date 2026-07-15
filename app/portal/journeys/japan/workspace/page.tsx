'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './workspace.module.css';
import { ACTIVE_JOURNEY, STAGE_LABELS } from '@/data/portal';

const ITINERARY = [
  {
    id: 'd1', dest: 'Tokyo', days: '12–15 Sep', nights: 3,
    accommodation: 'Park Hyatt Tokyo',
    highlights: ['Tsukiji Outer Market (private, before opening)', 'TeamLab Planets · Toyosu', 'Yanaka neighbourhood walk with local guide', 'Dinner at Den or Narisawa · TBC'],
    description: 'Three nights in Shinjuku, high above the city. Tokyo rewards patience — the pace is fast, but the details that matter are quiet ones. Time here to settle before Kyoto.',
  },
  {
    id: 'd2', dest: 'Kyoto', days: '15–20 Sep', nights: 5,
    accommodation: 'Aman Kyoto',
    highlights: ['Nanzen-ji at dawn · Wed 16 Sep', 'Okutan tofu breakfast · 7:30 reservation', 'Private Tea Ceremony · Urasenke', 'Kinkaku-ji · Thu 17 Sep afternoon', 'Arashiyama bamboo · dusk walk'],
    description: "Five nights in Aman Kyoto's forest garden, north of the city. The property sits within a cedar and moss landscape — it doesn't feel like a hotel so much as a place apart.",
    notes: 'Morning programme revised 14 Jul — Nanzen-ji at dawn now opens Wednesday. Kinkaku-ji moved to Thursday afternoon.',
  },
  {
    id: 'd3', dest: 'Hakone', days: '20–24 Sep', nights: 4,
    accommodation: 'Gōra Kadan',
    highlights: ['Hakone Open-Air Museum', 'Fuji viewing from Lake Ashi · weather permitting', 'Private onsen at Gōra Kadan', 'Kaiseki dinner · ryokan kitchen'],
    description: "The Kanagawa mountains in autumn. Gōra Kadan is a former imperial villa turned ryokan — unhurried, precise, and very quiet. Four nights before the flight home.",
    pending: 'Gōra Kadan reservation confirmation expected by 18 Jul.',
  },
];

const SOFIA_NOTES = [
  "I've moved Nanzen-ji to Wednesday morning and held Kinkaku-ji for Thursday afternoon — the light there is better after 3pm in September.",
  "Gōra Kadan confirmation is expected by 18 July. I'll update the itinerary the moment it comes through.",
  "Tokyo dining: Den on the 12th and Narisawa on the 14th are both provisionally held. I'm working on a third evening — will confirm by end of week.",
];

export default function JapanWorkspacePage() {
  const [expandedDay, setExpandedDay] = useState<string | null>('d2');
  const [activeTab, setActiveTab] = useState<'itinerary' | 'notes' | 'sofia'>('itinerary');

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
          <span className="badge badgeGold">{STAGE_LABELS[ACTIVE_JOURNEY.stage]}</span>
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
                  >
                    <div className={styles.dayLeft}>
                      <div className={styles.dayDest}>{day.dest}</div>
                      <div className={styles.dayMeta}>{day.days} · {day.nights} nights · {day.accommodation}</div>
                    </div>
                    <div className={styles.dayRight}>
                      {day.notes && <span className="badge badgeGold">Updated</span>}
                      {day.pending && <span className="badge badgeMuted">Pending</span>}
                      <svg className={`${styles.dayChevron}${expandedDay === day.id ? ' ' + styles.dayChevronOpen : ''}`} width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 4l4 4 4-4"/>
                      </svg>
                    </div>
                  </button>

                  {expandedDay === day.id && (
                    <div className={styles.dayBody}>
                      <p className={styles.dayDescription}>{day.description}</p>
                      {day.notes && (
                        <div className={styles.dayNotice}>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#C8A96A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0,marginTop:1}}>
                            <path d="M8.5 1.5l2 2L4 10H2v-2L8.5 1.5z"/>
                          </svg>
                          {day.notes}
                        </div>
                      )}
                      {day.pending && (
                        <div className={`${styles.dayNotice} ${styles.dayNoticePending}`}>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#D49B50" strokeWidth="1.2" strokeLinecap="round" style={{flexShrink:0,marginTop:1}}>
                            <circle cx="6" cy="6" r="4.5"/>
                            <path d="M6 4v2.5M6 8.5v.2"/>
                          </svg>
                          {day.pending}
                        </div>
                      )}
                      <div className={styles.highlights}>
                        <div className={styles.highlightsLabel}>Highlights</div>
                        {day.highlights.map((h, i) => (
                          <div key={i} className={styles.highlightRow}>
                            <span className={styles.highlightDot} />
                            {h}
                          </div>
                        ))}
                      </div>
                      <div className={styles.dayActions}>
                        <button className={styles.dayActionBtn}>Add a note</button>
                        <button className={styles.dayActionBtn}>Mark as favourite</button>
                        <button className={styles.dayActionBtn}>Request change</button>
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
              <Link href="/portal/documents" className={styles.quickLink}>
                <span>Travel Book</span>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
                  <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5"/>
                </svg>
              </Link>
              <Link href="/portal/payments" className={styles.quickLink}>
                <span>Payments</span>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
                  <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5"/>
                </svg>
              </Link>
              <Link href="/portal/travellers" className={styles.quickLink}>
                <span>Travellers</span>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
                  <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5"/>
                </svg>
              </Link>
              <button className={styles.quickLink}>
                <span>Emergency contacts</span>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
                  <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5"/>
                </svg>
              </button>
            </div>
          </div>

          <Link href="/portal" className={styles.backToDashBtn}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
              <path d="M6 2L3 5l3 3"/>
            </svg>
            Back to Dashboard
          </Link>
        </aside>
      </div>
    </>
  );
}
