import styles from './BeginQuote.module.css';

export default function BeginQuote() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.goldLine} />
        <blockquote className={styles.quote}>
          &ldquo;The most meaningful journeys are always the ones that began not with a destination but with an honest account of what was needed. That account is all we ask for.&rdquo;
        </blockquote>
        <div className={styles.attribution}>— MERIDIAN Concierge Philosophy</div>
      </div>
    </section>
  );
}
