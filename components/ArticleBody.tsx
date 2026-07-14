import Image from 'next/image';
import styles from './ArticleBody.module.css';

export default function ArticleBody() {
  return (
    <>
      {/* § 2 — Introduction with drop cap */}
      <section className={styles.introSection}>
        <div className={styles.bodyCol}>
          <p className={`${styles.p} ${styles.dropCap}`}>
            There is a gate at Nanzenji that opens at eight thirty. Every morning during the week I was there in November, I arrived at five to six, when the sky was the colour of old pewter and the stone path had not yet dried from the night. I was not alone — the monks were already present, in the way that monks are always present in a place before the visitors remember they exist. But I was the only visitor, for reasons that had to do entirely with the hour and nothing at all to do with any particular privilege or arrangement.
          </p>
          <p className={styles.p}>
            What I found there in those first two hours — before the gate opened, in the company of the monks and the mist and the particular quality of the morning that belongs only to old places at old hours — is what this essay is about. Not what I saw. What happened to the quality of my attention.
          </p>
        </div>
      </section>

      {/* § 3 — Article Body */}
      <article className={styles.article}>
        <div className={styles.bodyCol}>

          <h2 className={styles.h2}>The difference between arriving and being admitted.</h2>

          <p className={styles.p}>Most visitors to Nanzenji arrive when it opens. This is entirely reasonable. The garden is beautiful, the aqueduct is extraordinary, the light that falls through the old trees in the middle of the morning is genuinely worth travelling a considerable distance to see. But the garden that opens at eight thirty has already been prepared for you. The raking of the gravel, which communicates a quality of care that took hours to produce, was completed before you arrived. The monks, whose presence is what makes the place what it is, are no longer visible. The garden has become, by the time the gate opens, a performance of itself.</p>

          <p className={styles.p}>The garden at five thirty is something else. The monks are raking. The gravel shows the evidence of the night — a leaf, a slight depression where rain fell unevenly — and the raking is being done not to produce an image of care for a visitor&rsquo;s eye but because care of this kind is practised here every morning, for reasons that are entirely internal to the community and their relationship with this space. To be present at this hour is to be present for something that is not being done for you.</p>

          <blockquote className={styles.pullQuote}>
            The garden at eight thirty has been prepared for visitors. The garden at five thirty has not been prepared for anyone. This is why it communicates something the later garden cannot: the quality of a place that has not yet composed itself for company.
          </blockquote>

          <p className={styles.p}>This distinction — between a place that has composed itself for company and a place that has not yet done so — is the central distinction I have found in seven years of arriving places before they open. The composed place is always more beautiful in a certain sense. It is arranged, lit, and presented at its best. But the uncomponed place is more true. And truth, in a place of genuine antiquity, produces a quality of experience that beauty alone does not approach.</p>

          <h2 className={styles.h2}>On the quality of attention that silence produces.</h2>

          <p className={styles.p}>The monks do not speak. Not to each other, and certainly not to the early visitor who has, by arriving at this hour, been granted the particular privilege of witnessing work that is not performed. They move through the garden with the economy of motion that belongs to people who have made the same journey through the same space every morning for years. Each step is deliberate without being studied. Each gesture with the rake is precise without being showy.</p>

          <p className={styles.p}>I found, after the second morning, that my own quality of attention had changed in the presence of theirs. I had arrived at the first morning with the attention of a person who is watching — evaluating, recording, noting what to remember. By the third morning, I was simply present. The change was not dramatic. It was the kind of change that only becomes visible when it has already fully occurred, when you notice, with something like relief, that you have stopped trying to do anything with the experience and are simply having it.</p>

          <p className={styles.p}>This, I think, is what the early temple offers and the late temple cannot: the conditions under which a person stops performing their own presence and simply is present. The late temple is too conscious of being observed to produce this in its visitor. The early temple is too occupied with its own life to notice whether it is observed at all.</p>

        </div>
      </article>

      {/* § 4 — Immersive image break */}
      <section className={styles.imageBreak}>
        <div className={styles.imageBreakWrap}>
          <div className={styles.imageBreakBg} />
          <Image src="/images/Jernal overview & Article template/JA-BREAK-01.png" alt="Nanzenji garden under morning cloud" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
          <div className={styles.imageBreakCaption}>The garden under morning cloud. Nanzenji, Kyoto · November, before the gate opened.</div>
        </div>
      </section>

      {/* Continue article */}
      <article className={styles.articleContinue}>
        <div className={styles.bodyCol}>

          <h2 className={styles.h2}>What changes in a person who has been awake since before four.</h2>

          <p className={styles.p}>There is also the simple physical quality of the early morning to consider, which is not nothing and which the essay should not pretend is merely incidental. The body at five in the morning is in a particular state — not fully committed to the day, still carrying something of the quality of sleep, still slow and receptive in a way that the fully-woken body is not. The philosopher Simone Weil wrote about attention as a kind of self-emptying — the removal of the ego&rsquo;s tendency to fill every experience with its own interpretations. The body at five in the morning is already partially self-emptied. The ego has not yet assembled itself for the day.</p>

          <p className={styles.p}>This is why certain kinds of experience — certain prayers, certain creative practices, certain encounters with natural places — have traditionally been assigned to the earliest hours. Not because the thing itself is different at dawn, but because the person encountering it is. The temple has been there for eight hundred years. It is indifferent to the hour. But the visitor&rsquo;s capacity to receive what the temple has to offer is considerably higher before the world has made its ordinary demands on their attention.</p>

          {/* Two-column stats box */}
          <div className={styles.statsBox}>
            <div className={styles.statsCol}>
              <div className={styles.statsLabel}>Five mornings observed</div>
              <p className={styles.statsBody}>First morning: the raking, seen as performance. Second: the raking, seen as practice. Third: no longer watching the raking — watching the light. Fourth: no longer watching the light — inside it. Fifth: nowhere in particular. Everywhere.</p>
            </div>
            <div className={styles.statsCol}>
              <div className={styles.statsLabel}>What the notes say</div>
              <p className={styles.statsBody}>By the fourth morning the notebook had been left in the room. There was nothing left to record that could survive the recording. Some kinds of experience are not improved by being noted. They are simply had, and then become the private property of the person who had them.</p>
            </div>
          </div>

          <h2 className={styles.h2}>On the discipline of arriving before you are welcome.</h2>

          <p className={styles.p}>I want to be careful not to make this sound like a prescription. The early morning temple is not for everyone, and I am not arguing that the only valid way to encounter a sacred place is before it opens. What I am arguing is that the hour at which you arrive at any place of genuine significance determines what that place is able to communicate to you — and that the hours most likely to produce genuine communication are usually the hours least likely to be occupied by other visitors.</p>

          <p className={styles.p}>This requires a particular kind of discipline that has nothing to do with athleticism or endurance and everything to do with the willingness to organise a journey around the quality of the encounter rather than its convenience. To be in Kyoto at five in the morning means having arrived in Kyoto the previous afternoon. It means having gone to bed at an hour that most travellers — and certainly most travel programmes — would consider early. It means having accepted that the quality of the morning is worth more than the quantity of the evening.</p>

          <blockquote className={styles.pullQuote}>
            The most valuable quality a traveller can develop is the willingness to organise a journey around the quality of an encounter rather than the convenience of reaching it. This almost always means arriving earlier than seems necessary.
          </blockquote>

          <p className={styles.p}>I have found, in seven years of arriving early, that the experiences that have most persistently occupied my memory are almost never the ones that were most beautiful or most famous or most efficiently reached. They are the ones for which I was in the right state of attention at the right hour in the right place. They are the experiences that were not arranged for me but that I arranged myself to find. The garden at five thirty. The mountain at first light. The market before the tourists arrive. The city at the hour when it belongs to itself.</p>

          <p className={styles.p}>The discipline of the early morning is, at its core, the discipline of taking what you have come to see seriously enough to give it the best version of your attention. Not the convenient version. The best one. Which means arriving before you are welcome, in the company of people who are there for reasons that have nothing to do with the gate being open. And staying long enough that the quality of your attention changes — from watching to witnessing, from recording to receiving.</p>

          <p className={styles.p}>On the seventh morning, I arrived at the garden at half past four. The gate, of course, was locked. I stood outside it for an hour, watching the sky above the old wall change from a deep blue-grey to the particular colour that belongs to the half-hour before sunrise in November: a cool, even, directionless light that seemed to come from the wall itself rather than from any source in the sky. The monks were inside. The garden was theirs. And yet I felt, standing outside in the cold, that I was as inside the experience of Nanzenji as I had been on any of the seven mornings spent within its walls.</p>

          <p className={`${styles.p} ${styles.pLast}`}>Which suggests that the discipline of the early morning is, in the end, not a discipline of arrival at all. It is a discipline of attention. Of the willingness to stand outside a gate in the dark, watching a wall that is changing colour in ways that cannot be photographed and will not be remembered in any detail, because the experience of watching it is more important than any record of having done so.</p>

        </div>
      </article>
    </>
  );
}
