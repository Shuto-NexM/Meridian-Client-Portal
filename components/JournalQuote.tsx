import styles from './JournalQuote.module.css';

export default function JournalQuote() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.goldLine} />
        <blockquote className={styles.quote}>
          &ldquo;The essay that takes its time communicates something that the article written to deadline cannot: that what is being said was worth the time it took to understand it. Slowness in writing, as in travel, is a form of respect.&rdquo;
        </blockquote>
        <div className={styles.attribution}>— From the MERIDIAN Journal Editorial Philosophy</div>
      </div>
    </section>
  );
}
