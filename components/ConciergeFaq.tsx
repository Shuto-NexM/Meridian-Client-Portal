'use client';
import { useState } from 'react';
import styles from './ConciergeFaq.module.css';

const faqs = [
  {
    q: 'How personal is the planning process?',
    a: 'As personal as you want it to be. Some guests prefer a light touch — a brief exchange of preferences followed by a thoughtful proposal. Others find value in a more extended conversation across several letters or calls before the journey begins to take shape. We follow your lead entirely. What we do not do is treat any journey as an efficient transaction. Each one begins with the understanding that it matters, and is designed accordingly.',
  },
  {
    q: 'Can journeys change while I am travelling?',
    a: 'Always. The itinerary we design together is a considered starting point, not a contract. If you find that a place deserves more time than was planned, or that the morning suggests a different direction than the afternoon was designed for, your concierge adjusts quietly and without making the change feel like a complication. The journey should feel as though it is unfolding naturally — which means it should be able to change its mind, just as a good day is allowed to.',
  },
  {
    q: 'Can multiple destinations be combined in one journey?',
    a: 'Yes — though we tend to counsel restraint. The most common error in journey design is the inclusion of too many places. Each destination requires time to become meaningful rather than merely visited, and the journey that visits four places in ten days communicates a quality of hurry that undermines the purpose of each individual place. That said, certain combinations of destinations have a natural internal logic — a rhythm that makes moving between them feel like the continuation of a single experience rather than the beginning of several new ones. Your concierge knows which combinations work and which do not.',
  },
  {
    q: 'What happens after the journey?',
    a: 'Your concierge writes — briefly, and without requiring a response. They note what appears to have worked particularly well, and ask, in an equally brief way, whether anything fell short of what was hoped. There is no survey. No rating request. The conversation is the same quality as the one that began the journey. This exchange is the one that makes the next journey better than the first — and the one after that better still.',
  },
  {
    q: 'How long does the planning process take?',
    a: 'As long as it should. A journey planned in haste tends to feel like it was planned in haste. We recommend beginning a conversation at least three months before the intended departure — six months for journeys in peak seasons or to destinations with limited availability. That said, your concierge has occasionally performed quiet miracles with considerably less notice. If time is short, let us know. We will tell you honestly what is and is not possible within that constraint.',
  },
  {
    q: 'What if I am not sure where I want to go?',
    a: 'This is the most interesting situation your concierge encounters, and also the most rewarding one to work with. The guest who arrives without a destination in mind but with a clear sense of what they are looking for is the guest for whom the most specifically right journey tends to emerge. Begin by telling us what you need — in terms of pace, of atmosphere, of the quality of time you are looking for — and let the destination follow from the understanding of that need. It almost always reveals itself very quickly.',
  },
];

export default function ConciergeFaq() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIdx(openIdx === i ? null : i);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <span>Some questions</span>
          </div>
          <h2 className={styles.h2}>
            Answered before<br />
            <em className={styles.h2Em}>you have to ask.</em>
          </h2>
        </div>

        <div className={styles.list}>
          {faqs.map((faq, i) => (
            <div key={i} className={styles.item}>
              <button className={styles.btn} onClick={() => toggle(i)}>
                <span>{faq.q}</span>
                <svg
                  className={`${styles.icon} ${openIdx === i ? styles.iconOpen : ''}`}
                  width="18" height="18" viewBox="0 0 24 24"
                  fill="none" stroke="var(--m-stone)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
              <div
                className={styles.body}
                style={{ maxHeight: openIdx === i ? '400px' : '0' }}
              >
                <div className={styles.bodyInner}>{faq.a}</div>
              </div>
            </div>
          ))}
          <div className={styles.listEnd} />
        </div>
      </div>
    </section>
  );
}
