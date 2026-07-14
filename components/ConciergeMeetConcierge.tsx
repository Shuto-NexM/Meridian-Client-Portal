import Image from 'next/image';
import Link from 'next/link';
import styles from './ConciergeMeetConcierge.module.css';

export default function ConciergeMeetConcierge() {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {/* Image side */}
        <div className={styles.imgSide}>
          <div className={styles.imgBg} />
          <Image src="/images/Private concierge Begin your Journey Our story/PC-PORT-01.png" alt="Concierge mid-thought, notebook open" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
          <div className={styles.imgCaption}>MERIDIAN Concierge · Private library · London</div>
        </div>

        {/* Text side */}
        <div className={styles.textSide}>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <span>Meet your concierge</span>
          </div>
          <h2 className={styles.h2}>
            One person.<br />
            Every journey.
          </h2>
          <p className={styles.p}>You will work with the same concierge from the first conversation to the return. They will be the person who proposed the journey, who refined it with you, who made the adjustments when the morning suggested a different direction, and who writes to you after the return to begin the conversation about what comes next.</p>
          <p className={styles.p}>This continuity is not a feature of our service. It is its foundation. The quality of a journey is directly related to the quality of the relationship that shaped it. And the quality of that relationship improves, like all genuine relationships, with time.</p>

          <div className={styles.details}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Availability</span>
              <span className={styles.detailVal}>By correspondence, by appointment, always responsive</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Continuity</span>
              <span className={styles.detailVal}>One concierge across your complete journey history</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Languages</span>
              <span className={styles.detailVal}>English, French, Japanese, German, Italian, Spanish</span>
            </div>
          </div>

          <Link href="/begin-your-journey" className={styles.btnGold}>Write to your concierge</Link>
        </div>
      </div>
    </section>
  );
}
