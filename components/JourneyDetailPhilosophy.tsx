import styles from './JourneyDetailPhilosophy.module.css';

export default function JourneyDetailPhilosophy() {
  return (
    <section id="philosophy" className={styles.section}>
      <div className={styles.inner}>

        <div className={styles.heading}>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <span>The Journey</span>
          </div>
          <h2 className={styles.h2}>The week the city returns to itself.</h2>
        </div>

        <div className={styles.essay}>
          <div>
            <p className={styles.p}>Every November, Kyoto becomes one of the most visited places on earth. Its maples turn — red, amber, ochre — and the world arrives to witness it. The gardens fill before dawn. The famous corridors receive their ten thousandth photograph of the week. The light, when it manages to find an unobstructed angle, is genuinely extraordinary.</p>
            <p className={styles.p}>This is not that journey.</p>
            <p className={styles.p}>This journey begins the week before. In the days when the colour has arrived at its own pace but the crowds have not yet responded. When the gardens are at their most honest — not performing their beauty but simply being it. When the temple at five in the morning belongs to no one except the person who chose to be there at that hour.</p>
          </div>
          <div>
            <p className={styles.p}>Seven nights shaped around the particular quality of light that belongs to Kyoto in late autumn — low, warm, arriving at an angle that makes every old surface communicate something it conceals at other times of year. Stone that has carried three hundred winters. Timber that has absorbed the warmth of every tea ceremony held in this room since the building was made.</p>
            <p className={styles.p}>The pace of the journey is shaped by one principle: nothing in Kyoto is improved by being rushed toward. Each place we have chosen reveals itself differently to the person who arrived early, who waited, who was paying attention. Your concierge has been to each of them before dawn. They know the angle, the hour, the particular silence that precedes the first light on the eastern hills.</p>
            <p className={styles.p}>This is not a journey about Kyoto. It is a journey about the quality of attention that a city like Kyoto produces in the person who gives it enough time.</p>
          </div>
        </div>

        <div className={styles.quoteBlock}>
          <blockquote className={styles.quote}>
            &ldquo;The week before the colour peaks is always the most interesting week. The city is most itself when it is not yet performing for anyone.&rdquo;
          </blockquote>
          <div className={styles.quoteAttrib}>— The MERIDIAN Concierge, Kyoto</div>
        </div>

      </div>
    </section>
  );
}
