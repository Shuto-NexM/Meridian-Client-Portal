import styles from './WellnessPhilosophy.module.css';

export default function WellnessPhilosophy() {
  return (
    <section id="philosophy" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <span>The Philosophy</span>
          </div>
          <h2 className={styles.heading}>
            Not every journey<br />changes where you are.<br />
            <em className={styles.headingMuted}>Some simply return you.</em>
          </h2>
        </div>

        <div className={styles.bodyGrid}>
          <div>
            <p className={styles.body}>There is a form of tiredness that sleep does not cure. A particular kind of distance from oneself that accumulates not in the body but in the quality of one&rsquo;s attention — in the gradual inability to notice the small things, to be surprised, to feel the specific weight of a morning that has not yet decided what kind of morning it will become.</p>
            <p className={styles.body}>This is the condition that MERIDIAN&rsquo;s Wellness &amp; Restoration journeys are designed to address. Not with treatments or programmes or prescribed relaxation, but with the particular medicine of unhurried time in places that still know how to be quiet.</p>
          </div>
          <div>
            <p className={styles.body}>Restoration, as MERIDIAN understands it, is not something that is done to a person. It is something that occurs in the right conditions — when the pace of a place matches the pace of a body that has been allowed to slow down, when the quality of the light communicates that this hour does not require anything of you, when the sequence of each day is shaped by inclination rather than obligation.</p>
            <p className={styles.body}>Every journey in this collection begins with a question. Not where would you like to go, but what do you most need to leave behind?</p>
          </div>
        </div>

        <div className={styles.quoteWrapper}>
          <blockquote className={styles.blockquote}>
            &ldquo;The most profound restoration occurs not when something is added to a life, but when something is removed from it &mdash; and the space that remains turns out to have always been enough.&rdquo;
          </blockquote>
        </div>
      </div>
    </section>
  );
}
