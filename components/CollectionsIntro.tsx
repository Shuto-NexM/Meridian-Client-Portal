import styles from './CollectionsIntro.module.css';

export default function CollectionsIntro() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.eyebrow}>
          <div className={styles.eyebrowLine} />
          <span>What the collections are</span>
          <div className={styles.eyebrowLine} />
        </div>
        <p className={styles.pullQuote}>A collection is not a category of destination. It is a category of traveller — a description of the particular quality of relationship that a person wishes to have with the world during the days of a journey.</p>
        <p className={styles.body}>The four collections exist because no single kind of journey satisfies every traveller, or even the same traveller at different times of life. Each one begins from a different question. What do you most need to leave behind? What quality of understanding are you looking for? How much of the world do you want to enter, and how much do you want to observe? Who are you travelling with, and what does that relationship most need? The collection you choose is the answer to one of these questions — and the journey we design around it is the space in which that answer is lived.</p>
      </div>
    </section>
  );
}
