import Image from 'next/image';
import styles from './JourneyDetailTimeline.module.css';

export default function JourneyDetailTimeline() {
  return (
    <section className={styles.section}>

      <div className={styles.header}>
        <div className={styles.eyebrow}>
          <div className={styles.eyebrowLine} />
          <span>The Journey Day by Day</span>
        </div>
        <h2 className={styles.h2}>
          Seven chapters.<br />
          <em className={styles.h2Italic}>Each its own world.</em>
        </h2>
      </div>

      <div className={styles.spine}>
        <div className={styles.centerLine} />

        {/* Day 1: Image Left, Text Right */}
        <div className={styles.row}>
          <div className={styles.imgLeft}>
            <div className={styles.imgWrap} style={{ height: '480px' }}>
              <div className={styles.imgBg} style={{ background: 'linear-gradient(158deg, oklch(28% 0.030 72) 0%, oklch(18% 0.020 68) 55%, oklch(13% 0.012 63) 100%)' }} />
              <Image src="/images/Journey detail template/JD-TL-01.png" alt="Gion" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
              <div className={styles.imgCaption}>Gion · 05:48</div>
            </div>
          </div>
          <div className={styles.nodeCol}>
            <div className={`${styles.node} ${styles.nodeGold}`} />
          </div>
          <div className={styles.textRight}>
            <div className={styles.dayNum}>01</div>
            <div className={styles.dayLabel}>Arrival · Gion</div>
            <h3 className={styles.dayTitle}>The neighbourhood that went to sleep centuries ago and decided not to wake up.</h3>
            <p className={styles.dayBody}>You arrive at Gion in the late afternoon, when the autumn light is most committed to its warmth. Your townhouse on a lane that dead-ends in a temple garden. A kimono laid out on the futon by someone who has already thought about your morning.</p>
            <p className={styles.dayBody}>Tonight: a kaiseki dinner at a restaurant your concierge has been visiting for eleven years. A table in the rear room, behind a screen that was painted in 1847.</p>
            <div className={styles.dayStat}>
              <div>
                <div className={styles.dayStatLabel}>Stay</div>
                <div className={styles.dayStatVal}>Gion private townhouse</div>
              </div>
              <div className={styles.dayStatDivider} />
              <div>
                <div className={styles.dayStatLabel}>Arrive by</div>
                <div className={styles.dayStatVal}>Shinkansen from Tokyo</div>
              </div>
            </div>
          </div>
        </div>

        {/* Day 2: Text Left, Image Right */}
        <div className={styles.row}>
          <div className={styles.textLeft}>
            <div className={styles.dayNum}>02</div>
            <div className={styles.dayLabel}>Eastern Hills · Dawn</div>
            <h3 className={styles.dayTitle}>The morning before the city remembers it has visitors.</h3>
            <p className={styles.dayBody}>At half past five your concierge meets you at the garden gate. The walk to Nanzenji takes twelve minutes. There is no one else on the stone path. The light through the aqueduct at this hour is something the morning holds only for those who came early enough to find it.</p>
            <p className={styles.dayBody}>Breakfast after, at a tofu restaurant that has been making breakfast at this hour since 1635.</p>
            <div className={`${styles.dayStat} ${styles.dayStatRight}`}>
              <div>
                <div className={styles.dayStatLabel}>Wake</div>
                <div className={styles.dayStatVal}>05:00</div>
              </div>
              <div className={styles.dayStatDivider} />
              <div>
                <div className={styles.dayStatLabel}>Stay</div>
                <div className={styles.dayStatVal}>Gion townhouse · night 2</div>
              </div>
            </div>
          </div>
          <div className={styles.nodeCol}>
            <div className={`${styles.node} ${styles.nodeStone}`} />
          </div>
          <div className={styles.imgRight}>
            <div className={styles.imgWrap} style={{ height: '480px' }}>
              <div className={styles.imgBg} style={{ background: 'linear-gradient(152deg, oklch(24% 0.022 215) 0%, oklch(16% 0.016 210) 55%, oklch(12% 0.010 206) 100%)' }} />
              <Image src="/images/Journey detail template/JD-TL-02.png" alt="Nanzenji" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
              <div className={styles.imgCaption}>Nanzenji · 06:04</div>
            </div>
          </div>
        </div>

        {/* Day 3: Image Left, Text Right */}
        <div className={styles.row}>
          <div className={styles.imgLeft}>
            <div className={styles.imgWrap} style={{ height: '400px' }}>
              <div className={styles.imgBg} style={{ background: 'linear-gradient(155deg, oklch(26% 0.028 148) 0%, oklch(18% 0.020 144) 55%, oklch(13% 0.014 140) 100%)' }} />
              <Image src="/images/Journey detail template/JD-TL-03.png" alt="Hoshinoya" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
              <div className={styles.imgCaption}>Hoshinoya · 14:22</div>
            </div>
          </div>
          <div className={styles.nodeCol}>
            <div className={`${styles.node} ${styles.nodeStone}`} />
          </div>
          <div className={styles.textRight}>
            <div className={styles.dayNum}>03</div>
            <div className={styles.dayLabel}>The River · Arashiyama</div>
            <h3 className={styles.dayTitle}>The only hotel in Kyoto you reach by boat.</h3>
            <p className={styles.dayBody}>A short private boat from the Oi River landing to Hoshinoya. The property sits in the forest above the waterline. No road access. No street noise. In three nights here you will sleep more deeply than you have in years.</p>
            <div className={styles.dayStat}>
              <div>
                <div className={styles.dayStatLabel}>Stay</div>
                <div className={styles.dayStatVal}>Hoshinoya Kyoto · nights 3–5</div>
              </div>
            </div>
          </div>
        </div>

        {/* Days 4–5: Centered text */}
        <div className={styles.centerBlock}>
          <div className={styles.centerBlockLine} />
          <div className={styles.centerDayNum}>04 — 05</div>
          <div className={styles.centerDayLabel}>The Forest Days</div>
          <h3 className={styles.centerDayTitle}>Two days with no itinerary except the quality of attention you bring to them.</h3>
          <p className={styles.centerDayBody}>At Hoshinoya you have no schedule. The forest begins at the edge of your room. The morning bath is fed by a thermal spring. Your meals are prepared from things that came, this morning, from the mountainside above. These two days exist as a counterpoint to every other part of the journey — an invitation to simply be somewhere that is entirely worth being in.</p>
        </div>

        {/* Day 6: Image Left, Text Right */}
        <div className={styles.row}>
          <div className={styles.imgLeft}>
            <div className={styles.imgWrap} style={{ height: '440px' }}>
              <div className={styles.imgBg} style={{ background: 'linear-gradient(150deg, oklch(22% 0.018 72) 0%, oklch(15% 0.012 68) 55%, oklch(11% 0.008 64) 100%)' }} />
              <Image src="/images/Journey detail template/JD-TL-04.png" alt="Arashiyama bamboo" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
              <div className={styles.imgCaption}>Arashiyama bamboo · 06:15</div>
            </div>
          </div>
          <div className={styles.nodeCol}>
            <div className={`${styles.node} ${styles.nodeStone}`} />
          </div>
          <div className={styles.textRight}>
            <div className={styles.dayNum}>06</div>
            <div className={styles.dayLabel}>The Bamboo · Departure Preparation</div>
            <h3 className={styles.dayTitle}>The bamboo grove before the morning changes its mind.</h3>
            <p className={styles.dayBody}>The famous bamboo corridor at Arashiyama is, at six in the morning, entirely silent. Your concierge has arranged private access to Okochi Sanso garden above it — the mountain villa of a silent-film actor who built it stone by stone across thirty years of mornings. The view at this hour justifies the climb.</p>
            <p className={styles.dayBody}>The afternoon returns you to the city. A final evening in Gion for dinner.</p>
          </div>
        </div>

        {/* Day 7: Text Left, Image Right */}
        <div className={`${styles.row} ${styles.rowLast}`}>
          <div className={styles.textLeft}>
            <div className={styles.dayNum}>07</div>
            <div className={styles.dayLabel}>Departure · Leave Slowly</div>
            <h3 className={styles.dayTitle}>The last morning belongs to the city. Give it the attention it gave you.</h3>
            <p className={styles.dayBody}>A final walk through the streets that still carry their original width, at the hour they are most themselves. Departure is in the late morning. The Shinkansen to Tokyo leaves at 10:42. Your concierge will meet you at Kyoto Station. Between now and then, no schedule.</p>
            <p className={styles.dayBodyFaded}>This journey ends in the same spirit it began. Unhurried. Entirely yours.</p>
          </div>
          <div className={styles.nodeCol}>
            <div className={`${styles.node} ${styles.nodeGold}`} />
          </div>
          <div className={styles.imgRight}>
            <div className={styles.imgWrap} style={{ height: '400px' }}>
              <div className={styles.imgBg} style={{ background: 'linear-gradient(148deg, oklch(30% 0.022 80) 0%, oklch(20% 0.016 76) 55%, oklch(14% 0.010 72) 100%)' }} />
              <Image src="/images/Journey detail template/JD-TL-05.png" alt="Nijo-jo" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
              <div className={styles.imgCaption}>Nijo-jo · 07:50</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
