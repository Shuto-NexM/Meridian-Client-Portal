import styles from './ConciergeHowWeWork.module.css';

const stages = [
  {
    title: 'Listen',
    gold: true,
    body: 'The first conversation is not about destinations. It is about the quality of time you are looking for. What you most need to leave behind. What kind of morning belongs to the person you are when you are not managing your ordinary life. Your concierge listens — without proposing, without steering — until the shape of the right journey has begun to emerge from what you have said.',
  },
  {
    title: 'Understand',
    gold: false,
    body: 'After the first conversation, your concierge returns to you not with a proposal but with a series of clarifying questions — about pace, about privacy, about the quality of accommodation that makes you feel genuinely at home, about the activities that genuinely interest you rather than the ones that seem appropriate to someone travelling where you are going. This stage takes as long as it needs to.',
  },
  {
    title: 'Curate',
    gold: false,
    body: 'Your concierge draws from a network of properties, guides, and experiences that have been selected over years of personal visits. Nothing enters this network because it has been recommended by a ratings system or because it has sought our attention. Everything in it has been chosen by someone who was there at the right hour, in the right season, paying the right quality of attention.',
  },
  {
    title: 'Refine',
    gold: false,
    body: 'The initial proposal is a starting point rather than a final answer. Your concierge expects it to change — and designs the conversation around the proposed journey with the specific intention of finding where it does not quite fit. The refinement process is where the journey becomes yours rather than a version of someone else\'s.',
  },
  {
    title: 'Travel',
    gold: false,
    body: 'Your concierge remains available throughout the journey — not intrusively, not with check-in messages, but available. If a morning suggests a different direction than was planned, or if a property reveals something unexpected that warrants a change of pace, your concierge is the person who makes that adjustment quietly and without drama. The journey should feel as though it is unfolding naturally, because it is.',
  },
  {
    title: 'Reflect',
    gold: true,
    body: 'After you return, your concierge writes — not to ask for feedback, but to begin the conversation about what was most valuable and what, on reflection, might have served you better. This is the conversation that shapes the next journey. It is also, we find, the most honest conversation, because it is the one held at the greatest distance from the experience itself.',
  },
];

export default function ConciergeHowWeWork() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.eyebrow}>
          <div className={styles.eyebrowLine} />
          <span>How we work</span>
        </div>
        <h2 className={styles.h2}>
          Six stages. All of them<br />
          <em className={styles.h2Em}>unhurried.</em>
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
              <div className={styles.stageTitle}>{stage.title}</div>
              <p className={styles.stageBody}>{stage.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
