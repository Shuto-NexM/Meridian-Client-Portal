// ─── Mock portal data ─────────────────────────────────────────────────────────

export const PORTAL_USER = {
  name: 'Emily Weston',
  initials: 'EW',
  email: 'emily@weston.co.uk',
};

export const CONCIERGE = {
  name: 'Sofia Laurent',
  initials: 'SL',
  role: 'Private Travel Concierge',
  status: 'Available' as const,
  note: 'Every message is personally written and reviewed by Sofia. She is your single point of contact for this journey.',
  responseTime: 'Sofia usually responds within the hour on working days.',
};

export const ACTIVE_JOURNEY = {
  id: 'japan',
  slug: 'japan',
  title: 'Japan',
  subtitle: 'Autumn 2026',
  kanji: '日本',
  nights: 12,
  destinations: ['Tokyo', 'Kyoto', 'Hakone'],
  startDate: '12 Sep 2026',
  endDate: '24 Sep 2026',
  stage: 'in-review' as JourneyStage,
  daysUntil: 60,
  travellers: 3,
};

export type JourneyStage =
  | 'proposed'
  | 'in-review'
  | 'approved'
  | 'pre-departure'
  | 'travelling';

export const STAGE_LABELS: Record<JourneyStage, string> = {
  proposed: 'Proposed',
  'in-review': 'In Review',
  approved: 'Approved',
  'pre-departure': 'Pre-departure',
  travelling: 'Travelling',
};

export const STAGE_ORDER: JourneyStage[] = [
  'proposed',
  'in-review',
  'approved',
  'pre-departure',
  'travelling',
];

// Day 4 — first full day in Kyoto (Tue 15 Sep, arrival from Tokyo)
export const TODAY_ITINERARY = [
  { time: '12:25', title: 'Arrival · Aman Kyoto', place: 'Ukyo Ward, Northern Kyoto' },
  { time: '15:00', title: 'Private Tea Ceremony', place: 'Urasenke, Omotesenke District' },
  { time: '19:30', title: 'Kaiseki Dinner', place: 'Kikunoi Honten, Higashiyama' },
];

export const SOFIA_TASKS = [
  { text: 'Finalising Tokyo evening reservations', detail: 'Den · Narisawa · third evening pending', status: 'in-progress' as const },
  { text: 'Confirming Gōra Kadan reservation', detail: 'Hakone · 20–24 Sep', status: 'in-progress' as const },
  { text: 'Monitoring September weather window', detail: 'Fuji visibility · typhoon forecast', status: 'reviewing' as const },
];

export const MESSAGES = [
  {
    id: 'm1',
    sender: 'Sofia Laurent',
    initials: 'SL',
    preview: "Your revised Travel Book is ready — the Kyoto days now begin with Nanzen-ji. I've held Kinkaku-ji for the afternoon, when the light suits it far better.",
    time: '12:10',
    unread: true,
    thread: [
      {
        role: 'sofia' as const,
        text: "Good morning, Emily. I've been looking more carefully at the Kyoto section — particularly the plan for your first full morning there.",
        paragraphs: [
          "Good morning, Emily. I've been looking more carefully at the Kyoto section — particularly the plan for your first full morning there.",
          "The current programme opens with Kinkaku-ji, which I know has been on your list. I'd like to suggest a different order. Not instead — just when.",
        ],
        time: '9:14',
        date: 'Yesterday',
      },
      {
        role: 'user' as const,
        text: "Please do — I trust your judgement on this completely. If there's a better way to experience Kyoto in the morning I'm very open to it.",
        time: '10:02',
        date: 'Yesterday',
      },
      {
        role: 'sofia' as const,
        text: "Nanzen-ji before breakfast. That's the version I'd suggest for the morning of the 16th.",
        paragraphs: [
          "Nanzen-ji before breakfast. That's the version I'd suggest for the morning of the 16th.",
          "The temple is very nearly empty at that hour — the stone gate, the carp pond, the cedar path beyond it. I've found a small restaurant in the grounds called Okutan, which has served tofu kaiseki in the same garden for over three centuries. I've made a tentative reservation for 7:30. If Kinkaku-ji still appeals, it catches the light differently in the late afternoon — I'd move it there.",
        ],
        time: '8:30',
        date: 'Today',
        attachment: { name: 'Kyoto Morning Notes.pdf', size: '1.8 MB' },
        journeyUpdate: {
          label: 'Proposed',
          title: 'Kyoto · Morning of Wed 16 Sep',
          detail: 'Morning programme revised. Nanzen-ji at dawn replaces Kinkaku-ji. Okutan breakfast confirmed at 7:30.',
        },
      },
      {
        role: 'user' as const,
        text: "That sounds exactly right. Let's do it.",
        time: '11:45',
        date: 'Today',
      },
      {
        role: 'sofia' as const,
        text: "Done. The Travel Book has been updated — you'll find the revised Kyoto days in Documents.",
        paragraphs: [
          "Done. The Travel Book has been updated — you'll find the revised Kyoto days in Documents.",
          "Nanzen-ji now opens Wednesday morning and Kinkaku-ji has moved to Thursday afternoon. The Okutan reservation is confirmed for 7:30. I'll send the full dining notes for Kyoto by end of week.",
        ],
        time: '12:10',
        date: 'Today',
        badge: 'Updated',
        docCard: { name: 'Japan Travel Book — Revised', updated: '14 Jul', label: 'Personally reviewed' },
      },
    ],
  },
  {
    id: 'm2',
    sender: 'Meridian',
    initials: 'M',
    preview: 'Welcome to your Meridian Client Portal, Emily.',
    time: '3 Jul',
    unread: false,
    thread: [
      {
        role: 'sofia' as const,
        text: "Welcome to your Meridian Client Portal, Emily. Everything connected to your Japan journey — itinerary, documents, payments and messages — lives here. I'm Sofia, and I'll be your concierge for this trip. I'm in touch shortly with the first draft.",
        time: '10:00',
        date: '3 Jul',
      },
    ],
  },
];

