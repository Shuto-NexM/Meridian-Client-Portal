import Link from 'next/link';
import s from './PastJourneyView.module.css';

interface Props { title: string; season: string; nights: number; destinations: string[]; }

export default function PastJourneyView({ title, season, nights, destinations }: Props) {
  return (
    <div className={s.page}>
      <div className="topBar">
        <span className="topDate">Journey Archive</span>
        <Link href="/portal/journeys" style={{ fontSize: 11, color: 'var(--p-muted)', letterSpacing: '0.06em', textDecoration: 'none' }}>← My Journeys</Link>
      </div>
      <h1 className="pageHeading">{title}</h1>
      <p className="pageSubheading">{season} · {nights} Nights</p>

      <div className={s.grid}>
        <div className={s.destinations}>
          {destinations.map(d => (
            <div key={d} className={s.destRow}>
              <span className={s.destDot} />
              <span className={s.destName}>{d}</span>
            </div>
          ))}
        </div>
        <div className={s.note}>
          <div className={s.noteTitle}>Journey Archive</div>
          <p className={s.noteText}>This journey is part of your permanent travel archive. Contact Sofia to revisit memories, retrieve documents, or plan a return visit.</p>
          <Link href="/portal/messages" className="btnGold">Message Sofia</Link>
        </div>
      </div>
    </div>
  );
}
