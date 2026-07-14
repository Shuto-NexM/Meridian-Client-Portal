import Link from 'next/link';
import { JOURNEYS } from '@/data/journeys';
import styles from './WorkspaceSelector.module.css';

export default function WorkspaceSelector() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.eyebrow}>
          <div className={styles.eyebrowLine} />
          Journey Workspace
        </div>
        <h1 className={styles.heading}>Select a workspace</h1>
        <p className={styles.sub}>
          These are prototype workspaces for journeys currently in preparation.
          Each one is private — accessible only through your account.
        </p>

        <div className={styles.grid}>
          {JOURNEYS.map(j => (
            <Link key={j.slug} href={`/journey-workspace/${j.slug}`} className={styles.card}>
              <div className={styles.cardTop}>
                <div className={styles.cardRegion}>{j.region}</div>
                <div className={styles.cardNights}>{j.nights} nights</div>
              </div>
              <div className={styles.cardTitle}>{j.title}</div>
              <div className={styles.cardDests}>
                {j.destinations.map((d, i) => (
                  <span key={d.id}>
                    {d.name}{i < j.destinations.length - 1 ? <span className={styles.destSep}> · </span> : null}
                  </span>
                ))}
              </div>
              <div className={styles.cardCta}>
                Open workspace
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.footer}>
          <div className={styles.footerLine} />
          <p className={styles.footerNote}>
            Your workspace is updated by your concierge as the journey takes shape.
            Nothing here is final until you confirm it.
          </p>
        </div>
      </div>
    </div>
  );
}
