'use client';
import { useState, useEffect } from 'react';
import styles from './documents.module.css';

// ─── Document data (from approved design) ─────────────────────────────────────
type DocStatus = 'Available Offline' | 'Updated' | 'New' | 'Awaiting';

interface Doc {
  id: number;
  title: string;
  desc: string;
  cat: string;
  updated: string;
  status: DocStatus;
  offline: boolean;
  special?: 'travelbook';
  icon: React.ReactNode;
}

const FILTER_LABELS = ['All', 'Travel', 'Accommodation', 'Transport', 'Reservations', 'Guides', 'Important'];

function makeIcon(children: React.ReactNode) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#8A8070" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

const ICONS = {
  travelbook: makeIcon(<>
    <path d="M1.5 14.5V4.5a1 1 0 0 1 1-1H8v11H2.5a1 1 0 0 1-1-1z"/>
    <path d="M16.5 14.5V4.5a1 1 0 0 0-1-1H10v11h5.5a1 1 0 0 0 1-1z"/>
    <line x1="8" y1="3.5" x2="10" y2="3.5"/>
    <line x1="8" y1="14.5" x2="10" y2="14.5"/>
    <line x1="3" y1="7" x2="7" y2="7"/>
    <line x1="3" y1="9.5" x2="7" y2="9.5"/>
    <line x1="11" y1="7" x2="15" y2="7"/>
    <line x1="11" y1="9.5" x2="15" y2="9.5"/>
  </>),
  hotel: makeIcon(<>
    <path d="M3 16V8L9 4.5 15 8v8"/>
    <line x1="1" y1="16" x2="17" y2="16"/>
    <rect x="7" y="10" width="4" height="6"/>
    <rect x="4.5" y="8.5" width="2" height="2"/>
    <rect x="11.5" y="8.5" width="2" height="2"/>
  </>),
  flight: makeIcon(<>
    <path d="M9 2L7 9.5H4.5l1 2H8L7 15.5l2-.5 2 .5-1-4h2.5l1-2H11L9 2z"/>
  </>),
  car: makeIcon(<>
    <path d="M1.5 11.5l1.5-4h12l1.5 4v3h-15v-3z"/>
    <path d="M4.5 7.5L6 5h6l2 2.5"/>
    <circle cx="4.5" cy="14.5" r="1.2"/>
    <circle cx="13.5" cy="14.5" r="1.2"/>
  </>),
  restaurant: makeIcon(<>
    <line x1="5.5" y1="2" x2="5.5" y2="16"/>
    <line x1="3.5" y1="2" x2="3.5" y2="6"/>
    <line x1="7.5" y1="2" x2="7.5" y2="6"/>
    <path d="M3.5 6 Q5.5 7.5 7.5 6"/>
    <path d="M12 2 Q14.5 5 13 8"/>
    <line x1="13" y1="8" x2="13" y2="16"/>
  </>),
  wellness: makeIcon(<>
    <path d="M9 15C5 12 1.5 9 1.5 6a3.8 3.8 0 0 1 7.5-.8 3.8 3.8 0 0 1 7.5.8C16.5 9 13 12 9 15z"/>
  </>),
  compass: makeIcon(<>
    <circle cx="9" cy="9" r="6.5"/>
    <circle cx="9" cy="9" r="0.75"/>
    <path d="M9 2.5v1.5 M9 14v1.5 M2.5 9h1.5 M14 9h1.5"/>
    <path d="M11.5 6.5L9.8 9.8 6.5 11.5 8.2 8.2z"/>
  </>),
  shield: makeIcon(<>
    <path d="M9 2L3 4.5V9.5c0 3.2 2.5 6 6 6.5 3.5-.5 6-3.3 6-6.5V4.5L9 2z"/>
    <path d="M6.5 9.5l2 2 3-3"/>
  </>),
  medical: makeIcon(<>
    <circle cx="9" cy="9" r="6.5"/>
    <line x1="9" y1="5.5" x2="9" y2="12.5"/>
    <line x1="5.5" y1="9" x2="12.5" y2="9"/>
  </>),
  passport: makeIcon(<>
    <rect x="3.5" y="2" width="11" height="14" rx="1.2"/>
    <circle cx="9" cy="7.5" r="2.5"/>
    <path d="M6.5 7.5 Q9 5 11.5 7.5 Q9 10 6.5 7.5"/>
    <line x1="5.5" y1="12" x2="12.5" y2="12"/>
  </>),
  suitcase: makeIcon(<>
    <rect x="2" y="8" width="14" height="8" rx="1"/>
    <path d="M6.5 8V6a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2"/>
    <line x1="2" y1="12" x2="16" y2="12"/>
    <line x1="6.5" y1="12" x2="6.5" y2="16"/>
    <line x1="11.5" y1="12" x2="11.5" y2="16"/>
  </>),
  receipt: makeIcon(<>
    <path d="M3.5 2h11v11.5l-1.75-1.25-1.75 1.25-1.75-1.25-1.75 1.25-1.75-1.25-2.25 1.5V2z"/>
    <line x1="5.5" y1="6" x2="12.5" y2="6"/>
    <line x1="5.5" y1="8.5" x2="12.5" y2="8.5"/>
    <line x1="5.5" y1="11" x2="9" y2="11"/>
  </>),
};

