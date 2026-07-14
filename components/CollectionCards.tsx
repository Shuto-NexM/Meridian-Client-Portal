import Image from 'next/image';
import Link from 'next/link';
import styles from './CollectionCards.module.css';

function ArrowRight({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" />
    </svg>
  );
}

interface CollectionMeta {
  bestFor: string;
  duration: string;
  journeys: string;
}

interface CollectionPanelProps {
  num: string;
  title: string;
  titleBreak?: string;
  quote: string;
  body: string;
  meta: CollectionMeta;
  cta: string;
  ctaHref: string;
  imgClass: string;
  caption: string;
  imgSrc: string;
  imgAlt: string;
  imageLeft: boolean;
  textBg: 'raised' | 'bg';
  borderTop?: boolean;
}

function CollectionPanel({ num, title, titleBreak, quote, body, meta, cta, ctaHref, imgClass, caption, imgSrc, imgAlt, imageLeft, textBg, borderTop }: CollectionPanelProps) {
  const textPanel = (
    <div className={`${styles.textPanel} ${textBg === 'raised' ? styles.textRaised : styles.textBg} ${borderTop ? styles.borderTop : ''}`}>
      <div className={styles.collNum}>{num}</div>
      <h2 className={styles.collTitle} dangerouslySetInnerHTML={{ __html: titleBreak ? `${title}<br />${titleBreak}` : title }} />
      <div className={styles.goldRule} />
      <p className={styles.collQuote}>{quote}</p>
      <p className={styles.collBody}>{body}</p>
      <div className={styles.metaTable}>
        <div className={styles.metaRow}><span className={styles.metaLabel}>Best for</span><span className={styles.metaValue}>{meta.bestFor}</span></div>
        <div className={styles.metaRow}><span className={styles.metaLabel}>Duration</span><span className={styles.metaValue}>{meta.duration}</span></div>
        <div className={styles.metaRow}><span className={styles.metaLabel}>Journeys</span><span className={styles.metaValue}>{meta.journeys}</span></div>
      </div>
      <Link href={ctaHref} className={styles.exploreLink}>{cta} <ArrowRight /></Link>
    </div>
  );

  const imagePanel = (
    <Link href={ctaHref} className={`${styles.imgPanel} ${imgClass} ${borderTop ? styles.borderTop : ''}`}>
      <Image src={imgSrc} alt={imgAlt} fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
      <div className={styles.imgCaption}>{caption}</div>
    </Link>
  );

  return (
    <div className={styles.row}>
      {imageLeft ? imagePanel : textPanel}
      {imageLeft ? textPanel : imagePanel}
    </div>
  );
}

export default function CollectionCards() {
  return (
    <section className={styles.section}>
      <CollectionPanel
        num="Collection 01"
        title="Wellness &amp;"
        titleBreak="Restoration"
        quote='"Journeys that return you to yourself."'
        body="For the traveller who has arrived at a particular kind of tiredness that no ordinary rest can address. These journeys are shaped around the quality of the place — its light, its silence, its pace — rather than its programme. The schedule is replaced by the day. The day is replaced by the hour."
        meta={{ bestFor: 'Solitude, restoration, stillness', duration: '7 – 14 nights', journeys: '24 curated, spanning Asia and Europe' }}
        cta="Explore Wellness &amp; Restoration"
        ctaHref="/collections/wellness"
        imgClass={styles.imgWellness}
        caption="Hakone, Japan · 05:40"
        imgSrc="/images/Collection Overview/CO-WELL-01.png"
        imgAlt="Hakone, Japan — wellness retreat at dawn"
        imageLeft={true}
        textBg="raised"
      />
      <CollectionPanel
        num="Collection 02"
        title="Cultural"
        titleBreak="Immersion"
        quote='"Journeys that return you to the pace the world once moved at."'
        body="For the traveller whose curiosity is more powerful than their desire for comfort. These journeys are shaped around the ordinary life of a place — its markets, its craft, its kitchen, its morning — rather than its famous expressions. Culture becomes visible only to the person who was patient enough to wait for it."
        meta={{ bestFor: 'Curiosity, craft, belonging', duration: '5 – 12 nights', journeys: '22 curated across Asia, Africa, Europe and the Americas' }}
        cta="Explore Cultural Immersion"
        ctaHref="/collections/cultural-immersion"
        imgClass={styles.imgCultural}
        caption="Oaxaca market · 06:15"
        imgSrc="/images/Collection Overview/CO-CULT-01.png"
        imgAlt="Oaxaca market at 06:15 — cultural immersion collection"
        imageLeft={false}
        textBg="bg"
        borderTop={true}
      />
      <CollectionPanel
        num="Collection 03"
        title="Adventure &amp;"
        titleBreak="Landscape"
        quote='"Journeys into landscapes so old and so large that the internal pace changes without effort."'
        body="For the traveller who understands that the most significant encounter a person can have with the natural world is not the dramatic one but the extended one — when they have been in a very large place for long enough that the proportions of everything else shift accordingly. These journeys do not fill hours. They use them."
        meta={{ bestFor: 'Scale, solitude, perspective', duration: '6 – 14 nights', journeys: '18 curated on six continents' }}
        cta="Explore Adventure &amp; Landscape"
        ctaHref="/collections/adventure-landscape"
        imgClass={styles.imgAdventure}
        caption="Torres del Paine · 07:30"
        imgSrc="/images/Collection Overview/CO-ADVE-01.png"
        imgAlt="Torres del Paine, Patagonia — adventure and landscape collection"
        imageLeft={true}
        textBg="raised"
      />
      <CollectionPanel
        num="Collection 04"
        title="Honeymoon"
        titleBreak="Journeys"
        quote='"Journeys designed not for celebration, but for the quieter beginning of a shared rhythm."'
        body="For two people at the beginning of a life together who understand that the most valuable thing they can do with the first weeks of that life is to give it time — unhurried, unscheduled, and entirely their own. These journeys are designed not around what to do but around the quality of time that doing nothing in the right place produces."
        meta={{ bestFor: 'Shared presence, intimacy, beginnings', duration: '7 – 14 nights', journeys: '16 curated properties worldwide' }}
        cta="Explore Honeymoon Journeys"
        ctaHref="/collections/honeymoon"
        imgClass={styles.imgHoneymoon}
        caption="Provence · Private terrace · 08:30"
        imgSrc="/images/Collection Overview/CO-HONE-01.png"
        imgAlt="Provence private terrace at 08:30 — honeymoon journeys collection"
        imageLeft={false}
        textBg="bg"
        borderTop={true}
      />
    </section>
  );
}
