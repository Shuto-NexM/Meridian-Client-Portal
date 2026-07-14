'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import styles from './JourneyWorkspace.module.css';
import type { JourneyDef, SuggestionDef } from '@/data/journeys';
import { JOURNEYS } from '@/data/journeys';

// ─── Runtime state types (extend static defs with interactive state) ──────────

interface Destination { id: string; name: string; }
interface Experience { id: string; text: string; }

interface ItineraryDay {
  id: string; dest: string; days: string;
  accommodation: string; experiences: Experience[];
  description: string; expanded: boolean; favourite: boolean;
}

interface Suggestion {
  id: string; title: string; desc: string;
  dest: string; action: 'add-experience' | 'extend' | 'add-dest';
  actionPayload?: string;
  status: 'pending' | 'added' | 'dismissed' | 'saved';
}

interface ChatMessage { id: string; role: 'user' | 'sofia'; text: string; time: string; }

// ─── Helpers ──────────────────────────────────────────────────────────────────

const PROGRESS_STAGES = ['Dream', 'Shape', 'Refine', 'Review', 'Ready'];

function nowTime() {
  return new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}

function sofiaResponse(input: string, journey: JourneyDef): string {
  const lower = input.toLowerCase();
  for (const rule of journey.sofia.keywords) {
    if (rule.match.some(kw => lower.includes(kw))) return rule.response;
  }
  return journey.sofia.defaultResponse;
}

function storageKey(slug: string) { return `meridian-workspace-${slug}`; }

function loadState(slug: string) {
  if (typeof window === 'undefined') return null;
  try { return JSON.parse(localStorage.getItem(storageKey(slug)) || 'null'); } catch { return null; }
}

function buildInitialItinerary(journey: JourneyDef): ItineraryDay[] {
  return journey.itinerary.map((seg, i) => ({
    ...seg,
    expanded: i === 0,
    favourite: false,
  }));
}

function buildInitialSuggestions(journey: JourneyDef): Suggestion[] {
  return journey.suggestions.map(s => ({ ...s, status: 'pending' as const }));
}

// ─── Quick replies (generic, not journey-specific) ────────────────────────────

