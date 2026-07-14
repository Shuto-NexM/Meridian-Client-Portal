import Image from 'next/image';
import styles from './JourneyDetailStays.module.css';

export default function JourneyDetailStays() {
  return (
    <section className={styles.section}>

      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <span>Places You&rsquo;ll Stay</span>
          </div>
          <h2 className={styles.h2}>
            Two properties.<br />
            <em className={styles.h2Italic}>Each chosen for one reason.</em>
          </h2>
        </div>
        <p className={styles.headerIntro}>
          We select accommodation not for their awards or their rate, but for the quality of the morning they produce. Both of these properties have mornings worth waking up early for.
        </p>
      </div>

      {/* Property 1: Full width */}
      <div className={styles.prop1}>
        <div className={styles.prop1Bg}>
          <Image src="/images/Journey detail template/JD-STAY-01.png" alt="Gion private townhouse" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
        </div>
        <div className={styles.prop1LeftOverlay} />
        <div className={styles.prop1BottomOverlay} />
        <div className={styles.prop1TopText}>
          <div className={styles.prop1Nights}>Nights 1 &amp; 2</div>
          <div className={styles.prop1Location}>Gion, Kyoto</div>
        </div>
        <div className={styles.prop1BottomText}>
          <h3 className={styles.prop1Title}>Gion private townhouse.</h3>
          <p className={styles.prop1Body}>
            Built in the late Edo period and preserved with extraordinary care. A machiya on a lane that does not appear on tourist maps — shaded, silent, and completely private. The interior has been prepared to receive exactly one party at a time.
          </p>
          <div className={styles.prop1Stats}>
            <div>
              <div className={styles.prop1StatLabel}>Architecture</div>
              <div className={styles.prop1StatVal}>Traditional machiya</div>
            </div>
            <div className={styles.prop1StatDivider} />
            <div>
              <div className={styles.prop1StatLabel}>Setting</div>
              <div className={styles.prop1StatVal}>Gion · temple garden rear</div>
            </div>
            <div className={styles.prop1StatDivider} />
            <div>
              <div className={styles.prop1StatLabel}>Capacity</div>
              <div className={styles.prop1StatVal}>Exclusive use</div>
            </div>
          </div>
        </div>
      </div>

      {/* Property 2: Split layout */}
      <div className={styles.prop2}>
        <div className={styles.prop2ImgWrap}>
          <div className={styles.prop2ImgBg} />
          <Image src="/images/Journey detail template/JD-STAY-02.png" alt="Hoshinoya Kyoto" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
        </div>
        <div className={styles.prop2Text}>
          <div className={styles.prop2Top}>
            <div className={styles.prop2Nights}>Nights 3–5 · Arashiyama</div>
            <h3 className={styles.prop2Title}>Hoshinoya Kyoto.</h3>
            <p className={styles.prop2Body}>
              The only luxury property in Kyoto accessible only by boat. Forty-five rooms set into the forested hillside above the Oi River. No road. No street noise. The forest at the window, the thermal bath at any hour, the kitchen garden on the slope above the kitchen that supplies it.
            </p>
            <p className={styles.prop2Body}>
              We selected this property for one reason: the quality of the morning it produces. At six o&rsquo;clock, when the mist sits on the river and the bamboo above the property begins to carry the first light, there is nowhere else in Kyoto we would rather have you wake up.
            </p>
          </div>
          <div className={styles.prop2Bottom}>
            <div className={styles.prop2Stats}>
              <div>
                <div className={styles.prop2StatLabel}>Access</div>
                <div className={styles.prop2StatVal}>River boat only</div>
              </div>
              <div className={styles.prop2StatDivider} />
              <div>
                <div className={styles.prop2StatLabel}>Setting</div>
                <div className={styles.prop2StatVal}>Arashiyama forest</div>
              </div>
              <div className={styles.prop2StatDivider} />
              <div>
                <div className={styles.prop2StatLabel}>Bathing</div>
                <div className={styles.prop2StatVal}>Thermal spring</div>
              </div>
            </div>
            <button className={styles.ghostBtn}>About this property</button>
          </div>
        </div>
      </div>

    </section>
  );
}
