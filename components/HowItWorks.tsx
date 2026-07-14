import styles from './HowItWorks.module.css';

const STAGES = [
  {
    num: 'I.',
    title: 'Dream',
    body: 'Tell us not where you want to go, but who you are when you travel at your best. Everything else follows from this.',
  },
  {
    num: 'II.',
    title: 'Design',
    body: 'Your concierge reads between the lines. Every detail is shaped around what you value most — not what most travellers expect.',
  },
  {
    num: 'III.',
    title: 'Travel',
    body: 'Arrive knowing everything has been considered. Leave only the itinerary behind. The rest has already been arranged.',
  },
  {
    num: 'IV.',
    title: 'Remember',
    body: 'Something stays. A morning light. A conversation you didn\'t expect. A version of yourself you had almost forgotten existed.',
  },
];

export default function HowItWorks() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.eyebrow}><div className={styles.eyebrowLine}/>How it works</div>
        <h2 className={styles.heading}>Four movements.<br /><em>One complete journey.</em></h2>
      </div>

      <div className={styles.stages}>
        <div className={styles.connectingLine}/>
        {STAGES.map((stage, i) => (
          <div key={stage.num} className={i === 0 ? styles.stageFirst : styles.stage}>
            <div className={styles.stageNum}>{stage.num}</div>
            <h3 className={styles.stageTitle}>{stage.title}</h3>
            <p className={styles.stageBody}>{stage.body}</p>
          </div>
        ))}
      </div>

      <div className={styles.closing}>
        <div className={styles.closingQuote}>The difference between a trip and a journey is the quality of attention given to every detail in between.</div>
        <button className={styles.closingBtn}>Begin with a conversation</button>
      </div>
    </section>
  );
}
