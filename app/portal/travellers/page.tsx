'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './travellers.module.css';
import { TRAVELLERS, SHARED_PREFERENCES } from '@/data/portal';

// ─── Completion ring SVG ───────────────────────────────────────────────────────
function CompletionRing({ pct, size, r }: { pct: number; size: number; r: number }) {
  const circ = 2 * Math.PI * r;
  const filled = (circ * pct / 100).toFixed(2);
  const gap    = (circ - parseFloat(filled)).toFixed(2);
  const offset = (circ / 4).toFixed(2);
  const sw     = size > 48 ? 2.5 : 2;
  const cx     = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cx} r={r} fill="none" stroke="rgba(26,21,16,0.08)" strokeWidth={sw}/>
      <circle
        cx={cx} cy={cx} r={r}
        fill="none" stroke="#C8A96A" strokeWidth={sw}
        strokeLinecap="round"
        strokeDasharray={`${filled} ${gap}`}
        strokeDashoffset={offset}
        className={styles.ringAnim}
      />
      <text
        x={cx} y={cx + (size > 48 ? 4 : 4)}
        textAnchor="middle"
        fontFamily="Cormorant Garamond, serif"
        fontSize={size > 48 ? 11 : 9}
        fill="#1A1510"
        fontWeight="400"
      >{pct}%</text>
    </svg>
  );
}

// ─── Field cell (primary card, 3-col) ─────────────────────────────────────────
function PrimaryField({ label, value, mono, sub }: {
  label: string; value: string; mono?: boolean; sub?: string;
}) {
  return (
    <div>
      <div className={styles.fieldLabel}>{label}</div>
      <div className={`${styles.fieldVal}${mono ? ' ' + styles.fieldMono : ''}`}>{value}</div>
      {sub && <div className={styles.fieldSub}>{sub}</div>}
    </div>
  );
}

