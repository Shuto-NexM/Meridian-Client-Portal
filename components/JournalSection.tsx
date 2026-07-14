import Image from 'next/image';
import Link from 'next/link';
import styles from './JournalSection.module.css';

function ArrowRight({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
    </svg>
  );
}

export default function JournalSection() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <div className={styles.eyebrow}><div className={styles.eyebrowLine}/>The Journal</div>
          <h2 className={styles.heading}>On travel, attention,<br /><em>and what remains.</em></h2>
        </div>
        <Link href="/journal" className={styles.allLink}>All essays <ArrowRight /></Link>
      </div>

      {/* Feature article split */}
      <div className={styles.featureSplit}>
        <div className={styles.featureImg}>
          <Image src="/images/Home/HP-JOUR-01.png" alt="Santorini pre-dawn long exposure — the discipline of arriving slowly" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
          <div className={styles.featureImgGrad}/>
          <div className={styles.featureImgCredit}>Santorini · Pre-dawn · Long exposure</div>
        </div>
        <div className={styles.featureContent}>
          <div className={styles.articleEyebrow}>Essay · On pace</div>
          <h3 className={styles.featureTitle}>The discipline of<br />arriving slowly.</h3>
          <p className={styles.featureP1}>There is a kind of traveller who arrives before the place has composed itself. Who photographs before feeling. Who moves before the room settles into meaning.</p>
          <p className={styles.featureP2}>MERIDIAN journeys are designed around the opposite instinct.</p>
          <Link href="/journal/kyoto-temple" className={styles.readLink}>Read this essay <ArrowRight /></Link>
        </div>
      </div>

      {/* Two secondary articles */}
      <div className={styles.secondaryRow}>
        <div className={styles.secondary1}>
          <div>
            <div className={styles.articleEyebrow}>Essay · On perception</div>
            <h4 className={styles.secondary1Title}>What the light<br />knows about a place.</h4>
            <p className={styles.secondary1Body}>Every city has an hour when it reveals something kept hidden from most visitors. Photographers know this. Meridian concierges plan around it.</p>
          </div>
          <Link href="/journal/why-we-travel-before-the-season" className={styles.readLink}>Continue reading <ArrowRight /></Link>
        </div>
        <div className={styles.secondary2}>
          <div className={styles.secondary2Img}>
            <Image src="/images/Home/HP-JOUR-02.png" alt="Kyoto temple district at November dusk" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
            <div className={styles.secondary2ImgGrad}/>
            <div className={styles.secondary2ImgCredit}>Kyoto · Temple district · November dusk</div>
          </div>
          <div className={styles.secondary2Text}>
            <div className={styles.articleEyebrow}>Essay · On language</div>
            <h4 className={styles.secondary2Title}>On the pleasure of not<br />knowing the language.</h4>
            <p className={styles.secondary2Body}>Misreading a menu. Asking for directions three times. The smile that crosses every language barrier. These moments cannot be arranged. They can only be allowed.</p>
            <Link href="/journal/doing-nothing-abroad" className={styles.readLink}>Continue reading <ArrowRight /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
