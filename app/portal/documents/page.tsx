'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './documents.module.css';
import { PAYMENTS, PORTAL_USER } from '@/data/portal';

// ─── Types ─────────────────────────────────────────────────────────────────────
type DocStatus = 'Available Offline' | 'Updated' | 'New' | 'Awaiting' | 'Pending';
type DocType =
  | 'travelbook' | 'hotel' | 'flight' | 'transfers'
  | 'restaurants' | 'wellness' | 'experiences' | 'insurance'
  | 'emergency' | 'visa' | 'packing' | 'receipt';

interface Doc {
  id: number;
  title: string;
  desc: string;
  cat: string;
  updated: string;
  status: DocStatus;
  offline: boolean;
  type: DocType;
  downloadable: boolean;
  filename: string;
  icon: React.ReactNode;
}

// ─── Filter labels ─────────────────────────────────────────────────────────────
const FILTER_LABELS = ['All', 'Travel', 'Accommodation', 'Transport', 'Reservations', 'Guides', 'Important'];

// ─── Icon factory ──────────────────────────────────────────────────────────────
function makeIcon(children: React.ReactNode) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#8A8070" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

const ICONS = {
  travelbook: makeIcon(<>
    <path d="M1.5 14.5V4.5a1 1 0 0 1 1-1H8v11H2.5a1 1 0 0 1-1-1z"/>
    <path d="M16.5 14.5V4.5a1 1 0 0 0-1-1H10v11h5.5a1 1 0 0 0 1-1z"/>
    <line x1="8" y1="3.5" x2="10" y2="3.5"/>
    <line x1="8" y1="14.5" x2="10" y2="14.5"/>
    <line x1="3" y1="7" x2="7" y2="7"/>
    <line x1="3" y1="9.5" x2="7" y2="9.5"/>
    <line x1="11" y1="7" x2="15" y2="7"/>
    <line x1="11" y1="9.5" x2="15" y2="9.5"/>
  </>),
  hotel: makeIcon(<>
    <path d="M3 16V8L9 4.5 15 8v8"/>
    <line x1="1" y1="16" x2="17" y2="16"/>
    <rect x="7" y="10" width="4" height="6"/>
    <rect x="4.5" y="8.5" width="2" height="2"/>
    <rect x="11.5" y="8.5" width="2" height="2"/>
  </>),
  flight: makeIcon(<>
    <path d="M9 2L7 9.5H4.5l1 2H8L7 15.5l2-.5 2 .5-1-4h2.5l1-2H11L9 2z"/>
  </>),
  car: makeIcon(<>
    <path d="M1.5 11.5l1.5-4h12l1.5 4v3h-15v-3z"/>
    <path d="M4.5 7.5L6 5h6l2 2.5"/>
    <circle cx="4.5" cy="14.5" r="1.2"/>
    <circle cx="13.5" cy="14.5" r="1.2"/>
  </>),
  restaurant: makeIcon(<>
    <line x1="5.5" y1="2" x2="5.5" y2="16"/>
    <line x1="3.5" y1="2" x2="3.5" y2="6"/>
    <line x1="7.5" y1="2" x2="7.5" y2="6"/>
    <path d="M3.5 6 Q5.5 7.5 7.5 6"/>
    <path d="M12 2 Q14.5 5 13 8"/>
    <line x1="13" y1="8" x2="13" y2="16"/>
  </>),
  wellness: makeIcon(<>
    <path d="M9 15C5 12 1.5 9 1.5 6a3.8 3.8 0 0 1 7.5-.8 3.8 3.8 0 0 1 7.5.8C16.5 9 13 12 9 15z"/>
  </>),
  compass: makeIcon(<>
    <circle cx="9" cy="9" r="6.5"/>
    <circle cx="9" cy="9" r="0.75"/>
    <path d="M9 2.5v1.5 M9 14v1.5 M2.5 9h1.5 M14 9h1.5"/>
    <path d="M11.5 6.5L9.8 9.8 6.5 11.5 8.2 8.2z"/>
  </>),
  shield: makeIcon(<>
    <path d="M9 2L3 4.5V9.5c0 3.2 2.5 6 6 6.5 3.5-.5 6-3.3 6-6.5V4.5L9 2z"/>
    <path d="M6.5 9.5l2 2 3-3"/>
  </>),
  medical: makeIcon(<>
    <circle cx="9" cy="9" r="6.5"/>
    <line x1="9" y1="5.5" x2="9" y2="12.5"/>
    <line x1="5.5" y1="9" x2="12.5" y2="9"/>
  </>),
  passport: makeIcon(<>
    <rect x="3.5" y="2" width="11" height="14" rx="1.2"/>
    <circle cx="9" cy="7.5" r="2.5"/>
    <path d="M6.5 7.5 Q9 5 11.5 7.5 Q9 10 6.5 7.5"/>
    <line x1="5.5" y1="12" x2="12.5" y2="12"/>
  </>),
  suitcase: makeIcon(<>
    <rect x="2" y="8" width="14" height="8" rx="1"/>
    <path d="M6.5 8V6a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2"/>
    <line x1="2" y1="12" x2="16" y2="12"/>
    <line x1="6.5" y1="12" x2="6.5" y2="16"/>
    <line x1="11.5" y1="12" x2="11.5" y2="16"/>
  </>),
  receipt: makeIcon(<>
    <path d="M3.5 2h11v11.5l-1.75-1.25-1.75 1.25-1.75-1.25-1.75 1.25-1.75-1.25-2.25 1.5V2z"/>
    <line x1="5.5" y1="6" x2="12.5" y2="6"/>
    <line x1="5.5" y1="8.5" x2="12.5" y2="8.5"/>
    <line x1="5.5" y1="11" x2="9" y2="11"/>
  </>),
};

// ─── Document data ─────────────────────────────────────────────────────────────
const ALL_DOCS: Doc[] = [
  { id: 1,  type: 'travelbook',  title: 'Japan Travel Book',        desc: 'Complete journey overview, destinations and editorial notes', cat: 'Travel',        updated: '14 Jul', status: 'Updated',          offline: true,  downloadable: true,  filename: 'meridian-japan-travel-book.html',          icon: ICONS.travelbook },
  { id: 2,  type: 'hotel',       title: 'Hotel Confirmations',       desc: 'Park Hyatt Tokyo · Aman Kyoto · Gōra Kadan',                cat: 'Accommodation', updated: '12 Jul', status: 'Available Offline', offline: true,  downloadable: true,  filename: 'meridian-hotel-confirmations.html',         icon: ICONS.hotel      },
  { id: 3,  type: 'flight',      title: 'Flight Details',            desc: 'BA 4 · LHR–NRT · Sat 12 Sep · Business Class',              cat: 'Transport',     updated: '8 Jul',  status: 'Available Offline', offline: true,  downloadable: true,  filename: 'meridian-flight-confirmation.html',         icon: ICONS.flight     },
  { id: 4,  type: 'transfers',   title: 'Private Transfers',         desc: 'Airport to hotel · All journey legs confirmed',              cat: 'Transport',     updated: '8 Jul',  status: 'Available Offline', offline: true,  downloadable: true,  filename: 'meridian-japan-transfers.html',             icon: ICONS.car        },
  { id: 5,  type: 'restaurants', title: 'Restaurant Reservations',   desc: 'Den · Narisawa · Kikunoi Honten · Dining notes',            cat: 'Reservations',  updated: '9 Jul',  status: 'Awaiting',          offline: false, downloadable: false, filename: '',                                          icon: ICONS.restaurant },
  { id: 6,  type: 'wellness',    title: 'Wellness Appointments',     desc: 'Onsen · Tea ceremony · Ikebana class',                      cat: 'Reservations',  updated: '7 Jul',  status: 'Available Offline', offline: true,  downloadable: true,  filename: 'meridian-japan-wellness.html',              icon: ICONS.wellness   },
  { id: 7,  type: 'experiences', title: 'Curated Experiences',       desc: 'Private access · Cultural immersions · Hidden Tokyo',       cat: 'Travel',        updated: '11 Jul', status: 'New',               offline: true,  downloadable: true,  filename: 'meridian-japan-experiences.html',           icon: ICONS.compass    },
  { id: 8,  type: 'insurance',   title: 'Travel Insurance',          desc: 'Policy · Medical · Cancellation coverage',                  cat: 'Important',     updated: '28 Jun', status: 'Pending',           offline: false, downloadable: false, filename: '',                                          icon: ICONS.shield     },
  { id: 9,  type: 'emergency',   title: 'Emergency Contacts',        desc: 'Meridian 24h line · Local embassy · Medical',               cat: 'Important',     updated: '3 Jul',  status: 'Available Offline', offline: true,  downloadable: true,  filename: 'meridian-japan-emergency-contacts.html',    icon: ICONS.medical    },
  { id: 10, type: 'visa',        title: 'Visa Information',          desc: 'Japan entry requirements · Proof of onward travel',         cat: 'Guides',        updated: '5 Jul',  status: 'Available Offline', offline: true,  downloadable: true,  filename: 'meridian-japan-visa-info.html',             icon: ICONS.passport   },
  { id: 11, type: 'packing',     title: 'Packing Guide',             desc: 'Season · Climate · Dress code · Ryokan etiquette',         cat: 'Guides',        updated: '6 Jul',  status: 'Available Offline', offline: false, downloadable: true,  filename: 'meridian-japan-packing-guide.html',         icon: ICONS.suitcase   },
  { id: 12, type: 'receipt',     title: 'Payment Receipt',           desc: 'Deposit receipt · Receipt #MER-JPN-2026-001',               cat: 'Travel',        updated: '28 Jun', status: 'Available Offline', offline: true,  downloadable: true,  filename: 'meridian-deposit-receipt-MER-JPN-2026-001.html', icon: ICONS.receipt },
];

