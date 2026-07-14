import styles from './BeginAlternativeContact.module.css';

export default function BeginAlternativeContact() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        <div className={styles.left}>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <span>Other ways to reach us</span>
          </div>
          <h2 className={styles.h2}>
            If writing is not<br />
            <em className={styles.h2Em}>where you prefer to begin.</em>
          </h2>
          <p className={styles.body}>Some conversations begin more naturally by telephone. If you would prefer to speak directly with your concierge before committing anything to writing, you are welcome to call at any time during London office hours — or to request a call at a time that suits you.</p>
        </div>

        <div className={styles.right}>
          <div className={styles.contactItem}>
            <div className={styles.contactLabel}>By letter or email</div>
            <a href="mailto:concierge@meridianprivatejourneys.com" className={styles.contactValue}>
              concierge@meridianprivatejourneys.com
            </a>
            <p className={styles.contactNote}>We respond to every message personally, within two working days.</p>
          </div>
          <div className={styles.contactItem}>
            <div className={styles.contactLabel}>By telephone</div>
            <div className={styles.contactValue}>+44 20 7946 0958</div>
            <p className={styles.contactNote}>Monday to Friday, 9am – 6pm London time. Outside these hours, please write and we will call you at a time of your choosing.</p>
          </div>
          <div className={styles.contactItem}>
            <div className={styles.contactLabel}>By appointment</div>
            <div className={styles.contactValue}>London · Zurich · Tokyo</div>
            <p className={styles.contactNote}>We meet guests in person in three cities. Appointments are arranged by correspondence.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
