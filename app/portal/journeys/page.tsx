import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'My Journeys' };
import s from './journeys.module.css';
import { ACTIVE_JOURNEY, PAST_JOURNEYS, PLANNING_JOURNEYS } from '@/data/portal';

function ArrowSm({ stroke = '#1A1510' }: { stroke?: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke={stroke} strokeWidth="1.2">
      <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5" />
    </svg>
  );
}

const PLAN_VISUALS: Record<string, {
  bg: string; watermark: string; watermarkColor: string;
  svgW: number; svgH: number; svgPath: string; fill: string;
  badgeText: string; badgeColor: string; badgeBorder: string;
  season: string; subtitle: string;
}> = {
  Scotland: {
    bg: '#1E2820', watermark: 'SCT', watermarkColor: '#A8C8A8',
    svgW: 320, svgH: 100,
    svgPath: 'M0 100 L0 60 Q20 20 40 35 Q55 5 70 20 Q85 0 100 15 Q115 0 130 10 Q145 2 160 8 Q175 0 190 12 Q205 0 220 15 Q235 5 250 20 Q265 8 280 25 Q295 0 320 20 L320 100 Z',
    fill: '#A8C8A8',
    badgeText: 'Proposal in Progress', badgeColor: '#D49B50', badgeBorder: 'rgba(212,155,80,0.4)',
    season: 'Spring 2027', subtitle: 'Highlands & Skye',
  },
  Morocco: {
    bg: '#2E1A0A', watermark: 'MAR', watermarkColor: '#D4956A',
    svgW: 300, svgH: 120,
    svgPath: 'M0 120 L0 60 Q25 30 50 60 L50 120 M60 120 L60 60 Q85 30 110 60 L110 120 M120 120 L120 60 Q145 30 170 60 L170 120 M180 120 L180 60 Q205 30 230 60 L230 120 M240 120 L240 60 Q265 30 290 60 L300 60 L300 120 Z',
    fill: '#D4956A',
    badgeText: 'Awaiting Review', badgeColor: '#C8A96A', badgeBorder: 'rgba(200,169,106,0.45)',
    season: 'Winter 2026', subtitle: 'Marrakech & Atlas',
  },
};

const PAST_VISUALS: Record<string, { bg: string; fill: string; path: string }> = {
  Bhutan:  { bg: '#201828', fill: '#9A80B0', path: 'M0 80 L0 50 Q15 15 30 35 Q45 5 60 20 Q75 0 90 12 Q105 0 120 10 Q135 5 150 18 Q165 0 180 20 L200 25 L200 80 Z' },
  Iceland: { bg: '#121828', fill: '#8AB0C8', path: 'M0 80 L0 55 Q20 35 40 48 Q55 25 70 38 Q85 18 100 30 Q115 10 130 28 Q145 15 160 32 Q175 20 190 38 L200 35 L200 80 Z' },
  Kyoto:   { bg: '#261018', fill: '#C8A096', path: 'M0 80 L0 50 Q10 30 20 45 Q30 20 40 35 Q50 10 60 28 Q70 0 80 20 Q90 8 100 18 Q110 0 120 15 Q130 5 140 20 Q150 8 160 25 Q170 10 180 28 Q190 15 200 30 L200 80 Z' },
};

