'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import styles from './settings.module.css';
import { PORTAL_USER } from '@/data/portal';

type Section = 'notifications' | 'language' | 'privacy' | 'security' | 'signout';
type Modal   = 'password' | 'signout' | 'delete' | null;

interface NotifState { email: boolean; app: boolean; }
interface Notifs {
  message: NotifState; proposal: NotifState; document: NotifState;
  payment: NotifState; status: NotifState; predep: NotifState;
}

function Toggle({ on, onToggle, label }: { on: boolean; onToggle: () => void; label?: string }) {
  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(); }
  }
  return (
    <div
      className={`${styles.toggle} ${on ? styles.toggleOn : styles.toggleOff}`}
      onClick={onToggle}
      onKeyDown={handleKey}
      role="switch"
      aria-checked={on}
      aria-label={label}
      tabIndex={0}
    >
      <div className={`${styles.knob} ${on ? styles.knobOn : ''}`}/>
    </div>
  );
}

const NOTIF_ROWS: { key: keyof Notifs; label: string; sub: string }[] = [
  { key: 'message',  label: 'New concierge message',    sub: 'When Sofia sends you a message'         },
  { key: 'proposal', label: 'Journey proposal updated', sub: 'When your itinerary or proposal changes' },
  { key: 'document', label: 'Document added',           sub: 'When a new document is shared'          },
  { key: 'payment',  label: 'Payment due',              sub: 'Reminders before payment dates'         },
  { key: 'status',   label: 'Journey status changed',   sub: 'Approved, confirmed, or updated'        },
  { key: 'predep',   label: 'Pre-departure reminder',   sub: '48h before your journey begins'         },
];