const QUICK_REPLIES = [
  'Tell me more', 'What about the food?', 'Can I extend my stay?',
  'Suggest something unusual', "What's the best timing?",
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function JourneyWorkspace({ journey }: { journey: JourneyDef }) {
  const saved = loadState(journey.slug);

  const [destinations, setDestinations] = useState<Destination[]>(
    saved?.destinations ?? journey.destinations
  );
  const [activeFilter, setActiveFilter] = useState<string>(saved?.activeFilter ?? 'all');
  const [itinerary, setItinerary] = useState<ItineraryDay[]>(
    saved?.itinerary ?? buildInitialItinerary(journey)
  );
  const [suggestions, setSuggestions] = useState<Suggestion[]>(
    saved?.suggestions ?? buildInitialSuggestions(journey)
  );
  const [savedSuggestions, setSavedSuggestions] = useState<Suggestion[]>(
    saved?.savedSuggestions ?? []
  );
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(
    saved?.chatMessages ?? [{
      id: 'init-1', role: 'sofia' as const,
      text: journey.sofia.greeting,
      time: nowTime(),
    }]
  );
  const [notes, setNotes] = useState<string>(saved?.notes ?? '');
  const [progress, setProgress] = useState<number>(saved?.progress ?? 1);
  const [flashId, setFlashId] = useState<string | null>(null);

  // Non-persisted UI state
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [addDestOpen, setAddDestOpen] = useState(false);
  const [briefOpen, setBriefOpen] = useState(false);
  const [briefSubmitted, setBriefSubmitted] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  // Re-initialise when journey slug changes (e.g. switcher)
  useEffect(() => {
    const s = loadState(journey.slug);
    setDestinations(s?.destinations ?? journey.destinations);
    setActiveFilter(s?.activeFilter ?? 'all');
    setItinerary(s?.itinerary ?? buildInitialItinerary(journey));
    setSuggestions(s?.suggestions ?? buildInitialSuggestions(journey));
    setSavedSuggestions(s?.savedSuggestions ?? []);
    setChatMessages(s?.chatMessages ?? [{
      id: 'init-1', role: 'sofia' as const,
      text: journey.sofia.greeting,
      time: nowTime(),
    }]);
    setNotes(s?.notes ?? '');
    setProgress(s?.progress ?? 1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [journey.slug]);

  // Persist to localStorage (keyed by slug)
  useEffect(() => {
    const data = { destinations, activeFilter, itinerary, suggestions, savedSuggestions, chatMessages, notes, progress };
    localStorage.setItem(storageKey(journey.slug), JSON.stringify(data));
  }, [journey.slug, destinations, activeFilter, itinerary, suggestions, savedSuggestions, chatMessages, notes, progress]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  useEffect(() => {
    if (chatOpen) setTimeout(() => chatInputRef.current?.focus(), 100);
  }, [chatOpen]);

  const advanceProgress = useCallback((min: number) => {
    setProgress(p => Math.max(p, min));
  }, []);

  // ── Destinations ────────────────────────────────────────────────────────────

  const filteredItinerary = activeFilter === 'all'
    ? itinerary
    : itinerary.filter(d => d.dest === activeFilter);

  function addDestination(name: string) {
    const id = name.toLowerCase().replace(/\s+/g, '-');
    if (destinations.find(d => d.id === id)) return;
    setDestinations(prev => [...prev, { id, name }]);
    setItinerary(prev => [...prev, {
      id: `${id}-days`, dest: id, days: 'Day TBC',
      accommodation: 'To be confirmed with your concierge',
      experiences: [{ id: `${id}-e1`, text: 'To be curated with Sofia' }],
      description: `Your concierge is preparing a detailed programme for ${name}.`,
      expanded: false, favourite: false,
    }]);
    advanceProgress(2);
  }

  function removeDestination(id: string) {
    setDestinations(prev => prev.filter(d => d.id !== id));
    setItinerary(prev => prev.filter(d => d.dest !== id));
    if (activeFilter === id) setActiveFilter('all');
  }

  // ── Itinerary ────────────────────────────────────────────────────────────────

  function toggleExpand(id: string) {
    setItinerary(prev => prev.map(d => d.id === id ? { ...d, expanded: !d.expanded } : d));
    advanceProgress(2);
  }

  function toggleFavourite(id: string) {
    setItinerary(prev => prev.map(d => d.id === id ? { ...d, favourite: !d.favourite } : d));
    advanceProgress(2);
  }

  function moveDay(id: string, dir: 'up' | 'down') {
    setItinerary(prev => {
      const idx = prev.findIndex(d => d.id === id);
      if (idx === -1) return prev;
      const next = [...prev];
      const swap = dir === 'up' ? idx - 1 : idx + 1;
      if (swap < 0 || swap >= next.length) return prev;
      [next[idx], next[swap]] = [next[swap], next[idx]];
      return next;
    });
    advanceProgress(3);
  }

  // ── Suggestions ──────────────────────────────────────────────────────────────

  function acceptSuggestion(s: Suggestion | SuggestionDef) {
    const id = s.id;
    setFlashId(id);
    setTimeout(() => setFlashId(null), 1200);

    if (s.action === 'add-experience' && s.actionPayload) {
      setItinerary(prev => prev.map(d => {
        if (d.dest === s.dest) {
          return { ...d, experiences: [...d.experiences, { id: `sug-${id}`, text: s.actionPayload! }] };
        }
        return d;
      }));
    } else if (s.action === 'extend' && s.actionPayload) {
      setItinerary(prev => prev.map(d => d.dest === s.dest ? { ...d, days: s.actionPayload! } : d));
    } else if (s.action === 'add-dest' && s.actionPayload) {
      addDestination(s.actionPayload);
    }

    setTimeout(() => {
      setSuggestions(prev => prev.map(sg => sg.id === id ? { ...sg, status: 'added' } : sg));
    }, 800);
    advanceProgress(3);
  }

  function dismissSuggestion(id: string) {
    setRemovingId(id);
    setTimeout(() => {
      setSuggestions(prev => prev.map(s => s.id === id ? { ...s, status: 'dismissed' } : s));
      setRemovingId(null);
    }, 300);
  }

  function saveSuggestion(id: string) {
    const s = suggestions.find(sg => sg.id === id);
    if (!s) return;
    setSavedSuggestions(prev => [...prev, { ...s, status: 'saved' }]);
    setSuggestions(prev => prev.map(sg => sg.id === id ? { ...sg, status: 'saved' } : sg));
  }

  const pendingSuggestions = suggestions.filter(s => s.status === 'pending');

  // ── Chat ─────────────────────────────────────────────────────────────────────

  function sendMessage(text?: string) {
    const msg = (text ?? chatInput).trim();
    if (!msg) return;
    setChatInput('');
    const userMsg: ChatMessage = { id: `m-${Date.now()}`, role: 'user', text: msg, time: nowTime() };
    setChatMessages(prev => [...prev, userMsg]);
    setIsTyping(true);
    advanceProgress(2);
    setTimeout(() => {
      setIsTyping(false);
      setChatMessages(prev => [...prev, {
        id: `m-${Date.now()}-s`, role: 'sofia',
        text: sofiaResponse(msg, journey),
        time: nowTime(),
      }]);
    }, 1400 + Math.random() * 600);
  }

  // ── Brief ────────────────────────────────────────────────────────────────────

  function submitBrief() {
    setBriefSubmitted(true);
    setProgress(4);
  }

  // ── Computed ─────────────────────────────────────────────────────────────────

  const totalNights = journey.nights; // static from journey definition
  const acceptedCount = suggestions.filter(s => s.status === 'added').length;
  const availableToAdd = journey.availableDestinations.filter(
    name => !destinations.find(d => d.name === name)
  );

  // ─────────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div className={styles.page}>

      {/* ── Journey switcher (prototype only) ── */}
      <div className={styles.switcherBar}>
        <div className={styles.switcherLabel}>Prototype workspaces:</div>
        <div className={styles.switcherLinks}>
          {JOURNEYS.map(j => (
            <Link
              key={j.slug}
              href={`/journey-workspace/${j.slug}`}
              className={`${styles.switcherLink} ${j.slug === journey.slug ? styles.switcherLinkActive : ''}`}
            >
              {j.title} · {j.nights}n
            </Link>
          ))}
        </div>
      </div>

      {/* ── Page header ── */}
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <div className={styles.pageEyebrow}>
            <div className={styles.eyebrowLine} />
            Journey Workspace
          </div>
          <div className={styles.pageTitle}>
            {journey.title} · {destinations.map(d => d.name).join(', ')}
          </div>
        </div>
        <ProgressBar stage={progress} />
      </div>

      {/* ── Main grid ── */}
      <div className={styles.grid}>

        {/* ── LEFT SIDEBAR ── */}
        <aside className={styles.sidebar}>

          <div className={styles.card}>
            <div className={styles.cardSectionHead}>Journey Summary</div>
            <div className={styles.summaryGrid}>
              <div className={styles.summaryItem}>
                <div className={styles.summaryVal}>{destinations.length}</div>
                <div className={styles.summaryLabel}>Destinations</div>
              </div>
              <div className={styles.summaryItem}>
                <div className={styles.summaryVal}>{totalNights}</div>
                <div className={styles.summaryLabel}>Nights</div>
              </div>
              <div className={styles.summaryItem}>
                <div className={styles.summaryVal}>{itinerary.reduce((a, d) => a + d.experiences.length, 0)}</div>
                <div className={styles.summaryLabel}>Experiences</div>
              </div>
              <div className={styles.summaryItem}>
                <div className={styles.summaryVal}>{acceptedCount}</div>
                <div className={styles.summaryLabel}>Added</div>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardSectionHead}>Destinations</div>
            <div className={styles.chips}>
              <button
                className={activeFilter === 'all' ? styles.chipActive : styles.chip}
                onClick={() => setActiveFilter('all')}
              >All</button>
              {destinations.map(d => (
                <div key={d.id} className={`${styles.chipGroup} ${activeFilter === d.id ? styles.chipGroupActive : ''}`}>
                  <button
                    className={activeFilter === d.id ? styles.chipActive : styles.chip}
                    onClick={() => setActiveFilter(activeFilter === d.id ? 'all' : d.id)}
                  >{d.name}</button>
                  <button
                    className={styles.chipRemove}
                    onClick={() => removeDestination(d.id)}
                    title={`Remove ${d.name}`}
                  >×</button>
                </div>
              ))}
              <button className={styles.chipAdd} onClick={() => setAddDestOpen(true)}>+ Add</button>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardSectionHead}>Notes</div>
            <textarea
              className={styles.notes}
              value={notes}
              onChange={e => { setNotes(e.target.value); advanceProgress(2); }}
              placeholder="Add your own notes — preferences, thoughts, things to remember…"
              rows={4}
            />
          </div>

          {savedSuggestions.length > 0 && (
            <div className={styles.card}>
              <div className={styles.cardSectionHead}>Saved for Later</div>
              <div className={styles.savedList}>
                {savedSuggestions.map(s => (
                  <div key={s.id} className={styles.savedItem}>
                    <div className={styles.savedTitle}>{s.title}</div>
                    <button className={styles.btnSavedAdd} onClick={() => acceptSuggestion(s)}>Add now</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className={styles.card}>
            <div className={styles.conciergeRow}>
              <div className={styles.avatarCircle}>SL</div>
              <div className={styles.conciergeInfo}>
                <div className={styles.conciergeName}>{journey.sofia.name}</div>
                <div className={styles.conciergeStatus}>
                  <span className={styles.statusDot} />
                  Your concierge · Available now
                </div>
              </div>
            </div>
            <p className={styles.sofiaPreview}>{journey.sofia.preview}</p>
            <button className={styles.msgBtn} onClick={() => setChatOpen(true)}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              Message Sofia
            </button>
          </div>

        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className={styles.main}>

          {/* Itinerary */}
          <div className={styles.sectionBlock}>
            <div className={styles.sectionBlockHead}>
              <div className={styles.sectionBlockTitle}>Itinerary</div>
              {activeFilter !== 'all' && (
                <button className={styles.clearFilter} onClick={() => setActiveFilter('all')}>
                  Showing {destinations.find(d => d.id === activeFilter)?.name} · Clear filter
                </button>
              )}
            </div>

            {filteredItinerary.length === 0
              ? <div className={styles.emptyState}>No days match this destination.</div>
              : (
                <div className={styles.itineraryList}>
                  {filteredItinerary.map((day, idx) => (
                    <div key={day.id} className={`${styles.dayGroup} ${day.expanded ? styles.dayGroupOpen : ''}`}>
                      <div className={styles.dayHeader} onClick={() => toggleExpand(day.id)}>
                        <div className={styles.dayHeaderLeft}>
                          <div className={styles.dayDot} />
                          <div>
                            <div className={styles.dayLabel}>{day.days}</div>
                            <div className={styles.dayDest}>
                              {destinations.find(d => d.id === day.dest)?.name ?? day.dest} · {day.accommodation}
                            </div>
                          </div>
                        </div>
                        <div className={styles.dayHeaderRight}>
                          <button
                            className={`${styles.favBtn} ${day.favourite ? styles.favBtnActive : ''}`}
                            onClick={e => { e.stopPropagation(); toggleFavourite(day.id); }}
                            title={day.favourite ? 'Remove favourite' : 'Mark as favourite'}
                          >{day.favourite ? '♥' : '♡'}</button>
                          <div className={styles.reorderBtns}>
                            <button className={styles.reorderBtn} onClick={e => { e.stopPropagation(); moveDay(day.id, 'up'); }} disabled={idx === 0} title="Move up">↑</button>
                            <button className={styles.reorderBtn} onClick={e => { e.stopPropagation(); moveDay(day.id, 'down'); }} disabled={idx === filteredItinerary.length - 1} title="Move down">↓</button>
                          </div>
                          <div className={`${styles.chevron} ${day.expanded ? styles.chevronOpen : ''}`}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="6,9 12,15 18,9"/>
                            </svg>
                          </div>
                        </div>
                      </div>

                      {day.expanded && (
                        <div className={styles.dayBody}>
                          <div className={styles.dayDescription}>{day.description}</div>
                          <div className={styles.daySection}>
                            <div className={styles.daySectionLabel}>
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                              Accommodation
                            </div>
                            <div className={styles.daySectionValue}>{day.accommodation}</div>
                          </div>
                          <div className={styles.daySection}>
                            <div className={styles.daySectionLabel}>
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                              Experiences
                            </div>
                            <ul className={styles.experienceList}>
                              {day.experiences.map(exp => (
                                <li key={exp.id} className={styles.experienceItem}>
                                  <span className={styles.expDot} />
                                  {exp.text}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )
            }
          </div>

          {/* Meridian Suggestions */}
          {pendingSuggestions.length > 0 && (
            <div className={styles.sectionBlock}>
              <div className={styles.sectionBlockHead}>
                <div className={styles.sectionBlockTitle}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--m-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88"/>
                  </svg>
                  Meridian Suggestions
                </div>
                <div className={styles.suggestionCount}>{pendingSuggestions.length} for you</div>
              </div>
              <div className={styles.suggestionList}>
                {pendingSuggestions.map(s => (
                  <div
                    key={s.id}
                    className={`${styles.suggestion} ${flashId === s.id ? styles.suggestionFlash : ''} ${removingId === s.id ? styles.suggestionFade : ''}`}
                  >
                    <div className={styles.suggestionHeader}>
                      <div className={styles.suggestionIcon}>
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="var(--m-gold-d)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"/><polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88"/>
                        </svg>
                      </div>
                      <span className={styles.suggestionLabel}>
                        Meridian Suggestion · {destinations.find(d => d.id === s.dest)?.name ?? s.dest}
                      </span>
                    </div>
                    <div className={styles.suggestionTitle}>{s.title}</div>
                    <p className={styles.suggestionDesc}>{s.desc}</p>
                    <div className={styles.suggestionActions}>
                      <button className={styles.btnAdd} onClick={() => acceptSuggestion(s)}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                        Add
                      </button>
                      <button className={styles.btnSave} onClick={() => saveSuggestion(s.id)}>Save for later</button>
                      <button className={styles.btnDismiss} onClick={() => dismissSuggestion(s.id)}>Dismiss</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {suggestions.some(s => s.status === 'added') && (
            <div className={styles.acceptedBanner}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--m-gold)" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
              {suggestions.filter(s => s.status === 'added').length} suggestion{suggestions.filter(s => s.status === 'added').length > 1 ? 's' : ''} added to your itinerary
            </div>
          )}

          {/* Submit CTA */}
          <div className={styles.briefCta}>
            <div className={styles.briefCtaInner}>
              <div className={styles.briefCtaText}>
                <div className={styles.briefCtaTitle}>Your journey is taking shape.</div>
                <div className={styles.briefCtaSub}>Submit your brief and Sofia will review it before Thursday.</div>
              </div>
              <button className={styles.briefBtn} onClick={() => setBriefOpen(true)}>
                Submit Journey Brief
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
                </svg>
              </button>
            </div>
          </div>

        </main>
      </div>

      {/* ── Chat Drawer ── */}
      {chatOpen && (
        <div className={styles.chatOverlay} onClick={() => setChatOpen(false)}>
          <div className={styles.chatDrawer} onClick={e => e.stopPropagation()}>
            <div className={styles.chatHeader}>
              <div className={styles.chatHeaderLeft}>
                <div className={styles.chatAvatar}>SL</div>
                <div>
                  <div className={styles.chatName}>{journey.sofia.name}</div>
                  <div className={styles.chatStatus}><span className={styles.statusDot} />Available now</div>
                </div>
              </div>
              <button className={styles.chatClose} onClick={() => setChatOpen(false)} aria-label="Close chat">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div className={styles.chatMessages}>
              {chatMessages.map(m => (
                <div key={m.id} className={m.role === 'user' ? styles.chatMsgUser : styles.chatMsgSofia}>
                  <div className={styles.chatBubble}>{m.text}</div>
                  <div className={styles.chatTime}>{m.time}</div>
                </div>
              ))}
              {isTyping && (
                <div className={styles.chatMsgSofia}>
                  <div className={`${styles.chatBubble} ${styles.typingBubble}`}>
                    <span className={styles.typingDot} /><span className={styles.typingDot} /><span className={styles.typingDot} />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <div className={styles.quickReplies}>
              {QUICK_REPLIES.map(qr => (
                <button key={qr} className={styles.quickReply} onClick={() => sendMessage(qr)}>{qr}</button>
              ))}
            </div>
            <div className={styles.chatInputRow}>
              <input
                ref={chatInputRef}
                className={styles.chatInput}
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Message Sofia…"
              />
              <button className={styles.chatSend} onClick={() => sendMessage()} disabled={!chatInput.trim()} aria-label="Send message">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Add Destination Modal ── */}
      {addDestOpen && (
        <div className={styles.modalOverlay} onClick={() => setAddDestOpen(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitle}>Add a Destination</div>
              <button className={styles.modalClose} onClick={() => setAddDestOpen(false)}>×</button>
            </div>
            <p className={styles.modalSub}>Select a destination to add to your journey. Your concierge will prepare a detailed programme.</p>
            <div className={styles.destGrid}>
              {availableToAdd.length === 0
                ? <div className={styles.allAdded}>All available destinations have been added.</div>
                : availableToAdd.map(name => (
                  <button key={name} className={styles.destOption} onClick={() => { addDestination(name); setAddDestOpen(false); }}>
                    <div className={styles.destOptionName}>{name}</div>
                    <div className={styles.destOptionSub}>{journey.region}</div>
                  </button>
                ))
              }
            </div>
          </div>
        </div>
      )}

      {/* ── Journey Brief Modal ── */}
      {briefOpen && (
        <div className={styles.modalOverlay} onClick={() => { if (!briefSubmitted) setBriefOpen(false); }}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            {briefSubmitted ? (
              <div className={styles.briefSuccess}>
                <div className={styles.briefSuccessIcon}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--m-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div className={styles.briefSuccessTitle}>Your Journey Brief is ready for concierge review.</div>
                <p className={styles.briefSuccessBody}>Sofia will review your brief and send you a refined itinerary within 48 hours. Nothing is confirmed until you approve it.</p>
                <button className={styles.briefSuccessClose} onClick={() => { setBriefOpen(false); setBriefSubmitted(false); }}>Close</button>
              </div>
            ) : (
              <>
                <div className={styles.modalHeader}>
                  <div className={styles.modalTitle}>Journey Brief Review</div>
                  <button className={styles.modalClose} onClick={() => setBriefOpen(false)}>×</button>
                </div>
                <div className={styles.briefReview}>
                  <div className={styles.briefSection}>
                    <div className={styles.briefSectionLabel}>Journey</div>
                    <div className={styles.briefValue}>{journey.title} · {journey.region}</div>
                  </div>
                  <div className={styles.briefSection}>
                    <div className={styles.briefSectionLabel}>Destinations</div>
                    <div className={styles.briefValue}>{destinations.map(d => d.name).join(' · ')}</div>
                  </div>
                  <div className={styles.briefSection}>
                    <div className={styles.briefSectionLabel}>Itinerary</div>
                    {itinerary.map(d => (
                      <div key={d.id} className={styles.briefDay}>
                        <span className={styles.briefDayDays}>{d.days}</span>
                        <span>{destinations.find(dd => dd.id === d.dest)?.name ?? d.dest} · {d.accommodation}</span>
                      </div>
                    ))}
                  </div>
                  {suggestions.some(s => s.status === 'added') && (
                    <div className={styles.briefSection}>
                      <div className={styles.briefSectionLabel}>Accepted Suggestions</div>
                      {suggestions.filter(s => s.status === 'added').map(s => (
                        <div key={s.id} className={styles.briefSuggestion}>+ {s.title}</div>
                      ))}
                    </div>
                  )}
                  {notes.trim() && (
                    <div className={styles.briefSection}>
                      <div className={styles.briefSectionLabel}>Your Notes</div>
                      <div className={styles.briefNotes}>{notes}</div>
                    </div>
                  )}
                  <div className={styles.briefSection}>
                    <div className={styles.briefSectionLabel}>Summary</div>
                    <div className={styles.briefValue}>{destinations.length} destinations · {totalNights} nights · {itinerary.reduce((a, d) => a + d.experiences.length, 0)} experiences</div>
                  </div>
                </div>
                <button className={styles.briefSubmitBtn} onClick={submitBrief}>
                  Submit to {journey.sofia.name}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

// ─── Progress bar ─────────────────────────────────────────────────────────────

function ProgressBar({ stage }: { stage: number }) {
  return (
    <div className={styles.progressBar}>
      {PROGRESS_STAGES.map((label, i) => (
        <div key={label} className={styles.progressStep}>
          <div className={`${styles.progressDot} ${i <= stage ? styles.progressDotActive : ''} ${i === stage ? styles.progressDotCurrent : ''}`} />
          <div className={`${styles.progressLabel} ${i === stage ? styles.progressLabelActive : ''}`}>{label}</div>
          {i < PROGRESS_STAGES.length - 1 && (
            <div className={`${styles.progressLine} ${i < stage ? styles.progressLineActive : ''}`} />
          )}
        </div>
      ))}
    </div>
  );
}