export const DOCUMENTS = [
  { id: 'd1', icon: '🛂', title: 'Passport',           category: 'Identity',       status: 'Final',   desc: 'Emily Weston · British · Expires 14 Mar 2030', updated: '3 Jul',  offline: true  },
  { id: 'd2', icon: '📋', title: 'Final Itinerary',    category: 'Itinerary',      status: 'Final',   desc: 'Japan · 12 Nights · Tokyo, Kyoto, Hakone',     updated: '10 Jul', offline: true  },
  { id: 'd3', icon: '🏨', title: 'Hotel Confirmations',category: 'Accommodation',  status: 'Final',   desc: 'Park Hyatt Tokyo · Aman Kyoto · Gōra Kadan',   updated: '12 Jul', offline: true  },
  { id: 'd4', icon: '📖', title: 'Japan Travel Book',  category: 'Itinerary',      status: 'Updated', desc: '12 Nights · 12–24 Sep 2026 · Revised 14 Jul',  updated: '14 Jul', offline: true  },
  { id: 'd5', icon: '🛡️', title: 'Travel Insurance',  category: 'Insurance',      status: 'Final',   desc: 'Comprehensive · Medical · Cancellation · Baggage', updated: '28 Jun', offline: false },
  { id: 'd6', icon: '✈️', title: 'Flight Details',    category: 'Transport',      status: 'Final',   desc: 'BA 4 · LHR–NRT · Sat 12 Sep · Business Class', updated: '8 Jul',  offline: true  },
];

export const PAYMENTS = {
  total: 12600,
  currency: 'GBP',
  symbol: '£',
  journey: 'Japan · 12 Nights',
  deposit: { amount: 4200, date: '28 Jun 2026', status: 'received' as const },
  instalments: [
    { label: 'Second Payment', amount: 4200, date: '18 Aug 2026', status: 'pending' as const, dueIn: 35 },
    { label: 'Final Balance',  amount: 4200, date: '15 Sep 2026', status: 'pending' as const, dueIn: 63 },
  ],
  history: [
    { date: '28 Jun 2026', description: 'Journey Deposit',  detail: 'Japan · 12 Nights · Receipt #MER-JPN-2026-001', amount: 4200, status: 'Received' },
    { date: '18 Aug 2026', description: 'Second Payment',   detail: 'Japan · 12 Nights',                             amount: 4200, status: 'Pending'  },
  ],
};

export const TRAVELLERS = [
  {
    id: 't1',
    name: 'Emily Weston',
    initials: 'EW',
    role: 'Primary Traveller',
    nationality: 'British',
    passportNumber: 'GB ••••••• 123',
    passportExpiry: '14 Mar 2030',
    dob: '•• / •• / 1985',
    email: 'emily@weston.co.uk',
    phone: '+44 7700 ••••• 01',
    dietary: 'No restrictions',
    accessibility: 'None required',
    emergency: { name: 'James Weston', phone: '+44 7700 900 123' },
    completeness: 100,
    isPrimary: true,
  },
  {
    id: 't2',
    name: 'James Weston',
    initials: 'JW',
    role: 'Spouse',
    nationality: 'British',
    passportNumber: 'GB ••••••• 456',
    passportExpiry: '02 Nov 2028',
    dob: '•• / •• / 1983',
    dietary: 'Vegetarian — no meat or fish',
    accessibility: 'None required',
    completeness: 85,
    isPrimary: false,
  },
  {
    id: 't3',
    name: 'Isabelle Weston',
    initials: 'IW',
    role: 'Daughter',
    nationality: 'British',
    passportNumber: 'Not yet uploaded',
    dob: '•• / •• / 2014',
    dietary: 'Tree nut allergy · carries EpiPen',
    accessibility: 'None required',
    completeness: 60,
    isPrimary: false,
    alert: 'Passport details required before the final itinerary can be confirmed',
  },
];

export const SHARED_PREFERENCES = [
  'Wellness', 'Cultural Immersion', 'Slow Travel', 'Small Properties', 'Nature', 'Photography',
];

export const PAST_JOURNEYS = [
  { title: 'Bhutan',  subtitle: 'Spring 2025',  nights: 8,  destinations: ['Paro', 'Thimphu', 'Punakha'] },
  { title: 'Iceland', subtitle: 'Winter 2024',  nights: 10, destinations: ['Reykjavík', 'Golden Circle', 'South Coast'] },
  { title: 'Kyoto',   subtitle: 'Autumn 2023',  nights: 7,  destinations: ['Gion', 'Arashiyama', 'Fushimi'] },
];

export const PLANNING_JOURNEYS = [
  { title: 'Scotland', code: 'SCT', subtitle: 'Highlands & Skye · Spring 2027', stage: 'Planning',       updated: '9 Jul 2026' },
  { title: 'Morocco',  code: 'MAR', subtitle: 'Marrakech & Atlas · Winter 2026', stage: 'Awaiting Review', updated: '5 Jul 2026' },
];
