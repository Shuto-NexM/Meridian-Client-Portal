import styles from './OurStoryApproach.module.css';

const stages = [
  {
    title: 'Observe',
    body: 'We watch how people return from journeys. What they remember, what they are glad of, and — most importantly — what they wish they had done differently. Every pattern of regret in travel communicates something about what was missing. MERIDIAN was built by people who paid close attention to those patterns for a long time before designing anything.',
    gold: true,
  },
  {
    title: 'Listen',
    body: 'Before any journey is proposed, a concierge listens. Not for preferences — for needs. The distinction is important. A preference is what a person thinks they want. A need is what their description of the right journey reveals about what they actually require. The listening that produces genuine understanding is always longer and quieter than the listening that produces a destination.',
  },
  {
    title: 'Curate',
    body: 'The archive is drawn upon — not as a catalogue to be searched but as a collection of deeply understood places, each with its own specific character and its own specific optimal conditions. The curating process is the assembly of a journey from elements that have been personally encountered at the right hour in the right season, and that are known to produce the quality of experience the listener has identified as needed.',
  },
  {
    title: 'Refine',
    body: 'Every proposal is a beginning rather than a solution. The refinement that follows — across as many conversations as it requires — is where the journey becomes specific to the person who will take it. This is the stage at which the generic element is replaced by the particular one, and the itinerary ceases to be a version of something else and becomes entirely its own.',
  },
  {
    title: 'Journey',
    body: 'The measure of a MERIDIAN journey is not whether everything went to plan — it is whether the person who took it arrived home different in some small and permanent way from the person who left. Quieter, perhaps. More patient. Better at noticing things. More certain about what, in the ordinary life they have returned to, actually matters.',
  },
  {
    title: 'Remember',
    body: 'The journey that is worth designing is the journey that is worth remembering — not as a sequence of events but as a quality of time. The memory of a MERIDIAN journey should feel, when it arrives, less like recalling something that happened and more like re-entering somewhere that remains available to you: a quality of morning, a quality of light, a quality of being entirely somewhere.',
    gold: true,
  },
];

export default function OurStoryApproach() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.eyebrow}>
          <div className={styles.eyebrowLine} />
          <span>The MERIDIAN approach</span>
        </div>
        <h2 className={styles.h2}>Not a process.<br /><em className={styles.h2Em}>A disposition.</em></h2>
      </div>

      <div className={styles.timeline}>
        <div className={styles.spine} />
        {stages.map((stage, i) => (
          <div key={i} className={`${styles.stage} ${i === stages.length - 1 ? styles.stageLast : ''}`}>
            <div className={styles.dotWrap}>
              <div className={`${styles.dot} ${stage.gold ? styles.dotGold : ''}`} />
            </div>
            <div className={styles.stageContent}>
              <div className={styles.stageTitle}>{stage.title}</div>
              <p className={styles.stageBody}>{stage.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
