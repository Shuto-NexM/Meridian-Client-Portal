import styles from './OurStoryManifesto.module.css';

export default function OurStoryManifesto() {
  return (
    <section className={styles.section}>
      <div className={styles.topLine} />
      <div className={styles.inner}>
        <div className={styles.goldLine} />
        <div className={styles.label}>What MERIDIAN is</div>
        <h2 className={styles.h2}>MERIDIAN is the belief that the best version of a journey has always been the slow one.</h2>
        <p className={styles.body}>That the place arrived at quickly and left quickly was never fully arrived at. That the morning rushed through was a morning not had. That the experience consumed rather than inhabited was an experience that left no trace — neither in the place itself nor in the person who passed through it.</p>
        <p className={styles.italic}>We design journeys for people who have decided that the next one will be different. That they will arrive earlier, stay longer, and leave with something they cannot immediately describe but will carry for a long time.</p>
      </div>
    </section>
  );
}