const ALL_DOCS: Doc[] = [
  { id: 1,  title: 'Japan Travel Book',        desc: 'Complete journey overview, destinations and editorial notes', cat: 'Travel',         updated: '12 Jul', status: 'Updated',          offline: true,  icon: ICONS.travelbook, special: 'travelbook' },
  { id: 2,  title: 'Hotel Confirmations',       desc: 'Park Hyatt Tokyo · Aman Kyoto · Gōra Kadan',                cat: 'Accommodation',  updated: '12 Jul', status: 'Available Offline', offline: true,  icon: ICONS.hotel       },
  { id: 3,  title: 'Flight Details',            desc: 'BA 4 · LHR–NRT · Sat 12 Sep · Business Class',              cat: 'Transport',      updated: '8 Jul',  status: 'Available Offline', offline: true,  icon: ICONS.flight      },
  { id: 4,  title: 'Private Transfers',         desc: 'Airport to hotel · All journey legs confirmed',              cat: 'Transport',      updated: '8 Jul',  status: 'Available Offline', offline: true,  icon: ICONS.car         },
  { id: 5,  title: 'Restaurant Reservations',   desc: 'Den · Narisawa · Kikunoi Honten · Dining notes',            cat: 'Reservations',   updated: '9 Jul',  status: 'Awaiting',          offline: false, icon: ICONS.restaurant  },
  { id: 6,  title: 'Wellness Appointments',     desc: 'Onsen · Tea ceremony · Ikebana class',                      cat: 'Reservations',   updated: '7 Jul',  status: 'Available Offline', offline: true,  icon: ICONS.wellness    },
  { id: 7,  title: 'Curated Experiences',       desc: 'Private access · Cultural immersions · Hidden Tokyo',       cat: 'Travel',         updated: '11 Jul', status: 'New',              offline: true,  icon: ICONS.compass     },
  { id: 8,  title: 'Travel Insurance',          desc: 'Policy · Medical · Cancellation coverage',                  cat: 'Important',      updated: '3 Jul',  status: 'Available Offline', offline: true,  icon: ICONS.shield      },
  { id: 9,  title: 'Emergency Contacts',        desc: 'Meridian 24h line · Local embassy · Medical',              cat: 'Important',      updated: '3 Jul',  status: 'Available Offline', offline: true,  icon: ICONS.medical     },
  { id: 10, title: 'Visa Information',          desc: 'Japan entry requirements · Proof of onward travel',         cat: 'Guides',         updated: '5 Jul',  status: 'Available Offline', offline: true,  icon: ICONS.passport    },
  { id: 11, title: 'Packing Guide',             desc: 'Season · Climate · Dress code · Ryokan etiquette',         cat: 'Guides',         updated: '6 Jul',  status: 'Available Offline', offline: false, icon: ICONS.suitcase    },
  { id: 12, title: 'Payment Receipts',          desc: 'Deposit receipt · Invoice copy',                           cat: 'Travel',         updated: '1 Jul',  status: 'Available Offline', offline: true,  icon: ICONS.receipt     },
];

const TRAVEL_BOOK_CONTENTS = [
  { page: '01', title: 'Introduction',     sub: 'A note from Sofia on your journey'                   },
  { page: '04', title: 'Journey Overview', sub: '12–24 Sep 2026 · Tokyo · Kyoto · Hakone'            },
  { page: '12', title: 'Hotels & Ryokan', sub: 'Park Hyatt Tokyo · Aman Kyoto · Gōra Kadan'         },
  { page: '20', title: 'Experiences',     sub: 'Private access · Cultural immersions · Hidden Tokyo' },
  { page: '28', title: 'Dining',          sub: 'Den · Narisawa · Kikunoi Honten · Okutan'           },
  { page: '36', title: 'Notes from Sofia', sub: 'Autumn in Japan · September conditions'             },
];

