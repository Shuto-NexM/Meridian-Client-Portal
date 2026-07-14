'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './CollectionsSection.module.css';

const TABS = ['Wellness & Restoration', 'Cultural Immersion', 'Adventure & Landscape', 'Honeymoon', 'The Journal'];

function ArrowRight({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
    </svg>
  );
}

export default function CollectionsSection() {
  const [active, setActive] = useState(0);

  return (
    <section className={styles.section}>
      {/* Header + Tabs */}
      <div className={styles.tabsWrap}>
        <div className={styles.tabsHeader}>
          <div>
            <div className={styles.eyebrow}><div className={styles.eyebrowLine}/>Journey Collections</div>
            <h2 className={styles.heading}>Worlds curated<br /><em>for how you wish to feel.</em></h2>
          </div>
          <Link href="/collections" className={styles.allLink}>All Collections <ArrowRight /></Link>
        </div>
        <div className={styles.tabs}>
          {TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActive(i)}
              className={i === active ? styles.tabActive : styles.tab}
            >{tab}</button>
          ))}
        </div>
      </div>

      {/* Active Collection: Wellness split */}
      <div className={styles.collectionSplit}>
        <div className={styles.collectionImg}>
          <Image src="/images/Home/HP-COL-01.png" alt="Bali wellness retreat — Uma by Como at early morning light" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
          <div className={styles.collectionImgFade}/>
          <div className={styles.collectionCredit}>Bali · Uma by Como · 06:15</div>
        </div>
        <div className={styles.collectionContent}>
          <div className={styles.collectionEyebrow}>Wellness &amp; Restoration</div>
          <h3 className={styles.collectionTitle}>Journeys that return<br />you to yourself.</h3>
          <p className={styles.collectionBody}>Twelve properties across Bali, Sri Lanka, Morocco and the Maldives — each selected for its capacity to quiet the mind and restore the body. Every itinerary begins with one question: what do you most need to leave behind?</p>
          <div className={styles.stats}>
            <div className={styles.statNum}>24</div>
            <div className={styles.statLabel}>curated<br />journeys</div>
            <div className={styles.statDivider}/>
            <div className={styles.statNum}>12</div>
            <div className={styles.statLabel}>partner<br />properties</div>
          </div>
          <Link href="/collections/wellness" className={styles.enterBtn}>Enter this world</Link>
        </div>
      </div>

      {/* Editorial supporting rows */}
      <div className={styles.editorialRow}>
        {/* Sri Lanka */}
        <div className={styles.editorialLeft}>
          <div className={styles.slimImg}>
            <Image src="/images/Home/HP-COL-04.png" alt="Sri Lanka coastal retreat — Amanwella on the southern coast" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
            <div className={styles.slimCredit}>Sri Lanka · 06:40</div>
          </div>
          <div className={styles.editorialText}>
            <div className={styles.smallEyebrow}>Sri Lanka · Coastal Retreat · 5 nights</div>
            <h4 className={styles.editorialTitle}>Where the Indian<br />Ocean exhales.</h4>
            <p className={styles.editorialDesc}>Amanwella. Ocean-facing suites on a quiet stretch of the southern coast. Five nights between salt water and unscheduled days.</p>
            <Link href="/collections/wellness" className={styles.continueLink}>Continue exploring <ArrowRight /></Link>
          </div>
        </div>

        {/* Morocco */}
        <div className={styles.editorialRight}>
          <div className={styles.moroccoImg}>
            <Image src="/images/Home/HP-COL-02.png" alt="Marrakech — Amanjena rose garden at morning light" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
            <div className={styles.moroccoImgGrad}/>
            <div className={styles.moroccoCredit}>Marrakech · Morning</div>
          </div>
          <div className={styles.moroccoText}>
            <div className={styles.smallEyebrow}>Morocco · Desert &amp; Garden · 6 nights</div>
            <h4 className={styles.moroccoTitle}>Amanjena.<br />Rose garden mornings.</h4>
            <Link href="/collections/wellness" className={styles.continueLinkMuted}>Continue exploring <ArrowRight /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
