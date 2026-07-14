import Image from 'next/image';
import styles from './JourneyDetailQuiet.module.css';

export default function JourneyDetailQuiet() {
  return (
    <section className={styles.section}>
      <div className={styles.bg}>
        <Image src="/images/Journey detail template/JD-QUIET-01.png" alt="A quiet moment on the journey" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
      </div>
      <div className={styles.vignette} />
      <div className={styles.quoteWrap}>
        <p className={styles.quote}>
          &ldquo;The best moments of this journey will not be in the places your concierge arranged. They will be in the spaces between them.&rdquo;
        </p>
      </div>
    </section>
  );
}
