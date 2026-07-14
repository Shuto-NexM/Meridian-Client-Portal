import styles from './JournalEditorsNote.module.css';

export default function JournalEditorsNote() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <span>From the Editor</span>
          </div>
          <h2 className={styles.h2}>Why we publish essays rather than articles.</h2>
        </div>

        <div className={styles.grid}>
          <div>
            <p className={styles.p}>An article answers a question. An essay inhabits one. The distinction is everything, and it determines the kind of writing that belongs in this publication. We are not interested in answering the questions that travel magazines typically ask — where to go, when to go, what to do when you arrive. We are interested in the questions that precede those: what is a place? What does it mean to arrive somewhere? What changes in a person who has been paying attention in a foreign city for long enough to stop being a visitor?</p>
            <p className={styles.p}>These are not questions with answers. They are questions worth sitting with, in the way that a good essay sits with the question it raises. Which is why the essays in this journal tend to be slow, careful, and occasionally inconclusive. We consider this a feature rather than a flaw.</p>
          </div>
          <div>
            <p className={styles.p}>The journal is published without schedule. An essay appears when it is ready — when the writer has been somewhere long enough to understand it, and has found the form that does justice to the understanding. We have declined many pieces that were competent and timely in favour of waiting for something that was neither timely nor conventional but was, we believed, true.</p>
            <p className={styles.p}>We hope you read it at the pace it was written: slowly, with time between essays, in a place where the quality of your attention is not divided by anything else that is demanding it.</p>
            <div className={styles.signature}>
              <div className={styles.signatureText}>The Editors, MERIDIAN Journal</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
