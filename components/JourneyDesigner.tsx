import Link from 'next/link';
import styles from './JourneyDesigner.module.css';

export default function JourneyDesigner() {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {/* Left: editorial copy */}
        <div>
          <div className={styles.eyebrow}><div className={styles.eyebrowLine}/>Journey Workspace</div>
          <h2 className={styles.heading}>Design your journey<br /><em>with quiet intelligence.</em></h2>
          <p className={styles.body}>Meridian's workspace blends your preferences with our concierge's expertise. The AI suggests. Your concierge refines. You decide. Nothing is booked until you are certain.</p>

          <div className={styles.flow}>
            {[
              { num: 'I', label: 'Dream', sub: 'Share who you are when you travel at your best', active: true },
              { num: 'II', label: 'Set the tone', sub: 'Pace, style, the things that matter most', active: false },
              { num: 'III', label: 'Your workspace', sub: 'Seven journeys shaped to your preferences, now visible', active: true, highlight: true },
              { num: 'IV', label: 'Refine with your concierge', sub: 'Until every detail feels right', active: false },
              { num: 'V', label: 'Your journey begins', sub: 'Nothing is confirmed until you are ready', active: false },
            ].map(({ num, label, sub, active, highlight }) => (
              <div key={num} className={highlight ? styles.flowItemHighlight : styles.flowItem}>
                <div className={active && !highlight ? styles.flowNumActive : highlight ? styles.flowNumHighlight : styles.flowNum}>{num}</div>
                <div className={styles.flowContent}>
                  <div className={active || highlight ? styles.flowLabelActive : styles.flowLabel}>{label}</div>
                  <div className={styles.flowSub}>{sub}</div>
                </div>
              </div>
            ))}
          </div>

          <Link href="/journey-builder" className={styles.cta}>Compose your journey</Link>
        </div>

        {/* Right: workspace card */}
        <div className={styles.workspaceCard}>
          <div className={styles.cardHeader}>
            <div>
              <div className={styles.cardEyebrow}>Journey Workspace</div>
              <div className={styles.cardTitle}>Japan · 12 nights</div>
            </div>
            <div className={styles.editRow}>
              <span className={styles.editText}>Edit</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="oklch(42% 0.012 60)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6,9 12,15 18,9"/>
              </svg>
            </div>
          </div>

          <div className={styles.cardSection}>
            <div className={styles.sectionLabel}>Destinations</div>
            <div className={styles.chips}>
              <div className={styles.chipActive}>Kyoto</div>
              <div className={styles.chip}>Hakone</div>
              <div className={styles.chip}>Tokyo</div>
              <div className={styles.chipAdd}>+ Add</div>
            </div>
          </div>

          <div className={styles.cardSection}>
            <div className={styles.sectionLabel}>Itinerary</div>
            <div className={styles.timeline}>
              <div className={styles.timelineLine}/>
              {[
                { days: 'Day 1–4', dest: 'Kyoto · Gion & Arashiyama', active: true },
                { days: 'Day 5–8', dest: 'Hakone · Gōra Kadan Ryokan', active: false },
                { days: 'Day 9–12', dest: 'Tokyo · Aman Tokyo', active: false },
              ].map(({ days, dest, active }) => (
                <div key={days} className={styles.timelineItem}>
                  <div className={active ? styles.dotActive : styles.dot}/>
                  <div>
                    <div className={styles.dayLabel}>{days}</div>
                    <div className={active ? styles.destActive : styles.dest}>{dest}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.cardSection}>
            <div className={styles.suggestion}>
              <div className={styles.suggestionHeader}>
                <div className={styles.suggestionIcon}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="var(--m-gold-d)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88"/>
                  </svg>
                </div>
                <span className={styles.suggestionLabel}>Meridian Suggestion</span>
              </div>
              <div className={styles.suggestionTitle}>Add a forest morning at Hakone.</div>
              <p className={styles.suggestionDesc}>Gōra Kadan's private onsen overlooks Mt Fuji. Available at dawn. Only 4 guests per morning.</p>
              <div className={styles.suggestionActions}>
                <button className={styles.btnAdd}>Add</button>
                <button className={styles.btnExplore}>Explore</button>
              </div>
            </div>
          </div>

          <div className={styles.cardFooter}>
            <div className={styles.avatarCircle}/>
            <div className={styles.conciergeInfo}>
              <div className={styles.conciergeName}>Sofia Laurent</div>
              <div className={styles.conciergeStatus}>Your concierge · Available now</div>
            </div>
            <button className={styles.msgBtn}>Message</button>
          </div>
        </div>
      </div>
    </section>
  );
}
