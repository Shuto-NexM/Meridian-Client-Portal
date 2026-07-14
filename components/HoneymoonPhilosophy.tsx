import styles from './HoneymoonPhilosophy.module.css';

export default function HoneymoonPhilosophy() {
  return (
    <section id="philosophy" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <span>The Philosophy</span>
          </div>
          <h2 className={styles.h2}>
            Not every beginning<br />
            needs to be celebrated.<br />
            <em>Some simply need time.</em>
          </h2>
        </div>

        <div className={styles.body}>
          <div>
            <p className={styles.p}>The journeys in this collection were not designed around the idea of the honeymoon as an occasion. Occasions end. What we were interested in — what every journey here is constructed to produce — is the quality of presence that two people achieve when the structure of ordinary life has been removed from around them and something quieter put in its place.</p>
            <p className={styles.p}>This is not easily purchased. It requires time — more time than most people allow themselves — and it requires the right quality of place: somewhere that does not fill every available hour with activities, that considers the unscheduled afternoon a success rather than a failure, and that understands the particular luxury of two people sitting together in comfortable silence with nowhere they need to be.</p>
          </div>
          <div>
            <p className={styles.p}>The beginning of a shared life is not an event. It is the first instalment of an accumulated experience whose quality depends almost entirely on the quality of attention given to it. A honeymoon designed around performance — around the kind of luxury that makes a good story — produces a story. A honeymoon designed around presence produces something harder to articulate and considerably more lasting.</p>
            <p className={styles.p}>Every journey here begins from this understanding. The places, the properties, the pace — all of it is chosen not to impress but to create the conditions under which two people can remember, without effort, why they chose each other.</p>
          </div>
        </div>

        <div className={styles.quoteWrap}>
          <blockquote className={styles.quote}>
            &ldquo;The most intimate thing two people can do in a beautiful place is to stop trying to make the most of it, and simply be in it together.&rdquo;
          </blockquote>
        </div>
      </div>
    </section>
  );
}
