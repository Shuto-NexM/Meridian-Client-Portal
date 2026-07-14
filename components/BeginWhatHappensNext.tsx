import styles from './BeginWhatHappensNext.module.css';

const stages = [
  {
    gold: true,
    title: 'We listen',
    body: 'Your concierge reads what you have written — carefully, without hurrying to a response. They consider what you have said, what you have not said, and what the space between the two might mean.',
  },
  {
    gold: false,
    title: 'We write back',
    body: 'Within two working days, your concierge replies — not with a proposal but with questions, observations, and the beginning of an understanding. The first exchange is always a conversation, not an itinerary.',
  },
  {
    gold: false,
    title: 'We curate',
    body: 'Once the shape of the journey has begun to emerge, your concierge draws from our archive — properties, guides, and experiences chosen over years of personal visits — to find the specific elements that belong to your particular journey.',
  },
  {
    gold: false,
    title: 'We refine',
    body: 'The first proposal is a starting point. It will change — because the conversation that follows it always reveals something the initial draft did not anticipate. This is how the journey becomes yours rather than a version of someone else\'s.',
  },
  {
    gold: true,
    title: 'You travel',
    body: 'Your concierge remains quietly available throughout. The journey should feel as though it is unfolding naturally — because it was made to do exactly that. The measure of its success is how little you are aware of the care that shaped it.',
  },
];

export default function BeginWhatHappensNext() {
  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <div className={styles.eyebrow}>
          <div className={styles.eyebrowLine} />
          <span>What happens next</span>
        </div>
        <h2 className={styles.h2}>
          Five stages. Each<br />
          <em className={styles.h2Em}>at its own pace.</em>
        </h2>
      </div>

      <div className={styles.timeline}>
        <div className={styles.spine} />
        {stages.map((stage, i) => (
          <div key={stage.title} className={`${styles.step} ${i === stages.length - 1 ? styles.stepLast : ''}`}>
            <div className={styles.dotCol}>
              <div className={`${styles.dot} ${stage.gold ? styles.dotGold : styles.dotRegular}`} />
            </div>
            <div className={styles.content}>
              <div className={styles.title}>{stage.title}</div>
              <p className={styles.body}>{stage.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