export default function TravellersPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const emily    = TRAVELLERS[0];
  const james    = TRAVELLERS[1];
  const isabelle = TRAVELLERS[2];

  const ACTIVE_PREFS  = SHARED_PREFERENCES.slice(0, 4);
  const PASSIVE_PREFS = SHARED_PREFERENCES.slice(4);

  return (
    <>
      {/* Top bar */}
      <div className={`topBar ${styles.topBarTrav}`}>
        <div className="topDate">Monday, 14 July 2026</div>
        <div className="topUser">
          <div className="topAvatar">EW</div>
          <span className="topUsername">Emily Weston</span>
        </div>
      </div>

      {/* Heading row */}
      <div className={styles.headingRow}>
        <div>
          <div className={styles.headingTitle}>Travellers</div>
          <div className={styles.headingSubtitle}>The people at the heart of your journey. Keeping these profiles complete allows Sofia to prepare every detail with care.</div>
        </div>
        <button className={styles.addCompBtn} onClick={() => setDrawerOpen(true)}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#1A1510" strokeWidth="1.3" strokeLinecap="round">
            <path d="M6 1v10M1 6h10"/>
          </svg>
          <span>Add Companion</span>
        </button>
      </div>

      {/* ── Section 1: Primary Traveller ── */}
      <div className={styles.section}>
        <div className={styles.sectionLabel}>Primary Traveller</div>
        <div className={styles.primaryCard}>
          {/* Card header */}
          <div className={styles.primaryHeader}>
            <div className={styles.headerLeft}>
              <div className={styles.avatarLg}>EW</div>
              <div>
                <div className={styles.primaryName}>{emily.name}</div>
                <div className={styles.primaryRole}>Primary Traveller · {emily.nationality}</div>
              </div>
            </div>
            <div className={styles.ringCol}>
              <CompletionRing pct={100} size={52} r={20}/>
              <div className={styles.ringLabel}>Complete</div>
            </div>
          </div>

          {/* Fields grid — 3 col */}
          <div className={styles.fieldsGrid3}>
            <div className={`${styles.cell} ${styles.cellR}`}>
              <PrimaryField label="Nationality" value="British"/>
            </div>
            <div className={`${styles.cell} ${styles.cellR}`}>
              <PrimaryField label="Passport Number" value="GB ••••••• 123" mono/>
            </div>
            <div className={styles.cell}>
              <PrimaryField label="Passport Expiry" value="14 Mar 2030"/>
            </div>

            <div className={`${styles.cell} ${styles.cellT} ${styles.cellR}`}>
              <PrimaryField label="Date of Birth" value="•• / •• / 1985" mono/>
            </div>
            <div className={`${styles.cell} ${styles.cellT} ${styles.cellR}`}>
              <PrimaryField label="Email" value="emily@weston.co.uk"/>
            </div>
            <div className={`${styles.cell} ${styles.cellT}`}>
              <PrimaryField label="Phone" value="+44 7700 ••••• 1" mono/>
            </div>

            <div className={`${styles.cell} ${styles.cellT} ${styles.cellR}`}>
              <PrimaryField label="Dietary" value="No restrictions"/>
            </div>
            <div className={`${styles.cell} ${styles.cellT} ${styles.cellR}`}>
              <PrimaryField label="Accessibility" value="None required"/>
            </div>
            <div className={`${styles.cell} ${styles.cellT}`}>
              <PrimaryField
                label="Emergency Contact"
                value="James Weston"
                sub="+44 7700 900123"
              />
            </div>
          </div>

          {/* Edit footer */}
          <div className={styles.cardFooter}>
            <div className={styles.editLink}>
              <span>Edit Profile</span>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#9A9080" strokeWidth="1.1" strokeLinecap="round">
                <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 2: Companions ── */}
      <div className={styles.section}>
        <div className={styles.sectionLabel}>Companions</div>
        <div className={styles.companionsGrid}>

          {/* James Weston */}
          <div className={styles.companionCard}>
            <div className={styles.compHeader}>
              <div className={styles.compHeaderLeft}>
                <div className={styles.avatarSm}>JW</div>
                <div>
                  <div className={styles.compName}>{james.name}</div>
                  <div className={styles.compRole}>Spouse · {james.nationality}</div>
                </div>
              </div>
              <CompletionRing pct={75} size={40} r={16}/>
            </div>

            <div className={styles.fieldsGrid2}>
              <div className={`${styles.cellSm} ${styles.cellR}`}>
                <div className={styles.fieldLabelSm}>Nationality</div>
                <div className={styles.fieldValSm}>British</div>
              </div>
              <div className={styles.cellSm}>
                <div className={styles.fieldLabelSm}>Passport</div>
                <div className={`${styles.fieldValSm} ${styles.fieldMono}`}>GB ••• 456</div>
              </div>
              <div className={`${styles.cellSm} ${styles.cellT} ${styles.cellR}`}>
                <div className={styles.fieldLabelSm}>Dietary</div>
                <div className={styles.fieldValSm}>Vegetarian</div>
              </div>
              <div className={`${styles.cellSm} ${styles.cellT}`}>
                <div className={styles.fieldLabelSm}>Accessibility</div>
                <div className={`${styles.fieldValSm} ${styles.fieldMuted}`}>Not specified</div>
              </div>
            </div>

            <div className={styles.cardFooter}>
              <div className={styles.editLink}>
                <span>Edit</span>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#9A9080" strokeWidth="1.1" strokeLinecap="round">
                  <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Isabelle Weston */}
          <div className={styles.companionCard}>
            <div className={styles.compHeader}>
              <div className={styles.compHeaderLeft}>
                <div className={styles.avatarSm}>IW</div>
                <div>
                  <div className={styles.compName}>{isabelle.name}</div>
                  <div className={styles.compRole}>Daughter · {isabelle.nationality}</div>
                </div>
              </div>
              <CompletionRing pct={60} size={40} r={16}/>
            </div>

            <div className={styles.fieldsGrid2}>
              <div className={`${styles.cellSm} ${styles.cellR}`}>
                <div className={styles.fieldLabelSm}>Nationality</div>
                <div className={styles.fieldValSm}>British</div>
              </div>
              <div className={styles.cellSm}>
                <div className={styles.fieldLabelSm}>Passport</div>
                <div className={`${styles.fieldValSm} ${styles.fieldAmber}`}>Not uploaded</div>
              </div>
              <div className={`${styles.cellSm} ${styles.cellT} ${styles.cellR}`}>
                <div className={styles.fieldLabelSm}>Dietary</div>
                <div className={styles.fieldValSm}>No nuts</div>
              </div>
              <div className={`${styles.cellSm} ${styles.cellT}`}>
                <div className={styles.fieldLabelSm}>Accessibility</div>
                <div className={`${styles.fieldValSm} ${styles.fieldMuted}`}>Not specified</div>
              </div>
            </div>

            {/* Alert notice */}
            <div className={styles.alertNotice}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#D49B50" strokeWidth="1.2" strokeLinecap="round">
                <circle cx="6" cy="6" r="5"/>
                <path d="M6 4v2.5M6 8.5v.5"/>
              </svg>
              <span>Passport required before journey approval</span>
            </div>

            <div className={styles.cardFooter}>
              <div className={styles.editLink}>
                <span>Edit</span>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#9A9080" strokeWidth="1.1" strokeLinecap="round">
                  <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 3: Shared Journey Preferences ── */}
      <div className={styles.section}>
        <div className={styles.sectionLabel}>Shared Journey Preferences</div>
        <div className={styles.prefsSub}>These guide Sofia when preparing destinations, experiences and properties.</div>
        <div className={styles.chips}>
          {ACTIVE_PREFS.map(p => (
            <div key={p} className={styles.chipActive}><span>{p}</span></div>
          ))}
          {PASSIVE_PREFS.map(p => (
            <div key={p} className={styles.chipPlain}><span>{p}</span></div>
          ))}
          <div className={styles.chipDashed}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#9A9080" strokeWidth="1.2" strokeLinecap="round">
              <path d="M5 1v8M1 5h8"/>
            </svg>
            <span>Add preference</span>
          </div>
        </div>
      </div>

      {/* ── Sections 4 + 5: side by side ── */}
      <div className={`${styles.section} ${styles.bottomGrid}`}>

        {/* Travel Documents */}
        <div className={styles.docsCard}>
          <div className={styles.sectionLabel}>Travel Documents</div>
          <div className={styles.docRows}>
            <div className={styles.docRow}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#7AB87A" strokeWidth="1.3" strokeLinecap="round">
                <path d="M1.5 6L4.5 9l6-6"/>
              </svg>
              <span className={styles.docText}>Passport uploaded</span>
            </div>
            <div className={styles.docRow}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#7AB87A" strokeWidth="1.3" strokeLinecap="round">
                <path d="M1.5 6L4.5 9l6-6"/>
              </svg>
              <span className={styles.docText}>Insurance uploaded</span>
            </div>
            <div className={styles.docRow}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#D49B50" strokeWidth="1.2" strokeLinecap="round">
                <circle cx="6" cy="6" r="5"/><path d="M6 3.5v3M6 8.5v.5"/>
              </svg>
              <span className={`${styles.docText} ${styles.docWarn}`}>Visa required</span>
            </div>
            <div className={styles.docRow}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#9A9080" strokeWidth="1.1" strokeLinecap="round">
                <circle cx="6" cy="6" r="5"/><path d="M6 3.5v3M6 8.5v.5"/>
              </svg>
              <span className={`${styles.docText} ${styles.docMuted}`}>Medical information</span>
            </div>
          </div>
          <div className={styles.cardFooter}>
            <Link href="/portal/documents" className={styles.editLink}>
              <span>View Documents</span>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#9A9080" strokeWidth="1.1" strokeLinecap="round">
                <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* Concierge note */}
        <div className={styles.sofiaCard}>
          <div className={styles.sofiaEyebrow}>A note</div>
          <div className={styles.sofiaFrom}>From Sofia Laurent</div>
          <div className={styles.sofiaQuote}>"Every traveller experiences a journey differently. Keeping these profiles complete allows us to prepare each moment with greater care."</div>
          <div className={styles.sofiaFooter}>
            <Link href="/portal/messages" className={styles.sofiaLink}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#C8A96A" strokeWidth="1.1" strokeLinecap="round">
                <path d="M10.5 7.5A1.5 1.5 0 0 1 9 9H3L1 11V2.5A1.5 1.5 0 0 1 2.5 1h7A1.5 1.5 0 0 1 11 2.5z"/>
              </svg>
              <span>Message Sofia</span>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#C8A96A" strokeWidth="1.1" strokeLinecap="round">
                <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Add Companion drawer ── */}
      {drawerOpen && (
        <div className={styles.drawerOverlay} onClick={() => setDrawerOpen(false)}>
          <div className={styles.drawer} onClick={e => e.stopPropagation()}>

            {/* Drawer header */}
            <div className={styles.drawerHeader}>
              <div>
                <div className={styles.drawerTitle}>Add Companion</div>
                <div className={styles.drawerNote}>All fields can be updated later.</div>
              </div>
              <button className={styles.drawerClose} onClick={() => setDrawerOpen(false)}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#9A9080" strokeWidth="1.2" strokeLinecap="round">
                  <path d="M2 2l10 10M12 2L2 12"/>
                </svg>
              </button>
            </div>

            {/* Drawer form */}
            <div className={styles.drawerBody}>
              <div className={styles.formRow2}>
                <div>
                  <div className={styles.formLabel}>First Name</div>
                  <input className={styles.formInput} type="text" placeholder="First name"/>
                </div>
                <div>
                  <div className={styles.formLabel}>Last Name</div>
                  <input className={styles.formInput} type="text" placeholder="Last name"/>
                </div>
              </div>
              {[
                { label: 'Relationship',               ph: 'e.g. Spouse, Child, Parent'       },
                { label: 'Nationality',                ph: 'Country of nationality'            },
                { label: 'Passport Number',            ph: 'Passport number'                   },
                { label: 'Date of Birth',              ph: 'DD / MM / YYYY'                    },
                { label: 'Dietary Requirements',       ph: 'e.g. Vegetarian, No shellfish'     },
              ].map(f => (
                <div key={f.label} className={styles.formGroup}>
                  <div className={styles.formLabel}>{f.label}</div>
                  <input className={styles.formInput} type="text" placeholder={f.ph}/>
                </div>
              ))}
              <div className={styles.formGroup}>
                <div className={styles.formLabel}>Accessibility Requirements</div>
                <textarea className={styles.formTextarea} placeholder="Any accessibility needs or requirements..." rows={3}/>
              </div>
            </div>

            {/* Drawer footer */}
            <div className={styles.drawerFooter}>
              <button className={styles.drawerCancel} onClick={() => setDrawerOpen(false)}>Cancel</button>
              <button className={styles.drawerSave} onClick={() => setDrawerOpen(false)}>
                <span>Save Companion</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
