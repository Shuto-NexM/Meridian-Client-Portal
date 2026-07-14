import styles from './JournalHero.module.css';

export default function JournalHero() {
  return (
    <section className={styles.section}>
      <div className={styles.top}>
        <div className={styles.left}>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <span>MERIDIAN Private Journeys</span>
          </div>
          <h1 className={styles.h1}>
            The<br />
            <em className={styles.h1Italic}>Journal</em>
          </h1>
        </div>
        <div className={styles.right}>
          <p className={styles.intro}>
            Essays on slow travel, place, light, craft, and the particular quality of attention that a well-chosen journey produces. Published without schedule, whenever something is worth saying.
          </p>
        </div>
      </div>

      <div className={styles.issueLine}>
        <div className={styles.issueItem}>
          <span className={styles.issueLabel}>Volume</span>
          <span className={styles.issueVal}>VII</span>
        </div>
        <div className={styles.issueDivider} />
        <div className={styles.issueItem}>
          <span className={styles.issueLabel}>Season</span>
          <span className={`${styles.issueVal} ${styles.issueValItalic}`}>Autumn 2026</span>
        </div>
        <div className={styles.issueDivider} />
        <div className={styles.issueItem}>
          <span className={styles.issueLabel}>Essays</span>
          <span className={styles.issueVal}>42 published</span>
        </div>
      </div>
    </section>
  );
}