export default function JourneysPage() {
  return (
    <>
      {/* Top bar */}
      <div className={`topBar ${s.topBarJ}`}>
        <span className="topDate">Monday, 14 July 2026</span>
        <div className="topUser">
          <div className="topAvatar">EW</div>
          <span className="topUsername">Emily Weston</span>
        </div>
      </div>

      {/* Heading row: title+subtitle LEFT, button RIGHT */}
      <div className={s.headingRow}>
        <div>
          <h1 className={s.headingTitle}>My Journeys</h1>
          <p className={s.headingSubtitle}>Six journeys, from a winter week in Reykjavík to twelve nights across Japan.</p>
        </div>
        <button className={s.newJourneyBtn}>
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="#1A1510" strokeWidth="1.3">
            <path d="M5.5 1v9M1 5.5h9" />
          </svg>
          <span>Begin a New Journey</span>
        </button>
      </div>

      {/* ── SECTION 1: Upcoming Journey ── */}
      <div className={s.section}>
        <div className="eyebrow">Upcoming Journey</div>

        <Link href="/portal/journeys/japan/workspace" className={s.upcomingCard}>
          {/* Hero image area */}
          <div className={s.upcomingHero}>
            {/* Dark base */}
            <div className={s.upcomingBase} />
            {/* Kanji watermark */}
            <div className={s.upcomingKanji}>日本</div>
            {/* Mountain silhouette SVG */}
            <svg
              width="600" height="180" viewBox="0 0 600 180" fill="none"
              className={s.upcomingSilhouette}
            >
              <path d="M0 180 L0 120 Q30 80 60 100 Q80 60 100 70 Q120 30 140 50 Q160 20 180 40 Q200 10 220 30 Q240 0 260 20 Q280 5 300 15 Q320 0 340 18 Q360 8 380 25 Q400 0 420 20 Q440 10 460 30 Q480 20 500 35 Q520 15 540 40 Q560 60 580 80 L600 80 L600 180 Z" fill="#C8A96A" />
            </svg>
            {/* Centered title */}
            <div className={s.upcomingCenter}>
              <div className={s.upcomingTitle}>Japan</div>
              <div className={s.upcomingSeason}>Autumn 2026</div>
            </div>
          </div>

          {/* Footer info bar */}
          <div className={s.upcomingFooter}>
            <div className={s.upcomingLeft}>
              {/* Status + meta */}
              <div className={s.upcomingMetaRow}>
                <div className={s.confirmedBadge}>
                  <span className={s.confirmedDot} />
                  <span className={s.confirmedText}>Confirmed</span>
                </div>
                <span className={s.upcomingMeta}>12 Nights · 12–24 Sep 2026</span>
              </div>
              {/* Destination chips */}
              <div className={s.destChips}>
                {ACTIVE_JOURNEY.destinations.map(d => (
                  <span key={d} className={s.destChip}>{d}</span>
                ))}
              </div>
              {/* Concierge + travellers */}
              <div className={s.concRow}>
                <div className={s.concItem}>
                  <div className={s.concAvatar}>SL</div>
                  <span className={s.concName}>Sofia Laurent</span>
                </div>
                <div className={s.travItem}>
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="#5A5040" strokeWidth="1.1">
                    <circle cx="5.5" cy="3.5" r="2" />
                    <path d="M1 10c0-2.2 2-4 4.5-4s4.5 1.8 4.5 4" />
                  </svg>
                  <span className={s.travName}>{ACTIVE_JOURNEY.travellers} Travellers</span>
                </div>
              </div>
            </div>

            <div className={s.upcomingCta}>
              <span>Open Journey Workspace</span>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="#16120E" strokeWidth="1.4">
                <path d="M1.5 5.5h8M6.5 3L9 5.5 6.5 8" />
              </svg>
            </div>
          </div>
        </Link>
      </div>

      {/* ── SECTION 2: Planning ── */}
      <div className={s.section}>
        <div className="eyebrow">Planning</div>
        <div className={s.planGrid}>
          {PLANNING_JOURNEYS.map(j => {
            const v = PLAN_VISUALS[j.title];
            if (!v) return null;
            return (
              <Link
                key={j.title}
                href={`/portal/journeys/${j.title.toLowerCase()}/workspace`}
                className={s.planCard}
              >
                {/* Image area */}
                <div className={s.planImgWrap}>
                  <div className={s.planImgBg} style={{ background: v.bg }} />
                  {/* Watermark */}
                  <div className={s.planImgWatermark} style={{ color: v.watermarkColor }}>
                    {v.watermark}
                  </div>
                  {/* Silhouette */}
                  <svg
                    width={v.svgW} height={v.svgH}
                    viewBox={`0 0 ${v.svgW} ${v.svgH}`}
                    fill="none"
                    className={s.planImgSvg}
                  >
                    <path d={v.svgPath} fill={v.fill} />
                  </svg>
                  {/* Destination name */}
                  <div className={s.planImgTitle}>{j.title}</div>
                  {/* Status badge */}
                  <div
                    className={s.planImgBadge}
                    style={{ borderColor: v.badgeBorder, color: v.badgeColor }}
                  >
                    <span className={s.planBadgeDot} style={{ background: v.badgeColor }} />
                    <span>{v.badgeText}</span>
                  </div>
                </div>

                {/* Card body */}
                <div className={s.planBody}>
                  <div className={s.planUpdated}>Last updated · {j.updated} · {v.subtitle}</div>
                  <div className={s.planFooter}>
                    <span className={s.planSeason}>{v.season}</span>
                    <span className={s.planCta}>
                      Continue Planning
                      <ArrowSm />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── SECTION 3: Past Journeys ── */}
      <div className={s.section}>
        <div className={s.pastHeader}>
          <div className="eyebrow" style={{ margin: 0 }}>Past Journeys</div>
          <button className={s.archiveLink}>
            View Journey Archive
            <ArrowSm stroke="#9A9080" />
          </button>
        </div>
        <div className={s.pastGrid}>
          {PAST_JOURNEYS.map(j => {
            const v = PAST_VISUALS[j.title] ?? { bg: '#201828', fill: '#9A80B0', path: '' };
            return (
              <Link
                key={j.title}
                href={`/portal/journeys/${j.title.toLowerCase()}`}
                className={s.pastCard}
              >
                <div className={s.pastImgWrap}>
                  <div className={s.pastImgBg} style={{ background: v.bg }} />
                  {v.path && (
                    <svg width="200" height="80" viewBox="0 0 200 80" fill="none" className={s.pastImgSvg}>
                      <path d={v.path} fill={v.fill} />
                    </svg>
                  )}
                  <div className={s.pastImgTitle}>{j.title}</div>
                </div>
                <div className={s.pastBody}>
                  <div className={s.pastTopRow}>
                    <span className={s.pastSeason}>{j.subtitle}</span>
                    <span className={s.pastNights}>{j.nights} Nights</span>
                  </div>
                  <div className={s.pastDests}>{j.destinations.join(' · ')}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── SECTION 4: Memories + Stats ── */}
      <div className={s.bottomGrid}>
        {/* Memories */}
        <div className={`${s.memoriesCard} darkCard`}>
          <div className={s.memoriesEyebrow}>Journey Memories</div>
          <div className={s.memoriesTitle}>Your Collection</div>
          <blockquote className={s.memoriesQuote}>
            "Bhutan in March. Iceland in January. Kyoto last autumn. Each journey leaves something behind — a photograph, a note, a detail that stays with you."
          </blockquote>
          <div className={s.comingSoon}>Coming Soon</div>
        </div>

        {/* Stats */}
        <div className={`${s.statsCard} card`}>
          <div>
            <div className={s.statsEyebrow}>Journey Count</div>
            <div className={s.statsNum}>6</div>
            <div className={s.statsSub}>journeys with Meridian</div>
          </div>
          <div className={s.statsBottom}>
            {[
              { v: '3', l: 'completed', gold: false },
              { v: '2', l: 'in planning', gold: false },
              { v: '1', l: 'confirmed',  gold: true  },
            ].map(stat => (
              <div key={stat.l} className={s.statItem}>
                <div className={`${s.statVal} ${stat.gold ? s.statValGold : ''}`}>{stat.v}</div>
                <div className={s.statLbl}>{stat.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
