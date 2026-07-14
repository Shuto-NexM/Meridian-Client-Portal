import styles from './AdventurePhilosophy.module.css';

export default function AdventurePhilosophy() {
  return (
    <section id="philosophy" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <span>The Philosophy</span>
          </div>
          <h2 className={styles.h2}>
            Nature does not<br />
            perform for visitors.<br />
            <em>It simply is.</em>
          </h2>
        </div>

        <div className={styles.body}>
          <div>
            <p className={styles.p}>The landscapes in this collection are not backdrops. They are not the setting for an experience — they are the experience itself. The difference is important, and it determines everything about how these journeys are designed. A backdrop receives whatever the viewer brings to it. A landscape imposes its own terms. It has its own pace, its own weather, its own quality of light at its own hours. The visitor who proceeds at the landscape's pace finds something. The visitor who tries to proceed at their own pace usually misses it.</p>
            <p className={styles.p}>This is not a collection about achievement. None of these journeys ask you to reach a summit or to complete a distance. They ask something more demanding: to be sufficiently still, for a sufficient number of hours, that a landscape of genuine age and scale can communicate something to you that it has no interest in communicating to anyone in a hurry.</p>
          </div>
          <div>
            <p className={styles.p}>The landscapes we have chosen share one quality above all others: they are old enough that the human presence within them — even the presence of a small party moving quietly — reads as temporary. The Patagonian steppe was here three million years before anyone walked on it. The Faroese cliffs have been absorbing the Atlantic for longer than recorded human history. This quality of deep time produces, in the person who remains in it long enough, a particular quality of proportion: a calibration of one's own concerns against something that has no interest in them whatsoever.</p>
            <p className={styles.p}>This recalibration is not a side effect of these journeys. It is their purpose.</p>
          </div>
        </div>

        <div className={styles.quoteWrap}>
          <blockquote className={styles.quote}>
            &ldquo;The landscape that most changes a person is never the most dramatic one. It is the one they were patient enough to remain in until it revealed something the first hour never showed.&rdquo;
          </blockquote>
        </div>
      </div>
    </section>
  );
}
