import styles from './ConciergeWhatWeConsider.module.css';

const items = [
  { title: 'Pace', body: 'The speed at which you most naturally move through a new place — and whether that pace changes when you are travelling alone, with a partner, or with family.' },
  { title: 'Seasonality', body: 'Not simply what time of year you are able to travel, but the particular quality of light, weather, and atmosphere that suits the kind of experience you are seeking.' },
  { title: 'Privacy', body: 'The level of seclusion you find genuinely restorative — whether that is a private property, an intimate small hotel, or simply a room in a larger property that has been chosen for its particular quality of quiet.' },
  { title: 'Wellbeing', body: 'Not as a programme of treatments but as the quality of sleep, food, movement, and stillness that a journey should include in order to produce its best version of restoration.' },
  { title: 'Interests', body: 'The specific forms of curiosity you bring to a place — architecture, food, craft, literature, landscape, natural history. The journey should find the specific expressions of these that exist in each destination.' },
  { title: 'Culture', body: 'The depth and nature of your engagement with local culture — whether you wish to observe from a respectful distance or to participate in ways that require a different kind of access and preparation.' },
  { title: 'Food', body: 'The relationship you have with food when you travel — whether that is a fundamental part of how you experience a place, or something that should require the minimum of thought and the maximum of quality.' },
  { title: 'Silence', body: 'How much of it you require, in what forms, and at what points in the day. Some people need silence in the morning. Others in the afternoon. Others at a level of pervasiveness that determines the choice of accommodation as much as any other factor.' },
  { title: 'Architecture', body: 'The built environment that communicates something important to you — old stone, timber, traditional forms — and which qualities of building become, for you, a reason to remain in a place rather than simply to visit it.' },
  { title: 'Reading', body: 'Whether and how much of a journey is spent with books — and whether those books are chosen in advance, found in the property\'s library, or are the specific literature of the place being visited.' },
  { title: 'Walking', body: 'The degree to which moving through a place on foot is central to how you understand it — the distance, the terrain, the preferred pace, and whether the walk requires a purpose or whether the walk itself is the purpose.' },
  { title: 'Family', body: 'If you travel with family, the particular dynamics that make a shared journey genuinely shared — the moments of togetherness, the moments of independence, and the specific age and disposition of the people travelling with you.' },
];

export default function ConciergeWhatWeConsider() {
  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <div className={styles.eyebrow}>
          <div className={styles.eyebrowLine} />
          <span>What we consider</span>
        </div>
        <h2 className={styles.h2}>
          Every dimension of a<br />
          life well-travelled.
        </h2>
      </div>

      <div className={styles.grid}>
        {items.map((item, i) => (
          <div key={item.title} className={`${styles.cell} ${i >= 8 ? styles.cellLastRow : ''}`}>
            <div className={styles.cellTitle}>{item.title}</div>
            <p className={styles.cellBody}>{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
