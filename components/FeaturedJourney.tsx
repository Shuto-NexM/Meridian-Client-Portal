import Image from 'next/image';
import Link from 'next/link';
import styles from './FeaturedJourney.module.css';

function ArrowRight({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
    </svg>
  );
}

export default function FeaturedJourney() {
  return (
    <section className={styles.section}>

      {/* Cinematic opening spread */}
      <div className={styles.cinematic}>
        <div className={styles.cinematicBg}>
          <Image src="/images/Home/HP-FEAT-01.png" alt="Fushimi Inari torii gates, Kyoto at dawn — Japan featured journey" fill priority style={{ objectFit: 'cover', objectPosition: 'center 35%' }} />
          <div className={styles.cinematicGrad}/>
        </div>
        <div className={styles.cinematicEyebrow}>
          <div className={styles.eyebrowLine}/>
          <span>Featured Journey · 2026</span>
        </div>
        <div className={styles.cinematicKanji}>日本</div>
        <div className={styles.cinematicContent}>
          <div className={styles.cinematicInner}>
            <h2 className={styles.cinematicTitle}>
              Japan.<br />
              <em>The art of being present.</em>
            </h2>
            <p className={styles.cinematicSub}>Twelve days. Four cities. An itinerary shaped around the hours most travellers never see.</p>
          </div>
        </div>
        <div className={styles.photoAttr}>
          <div>Fushimi Inari, Kyoto · 05:48am · Early November</div>
          <div>35mm · f/2 · Before the first visitor arrives</div>
        </div>
      </div>

      {/* Metadata strip */}
      <div className={styles.meta}>
        {[
          { label: 'Duration', value: '12 nights' },
          { label: 'Route', value: 'Kyoto → Hakone → Tokyo' },
          { label: 'Concierge', value: 'Sofia Laurent' },
          { label: 'Season', value: 'Early Spring · Late Autumn' },
        ].map(({ label, value }, i) => (
          <div key={label} className={styles.metaGroup}>
            {i > 0 && <div className={styles.metaDivider}/>}
            <div className={styles.metaItem}>
              <div className={styles.metaLabel}>{label}</div>
              <div className={styles.metaValue}>{value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Editorial narrative */}
      <div className={styles.narrative}>
        <div className={styles.narrativeGrid}>
          <div className={styles.pullQuote}>
            <div className={styles.openQuote}>"</div>
            <div className={styles.pullQuoteText}>Some places change you without asking permission.</div>
            <div className={styles.quoteRule}/>
            <div className={styles.quoteAttrib}>Sofia Laurent · Meridian Curator</div>
          </div>
          <div className={styles.narrativeBody}>
            <p className={styles.narrativeP1}>The route begins at 5am in the streets of Gion — Kyoto at its most private, long before the first tour group arrives. Stone paths still dark with overnight rain. Not a sound except your own footsteps.</p>
            <p className={styles.narrativeP2}>It ends, twelve days later, in a small bar in Shinjuku that Sofia has known for years. You'll order something you can't pronounce and understand, finally, why you came.</p>
            <p className={styles.narrativeP3}>Between these two moments: Gōra Kadan's forest onsen at dawn, an 800-year-old tea ceremony in a private garden, and a Tokyo at night that no guidebook has ever found.</p>
          </div>
        </div>
      </div>

      {/* Image triptych */}
      <div className={styles.triptych}>
        <div className={styles.triptychImg1}>
          <Image src="/images/Home/HP-JOUR-01.png" alt="Ryōan-ji stone garden, Kyoto at 06:20am" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
          <div className={styles.triptychCaption}>
            <div className={styles.captionPlace}>Ryōan-ji · Kyoto</div>
            <div className={styles.captionDetail}>Stone garden at 06:20am · November light · Medium format</div>
          </div>
        </div>
        <div className={styles.triptychImg2}>
          <Image src="/images/Home/HP-JOUR-02.png" alt="Gōra Kadan private onsen, Hakone — dawn mist with Mount Fuji" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
          <div className={styles.triptychCaption}>
            <div className={styles.captionPlace}>Gōra Kadan · Hakone</div>
            <div className={styles.captionDetail}>Private onsen · Mt Fuji glimpsed through steam · Dawn</div>
          </div>
        </div>
        <div className={styles.triptychImg3}>
          <Image src="/images/Home/HP-JOUR-03.png" alt="Aman Tokyo at night — city skyline view from above" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
          <div className={styles.triptychCaption}>
            <div className={styles.captionPlace}>Aman Tokyo · Night</div>
            <div className={styles.captionDetail}>City from above · 11pm · Available on request</div>
          </div>
        </div>
      </div>

      {/* Editorial pause */}
      <div className={styles.pause}>
        <div className={styles.pauseInner}>
          <div className={styles.pauseLine}/>
          <div className={styles.pauseText}>Twelve days shaped not<br />by schedule, but by light.</div>
        </div>
      </div>

      {/* Journey Timeline */}
      <div className={styles.timeline}>
        <div className={styles.timelineHeader}>
          <div>
            <div className={styles.timelineEyebrow}><div className={styles.eyebrowLine}/>The Itinerary</div>
            <h3 className={styles.timelineTitle}>Twelve days, shaped<br /><em>around the light.</em></h3>
          </div>
          <p className={styles.timelineSubtitle}>Every property was chosen for one quality above all others: the way light enters the room at the start of the day.</p>
        </div>

        <div className={styles.timelineItems}>
          <div className={styles.timelineSpine}/>

          {/* Day 1–4: Kyoto */}
          <div className={styles.timelineEntry}>
            <div className={styles.dotGold}/>
            <div className={styles.entryGrid}>
              <div>
                <div className={styles.entryDays}>Day 1–4</div>
                <div className={styles.entryCity}>Kyoto</div>
              </div>
              <div>
                <div className={styles.entrySubtitle}>Gion · Higashiyama · Arashiyama</div>
                <p className={styles.entryDesc}>Early temple walks before dawn. A private kaiseki dinner at Nakamura-ro — one of Japan's oldest restaurants. Bamboo forest at 5:30am, entirely empty.</p>
                <div className={styles.tags}>
                  {['Aman Kyoto', 'Private guide', 'Tea ceremony'].map(t => (
                    <div key={t} className={styles.tag}>{t}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Chapter image: Kyoto */}
          <div className={styles.chapterImg}>
            <Image src="/images/Home/HP-COL-01.png" alt="Arashiyama bamboo forest, Kyoto at 05:30am" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
            <div className={styles.chapterImgGrad}/>
            <div className={styles.chapterCaption}>
              <div>Arashiyama · Kyoto · 05:30am</div>
              <div>Bamboo forest · Before the city wakes</div>
            </div>
          </div>

          {/* Day 5–8: Hakone */}
          <div className={styles.timelineEntry}>
            <div className={styles.dotSage}/>
            <div className={styles.entryGrid}>
              <div>
                <div className={styles.entryDays}>Day 5–8</div>
                <div className={styles.entryCity}>Hakone</div>
              </div>
              <div>
                <div className={styles.entrySubtitle}>Ryokan &amp; Forest</div>
                <p className={styles.entryDesc}>Gōra Kadan ryokan. Private open-air onsen with Mt Fuji visible in clear weather. Slow mornings. No agenda. A forest walk before breakfast if you wish.</p>
                <div className={styles.tags}>
                  {['Gōra Kadan', 'Private onsen', 'Forest bathing'].map(t => (
                    <div key={t} className={styles.tag}>{t}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Chapter image: Hakone */}
          <div className={styles.chapterImg}>
            <Image src="/images/Home/HP-COL-03.png" alt="Gōra Kadan ryokan, Hakone — private onsen at dawn" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
            <div className={styles.chapterImgGrad}/>
            <div className={styles.chapterCaption}>
              <div>Gōra Kadan · Hakone · Mt Fuji visible</div>
              <div>Private onsen · Dawn · Steam and silence</div>
            </div>
          </div>

          {/* Day 9–12: Tokyo */}
          <div className={styles.timelineEntry}>
            <div className={styles.dotGray}/>
            <div className={styles.entryGrid}>
              <div>
                <div className={styles.entryDays}>Day 9–12</div>
                <div className={styles.entryCity}>Tokyo</div>
              </div>
              <div>
                <div className={styles.entrySubtitle}>Aman Tokyo &amp; Beyond</div>
                <p className={styles.entryDesc}>Art galleries. A coffee house in Yanaka that feels like 1958. A curated Tsukiji breakfast. Shinjuku at midnight — because some things about Tokyo can only be understood after dark.</p>
                <div className={styles.tags}>
                  {['Aman Tokyo', 'Gallery access', 'Curated evenings'].map(t => (
                    <div key={t} className={styles.tag}>{t}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Closing CTA */}
      <div className={styles.closingCta}>
        <div className={styles.closingGlow}/>
        <div className={styles.closingContent}>
          <div className={styles.closingQuote}>"We arrange the logistics.<br />The experience arranges itself."</div>
          <div className={styles.closingAttrib}>Sofia Laurent · Meridian Senior Curator</div>
          <div className={styles.closingBtns}>
            <Link href="/begin-your-journey" className={styles.btnGold}>Begin this journey</Link>
            <Link href="/begin-your-journey" className={styles.btnGhost}>
              Speak with your concierge <ArrowRight />
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
}
