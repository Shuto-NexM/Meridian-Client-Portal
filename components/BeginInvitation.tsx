import styles from './BeginInvitation.module.css';

export default function BeginInvitation() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <span>An invitation</span>
          </div>
          <h2 className={styles.h2}>
            Tell us what you<br />
            are looking for.<br />
            <em className={styles.h2Em}>We will find the rest.</em>
          </h2>
        </div>

        <div className={styles.cols}>
          <div>
            <p className={styles.p}>The information we ask for is not for a booking system. It is the beginning of a conversation with your concierge — a person who will read what you have written, consider it carefully, and write back within two working days with questions, observations, and the beginning of an idea.</p>
            <p className={styles.p}>Nothing is confirmed, committed, or invoiced at this stage. The only thing that happens next is that someone begins thinking about your journey.</p>
          </div>
          <div>
            <p className={styles.p}>You do not need to know where you want to go. You do not need to know what kind of journey you are looking for, or how long it should be, or when it should happen. If you know what you are looking for in general terms — a quality of time, an atmosphere, a form of experience — that is enough to begin.</p>
            <p className={styles.p}>The message you write is the first sentence of a longer conversation. Write it in whatever form it naturally takes.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