// ─── Travel Book contents ──────────────────────────────────────────────────────
const TRAVEL_BOOK_CONTENTS = [
  { page: '01', title: 'Introduction',     sub: 'A note from Sofia on your journey'                   },
  { page: '04', title: 'Journey Overview', sub: '12–24 Sep 2026 · Tokyo · Kyoto · Hakone'            },
  { page: '12', title: 'Hotels & Ryokan', sub: 'Park Hyatt Tokyo · Aman Kyoto · Gōra Kadan'         },
  { page: '20', title: 'Experiences',     sub: 'Private access · Cultural immersions · Hidden Tokyo' },
  { page: '28', title: 'Dining',          sub: 'Den · Narisawa · Kikunoi Honten · Okutan'           },
  { page: '36', title: 'Notes from Sofia', sub: 'Autumn in Japan · September conditions'             },
];

// ─── Download utility ──────────────────────────────────────────────────────────
function triggerDownload(filename: string, html: string) {
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

const DOC_CSS = `
  body{font-family:Georgia,'Times New Roman',serif;max-width:700px;margin:48px auto;color:#1A1510;line-height:1.65;padding:0 24px}
  .hd{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:1px solid #C8A96A;padding-bottom:20px;margin-bottom:40px}
  .wm{font-size:28px;font-weight:300;letter-spacing:.14em}
  .wm-sub{font-size:9px;letter-spacing:.28em;text-transform:uppercase;color:#6A6050;margin-top:4px}
  .dm{text-align:right;font-size:11px;color:#6A6050;letter-spacing:.08em}
  .dm-t{font-size:13px;font-weight:500;margin-bottom:4px}
  .eyebrow{font-size:9px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:#9A9080;margin-bottom:16px}
  h2{font-size:22px;font-weight:300;margin:0 0 4px}
  .sub{font-size:12px;color:#6A6050;margin-bottom:16px}
  .card{border:1px solid #E0D8CC;padding:22px 26px;margin-bottom:16px;page-break-inside:avoid}
  .badge{display:inline-block;font-size:9px;font-weight:500;letter-spacing:.15em;text-transform:uppercase;border:1px solid;padding:2px 10px;margin-bottom:12px}
  .confirmed{color:#6A8A70;border-color:rgba(106,138,112,.4)}
  .awaiting{color:#9A9080;border-color:rgba(154,144,128,.35)}
  .grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;font-size:12px}
  .grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;font-size:12px}
  .ml{font-size:9px;text-transform:uppercase;letter-spacing:.12em;color:#9A9080;margin-bottom:3px}
  .mv{font-size:13px;color:#1A1510}
  .span2{grid-column:span 2}
  .route{display:flex;align-items:center;margin:16px 0}
  .ap{flex:1}
  .ap:last-child{text-align:right}
  .ap-code{font-size:32px;font-weight:300;letter-spacing:.1em}
  .ap-city{font-size:10px;color:#9A9080}
  .ap-time{font-size:15px;margin-top:4px}
  .arr{flex:0 0 auto;padding:0 14px;text-align:center}
  .arr-line{width:60px;height:1px;background:#C8A96A;margin:4px auto}
  .arr-dur{font-size:9px;color:#9A9080}
  table{width:100%;border-collapse:collapse;font-size:13px}
  th{text-align:left;font-size:9px;text-transform:uppercase;letter-spacing:.12em;color:#9A9080;padding:8px 0;border-bottom:1px solid #E0D8CC;font-weight:400}
  td{padding:10px 0;border-bottom:1px solid rgba(26,21,16,.06)}
  .amt-block{background:rgba(26,21,16,.04);padding:20px 24px;margin-bottom:24px}
  .amt-l{font-size:9px;text-transform:uppercase;letter-spacing:.16em;color:#9A9080;margin-bottom:6px}
  .amt-v{font-size:44px;font-weight:300}
  .ft{margin-top:48px;padding-top:20px;border-top:1px solid rgba(26,21,16,.12);font-size:10px;color:#9A9080;display:flex;justify-content:space-between}
  @media print{body{margin:0;padding:0 16px}.card{break-inside:avoid}}
`;

function buildDocHTML(doc: Doc): string {
  const sym = PAYMENTS.symbol;

  const header = (subtitle: string) => `
    <div class="hd">
      <div><div class="wm">Meridian</div><div class="wm-sub">Private Travel</div></div>
      <div class="dm"><div class="dm-t">${doc.title}</div>${subtitle}</div>
    </div>`;

  const footer = `
    <div class="ft">
      <div>Prepared by Sofia Laurent · Meridian Private Travel</div>
      <div>${PORTAL_USER.name} · Japan Autumn 2026</div>
    </div>`;

  const wrap = (body: string, subtitle = 'Japan · 12 Nights') =>
    `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>${doc.title} — Meridian</title><style>${DOC_CSS}</style></head><body>${header(subtitle)}${body}${footer}</body></html>`;

  switch (doc.type) {
    case 'travelbook':
      return wrap(`
        <div style="background:#1C1810;color:#F4EFE8;padding:40px 32px;margin-bottom:32px">
          <div class="eyebrow" style="color:#5A5040">Meridian · Japan 2026</div>
          <div style="font-size:56px;font-weight:300;line-height:.9;letter-spacing:.06em;margin-bottom:16px">Japan<br><span style="font-size:32px;font-style:italic;color:#9A8070">Travel Book</span></div>
          <div style="font-size:10px;letter-spacing:.14em;color:#5A5040;text-transform:uppercase;margin-top:20px">12 Nights · 12–24 Sep 2026</div>
        </div>
        <div class="eyebrow">Contents</div>
        ${TRAVEL_BOOK_CONTENTS.map(c => `
          <div style="display:flex;justify-content:space-between;align-items:baseline;padding:12px 0;border-bottom:1px solid rgba(26,21,16,.07)">
            <div><div style="font-size:17px;font-weight:300;margin-bottom:2px">${c.title}</div><div style="font-size:11px;color:#9A9080">${c.sub}</div></div>
            <div style="font-size:13px;color:#C8B89A">${c.page}</div>
          </div>`).join('')}
        <div style="margin-top:28px;padding:18px 22px;background:rgba(26,21,16,.03);border-left:2px solid #C8A96A">
          <div style="font-size:9px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:#9A9080;margin-bottom:8px">A note from Sofia</div>
          <div style="font-style:italic;font-size:14px;color:#3A3020;line-height:1.7">"Japan in September sits just before the crowds arrive for autumn colour. I've built this around the hours and places that the guidebooks don't reach — and a few that take some patience to access."</div>
        </div>`);

    case 'hotel':
      return wrap(`
        ${[
          { status: 'confirmed', name: 'Park Hyatt Tokyo', loc: '52nd Floor, Nishi-Shinjuku, Tokyo', checkin: 'Saturday, 12 September 2026', checkout: 'Tuesday, 15 September 2026', nights: '3 Nights', room: 'Executive Park View Suite', ref: 'PH-TOK-2026-1847' },
          { status: 'confirmed', name: 'Aman Kyoto', loc: '1 Aman, Ninna-ji, Ukyo Ward, Kyoto', checkin: 'Tuesday, 15 September 2026', checkout: 'Sunday, 20 September 2026', nights: '5 Nights', room: 'Forest Suite', ref: 'AK-KYT-2026-2104' },
          { status: 'awaiting', name: 'Gōra Kadan', loc: '1300 Gōra, Hakone-machi, Kanagawa', checkin: 'Sunday, 20 September 2026', checkout: 'Thursday, 24 September 2026', nights: '4 Nights', room: 'Deluxe Room', ref: 'Expected by 18 Jul 2026' },
        ].map(h => `
          <div class="card">
            <div class="badge ${h.status}">${h.status === 'confirmed' ? 'Confirmed' : 'Awaiting Confirmation'}</div>
            <h2>${h.name}</h2><div class="sub">${h.loc}</div>
            <div class="grid-3">
              <div><div class="ml">Check-in</div><div class="mv">${h.checkin}</div></div>
              <div><div class="ml">Check-out</div><div class="mv">${h.checkout}</div></div>
              <div><div class="ml">Duration</div><div class="mv">${h.nights}</div></div>
              <div><div class="ml">Room type</div><div class="mv">${h.room}</div></div>
              <div class="span2"><div class="ml">Confirmation reference</div><div class="mv">${h.ref}</div></div>
            </div>
          </div>`).join('')}`);

    case 'flight':
      return wrap(`
        <div class="card">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
            <div style="font-size:13px;font-weight:500;letter-spacing:.04em">British Airways</div>
            <div style="font-size:11px;color:#9A9080">Flight BA 4 · Business Class (Club World)</div>
          </div>
          <div class="route">
            <div class="ap"><div class="ap-code">LHR</div><div class="ap-city">London Heathrow · Terminal 5</div><div class="ap-time">10:35</div></div>
            <div class="arr"><div class="arr-dur">11h 15m · Non-stop</div><div class="arr-line"></div><div style="font-size:9px;color:#9A9080">Sat 12 Sep 2026</div></div>
            <div class="ap"><div class="ap-code">NRT</div><div class="ap-city">Tokyo Narita · Terminal 3</div><div class="ap-time">07:50+1</div></div>
          </div>
          <div class="grid">
            <div><div class="ml">Booking reference</div><div class="mv" style="font-family:monospace">MRDJPN26</div></div>
            <div><div class="ml">Baggage allowance</div><div class="mv">2 × 32 kg per passenger</div></div>
            <div><div class="ml">Outbound</div><div class="mv">Saturday, 12 September 2026</div></div>
            <div><div class="ml">Arrival (local)</div><div class="mv">Sunday, 13 September 2026</div></div>
          </div>
        </div>
        <div class="eyebrow" style="margin-top:24px">Passengers</div>
        <table>
          <tr><th>Name</th><th>Seat</th><th>Cabin</th></tr>
          <tr><td>Emily Weston</td><td style="font-family:monospace">8A</td><td>Club World</td></tr>
          <tr><td>James Weston</td><td style="font-family:monospace">8C</td><td>Club World</td></tr>
          <tr><td>Isabelle Weston</td><td style="font-family:monospace">9A</td><td>Club World</td></tr>
        </table>`);

    case 'receipt':
      return wrap(`
        <div class="amt-block">
          <div class="amt-l">Amount Received</div>
          <div class="amt-v">${sym}${PAYMENTS.deposit.amount.toLocaleString()}</div>
        </div>
        <div class="grid">
          <div><div class="ml">Receipt number</div><div class="mv">#MER-JPN-2026-001</div></div>
          <div><div class="ml">Payment date</div><div class="mv">28 June 2026</div></div>
          <div><div class="ml">Method</div><div class="mv">Bank Transfer</div></div>
          <div><div class="ml">Journey</div><div class="mv">Japan · 12 Nights</div></div>
          <div><div class="ml">Client</div><div class="mv">${PORTAL_USER.name}</div></div>
          <div><div class="ml">Description</div><div class="mv">Journey Deposit</div></div>
        </div>
        <p style="font-size:12px;color:#9A9080;margin-top:28px">This receipt confirms receipt of the journey deposit. All payments are held in client accounts until confirmed.</p>`,
        'Receipt · Japan Journey');

    case 'transfers':
      return wrap(`
        ${[
          { date: '12 Sep 2026', time: '08:30', title: 'Departure transfer to LHR', detail: 'Private chauffeur · Estimated 90 min journey to Terminal 5' },
          { date: '13 Sep 2026', time: '09:15', title: 'NRT arrival · Park Hyatt Tokyo', detail: 'Meet & greet at arrivals · Private car · Approx. 75 min to Shinjuku' },
          { date: '15 Sep 2026', time: '09:30', title: 'Tokyo → Kyoto via Shinkansen', detail: 'Nozomi 9 · Tokyo Station · Dep. 09:30 · Arr. Kyoto 11:48 · Transfer to Aman Kyoto on arrival' },
          { date: '20 Sep 2026', time: '10:00', title: 'Kyoto → Hakone', detail: 'Private car · Scenic route via Lake Biwa · Approx. 4 hours · Includes rest stop' },
          { date: '24 Sep 2026', time: '06:30', title: 'Gōra Kadan → NRT departure', detail: 'Private car · Early departure · Approx. 90 min to Terminal 3 · BA 5 dep. 10:30' },
        ].map(t => `
          <div style="display:flex;gap:16px;padding:14px 0;border-bottom:1px solid rgba(26,21,16,.07)">
            <div style="min-width:80px;font-size:11px;color:#9A9080;padding-top:2px">${t.date}</div>
            <div style="min-width:44px;font-size:13px;color:#C8A96A">${t.time}</div>
            <div><div style="font-size:13px;font-weight:400;margin-bottom:2px">${t.title}</div><div style="font-size:11px;color:#9A9080">${t.detail}</div></div>
          </div>`).join('')}`);

    case 'wellness':
      return wrap(`
        ${[
          { date: 'Thu 14 Sep', time: '14:00', title: 'Ikebana (Flower Arranging)', loc: 'Studio Wakou, Minato, Tokyo', status: 'confirmed' },
          { date: 'Wed 16 Sep', time: '15:00', title: 'Private Tea Ceremony', loc: 'Urasenke, Omotesenke District, Kyoto', status: 'confirmed' },
          { date: 'Fri 18 Sep', time: '07:00', title: 'Guided Forest Meditation Walk', loc: 'Aman Kyoto grounds · Cedar forest', status: 'confirmed' },
          { date: 'Mon 22 Sep', time: 'Evening', title: 'Private Outdoor Onsen', loc: 'Gōra Kadan Ryokan · Private garden pool', status: 'confirmed' },
        ].map(w => `
          <div class="card">
            <div class="badge ${w.status}">${w.status === 'confirmed' ? 'Confirmed' : 'Pending'}</div>
            <h2 style="font-size:18px">${w.title}</h2>
            <div class="sub">${w.loc}</div>
            <div class="grid">
              <div><div class="ml">Date</div><div class="mv">${w.date}</div></div>
              <div><div class="ml">Time</div><div class="mv">${w.time}</div></div>
            </div>
          </div>`).join('')}`);

    case 'experiences':
      return wrap(`
        ${[
          { date: 'Sat 13 Sep', title: 'Tsukiji Outer Market · Private Early Access', detail: 'Before opening · With specialist guide · Tasting included · Approx. 2 hours', status: 'confirmed' },
          { date: 'Sat 13 Sep', title: 'TeamLab Planets · Private Session', detail: 'Toyosu · After general closing · Private digital art immersion', status: 'confirmed' },
          { date: 'Sun 14 Sep', title: 'Yanaka Neighbourhood Walk', detail: 'Old Tokyo district · With resident local guide · 3 hours', status: 'confirmed' },
          { date: 'Wed 16 Sep', title: 'Nanzen-ji at Dawn · Private Temple Access', detail: 'Before opening · Stone gate & carp garden · Includes Okutan breakfast reservation at 07:30', status: 'confirmed' },
          { date: 'Thu 17 Sep', title: 'Kinkaku-ji (Golden Pavilion) · Late Afternoon', detail: 'Private guide · Low-season light · Ryoanji Zen garden to follow', status: 'confirmed' },
          { date: 'Fri 18 Sep', title: 'Arashiyama Bamboo Dusk Walk', detail: 'Private guide · Access after main crowds depart · Lantern path', status: 'confirmed' },
          { date: 'Tue 22 Sep', title: 'Fuji Viewing · Lake Ashi', detail: 'Weather permitting · Private boat crossing · Seasonal photography notes from Sofia', status: 'awaiting' },
        ].map(e => `
          <div style="display:flex;gap:16px;padding:14px 0;border-bottom:1px solid rgba(26,21,16,.07)">
            <div style="min-width:72px;font-size:11px;color:#9A9080;padding-top:3px;flex-shrink:0">${e.date}</div>
            <div>
              <div style="font-size:13px;font-weight:400;margin-bottom:3px">${e.title}</div>
              <div style="font-size:11px;color:#9A9080;margin-bottom:6px">${e.detail}</div>
              <div class="badge ${e.status}" style="margin-bottom:0">${e.status === 'confirmed' ? 'Confirmed' : 'Weather dependent'}</div>
            </div>
          </div>`).join('')}`);

    case 'emergency':
      return wrap(`
        <p style="font-size:12px;color:#9A9080;margin-bottom:28px">Keep this document accessible at all times during travel. Meridian's 24-hour line is staffed around the clock.</p>
        ${[
          { type: 'Meridian Emergency Line', name: 'Available 24 hours', num: '+44 20 7946 0372', detail: 'For any travel emergency, lost documents, or urgent itinerary changes' },
          { type: 'Your Concierge', name: 'Sofia Laurent', num: '+33 6 72 38 45 01', detail: 'Direct line · WhatsApp · Available 08:00–22:00 CET' },
          { type: 'Japan Emergency Services', name: 'Police · Fire · Ambulance', num: '110 / 119', detail: 'English-speaking operators available at major tourist areas' },
          { type: 'British Embassy Tokyo', name: 'Consular services', num: '+81 3 5211 1100', detail: '1 Ichiban-cho, Chiyoda-ku, Tokyo 102-8381' },
          { type: 'Medical — Tokyo', name: 'Tokyo Medical & Surgical Clinic', num: '+81 3 3436 3028', detail: '32F, Tokyo Tower · International patient services · Open 24h' },
        ].map(c => `
          <div class="card" style="margin-bottom:12px">
            <div class="eyebrow" style="margin-bottom:8px">${c.type}</div>
            <div style="font-size:15px;font-weight:400;margin-bottom:4px">${c.name}</div>
            <div style="font-size:18px;font-weight:300;font-family:Georgia,serif;color:#1A1510;margin-bottom:6px">${c.num}</div>
            <div style="font-size:11px;color:#9A9080">${c.detail}</div>
          </div>`).join('')}`);

    case 'visa':
      return wrap(`
        <div class="card" style="border-left:2px solid #C8A96A">
          <div class="eyebrow">UK Citizens · Japan</div>
          <h2 style="font-size:18px;margin-bottom:10px">Visa-free entry · Up to 90 days</h2>
          <p style="font-size:12px;color:#6A6050">British passport holders do not require a visa to enter Japan as tourists for stays up to 90 days.</p>
        </div>
        <div style="margin-top:24px">
          ${[
            { title: 'Passport validity', detail: 'Must be valid for the full duration of the planned stay. No minimum validity beyond stay length is required by Japan, but airlines may have additional requirements.' },
            { title: 'Entry requirements', detail: 'Onward or return travel documentation. Proof of sufficient funds. Purpose of visit must be tourism, business meetings, or transit.' },
            { title: 'Customs allowances', detail: 'Foreign currency over JPY 1,000,000 equivalent must be declared. Strict controls on bringing food items and certain medications into Japan.' },
            { title: 'Children travelling', detail: 'Isabelle Weston (travelling with both parents) — no additional documentation required. If a child were travelling with one parent, a notarised consent letter would be required.' },
            { title: 'Health requirements', detail: 'No vaccination certificates required for entry from the UK at time of preparation. Check closer to departure for any updates.' },
          ].map(v => `
            <div style="padding:14px 0;border-bottom:1px solid rgba(26,21,16,.07)">
              <div style="font-size:13px;font-weight:500;margin-bottom:4px">${v.title}</div>
              <div style="font-size:12px;color:#6A6050;line-height:1.7">${v.detail}</div>
            </div>`).join('')}
        </div>`);

    case 'packing':
      return wrap(`
        <p style="font-size:12px;color:#9A9080;margin-bottom:28px">Japan in September: warm and humid in Tokyo, cooling in Kyoto, cooler still in Hakone evenings. Plan for layers and occasional rain.</p>
        ${[
          { cat: 'Clothing', items: ['Lightweight layers (T-shirts, light shirts)', 'One formal outfit (for Kaiseki dining)', 'Comfortable walking shoes (you will walk a great deal)', 'Slip-on shoes or sandals (for temple visits and ryokan)', 'Light jacket or cardigan (Kyoto evenings)', 'Compact rain jacket or umbrella'] },
          { cat: 'Documents', items: ['Passports (all three)', 'Copy of this travel book', 'Travel insurance certificate', 'Hotel confirmation printouts', 'Flight confirmation'] },
          { cat: 'Electronics', items: ['Type A/B adaptor (Japan uses 100V, two flat pins)', 'Camera and spare batteries', 'Portable charger (power banks)', 'Phone with offline maps downloaded'] },
          { cat: 'Health & Comfort', items: ['Any prescription medications (with documentation)', 'Sun protection (SPF 50 recommended)', 'Isabelle: EpiPen (carry in hand luggage, notify airline)', 'Insect repellent (forested areas in Kyoto/Hakone)', 'Blister plasters'] },
          { cat: 'Ryokan Etiquette', items: ['Ryokan slippers are provided — you will remove shoes at the entrance', 'A yukata (cotton robe) will be provided — suitable for evenings', 'Avoid tattoos being visible in shared onsen areas (policy varies; private onsen at Gōra Kadan is unaffected)'] },
        ].map(s => `
          <div style="margin-bottom:24px">
            <div style="font-size:13px;font-weight:500;margin-bottom:10px;border-bottom:1px solid rgba(26,21,16,.08);padding-bottom:8px">${s.cat}</div>
            <ul style="margin:0;padding-left:16px">
              ${s.items.map(i => `<li style="font-size:12px;color:#6A6050;margin-bottom:6px;line-height:1.6">${i}</li>`).join('')}
            </ul>
          </div>`).join('')}`);

    default:
      return wrap(`<p style="font-size:14px;color:#6A6050">${doc.desc}</p>`);
  }
}

// ─── Download handler ──────────────────────────────────────────────────────────
function downloadDoc(doc: Doc) {
  const html = buildDocHTML(doc);
  triggerDownload(doc.filename, html);
}

// ─── Shared viewer footer ──────────────────────────────────────────────────────
function ViewerActions({ doc, onDownload }: { doc: Doc; onDownload: () => void }) {
  return (
    <div className={styles.viewerActions}>
      {doc.downloadable && (
        <button className={styles.viewerDownloadBtn} onClick={onDownload}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 1v7M3 6l3 3 3-3"/>
            <path d="M1 10.5h10"/>
          </svg>
          Download
        </button>
      )}
    </div>
  );
}

// ─── Per-type viewer bodies ────────────────────────────────────────────────────

function TravelBookViewer({ onDownload }: { onDownload: () => void }) {
  const sym = PAYMENTS.symbol;
  void sym;
  return (
    <>
      <div className={styles.tbCover}>
        <div className={styles.tbEyebrow}>Meridian · Japan 2026</div>
        <div className={styles.tbTitle}>
          Japan<br/>
          <span className={styles.tbTitleItalic}>Travel Book</span>
        </div>
        <div className={styles.tbNights}>12 Nights · 12–24 Sep 2026</div>
      </div>
      <div className={styles.tbBody}>
        <div className={styles.tbContentsLabel}>Contents</div>
        <div className={styles.tbContents}>
          {TRAVEL_BOOK_CONTENTS.map((item, i) => (
            <div key={item.page} className={`${styles.tbItem} ${i < TRAVEL_BOOK_CONTENTS.length - 1 ? styles.tbItemBorder : ''}`}>
              <div>
                <div className={styles.tbItemTitle}>{item.title}</div>
                <div className={styles.tbItemSub}>{item.sub}</div>
              </div>
              <span className={styles.tbPageNum}>{item.page}</span>
            </div>
          ))}
        </div>
        <div className={styles.tbNote}>
          <div className={styles.tbNoteLabel}>A note from Sofia</div>
          <div className={styles.tbNoteQuote}>
            "Japan in September sits just before the crowds arrive for autumn colour. I've built this around the hours and places that the guidebooks don't reach — and a few that take some patience to access."
          </div>
        </div>
        <ViewerActions doc={{ downloadable: true } as Doc} onDownload={onDownload} />
      </div>
    </>
  );
}

function HotelViewer({ onDownload }: { onDownload: () => void }) {
  const hotels = [
    { status: 'confirmed' as const, name: 'Park Hyatt Tokyo', loc: '52nd Floor, Nishi-Shinjuku, Tokyo', checkin: '12 Sep 2026', checkout: '15 Sep 2026', nights: '3 Nights', room: 'Executive Park View Suite', ref: 'PH-TOK-2026-1847' },
    { status: 'confirmed' as const, name: 'Aman Kyoto',       loc: '1 Aman, Ninna-ji, Ukyo Ward, Kyoto', checkin: '15 Sep 2026', checkout: '20 Sep 2026', nights: '5 Nights', room: 'Forest Suite',              ref: 'AK-KYT-2026-2104' },
    { status: 'awaiting' as const,  name: 'Gōra Kadan',       loc: '1300 Gōra, Hakone-machi, Kanagawa', checkin: '20 Sep 2026', checkout: '24 Sep 2026', nights: '4 Nights', room: 'Deluxe Room',               ref: 'Expected by 18 Jul' },
  ];
  return (
    <div className={styles.viewerBody}>
      <div className={styles.viewerTitle}>Hotel Confirmations</div>
      <div className={styles.viewerMeta}>Japan Autumn 2026 · 12 Nights · 3 Destinations</div>
      <div className={styles.viewerSection}>
        {hotels.map(h => (
          <div key={h.name} className={styles.hotelCard}>
            <div className={styles.hotelStatus}>
              <span className={`${styles.docStatusBadge} ${h.status === 'confirmed' ? styles.statusConfirmed : styles.statusAwaiting}`}>
                {h.status === 'confirmed' ? 'Confirmed' : 'Awaiting Confirmation'}
              </span>
            </div>
            <div className={styles.hotelName}>{h.name}</div>
            <div className={styles.hotelLoc}>{h.loc}</div>
            <div className={styles.hotelMeta}>
              <div className={styles.metaItem}>
                <div className={styles.metaLabel}>Check-in</div>
                <div className={styles.metaValue}>{h.checkin}</div>
              </div>
              <div className={styles.metaItem}>
                <div className={styles.metaLabel}>Check-out</div>
                <div className={styles.metaValue}>{h.checkout}</div>
              </div>
              <div className={styles.metaItem}>
                <div className={styles.metaLabel}>Duration</div>
                <div className={styles.metaValue}>{h.nights}</div>
              </div>
              <div className={styles.metaItem}>
                <div className={styles.metaLabel}>Room type</div>
                <div className={styles.metaValue}>{h.room}</div>
              </div>
              <div className={`${styles.metaItem} ${styles.metaSpan2}`}>
                <div className={styles.metaLabel}>Confirmation reference</div>
                <div className={styles.metaValue}>{h.ref}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ViewerActions doc={{ downloadable: true } as Doc} onDownload={onDownload} />
    </div>
  );
}

function FlightViewer({ onDownload }: { onDownload: () => void }) {
  return (
    <div className={styles.viewerBody}>
      <div className={styles.viewerTitle}>Flight Details</div>
      <div className={styles.viewerMeta}>Outbound · Saturday 12 September 2026</div>

      <div className={styles.flightCard}>
        <div className={styles.flightAirlineRow}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#C8A96A" strokeWidth="1.1" strokeLinecap="round" aria-hidden="true">
            <path d="M14 4L11 16H8l2 3.5h3.5L12 26l2-.5 2 .5-1.5-7H18l2-3.5H17L14 4z"/>
          </svg>
          <div>
            <div className={styles.flightAirline}>British Airways</div>
            <div className={styles.flightFlightNum}>Flight BA 4 · Business Class (Club World)</div>
          </div>
        </div>

        <div className={styles.flightRoute}>
          <div className={styles.flightEnd}>
            <div className={styles.flightCode}>LHR</div>
            <div className={styles.flightCity}>London Heathrow · T5</div>
            <div className={styles.flightTime}>10:35</div>
          </div>
          <div className={styles.flightMiddle}>
            <div className={styles.flightDur}>11h 15m · Non-stop</div>
            <div className={styles.flightLine} aria-hidden="true" />
          </div>
          <div className={`${styles.flightEnd} ${styles.flightEndRight}`}>
            <div className={styles.flightCode}>NRT</div>
            <div className={styles.flightCity}>Tokyo Narita · T3</div>
            <div className={styles.flightTime}>07:50<span className={styles.nextDay}>+1</span></div>
          </div>
        </div>

        <div className={styles.flightMetaGrid}>
          <div className={styles.metaItem}><div className={styles.metaLabel}>Booking reference</div><div className={`${styles.metaValue} ${styles.metaMono}`}>MRDJPN26</div></div>
          <div className={styles.metaItem}><div className={styles.metaLabel}>Baggage</div><div className={styles.metaValue}>2 × 32 kg per passenger</div></div>
          <div className={styles.metaItem}><div className={styles.metaLabel}>Departure date</div><div className={styles.metaValue}>Saturday, 12 Sep 2026</div></div>
          <div className={styles.metaItem}><div className={styles.metaLabel}>Arrival (local)</div><div className={styles.metaValue}>Sunday, 13 Sep 2026</div></div>
        </div>
      </div>

      <div className={styles.viewerSectionLabel}>Passengers</div>
      <div className={styles.passengerList}>
        {[
          { name: 'Emily Weston',    seat: '8A' },
          { name: 'James Weston',    seat: '8C' },
          { name: 'Isabelle Weston', seat: '9A' },
        ].map(p => (
          <div key={p.name} className={styles.passengerRow}>
            <span className={styles.passengerName}>{p.name}</span>
            <span className={styles.passengerSeat}>Seat {p.seat}</span>
          </div>
        ))}
      </div>

      <ViewerActions doc={{ downloadable: true } as Doc} onDownload={onDownload} />
    </div>
  );
}

function TransfersViewer({ onDownload }: { onDownload: () => void }) {
  const transfers = [
    { date: '12 Sep', time: '08:30', title: 'Departure transfer to Heathrow', detail: 'Private chauffeur · Terminal 5 drop-off · 90 min est.' },
    { date: '13 Sep', time: '09:15', title: 'NRT Arrivals → Park Hyatt Tokyo', detail: 'Meet & greet · Private car · 75 min to Shinjuku' },
    { date: '15 Sep', time: '09:30', title: 'Tokyo → Kyoto · Nozomi Shinkansen', detail: 'Tokyo Station · Dep. 09:30 · Arr. Kyoto 11:48 · Transfer to Aman Kyoto' },
    { date: '20 Sep', time: '10:00', title: 'Kyoto → Hakone · Private Car', detail: 'Scenic route · Approx. 4 hours · Rest stop included' },
    { date: '24 Sep', time: '06:30', title: 'Gōra Kadan → NRT Departure', detail: 'Private car · BA 5 dep. 10:30 · Terminal 3 drop-off' },
  ];
  return (
    <div className={styles.viewerBody}>
      <div className={styles.viewerTitle}>Private Transfers</div>
      <div className={styles.viewerMeta}>All transfer legs confirmed · Japan Autumn 2026</div>
      <div className={styles.transferList}>
        {transfers.map((t, i) => (
          <div key={i} className={styles.transferRow}>
            <div className={styles.transferDate}>{t.date}</div>
            <div className={styles.transferTime}>{t.time}</div>
            <div className={styles.transferBody}>
              <div className={styles.transferTitle}>{t.title}</div>
              <div className={styles.transferDetail}>{t.detail}</div>
            </div>
          </div>
        ))}
      </div>
      <ViewerActions doc={{ downloadable: true } as Doc} onDownload={onDownload} />
    </div>
  );
}

function RestaurantsViewer({ onDownload }: { onDownload: () => void }) {
  const bookings = [
    { name: 'Den',             detail: 'Minami-Aoyama, Tokyo · Contemporary kaiseki',          date: 'Sat 13 Sep · 20:00', status: 'confirmed' as const },
    { name: 'Narisawa',        detail: 'Minami-Aoyama, Tokyo · Innovative satoyama cuisine',   date: 'Mon 14 Sep · 19:30', status: 'confirmed' as const },
    { name: 'Okutan Nanzen-ji',detail: 'Sakyo Ward, Kyoto · Tofu kaiseki · Garden breakfast',  date: 'Wed 16 Sep · 07:30', status: 'confirmed' as const },
    { name: 'Kikunoi Honten',  detail: 'Higashiyama, Kyoto · Traditional kaiseki ryori',       date: 'Thu 17 Sep · 19:00', status: 'confirmed' as const },
    { name: 'Third evening · Tokyo TBC', detail: 'Sofia is working on a reservation — to be confirmed by end of week', date: 'Sun 14 Sep evening', status: 'awaiting' as const },
  ];
  return (
    <div className={styles.viewerBody}>
      <div className={styles.viewerTitle}>Restaurant Reservations</div>
      <div className={styles.viewerMeta}>4 confirmed · 1 awaiting · Updated 9 Jul</div>
      <div className={styles.awaitingNotice}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#D49B50" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true">
          <circle cx="6" cy="6" r="4.5"/>
          <path d="M6 4v2.5M6 8.5h.01"/>
        </svg>
        Sofia is finalising the third Tokyo evening. You will receive an update in Messages within the week.
      </div>
      <div className={styles.bookingList}>
        {bookings.map((b, i) => (
          <div key={i} className={styles.bookingRow}>
            <div>
              <div className={styles.bookingName}>{b.name}</div>
              <div className={styles.bookingDetail}>{b.detail}</div>
            </div>
            <div className={styles.bookingRight}>
              <div className={styles.bookingDate}>{b.date}</div>
              <span className={`${styles.docStatusBadge} ${b.status === 'confirmed' ? styles.statusConfirmed : styles.statusAwaiting}`}>
                {b.status === 'confirmed' ? 'Confirmed' : 'Awaiting'}
              </span>
            </div>
          </div>
        ))}
      </div>
      <ViewerActions doc={{ downloadable: false } as Doc} onDownload={onDownload} />
    </div>
  );
}

function WellnessViewer({ onDownload }: { onDownload: () => void }) {
  const appts = [
    { date: 'Thu 14 Sep', time: '14:00', title: 'Ikebana (Flower Arranging)',     loc: 'Studio Wakou, Minato, Tokyo' },
    { date: 'Wed 16 Sep', time: '15:00', title: 'Private Tea Ceremony',           loc: 'Urasenke, Omotesenke District, Kyoto' },
    { date: 'Fri 18 Sep', time: '07:00', title: 'Guided Forest Meditation Walk',  loc: 'Aman Kyoto grounds · Cedar forest' },
    { date: 'Mon 22 Sep', time: 'Evening', title: 'Private Outdoor Onsen',        loc: 'Gōra Kadan Ryokan · Private garden pool' },
  ];
  return (
    <div className={styles.viewerBody}>
      <div className={styles.viewerTitle}>Wellness Appointments</div>
      <div className={styles.viewerMeta}>4 appointments confirmed · Updated 7 Jul</div>
      <div className={styles.apptList}>
        {appts.map((a, i) => (
          <div key={i} className={styles.apptCard}>
            <div className={styles.apptMeta}>
              <span className={styles.apptDate}>{a.date}</span>
              <span className={styles.apptTime}>{a.time}</span>
            </div>
            <div className={styles.apptTitle}>{a.title}</div>
            <div className={styles.apptLoc}>{a.loc}</div>
          </div>
        ))}
      </div>
      <ViewerActions doc={{ downloadable: true } as Doc} onDownload={onDownload} />
    </div>
  );
}

function ExperiencesViewer({ onDownload }: { onDownload: () => void }) {
  const exps = [
    { date: 'Sat 13 Sep', title: 'Tsukiji Outer Market · Private Early Access',   detail: 'Before opening · With specialist guide · Tasting included',              status: 'confirmed' as const },
    { date: 'Sat 13 Sep', title: 'TeamLab Planets · Private Session',             detail: 'Toyosu · After general closing · Private digital art immersion',         status: 'confirmed' as const },
    { date: 'Sun 14 Sep', title: 'Yanaka Neighbourhood Walk',                     detail: 'Old Tokyo district · With resident local guide · 3 hours',               status: 'confirmed' as const },
    { date: 'Wed 16 Sep', title: 'Nanzen-ji at Dawn · Private Temple Access',     detail: 'Before opening · Stone gate & carp garden · Okutan breakfast at 07:30', status: 'confirmed' as const },
    { date: 'Thu 17 Sep', title: 'Kinkaku-ji (Golden Pavilion) · Late Afternoon', detail: 'Private guide · Low-season light · Ryoanji Zen garden to follow',        status: 'confirmed' as const },
    { date: 'Fri 18 Sep', title: 'Arashiyama Bamboo Dusk Walk',                   detail: 'Private guide · Access after main crowds depart · Lantern path',         status: 'confirmed' as const },
    { date: 'Tue 22 Sep', title: 'Fuji Viewing · Lake Ashi',                      detail: 'Weather permitting · Private boat crossing',                             status: 'awaiting'  as const },
  ];
  return (
    <div className={styles.viewerBody}>
      <div className={styles.viewerTitle}>Curated Experiences</div>
      <div className={styles.viewerMeta}>6 confirmed · 1 weather-dependent · Updated 11 Jul</div>
      <div className={styles.bookingList}>
        {exps.map((e, i) => (
          <div key={i} className={styles.bookingRow}>
            <div>
              <div className={styles.bookingName}>{e.title}</div>
              <div className={styles.bookingDetail}>{e.detail}</div>
            </div>
            <div className={styles.bookingRight}>
              <div className={styles.bookingDate}>{e.date}</div>
              <span className={`${styles.docStatusBadge} ${e.status === 'confirmed' ? styles.statusConfirmed : styles.statusAwaiting}`}>
                {e.status === 'confirmed' ? 'Confirmed' : 'Pending'}
              </span>
            </div>
          </div>
        ))}
      </div>
      <ViewerActions doc={{ downloadable: true } as Doc} onDownload={onDownload} />
    </div>
  );
}

function InsuranceViewer({ onClose }: { onClose: () => void }) {
  return (
    <div className={styles.unavailableState}>
      <div className={styles.unavailableIcon} aria-hidden="true">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#C8B89A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M24 6L8 12V24c0 9.6 7.2 18 16 20 8.8-2 16-10.4 16-20V12L24 6z"/>
          <path d="M18 24l4 4 8-8"/>
        </svg>
      </div>
      <div className={styles.unavailableTitle}>Travel Insurance Certificate</div>
      <div className={styles.unavailableBadge}>
        <span className={`${styles.docStatusBadge} ${styles.statusPending}`}>Pending</span>
      </div>
      <p className={styles.unavailableText}>
        This document is still being prepared. Sofia will notify you in Messages as soon as your certificate is ready.
      </p>
      <div className={styles.unavailableActions}>
        <button className={styles.unavailableBack} onClick={onClose}>
          Return to Documents
        </button>
        <Link href="/portal/messages" className={styles.unavailableMsg}>
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true">
            <path d="M10.5 7.5A1.5 1.5 0 0 1 9 9H3L1 11V2.5A1.5 1.5 0 0 1 2.5 1h7A1.5 1.5 0 0 1 11 2.5z"/>
          </svg>
          Message Sofia
        </Link>
      </div>
    </div>
  );
}

function EmergencyViewer({ onDownload }: { onDownload: () => void }) {
  const contacts = [
    { type: 'Meridian Emergency Line', name: 'Available 24 hours',              num: '+44 20 7946 0372', detail: 'For any travel emergency, lost documents, or urgent itinerary changes' },
    { type: 'Your Concierge',          name: 'Sofia Laurent',                   num: '+33 6 72 38 45 01', detail: 'Direct line · WhatsApp · 08:00–22:00 CET' },
    { type: 'Japan Emergency Services', name: 'Police · Fire · Ambulance',       num: '110 / 119',        detail: 'English operators available at major tourist areas' },
    { type: 'British Embassy Tokyo',   name: 'Consular services',               num: '+81 3 5211 1100', detail: '1 Ichiban-cho, Chiyoda-ku, Tokyo' },
    { type: 'Medical · Tokyo',         name: 'Tokyo Medical & Surgical Clinic', num: '+81 3 3436 3028', detail: '32F, Tokyo Tower · International patient services' },
  ];
  return (
    <div className={styles.viewerBody}>
      <div className={styles.viewerTitle}>Emergency Contacts</div>
      <div className={styles.viewerMeta}>Keep accessible at all times during travel</div>
      <div className={styles.contactList}>
        {contacts.map((c, i) => (
          <div key={i} className={styles.contactCard}>
            <div className={styles.contactType}>{c.type}</div>
            <div className={styles.contactName}>{c.name}</div>
            <div className={styles.contactNum}>{c.num}</div>
            <div className={styles.contactDetail}>{c.detail}</div>
          </div>
        ))}
      </div>
      <ViewerActions doc={{ downloadable: true } as Doc} onDownload={onDownload} />
    </div>
  );
}

function VisaViewer({ onDownload }: { onDownload: () => void }) {
  const items = [
    { title: 'Visa requirement',      text: 'British passport holders do not require a visa for Japan as tourists for stays up to 90 days.' },
    { title: 'Passport validity',     text: 'Must be valid for the full duration of the stay. No minimum surplus validity required by Japan, but check airline requirements.' },
    { title: 'Entry requirements',    text: 'Proof of onward or return travel. Proof of sufficient funds. Purpose of visit: tourism, business meetings, or transit.' },
    { title: 'Customs',               text: 'Foreign currency over JPY 1,000,000 equivalent must be declared. Strict controls on food items and certain medications.' },
    { title: 'Children travelling',   text: 'Isabelle Weston is travelling with both parents — no additional documentation is required.' },
    { title: 'Health requirements',   text: 'No vaccination certificates required for entry from the UK. Check closer to departure for any updates.' },
  ];
  return (
    <div className={styles.viewerBody}>
      <div className={styles.viewerTitle}>Visa Information</div>
      <div className={styles.viewerMeta}>Japan entry requirements · UK citizens</div>
      <div className={styles.visaHighlight}>
        <div className={styles.visaHighlightTitle}>Visa-free entry · Up to 90 days</div>
        <div className={styles.visaHighlightSub}>British passport holders · Tourism & business</div>
      </div>
      <div className={styles.visaList}>
        {items.map((item, i) => (
          <div key={i} className={styles.visaItem}>
            <div className={styles.visaItemTitle}>{item.title}</div>
            <div className={styles.visaItemText}>{item.text}</div>
          </div>
        ))}
      </div>
      <ViewerActions doc={{ downloadable: true } as Doc} onDownload={onDownload} />
    </div>
  );
}

function PackingViewer({ onDownload }: { onDownload: () => void }) {
  const sections = [
    { cat: 'Clothing', items: ['Lightweight layers (T-shirts, light shirts)', 'One formal outfit for Kaiseki dining', 'Comfortable walking shoes', 'Slip-on shoes or sandals (temples, ryokan)', 'Light jacket or cardigan (Kyoto evenings)', 'Compact rain jacket or umbrella'] },
    { cat: 'Documents', items: ['Passports — all three', 'Copy of Travel Book', 'Travel insurance certificate', 'Hotel confirmations printout', 'Flight confirmation'] },
    { cat: 'Electronics', items: ['Type A/B adaptor (Japan: 100V, flat two-pin)', 'Camera and spare batteries', 'Portable charger / power bank', 'Phone with offline maps downloaded'] },
    { cat: 'Health', items: ['Prescription medications with documentation', 'Sun protection (SPF 50)', 'Isabelle: EpiPen in hand luggage — notify airline', 'Insect repellent for forested areas', 'Blister plasters'] },
    { cat: 'Ryokan etiquette', items: ['Slippers provided at ryokan — remove shoes at entrance', 'Yukata (cotton robe) provided for evenings', 'Private onsen at Gōra Kadan — no tattoo restrictions apply'] },
  ];
  return (
    <div className={styles.viewerBody}>
      <div className={styles.viewerTitle}>Packing Guide</div>
      <div className={styles.viewerMeta}>Japan September · Warm and humid · Plan for layers</div>
      {sections.map((s, i) => (
        <div key={i} className={styles.packSection}>
          <div className={styles.packCategory}>{s.cat}</div>
          <div className={styles.packItems}>
            {s.items.map((item, j) => (
              <div key={j} className={styles.packItem}>
                <span className={styles.packDot} aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>
      ))}
      <ViewerActions doc={{ downloadable: true } as Doc} onDownload={onDownload} />
    </div>
  );
}

function ReceiptDocViewer({ onDownload }: { onDownload: () => void }) {
  const sym = PAYMENTS.symbol;
  return (
    <div className={styles.receiptDocView}>
      <div className={styles.receiptDocHeader}>
        <div>
          <div className={styles.receiptDocWordmark}>Meridian</div>
          <div className={styles.receiptDocSub}>Private Travel</div>
        </div>
        <div className={styles.receiptDocRefBlock}>
          <div className={styles.receiptDocRefLabel}>Receipt</div>
          <div className={styles.receiptDocRefNum}>#MER-JPN-2026-001</div>
        </div>
      </div>
      <div className={styles.receiptDocAmt}>
        <div className={styles.receiptDocAmtLabel}>Amount Received</div>
        <div className={styles.receiptDocAmtNum}>{sym}{PAYMENTS.deposit.amount.toLocaleString()}</div>
      </div>
      <div className={styles.receiptDocGrid}>
        <div className={styles.metaItem}><div className={styles.metaLabel}>Payment date</div><div className={styles.metaValue}>28 June 2026</div></div>
        <div className={styles.metaItem}><div className={styles.metaLabel}>Method</div><div className={styles.metaValue}>Bank Transfer</div></div>
        <div className={styles.metaItem}><div className={styles.metaLabel}>Journey</div><div className={styles.metaValue}>Japan · 12 Nights</div></div>
        <div className={styles.metaItem}><div className={styles.metaLabel}>Client</div><div className={styles.metaValue}>{PORTAL_USER.name}</div></div>
        <div className={`${styles.metaItem} ${styles.metaSpan2}`}><div className={styles.metaLabel}>Description</div><div className={styles.metaValue}>Journey Deposit — First instalment</div></div>
      </div>
      <div className={styles.receiptDocNote}>
        This receipt confirms that the journey deposit has been received and is held in your client account. Sofia has been notified.
      </div>
      <ViewerActions doc={{ downloadable: true } as Doc} onDownload={onDownload} />
    </div>
  );
}

// ─── Document viewer dispatcher ────────────────────────────────────────────────
function DocViewer({ doc, onClose }: { doc: Doc; onClose: () => void }) {
  function handleDownload() { downloadDoc(doc); }
  switch (doc.type) {
    case 'travelbook':   return <TravelBookViewer  onDownload={handleDownload} />;
    case 'hotel':        return <HotelViewer        onDownload={handleDownload} />;
    case 'flight':       return <FlightViewer       onDownload={handleDownload} />;
    case 'transfers':    return <TransfersViewer    onDownload={handleDownload} />;
    case 'restaurants':  return <RestaurantsViewer  onDownload={handleDownload} />;
    case 'wellness':     return <WellnessViewer     onDownload={handleDownload} />;
    case 'experiences':  return <ExperiencesViewer  onDownload={handleDownload} />;
    case 'insurance':    return <InsuranceViewer    onClose={onClose} />;
    case 'emergency':    return <EmergencyViewer    onDownload={handleDownload} />;
    case 'visa':         return <VisaViewer         onDownload={handleDownload} />;
    case 'packing':      return <PackingViewer      onDownload={handleDownload} />;
    case 'receipt':      return <ReceiptDocViewer   onDownload={handleDownload} />;
  }
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function DocumentsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch]             = useState('');
  const [viewingDoc, setViewingDoc]     = useState<Doc | null>(null);
  const triggerRef                       = useState<HTMLButtonElement | null>(null)[1];

  // Auto-open via ?open=<id>
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const openId = params.get('open');
    if (openId) {
      const id = parseInt(openId, 10);
      const doc = ALL_DOCS.find(d => d.id === id);
      if (doc) setViewingDoc(doc);
    }
  }, []);

  // Escape to close
  useEffect(() => {
    if (!viewingDoc) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setViewingDoc(null); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [viewingDoc]);

  const filtered = ALL_DOCS
    .filter(d => activeFilter === 'All' || d.cat === activeFilter)
    .filter(d => {
      const q = search.toLowerCase().trim();
      return !q || d.title.toLowerCase().includes(q) || d.desc.toLowerCase().includes(q);
    });

  const isEmpty = filtered.length === 0;

  function openDoc(doc: Doc, el: HTMLButtonElement) {
    triggerRef(el);
    setViewingDoc(doc);
  }

  const statusClass = (s: DocStatus) => {
    const map: Record<DocStatus, string> = {
      'Available Offline': styles.status_Available_Offline,
      'Updated':           styles.status_Updated,
      'New':               styles.status_New,
      'Awaiting':          styles.status_Awaiting,
      'Pending':           styles.status_Pending,
    };
    return map[s] ?? '';
  };

  return (
    <>
      {/* Top bar */}
      <div className={`topBar ${styles.topBarDoc}`}>
        <div className="topDate">Monday, 14 July 2026</div>
        <div className="topUser">
          <div className="topAvatar">EW</div>
          <span className="topUsername">Emily Weston</span>
        </div>
      </div>

      {/* Page heading */}
      <div className={styles.heading}>
        <h1 className={styles.headingTitle}>Documents</h1>
        <div className={styles.headingSubtitle}>Everything prepared for your journey, quietly organised in one place.</div>
      </div>

      {/* Content grid */}
      <div className={styles.grid}>

        {/* ── Left main column ── */}
        <div className={styles.mainCol}>

          {/* Search row */}
          <div className={styles.searchRow}>
            <div className={styles.searchInner}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#9A9080" strokeWidth="1.2" strokeLinecap="round">
                <circle cx="5" cy="5" r="3.5"/>
                <path d="M8 8l2.5 2.5"/>
              </svg>
              <input
                type="search"
                className={styles.searchInput}
                placeholder="Search documents..."
                aria-label="Search documents"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Filter pills */}
          <div className={styles.filterRow} role="group" aria-label="Filter documents by category">
            {FILTER_LABELS.map(f => (
              <button
                key={f}
                className={`${styles.pill}${activeFilter === f ? ' ' + styles.pillActive : ''}`}
                onClick={() => setActiveFilter(f)}
                aria-pressed={activeFilter === f}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Document list */}
          {!isEmpty && (
            <div className={styles.docList} role="list">
              {filtered.map(doc => (
                <button
                  key={doc.id}
                  type="button"
                  role="listitem"
                  className={`btnReset ${styles.docRow}`}
                  onClick={e => openDoc(doc, e.currentTarget)}
                  aria-label={`Open ${doc.title} — ${doc.status}`}
                >
                  <div className={styles.docIconBox} aria-hidden="true">
                    {doc.icon}
                  </div>
                  <div className={styles.docText}>
                    <div className={styles.docNameRow}>
                      <span className={styles.docName}>{doc.title}</span>
                      <span className={`${styles.statusBadge} ${statusClass(doc.status)}`}>
                        {doc.status}
                      </span>
                    </div>
                    <div className={styles.docDesc}>{doc.desc}</div>
                  </div>
                  <div className={styles.docMeta}>
                    <div className={styles.docMetaInner}>
                      <div className={styles.docUpdated}>{doc.updated}</div>
                      {doc.offline && (
                        <div className={styles.docOffline}>
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="#6A8A70" strokeWidth="1.1" strokeLinecap="round" aria-hidden="true">
                            <path d="M1 4.5L3 6.5l4-4"/>
                          </svg>
                          Offline
                        </div>
                      )}
                    </div>
                    <svg className={styles.docArrow} width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#9A9080" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true">
                      <path d="M2.5 6h7M6.5 3.5L9 6l-2.5 2.5"/>
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Empty state */}
          {isEmpty && (
            <div className={styles.emptyState}>
              <svg width="64" height="80" viewBox="0 0 64 80" fill="none" stroke="#C8B89A" strokeWidth="1.2" strokeLinecap="round">
                <path d="M8 2h32l16 16v56a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/>
                <path d="M40 2v16h16"/>
                <path d="M16 38h32M16 46h24M16 54h20"/>
              </svg>
              <div className={styles.emptyTitle}>No documents found.</div>
              <div className={styles.emptyText}>
                {search ? `No results for "${search}".` : 'No documents in this category yet.'}
              </div>
              <button className={styles.emptyBtn} onClick={() => { setSearch(''); setActiveFilter('All'); }}>
                Clear filter
              </button>
            </div>
          )}
        </div>

        {/* ── Right sidebar ── */}
        <div className={styles.sidebar}>

          {/* Journey summary */}
          <div className={styles.journeyCard}>
            <div className={styles.jLabel}>Active Journey</div>
            <div className={styles.jTitle}>Japan</div>
            <div className={styles.jMeta}>12 Nights · 3 Destinations</div>
            <div className={styles.jDepartureBlock}>
              <div className={styles.jDepartureRow}>
                <span className={styles.jDepartureLabel}>Departure</span>
                <span className={styles.jDaysNum}>60</span>
              </div>
              <div className={styles.jDepartureRow2}>
                <span className={styles.jDate}>12 Sep 2026</span>
                <span className={styles.jDaysWord}>days</span>
              </div>
            </div>
            <div className={styles.jConcierge}>
              <div className={styles.jAvatar}><span>SL</span></div>
              <div>
                <div className={styles.jCName}>Sofia Laurent</div>
                <div className={styles.jCStatus}><span className={styles.jDot}></span>Available</div>
              </div>
            </div>
          </div>

          {/* Document count */}
          <div className={styles.sideCard}>
            <div className={styles.sideCardHeader}>
              <span className={styles.sideCardLabel}>Offline Access</span>
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none" stroke="#9A9080" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true">
                <path d="M9 13.5a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1z" fill="#9A9080"/>
                <path d="M1.5 6A10.5 10.5 0 0 1 16.5 6"/>
                <path d="M4 9A7 7 0 0 1 14 9"/>
                <path d="M6.5 11.5A3.5 3.5 0 0 1 11.5 11.5"/>
                <line x1="2" y1="2" x2="16" y2="16"/>
              </svg>
            </div>
            <div className={styles.offlineCount}>{ALL_DOCS.filter(d => d.offline).length}</div>
            <div className={styles.offlineLabel}>documents available offline</div>
          </div>

          {/* Storage */}
          <div className={styles.sideCard}>
            <div className={styles.sideCardLabel}>Storage</div>
            <div className={styles.storageRow}>
              <span className={styles.storageNum}>24</span>
              <span className={styles.storageMb}>MB used</span>
            </div>
            <div className={styles.storageBarWrap}>
              <div className={styles.storageBarFill}></div>
            </div>
            <div className={styles.storageOf}>of 500 MB allocated</div>
          </div>

          {/* Upload nudge */}
          <div className={styles.uploadBtn}>
            <span className={styles.uploadLabel}>Upload Document</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#9A9080" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true">
              <path d="M7 10V3M4 6l3-3 3 3"/>
              <path d="M2 12h10"/>
            </svg>
          </div>
        </div>
      </div>

      {/* ── Document viewer overlay ── */}
      {viewingDoc && (
        <div
          className={styles.overlay}
          onClick={() => setViewingDoc(null)}
          role="presentation"
        >
          <div
            className={styles.modal}
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="doc-viewer-heading"
          >
            {/* Viewer header */}
            <div className={styles.viewerHeader}>
              <button
                className={styles.viewerBack}
                onClick={() => setViewingDoc(null)}
                aria-label="Return to document list"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#9A9080" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true">
                  <path d="M8 2L4 6l4 4"/>
                </svg>
                All Documents
              </button>
              <span id="doc-viewer-heading" className={styles.viewerCat}>{viewingDoc.cat}</span>
              <button
                className={styles.viewerClose}
                onClick={() => setViewingDoc(null)}
                aria-label="Close document viewer"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" aria-hidden="true">
                  <path d="M2 2l10 10M12 2L2 12"/>
                </svg>
              </button>
            </div>

            <DocViewer doc={viewingDoc} onClose={() => setViewingDoc(null)} />
          </div>
        </div>
      )}
    </>
  );
}