export default function SettingsPage() {
  const [section,    setSection]    = useState<Section>('notifications');
  const [modal,      setModal]      = useState<Modal>(null);
  const [saved,      setSaved]      = useState(false);
  const [twoFactor,  setTwoFactor]  = useState(false);
  const [marketing,  setMarketing]  = useState(true);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (saveTimerRef.current) clearTimeout(saveTimerRef.current); }, []);
  useEffect(() => {
    if (!modal) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setModal(null); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [modal]);

  const [notifs, setNotifs] = useState<Notifs>({
    message:  { email: true,  app: true  },
    proposal: { email: true,  app: true  },
    document: { email: false, app: true  },
    payment:  { email: true,  app: true  },
    status:   { email: true,  app: false },
    predep:   { email: true,  app: true  },
  });

  function toggleNotif(key: keyof Notifs, ch: 'email' | 'app') {
    setNotifs(prev => ({ ...prev, [key]: { ...prev[key], [ch]: !prev[key][ch] } }));
  }

  function handleSave() {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    setSaved(true);
    saveTimerRef.current = setTimeout(() => setSaved(false), 2500);
  }

  const NAV: { key: Section; label: string; muted?: boolean }[] = [
    { key: 'notifications', label: 'Notifications'       },
    { key: 'language',      label: 'Language & Currency' },
    { key: 'privacy',       label: 'Privacy'             },
    { key: 'security',      label: 'Security'            },
    { key: 'signout',       label: 'Sign Out', muted: true },
  ];

  return (
    <>
      {/* Top bar */}
      <div className={`topBar ${styles.topBarSett}`}>
        <div className="topDate">Monday, 14 July 2026</div>
        <div className="topUser">
          <div className="topAvatar">EW</div>
          <span className="topUsername">Emily Weston</span>
        </div>
      </div>

      {/* Heading */}
      <div className={styles.heading}>
        <h1 className={styles.headingTitle}>Settings</h1>
        <div className={styles.headingSubtitle}>Manage how Meridian communicates with you and how your account is protected.</div>
      </div>

      {/* Two-column layout */}
      <div className={styles.layout}>

        {/* ── Settings nav ── */}
        <div className={styles.navPanel}>
          {NAV.map(n => (
            <button
              key={n.key}
              type="button"
              className={`btnReset ${styles.navItem} ${section === n.key ? styles.navItemActive : ''} ${n.muted ? styles.navItemMuted : ''}`}
              onClick={() => setSection(n.key)}
              aria-pressed={section === n.key}
            >
              {n.label}
            </button>
          ))}
        </div>

        {/* ── Content area ── */}
        <div className={styles.content}>

          {/* NOTIFICATIONS */}
          {section === 'notifications' && (
            <div className={styles.panel} key="notifications">
              <div className={styles.panelTitle}>Notifications</div>
              <div className={styles.panelNote} style={{ marginBottom: 32 }}>Choose how you hear from Sofia and the Meridian team.</div>

              {/* Column headers */}
              <div className={`${styles.notifRow} ${styles.notifHead}`}>
                <div/>
                <div className={styles.notifColLabel}>Email</div>
                <div className={styles.notifColLabel}>In-app</div>
              </div>

              {NOTIF_ROWS.map((row, i) => (
                <div key={row.key} className={`${styles.notifRow} ${i < NOTIF_ROWS.length - 1 ? styles.notifRowBorder : ''}`}>
                  <div>
                    <div className={styles.notifLabel}>{row.label}</div>
                    <div className={styles.notifSub}>{row.sub}</div>
                  </div>
                  <div className={styles.notifToggleCell}>
                    <Toggle on={notifs[row.key].email} onToggle={() => toggleNotif(row.key, 'email')}/>
                  </div>
                  <div className={styles.notifToggleCell}>
                    <Toggle on={notifs[row.key].app} onToggle={() => toggleNotif(row.key, 'app')}/>
                  </div>
                </div>
              ))}

              <div className={styles.essentialNote}>
                Essential security and account messages cannot be disabled.
              </div>
            </div>
          )}

          {/* LANGUAGE & CURRENCY */}
          {section === 'language' && (
            <div className={styles.panel} key="language">
              <div className={styles.panelTitle}>Language &amp; Currency</div>
              <div className={styles.panelNote}>These preferences affect how information is displayed in the portal.</div>

              <div className={styles.langGrid}>
                {[
                  { id: 'sel-lang', label: 'Language',    options: ['English', 'Japanese', 'French'] },
                  { id: 'sel-cur',  label: 'Currency',    options: ['GBP — British Pound', 'USD — US Dollar', 'EUR — Euro', 'JPY — Japanese Yen'] },
                  { id: 'sel-date', label: 'Date Format', options: ['Day / Month / Year', 'Month / Day / Year'] },
                  { id: 'sel-time', label: 'Time Format', options: ['24-hour', '12-hour'] },
                ].map(f => (
                  <div key={f.label}>
                    <label htmlFor={f.id} className={styles.selectLabel}>{f.label}</label>
                    <div className={styles.selectWrap}>
                      <select id={f.id} className={styles.select} defaultValue={f.options[0]}>
                        {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                      <svg className={styles.selectChevron} width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#9A9080" strokeWidth="1.2" strokeLinecap="round">
                        <path d="M2 4l3 3 3-3"/>
                      </svg>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.langFooter}>
                <button className={styles.saveBtn} onClick={handleSave}>
                  <span>Save Changes</span>
                </button>
                {saved && (
                  <div className={styles.savedMsg}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#7AB87A" strokeWidth="1.3" strokeLinecap="round">
                      <path d="M1.5 6L4.5 9l6-6"/>
                    </svg>
                    <span>Changes saved.</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* PRIVACY */}
          {section === 'privacy' && (
            <div className={styles.panel} key="privacy">
              <div className={styles.panelTitle}>Privacy</div>
              <div className={styles.panelNote}>Your information is handled with discretion and never shared beyond your journey team.</div>

              {/* Profile visibility */}
              <div className={`${styles.privRow} ${styles.privRowHover}`}>
                <div>
                  <div className={styles.privRowTitle}>Profile visibility</div>
                  <div className={styles.privRowSub}>Your profile is visible only to your assigned concierge and the Meridian team.</div>
                </div>
                <div className={styles.privGreen}>Concierge only</div>
              </div>

              {/* Doc access history */}
              <div className={`${styles.privRow} ${styles.privRowHover}`}>
                <div>
                  <div className={styles.privRowTitle}>Document access history</div>
                  <div className={styles.privRowSub}>Meridian retains a record of when documents are viewed or downloaded.</div>
                </div>
                <div className={styles.privAction}>View log</div>
              </div>

              {/* Marketing comms */}
              <div className={`${styles.privRow} ${styles.privRowHover}`}>
                <div>
                  <div className={styles.privRowTitle}>Marketing communications</div>
                  <div className={styles.privRowSub}>Occasional editorial content from Meridian about destinations and travel.</div>
                </div>
                <Toggle on={marketing} onToggle={() => setMarketing(!marketing)} label="Marketing communications"/>
              </div>

              {/* Data request */}
              <div className={styles.privRow}>
                <div>
                  <div className={styles.privRowTitle}>Data request</div>
                  <div className={styles.privRowSub}>You may request a copy of all personal data held by Meridian under GDPR.</div>
                  <div className={styles.privLink}>Request my data</div>
                </div>
              </div>

              {/* Account deletion */}
              <div className={`${styles.privRow} ${styles.privRowLast}`}>
                <div>
                  <div className={styles.privRowTitle}>Account deletion</div>
                  <div className={styles.privRowSub}>A deletion request will be reviewed by our team. Active journeys may affect timing.</div>
                  <button type="button" className={`btnReset ${styles.privLink}`} onClick={() => setModal('delete')}>Request account deletion</button>
                </div>
              </div>
            </div>
          )}

          {/* SECURITY */}
          {section === 'security' && (
            <div className={styles.panel} key="security">
              <div className={styles.panelTitle}>Security</div>
              <div className={styles.panelNote}>Your account is protected with industry-standard encryption.</div>

              {/* Email */}
              <div className={styles.secRow}>
                <div>
                  <div className={styles.secLabel}>Email Address</div>
                  <div className={styles.secValue}>{PORTAL_USER.email}</div>
                </div>
                <div className={styles.secAction}>Change</div>
              </div>

              {/* Password */}
              <div className={styles.secRow}>
                <div>
                  <div className={styles.secLabel}>Password</div>
                  <div className={`${styles.secValue} ${styles.secMono}`}>••••••••••</div>
                </div>
                <button type="button" className={`btnReset ${styles.secAction}`} onClick={() => setModal('password')}>Change password</button>
              </div>

              {/* 2FA */}
              <div className={styles.secRow}>
                <div>
                  <div className={styles.secLabel}>Two-factor Authentication</div>
                  <div className={styles.secSub}>Adds a second layer of verification on sign-in.</div>
                </div>
                <div className={styles.secToggleGroup}>
                  <span className={styles.secToggleLabel}>Not enabled</span>
                  <Toggle on={twoFactor} onToggle={() => setTwoFactor(!twoFactor)}/>
                </div>
              </div>

              {/* Active sessions */}
              <div className={styles.secRow}>
                <div>
                  <div className={styles.secLabel}>Active Sessions</div>
                  <div className={styles.secValue}>
                    This device
                    <span className={styles.secCurrentBadge}>Current</span>
                  </div>
                  <div className={styles.secSub}>1 other session · Safari on macOS</div>
                </div>
                <div className={styles.secAction}>Sign out others</div>
              </div>

              {/* Last sign-in */}
              <div className={`${styles.secRow} ${styles.secRowLast}`}>
                <div>
                  <div className={styles.secLabel}>Last Sign-in</div>
                  <div className={styles.secValue}>14 Jul 2026 · 09:23</div>
                  <div className={styles.secSub}>Safari · macOS · London, UK</div>
                </div>
              </div>
            </div>
          )}

          {/* SIGN OUT */}
          {section === 'signout' && (
            <div className={styles.panel} key="signout">
              <div className={styles.panelTitle}>Sign Out</div>
              <div className={`${styles.panelNote} ${styles.panelNoteWide}`}>
                You will remain signed in on other devices unless you choose to sign out of all sessions from the Security settings.
              </div>

              <div className={styles.signoutBox}>
                <div className={styles.signoutBoxTitle}>Sign out of this device</div>
                <div className={styles.signoutBoxNote}>You will need to enter your credentials to access the portal again.</div>
                <button className={styles.signoutBoxBtn} onClick={() => setModal('signout')}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#1A1510" strokeWidth="1.2" strokeLinecap="round">
                    <path d="M7.5 4V2.5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V8"/>
                    <path d="M4.5 6h6M8.5 4.5L10.5 6l-2 1.5"/>
                  </svg>
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Modals ── */}
      {modal && (
        <div className={styles.overlay} onClick={() => setModal(null)} aria-hidden="true">

          {/* Change Password */}
          {modal === 'password' && (
            <div
              className={styles.modalPw}
              onClick={e => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-pw-title"
            >
              <div className={styles.modalHeader}>
                <div id="modal-pw-title" className={styles.modalTitle}>Change Password</div>
              </div>
              <div className={styles.modalBody}>
                {[
                  { id: 'pw-current', label: 'Current Password',    ph: 'Enter current password', ac: 'current-password' },
                  { id: 'pw-new',     label: 'New Password',         ph: 'At least 12 characters', ac: 'new-password'     },
                  { id: 'pw-confirm', label: 'Confirm New Password', ph: 'Repeat new password',    ac: 'new-password'     },
                ].map(f => (
                  <div key={f.label} className={styles.modalField}>
                    <label htmlFor={f.id} className={styles.modalFieldLabel}>{f.label}</label>
                    <input id={f.id} type="password" placeholder={f.ph} autoComplete={f.ac} className={styles.modalInput}/>
                  </div>
                ))}
              </div>
              <div className={styles.modalFooter}>
                <button type="button" className={`btnReset ${styles.modalCancel}`} onClick={() => setModal(null)}>Cancel</button>
                <button type="button" className={styles.modalConfirmDark} onClick={() => setModal(null)}>
                  <span>Update Password</span>
                </button>
              </div>
            </div>
          )}

          {/* Sign Out Confirm */}
          {modal === 'signout' && (
            <div
              className={styles.modalSm}
              onClick={e => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-so-title"
            >
              <div className={styles.modalSmBody}>
                <div id="modal-so-title" className={styles.modalSmTitle}>Sign out?</div>
                <div className={styles.modalSmNote}>You will need to enter your credentials to access the portal again.</div>
              </div>
              <div className={styles.modalSmFooter}>
                <button type="button" className={styles.modalBtnBorder} onClick={() => setModal(null)}>
                  <span>Cancel</span>
                </button>
                <button type="button" className={styles.modalConfirmDark} onClick={() => setModal(null)}>
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}

          {/* Delete Account Confirm */}
          {modal === 'delete' && (
            <div
              className={styles.modalDel}
              onClick={e => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-del-title"
            >
              <div className={styles.modalSmBody}>
                <div id="modal-del-title" className={styles.modalSmTitle}>Request Account Deletion</div>
                <div className={styles.modalSmNote}>Your request will be reviewed by the Meridian team. Active journeys or financial obligations may affect the timeline of your request.</div>
                <div className={styles.modalAmber}>
                  This action is not immediate. A member of your journey team will be in touch to confirm next steps.
                </div>
              </div>
              <div className={`${styles.modalSmFooter} ${styles.modalSmFooterBorder}`}>
                <button type="button" className={styles.modalBtnBorder} onClick={() => setModal(null)}>
                  <span>Cancel</span>
                </button>
                <button type="button" className={styles.modalBtnBorderMuted} onClick={() => setModal(null)}>
                  <span>Submit Request</span>
                </button>
              </div>
            </div>
          )}

        </div>
      )}
    </>
  );
}