export default function DocumentsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [viewingDoc, setViewingDoc] = useState<Doc | null>(null);
  useEffect(() => {
    if (!viewingDoc) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setViewingDoc(null); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [viewingDoc]);

  const docs = ALL_DOCS
    .filter(d => activeFilter === 'All' || d.cat === activeFilter)
    .filter(d => {
      const q = search.toLowerCase().trim();
      return !q || d.title.toLowerCase().includes(q) || d.desc.toLowerCase().includes(q);
    });

  const isEmpty = docs.length === 0;

  return (
    <>
      {/* Top bar */}
      <div className={`topBar ${styles.topBarDoc}`}>
        <div className="topDate">Monday, 14 July 2026</div>
        <div className="topUser">
          <div className="topAvatar">EW</div>
          <span className="topUsername">Emily Weston</span>
        </div>
      </div>

      {/* Page heading */}
      <div className={styles.heading}>
        <h1 className={styles.headingTitle}>Documents</h1>
        <div className={styles.headingSubtitle}>Everything prepared for your journey, quietly organised in one place.</div>
      </div>

      {/* Content grid */}
      <div className={styles.grid}>

        {/* ── Left main column ── */}
        <div className={styles.mainCol}>

          {/* Search row */}
          <div className={styles.searchRow}>
            <div className={styles.searchInner}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#9A9080" strokeWidth="1.2" strokeLinecap="round">
                <circle cx="5" cy="5" r="3.5"/>
                <path d="M8 8l2.5 2.5"/>
              </svg>
              <input
                type="search"
                className={styles.searchInput}
                placeholder="Search documents..."
                aria-label="Search documents"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Filter pills */}
          <div className={styles.filterRow}>
            {FILTER_LABELS.map(f => (
              <button
                key={f}
                className={`${styles.pill}${activeFilter === f ? ' ' + styles.pillActive : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Document list */}
          <div className={styles.docList}>
            {docs.map(doc => (
              <button
                key={doc.id}
                type="button"
                className={`btnReset ${styles.docRow}`}
                onClick={() => setViewingDoc(doc)}
                aria-label={`Open ${doc.title}`}
              >
                <div className={styles.docIconBox}>
                  {doc.icon}
                </div>
                <div className={styles.docText}>
                  <div className={styles.docNameRow}>
                    <span className={styles.docName}>{doc.title}</span>
                    <span className={`${styles.statusBadge} ${styles[`status_${doc.status.replace(/\s+/g, '_')}`]}`}>
                      {doc.status}
                    </span>
                  </div>
                  <div className={styles.docDesc}>{doc.desc}</div>
                </div>
                <div className={styles.docMeta}>
                  <div className={styles.docMetaInner}>
                    <div className={styles.docUpdated}>{doc.updated}</div>
                    {doc.offline && (
                      <div className={styles.docOffline}>
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="#6A8A70" strokeWidth="1.1" strokeLinecap="round">
                          <path d="M1 4.5L3 6.5l4-4"/>
                        </svg>
                        Offline
                      </div>
                    )}
                  </div>
                  <svg className={styles.docArrow} width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#9A9080" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true">
                    <path d="M2.5 6h7M6.5 3.5L9 6l-2.5 2.5"/>
                  </svg>
                </div>
              </button>
            ))}
          </div>

          {/* Empty state */}
          {isEmpty && (
            <div className={styles.emptyState}>
              <svg width="64" height="80" viewBox="0 0 64 80" fill="none" stroke="#C8B89A" strokeWidth="1.2" strokeLinecap="round">
                <path d="M8 2h32l16 16v56a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/>
                <path d="M40 2v16h16"/>
                <path d="M16 38h32M16 46h24M16 54h20"/>
              </svg>
              <div className={styles.emptyTitle}>Your journey documents will appear here.</div>
              <div className={styles.emptyText}>As your concierge prepares your journey, everything will be organised here automatically.</div>
              <button className={styles.emptyBtn}>Return to Dashboard</button>
            </div>
          )}
        </div>

        {/* ── Right sidebar ── */}
        <div className={styles.sidebar}>

          {/* Journey summary */}
          <div className={styles.journeyCard}>
            <div className={styles.jLabel}>Active Journey</div>
            <div className={styles.jTitle}>Japan</div>
            <div className={styles.jMeta}>12 Nights · 3 Destinations</div>
            <div className={styles.jDepartureBlock}>
              <div className={styles.jDepartureRow}>
                <span className={styles.jDepartureLabel}>Departure</span>
                <span className={styles.jDaysNum}>60</span>
              </div>
              <div className={styles.jDepartureRow2}>
                <span className={styles.jDate}>12 Sep 2026</span>
                <span className={styles.jDaysWord}>days</span>
              </div>
            </div>
            <div className={styles.jConcierge}>
              <div className={styles.jAvatar}>
                <span>SL</span>
              </div>
              <div>
                <div className={styles.jCName}>Sofia Laurent</div>
                <div className={styles.jCStatus}>
                  <span className={styles.jDot}></span>
                  Available
                </div>
              </div>
            </div>
          </div>

          {/* Offline access */}
          <div className={styles.sideCard}>
            <div className={styles.sideCardHeader}>
              <span className={styles.sideCardLabel}>Offline Access</span>
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none" stroke="#9A9080" strokeWidth="1.2" strokeLinecap="round">
                <path d="M9 13.5a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1z" fill="#9A9080"/>
                <path d="M1.5 6A10.5 10.5 0 0 1 16.5 6"/>
                <path d="M4 9A7 7 0 0 1 14 9"/>
                <path d="M6.5 11.5A3.5 3.5 0 0 1 11.5 11.5"/>
                <line x1="2" y1="2" x2="16" y2="16"/>
              </svg>
            </div>
            <div className={styles.offlineCount}>11</div>
            <div className={styles.offlineLabel}>documents available offline</div>
          </div>

          {/* Storage */}
          <div className={styles.sideCard}>
            <div className={styles.sideCardLabel}>Storage</div>
            <div className={styles.storageRow}>
              <span className={styles.storageNum}>24</span>
              <span className={styles.storageMb}>MB used</span>
            </div>
            <div className={styles.storageBarWrap}>
              <div className={styles.storageBarFill}></div>
            </div>
            <div className={styles.storageOf}>of 500 MB allocated</div>
          </div>

          {/* Upload nudge */}
          <div className={styles.uploadBtn}>
            <span className={styles.uploadLabel}>Upload Document</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#9A9080" strokeWidth="1.2" strokeLinecap="round">
              <path d="M7 10V3M4 6l3-3 3 3"/>
              <path d="M2 12h10"/>
            </svg>
          </div>

        </div>
      </div>

      {/* ── Document viewer overlay ── */}
      {viewingDoc && (
        <div className={styles.overlay} onClick={() => setViewingDoc(null)} aria-hidden="true">
          <div
            className={styles.modal}
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="doc-viewer-heading"
          >

            {/* Viewer header */}
            <div className={styles.viewerHeader}>
              <button className={styles.viewerBack} onClick={() => setViewingDoc(null)}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#9A9080" strokeWidth="1.2" strokeLinecap="round">
                  <path d="M8 2L4 6l4 4"/>
                </svg>
                All Documents
              </button>
              <span id="doc-viewer-heading" className={styles.viewerCat}>{viewingDoc.cat}</span>
            </div>

            {/* Travel Book special viewer */}
            {viewingDoc.special === 'travelbook' ? (
              <>
                <div className={styles.tbCover}>
                  <div className={styles.tbEyebrow}>Meridian · Japan 2026</div>
                  <div className={styles.tbTitle}>
                    Japan<br/>
                    <span className={styles.tbTitleItalic}>Travel Book</span>
                  </div>
                  <div className={styles.tbNights}>12 Nights · 12–24 Sep 2026</div>
                </div>
                <div className={styles.tbBody}>
                  <div className={styles.tbContentsLabel}>Contents</div>
                  <div className={styles.tbContents}>
                    {TRAVEL_BOOK_CONTENTS.map((item, i) => (
                      <div key={item.page} className={`${styles.tbItem} ${i < TRAVEL_BOOK_CONTENTS.length - 1 ? styles.tbItemBorder : ''}`}>
                        <div>
                          <div className={styles.tbItemTitle}>{item.title}</div>
                          <div className={styles.tbItemSub}>{item.sub}</div>
                        </div>
                        <span className={styles.tbPageNum}>{item.page}</span>
                      </div>
                    ))}
                  </div>
                  <div className={styles.tbNote}>
                    <div className={styles.tbNoteLabel}>A note from Sofia</div>
                    <div className={styles.tbNoteQuote}>
                      "Japan in September sits just before the crowds arrive for autumn colour. I've built this around the hours and places that the guidebooks don't reach — and a few that take some patience to access."
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* Generic viewer */
              <div className={styles.viewerBody}>
                <div className={styles.viewerTitle}>{viewingDoc.title}</div>
                <div className={styles.viewerMeta}>Updated {viewingDoc.updated} · {viewingDoc.cat}</div>
                <div className={styles.viewerPreview}>
                  <svg width="36" height="44" viewBox="0 0 36 44" fill="none" stroke="#B8B0A0" strokeWidth="1.2" strokeLinecap="round">
                    <path d="M4 1h20l10 10v31a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
                    <path d="M24 1v10h10"/>
                    <rect x="8" y="22" width="20" height="1.5" fill="#B8B0A0" stroke="none" rx="0.5"/>
                    <rect x="8" y="27" width="16" height="1.5" fill="#B8B0A0" stroke="none" rx="0.5"/>
                    <rect x="8" y="32" width="18" height="1.5" fill="#B8B0A0" stroke="none" rx="0.5"/>
                  </svg>
                  <div className={styles.viewerPreviewLabel}>Document preview</div>
                </div>
                <div className={styles.viewerFooter}>
                  <button className={styles.viewerShare}>Share with Concierge</button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}
