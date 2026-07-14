import Image from 'next/image';
import Link from 'next/link';
import styles from './AdventureJourneys.module.css';

const ArrowIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" />
  </svg>
);

const ArrowSm = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" />
  </svg>
);

export default function AdventureJourneys() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <span>18 curated journeys</span>
          </div>
          <h2 className={styles.heading}>
            Landscapes that ask<br />
            <em>something of you.</em>
          </h2>
        </div>
        <Link href="/journeys" className={styles.viewAll}>View all journeys <ArrowIcon /></Link>
      </div>

      {/* Row 1: 1.5fr / 1fr */}
      <div className={styles.row1}>
        {/* Patagonia — wide */}
        <Link href="/journeys/patagonia" className={styles.card}>
          <div className={`${styles.img} ${styles.imgPatagonia}`}>
            <Image src="/images/Adventure & Landscape/AL-JNY-01.png" alt="Torres del Paine, Patagonia — adventure journey" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
            <div className={styles.imgOverlay} />
            <div className={styles.imgCaption}>Torres del Paine · 06:48</div>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.cardMeta}>9 nights · Patagonia, Chile</div>
            <h3 className={`${styles.cardTitle} ${styles.cardTitleLg}`}>
              <em>The world at the end of the map, still deciding what it wants to be.</em>
            </h3>
            <p className={styles.cardBody}>Nine nights in the Chilean and Argentine lake district, ending at Torres del Paine. Private estancias. Days shaped by weather rather than schedule. The condor on the thermal, the glacial colour of Lago Grey, the particular quality of silence that exists four hours from the nearest town.</p>
            <span className={styles.exploreLink}>Explore this journey <ArrowIcon /></span>
          </div>
        </Link>

        {/* Faroe Islands */}
        <Link href="/journeys/faroe-islands" className={styles.card}>
          <div className={`${styles.img} ${styles.imgFaroe}`}>
            <Image src="/images/Adventure & Landscape/AL-JNY-02.png" alt="Faroe Islands — adventure journey" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
            <div className={styles.imgOverlay} />
          </div>
          <div className={styles.cardContent}>
            <div className={styles.cardMeta}>6 nights · North Atlantic</div>
            <h3 className={`${styles.cardTitle} ${styles.cardTitleMd}`}>
              <em>Eighteen islands between Scotland and Iceland, convinced of their own sufficiency.</em>
            </h3>
            <span className={styles.exploreLink}>Explore this journey <ArrowIcon /></span>
          </div>
        </Link>
      </div>

      {/* Row 2: 1fr 1fr 1fr */}
      <div className={styles.row2}>
        <Link href="/journeys/lofoten" className={styles.card}>
          <div className={`${styles.imgMd} ${styles.imgLofoten}`}>
            <Image src="/images/Adventure & Landscape/AL-JNY-03.png" alt="Lofoten Islands, Norway — adventure journey" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
            <div className={styles.imgOverlay} />
          </div>
          <div className={styles.cardContent}>
            <div className={styles.cardMetaSm}>Lofoten, Norway · 7 nights</div>
            <h3 className={`${styles.cardTitle} ${styles.cardTitleSm}`}>
              <em>Mountains that rise directly from the sea, as if embarrassed by the arrangement.</em>
            </h3>
            <span className={styles.exploreLinkSm}>Explore <ArrowSm /></span>
          </div>
        </Link>

        <Link href="/journeys/iceland" className={styles.card}>
          <div className={`${styles.imgMd} ${styles.imgIceland}`}>
            <Image src="/images/Adventure & Landscape/AL-JNY-04.png" alt="Iceland Highlands — adventure journey" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
            <div className={styles.imgOverlay} />
          </div>
          <div className={styles.cardContent}>
            <div className={styles.cardMetaSm}>Iceland Highlands · 8 nights</div>
            <h3 className={`${styles.cardTitle} ${styles.cardTitleSm}`}>
              <em>The interior, in the season when it allows visitors.</em>
            </h3>
            <span className={styles.exploreLinkSm}>Explore <ArrowSm /></span>
          </div>
        </Link>

        <Link href="/journeys/scotland" className={styles.card}>
          <div className={`${styles.imgMd} ${styles.imgScotland}`}>
            <Image src="/images/Adventure & Landscape/AL-JNY-05.png" alt="Scottish Highlands — adventure journey" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
            <div className={styles.imgOverlay} />
          </div>
          <div className={styles.cardContent}>
            <div className={styles.cardMetaSm}>Scottish Highlands · 7 nights</div>
            <h3 className={`${styles.cardTitle} ${styles.cardTitleSm}`}>
              <em>The north, where weather is not a condition but a companion.</em>
            </h3>
            <span className={styles.exploreLinkSm}>Explore <ArrowSm /></span>
          </div>
        </Link>
      </div>

      {/* Row 3: 1fr / 1.5fr */}
      <div className={styles.row3}>
        <Link href="/journeys/dolomites" className={styles.card}>
          <div className={`${styles.imgSm} ${styles.imgDolomites}`}>
            <Image src="/images/Adventure & Landscape/AL-JNY-06.png" alt="Dolomites, Italy — adventure journey" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
            <div className={styles.imgOverlay} />
          </div>
          <div className={styles.cardContent}>
            <div className={styles.cardMetaSm}>Dolomites · 6 nights</div>
            <h3 className={`${styles.cardTitle} ${styles.cardTitleSm}`}>
              <em>Limestone cathedrals, lit from within at dusk.</em>
            </h3>
            <span className={styles.exploreLinkSm}>Explore <ArrowSm /></span>
          </div>
        </Link>

        {/* New Zealand editorial */}
        <div className={styles.editorialCard}>
          <div>
            <div className={styles.editorialMeta}>New Zealand South Island · 10 nights</div>
            <h3 className={styles.editorialTitle}>
              <em>Three climates, six landscapes, one undivided sky.</em>
            </h3>
            <p className={styles.editorialBody}>Ten nights moving from the Marlborough Sounds through the Haast Pass to the Fiordland coast. Beech forest at dawn. A glacial river that changes colour by the hour. Milford Sound in rain, which is the only condition under which it communicates its full scale. A private vessel for the last three nights.</p>
          </div>
          <div className={styles.editorialFooter}>
            <span className={styles.editorialSeason}><em>Best in March &amp; October</em></span>
            <Link href="/journeys/patagonia" className={styles.btnGhost}>Explore this journey</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
