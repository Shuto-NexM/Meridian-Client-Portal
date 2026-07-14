import Image from 'next/image';
import styles from './OurStoryHowWeCurate.module.css';

export default function OurStoryHowWeCurate() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* Split: image left, text right */}
        <div className={styles.split}>
          <div className={styles.imgPh}>
            <Image src="/images/Private concierge Begin your Journey Our story/OS-CURA-01.png" alt="How we curate" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
            <div className={styles.imgCaption}>Hoshinoya Kyoto · First visit · October 2019 · 05:40</div>
          </div>
          <div className={styles.textPanel}>
            <div className={styles.eyebrow}>
              <div className={styles.eyebrowLine} />
              <span>How we curate</span>
            </div>
            <h2 className={styles.h2}>We go first. We stay long enough to know.</h2>
            <p className={styles.p}>Nothing enters the MERIDIAN archive because it was recommended by a ratings system, or because it sought our attention, or because it has a marketing department that made a persuasive case for its inclusion. Everything in our archive was visited by a person who spent enough time there to understand its particular character — the specific quality of its mornings, the specific kind of guest it serves best, the specific hours and seasons in which it communicates something extraordinary.</p>
            <p className={styles.p}>We have declined many properties that were objectively excellent. We have included several that would not appear in any other collection of luxury properties. The criterion is always the same: does this place, at the right hour and in the right season, produce an experience that could not be replicated anywhere else? If the answer is yes, it belongs. If not, it does not — regardless of its reputation.</p>
          </div>
        </div>

        {/* Curation principles */}
        <div className={styles.principles}>
          <div className={styles.principle}>
            <div className={styles.principleLabel} style={{ color: 'var(--m-gold)' }}>We select for</div>
            <p className={styles.principleBody}>The quality of a specific morning. A specific view at a specific hour. The particular atmosphere that belongs to one place and no other. The thing that cannot be replicated by any other property at any other season.</p>
          </div>
          <div className={`${styles.principle} ${styles.principleMiddle}`}>
            <div className={styles.principleLabel}>We visit personally</div>
            <p className={styles.principleBody}>At the season and hour that each property belongs to most completely. A property that is perfect in July is not necessarily the same property in November. We visit both and decide which belongs to our archive and when.</p>
          </div>
          <div className={`${styles.principle} ${styles.principleLast}`}>
            <div className={styles.principleLabel}>We return</div>
            <p className={styles.principleBody}>Properties are removed from the archive when the quality changes — not when they become unfashionable. Some of the most important places in our archive have been there since we began. Others have been there for one season only.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
