import styles from './ConciergePhilosophy.module.css';

export default function ConciergePhilosophy() {
  return (
    <section id="philosophy" className={styles.section}>
      <div className={styles.inner}>

        <div className={styles.heading}>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <span>Our Philosophy</span>
          </div>
          <h2 className={styles.h2}>
            Exceptional journeys begin<br />
            with exceptional<br />
            <em className={styles.h2Em}>listening.</em>
          </h2>
        </div>

        <div className={styles.cols}>
          <div>
            <p className={styles.p}>The standard approach to designing a journey begins with a destination. A place is proposed, an itinerary is assembled around it, and the traveller is fitted into the structure. This is efficient, and it produces entirely satisfactory journeys. But it is not what we do, and the difference between what we do and what is standard produces a different kind of journey entirely.</p>
            <p className={styles.p}>We begin with the person. With a conversation — sometimes short, sometimes the first of many — that is not about where you would like to go but about the quality of time you are looking for, the particular form of experience you most need, and the things you find genuinely nourishing rather than merely pleasant. The destination emerges from that understanding rather than preceding it.</p>
          </div>
          <div>
            <p className={styles.p}>Your concierge is not a specialist in any particular region or collection. They are a specialist in you — in the particular way you travel, the quality of accommodation that makes you feel at home rather than merely comfortable, the hours you prefer and the pace that suits the way you actually move through a place. This knowledge is accumulated over the course of your first journey and refined with each subsequent one.</p>
            <p className={styles.p}>The most valued relationships we have with our guests are those that have developed across many years and many journeys — in which the conversations about what is needed have become shorter because the understanding is already there.</p>
          </div>
        </div>

        <div className={styles.quoteWrap}>
          <blockquote className={styles.quote}>
            &ldquo;We have never once designed a journey by beginning with the destination. We begin with the person, and the journey becomes a consequence of understanding them.&rdquo;
          </blockquote>
        </div>

      </div>
    </section>
  );
}
