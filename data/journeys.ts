// ─── Types ────────────────────────────────────────────────────────────────────

export interface DestinationDef { id: string; name: string; }
export interface ExperienceDef { id: string; text: string; }

export interface ItinerarySegmentDef {
  id: string;
  dest: string;
  days: string;
  accommodation: string;
  experiences: ExperienceDef[];
  description: string;
}

export interface SuggestionDef {
  id: string;
  title: string;
  desc: string;
  dest: string;
  action: 'add-experience' | 'extend' | 'add-dest';
  actionPayload?: string;
}

export interface SofiaKeywordRule {
  match: string[];
  response: string;
}

export interface SofiaProfile {
  name: string;
  greeting: string;
  preview: string;
  defaultResponse: string;
  keywords: SofiaKeywordRule[];
}

export interface JourneyDef {
  id: string;
  slug: string;
  title: string;
  region: string;
  nights: number;
  destinations: DestinationDef[];
  itinerary: ItinerarySegmentDef[];
  suggestions: SuggestionDef[];
  availableDestinations: string[];
  sofia: SofiaProfile;
}

// ─── Japan ────────────────────────────────────────────────────────────────────

const japan: JourneyDef = {
  id: 'japan',
  slug: 'japan',
  title: 'Japan',
  region: 'East Asia',
  nights: 12,
  destinations: [
    { id: 'kyoto', name: 'Kyoto' },
    { id: 'hakone', name: 'Hakone' },
    { id: 'tokyo', name: 'Tokyo' },
  ],
  itinerary: [
    {
      id: 'kyoto-days',
      dest: 'kyoto',
      days: 'Day 1 – 4',
      accommodation: 'Aman Kyoto',
      experiences: [
        { id: 'k1', text: 'Fushimi Inari at first light — before the crowds arrive' },
        { id: 'k2', text: 'Private tea ceremony at a closed Gion machiya' },
        { id: 'k3', text: 'Arashiyama bamboo walk and riverside breakfast' },
        { id: 'k4', text: 'Evening stroll through Higashiyama with a local guide' },
      ],
      description: "Four nights above the city in Aman's forest retreat. Quiet corridors, garden light, the sound of water. Kyoto at the pace it prefers.",
    },
    {
      id: 'hakone-days',
      dest: 'hakone',
      days: 'Day 5 – 8',
      accommodation: 'Gōra Kadan Ryokan',
      experiences: [
        { id: 'h1', text: 'Private onsen overlooking Mt Fuji at dawn' },
        { id: 'h2', text: 'Hakone Open-Air Museum — sculpture in mountain air' },
        { id: 'h3', text: 'Owakudani geothermal valley walk' },
        { id: 'h4', text: 'Forest morning at Gōra — four guests, no schedule' },
      ],
      description: 'The mountain air, the particular silence of altitude, a ryokan that has been preparing rooms since 1868. Time here moves differently.',
    },
    {
      id: 'tokyo-days',
      dest: 'tokyo',
      days: 'Day 9 – 12',
      accommodation: 'Park Hyatt Tokyo',
      experiences: [
        { id: 't1', text: 'Tsukiji outer market before 7am with a chef guide' },
        { id: 't2', text: "Yanaka neighbourhood — the city that didn't burn" },
        { id: 't3', text: 'TeamLab Planets — evening immersion' },
        { id: 't4', text: 'Private sake tasting in a 200-year-old kura' },
      ],
      description: "Four nights in Shinjuku, high above the city. Park Hyatt Tokyo sits in the upper floors of a tower designed by Kenzō Tange — a building that earns its height.",
    },
  ],
  suggestions: [
    {
      id: 's1',
      dest: 'kyoto',
      title: 'Dawn visit to Fushimi Inari — before the gates open.',
      desc: 'A private guide walks you through the torii tunnels at 5:30am. No other visitors. The cedar, the foxes, the light arriving through 10,000 gates.',
      action: 'add-experience',
      actionPayload: 'Private dawn walk at Fushimi Inari (5:30am) — before the gates open to the public',
    },
    {
      id: 's2',
      dest: 'hakone',
      title: 'Extend Hakone to 5 nights — the third day is the best one.',
      desc: "Most guests leave before the valley light changes. Staying longer means a day with no agenda, which is the point. We'd add a private soba-making morning.",
      action: 'extend',
      actionPayload: 'Hakone extended: Day 5 – 9',
    },
    {
      id: 's3',
      dest: 'tokyo',
      title: 'Add a single night in Nikko on the way to Tokyo.',
      desc: 'Nikkō Kanaya Hotel has been receiving travellers since 1873. It sits above the cedar avenue. Two hours from Hakone, worlds away from Tokyo.',
      action: 'add-dest',
      actionPayload: 'Nikko',
    },
    {
      id: 's4',
      dest: 'kyoto',
      title: "Private kaiseki dinner at a restaurant that doesn't take reservations.",
      desc: 'Chef Takahashi accepts guests only by introduction. Twelve courses. The menu exists only on the day. Your concierge has the introduction.',
      action: 'add-experience',
      actionPayload: 'Private kaiseki at Takahashi — introduction through your concierge',
    },
  ],
  availableDestinations: ['Nara', 'Osaka', 'Nikko', 'Hiroshima', 'Kanazawa', 'Kyushu'],
  sofia: {
    name: 'Sofia Laurent',
    greeting: "Good morning. I've been looking at your Japan brief overnight. The shape is right — twelve nights, three places. A few thoughts when you're ready.",
    preview: '"The shape is right. A few refinements when you\'re ready."',
    defaultResponse: 'Tell me more. Every detail you give me becomes something in the itinerary — even the things that seem peripheral. Especially those.',
    keywords: [
      {
        match: ['kyoto'],
        response: "Kyoto in the week before the famous week is a different city. The gardens are honest, the temples aren't performing. I'd suggest arriving on a Tuesday. The quality of light on Tuesday morning in the eastern hills is not something you can plan — but you can position for it.",
      },
      {
        match: ['hakone'],
        response: "Hakone is where most guests underestimate the third day. The first day is about arrival, the second about settling. The third day is when the mountain appears in a way it didn't before. Most people leave on day three. I'd suggest staying.",
      },
      {
        match: ['tokyo'],
        response: "Tokyo requires a different kind of attention. Not the Tokyo of lists, but the one between them — Yanaka, the 6am Tsukiji, a neighbourhood bar where the owner has been there forty years. I can build a Tokyo that isn't a checklist.",
      },
      {
        match: ['nature', 'forest'],
        response: "There's a path above Aman Kyoto that most guests walk once and then return to every morning. It ends at a small shrine with no name on any map. I'd build two mornings around it if you'd let me.",
      },
      {
        match: ['food', 'eat', 'restaurant'],
        response: "Japan's food culture rewards patience more than planning. The best meal on this itinerary will almost certainly be one that isn't arranged yet — a counter with six seats, a chef who is there because he wants to be. I'll find the introduction.",
      },
      {
        match: ['rest', 'quiet', 'slow'],
        response: "The Gōra Kadan days are designed around this. Nothing begins before 9am unless you ask it to. The onsen is private between 6 and 8. The forest walk is optional, which means it's actually possible.",
      },
      {
        match: ['culture', 'temple', 'history'],
        response: "Kyoto has 1,600 temples. Most guests see eleven. I'd suggest two, seen properly, over four mornings. The one in the eastern hills has a garden that takes forty minutes to understand and forty years to not forget.",
      },
      {
        match: ['privacy', 'private', 'alone'],
        response: 'Private experiences on this itinerary: the Fushimi Inari dawn walk, the Gōra onsen window, the tea ceremony, the kaiseki introduction. I can make the Tokyo section more private too — fewer public venues, more things that require a name to enter.',
      },
      {
        match: ['fewer', 'simpler', 'two'],
        response: "If you'd prefer two destinations, I'd remove Tokyo and extend Kyoto to six nights and Hakone to six. The pace changes entirely. You stop moving and start noticing. Some guests find that's the version they actually wanted.",
      },
      {
        match: ['longer', 'extend', 'more time'],
        response: "Fourteen nights is the version of this journey that closes properly. The last two nights in Tokyo become exploratory rather than efficient. I'd add a day in Yanaka and the evening at Nakamura Tokichi that currently isn't on the itinerary.",
      },
      {
        match: ['cost', 'price', 'budget'],
        response: "I'd rather discuss value than price — but yes, I can give you a sense of the range once the shape is confirmed. The Aman properties set the tone. If you'd like alternatives at the same level of discretion but different in character, there are a few I have in mind.",
      },
      {
        match: ['weather', 'when', 'season'],
        response: "Mid-November for this itinerary. Late enough for Kyoto's colour to begin, early enough that Hakone still has clear Mt Fuji mornings. The window is about ten days wide. I'd aim for the 14th.",
      },
      {
        match: ['thank', 'perfect', 'yes'],
        response: "Good. I'll refine the Kyoto section and send you the updated draft before Thursday. Anything you'd like changed before I do?",
      },
    ],
  },
};

// ─── Patagonia ────────────────────────────────────────────────────────────────

const patagonia: JourneyDef = {
  id: 'patagonia',
  slug: 'patagonia',
  title: 'Patagonia',
  region: 'South America',
  nights: 10,
  destinations: [
    { id: 'torres', name: 'Torres del Paine' },
    { id: 'calafate', name: 'El Calafate' },
    { id: 'estancia', name: 'Estancia' },
  ],
  itinerary: [
    {
      id: 'torres-days',
      dest: 'torres',
      days: 'Day 1 – 4',
      accommodation: 'Explora Patagonia',
      experiences: [
        { id: 'tp1', text: 'Private trek to the Torres viewpoint at first light — 4am departure' },
        { id: 'tp2', text: 'Horseback ride through Valle del Francés with a local arriero' },
        { id: 'tp3', text: 'W Trek section to Mirador Las Torres — full day, private guide' },
        { id: 'tp4', text: 'Flamingo and condor watch at Laguna Amarga at dusk' },
      ],
      description: "Four nights at Explora, which sits above the Salto Chico waterfall and knows exactly where to send you at every hour of the Patagonian day. The wind here is not weather — it's part of the landscape.",
    },
    {
      id: 'calafate-days',
      dest: 'calafate',
      days: 'Day 5 – 7',
      accommodation: 'The Singular Patagonia',
      experiences: [
        { id: 'c1', text: 'Perito Moreno glacier — private boat approach at dawn before the tours arrive' },
        { id: 'c2', text: 'Ice trekking on the glacier surface with a certified Andean guide' },
        { id: 'c3', text: 'Evening wine tasting at a small Patagonian bodega in the Calafate hills' },
      ],
      description: "The Singular occupies a century-old sheep-shearing plant converted with extraordinary restraint. The glacier is forty minutes away. Nothing between it and the sky.",
    },
    {
      id: 'estancia-days',
      dest: 'estancia',
      days: 'Day 8 – 10',
      accommodation: 'Estancia Cristina',
      experiences: [
        { id: 'e1', text: 'Helicopter approach over the Southern Patagonian Ice Field' },
        { id: 'e2', text: 'Gaucho morning — traditional estancia routines, asado at midday' },
        { id: 'e3', text: 'Private fly-fishing on the Lago Argentino tributaries at dusk' },
      ],
      description: "Accessible only by boat across Lago Argentino, Estancia Cristina has been a working sheep farm since 1914. Three nights here feels like being let into a secret the rest of Patagonia hasn't found.",
    },
  ],
  suggestions: [
    {
      id: 'ps1',
      dest: 'torres',
      title: 'Add a night at Eolo Lodge between Torres and Calafate.',
      desc: "Eolo sits on the open steppe between the two. Nothing around it for forty kilometres. The light across the pampa in late afternoon is not something you plan for — but we can position you for it.",
      action: 'add-dest',
      actionPayload: 'Eolo',
    },
    {
      id: 'ps2',
      dest: 'torres',
      title: 'Upgrade the glacier to a private ice-trekking permit.',
      desc: 'The standard visit puts you on the glacier with a group of twelve. The private permit means two guests, one guide, and a section of the glacier most visitors never reach.',
      action: 'add-experience',
      actionPayload: 'Private ice-trekking permit — restricted glacier section, two guests maximum',
    },
    {
      id: 'ps3',
      dest: 'torres',
      title: 'Extend Torres del Paine by one night.',
      desc: "Four nights is enough to see the park. Five nights is enough to understand it. The extra day allows for the Valle del Francés circuit, which most guests miss because they've already left.",
      action: 'extend',
      actionPayload: 'Torres del Paine: Day 1 – 5',
    },
    {
      id: 'ps4',
      dest: 'estancia',
      title: 'Dawn condor viewing at Laguna del Condor.',
      desc: 'A 5am departure from the estancia, arriving at the laguna as the light reaches the cliff face. Andean condors roost here through October. Your guide has the only access permit.',
      action: 'add-experience',
      actionPayload: 'Dawn condor viewing at Laguna del Condor — 5am departure, private access permit',
    },
  ],
  availableDestinations: ['Puerto Natales', 'Punta Arenas', 'Ushuaia', 'Eolo', 'Los Glaciares'],
  sofia: {
    name: 'Sofia Laurent',
    greeting: "I've spent a week with your Patagonia brief. The bones are right — ten nights across three very different experiences. A few refinements before I send the final version.",
    preview: '"The bones are right. A few refinements before I send the final version."',
    defaultResponse: 'Tell me more about what you want from this trip. Scale, silence, wildlife, physical challenge — each one changes the shape of the days significantly.',
    keywords: [
      {
        match: ['torres', 'paine', 'trek', 'hiking', 'hike'],
        response: "The W Trek is what most people come for, but the right question is which section and at what time of day. The viewpoint at the Torres base is best at first light — that means a 4am departure from the lodge. Most guests are reluctant. None of them regret it.",
      },
      {
        match: ['glacier', 'perito', 'moreno', 'calafate', 'ice'],
        response: "Perito Moreno is one of the few glaciers in the world that is still advancing. The standard approach puts you on the boardwalks with several hundred other people. I'd suggest the private boat at 7am — the glacier is the same, the experience is entirely different.",
      },
      {
        match: ['estancia', 'gaucho', 'farm'],
        response: "The estancia days are the ones guests always say they didn't expect to be their favourite. There's no programme. You ride, you eat, you watch the light change over the lake. It's the version of Patagonia the brochures don't show because it's too quiet to photograph well.",
      },
      {
        match: ['weather', 'wind', 'season', 'cold', 'layers'],
        response: "Patagonian weather changes every twenty minutes. The wind is not a problem — it's the context. October to April is the operating window. November and March are the months when the wind is manageable and the light is extraordinary. I'd aim for mid-November.",
      },
      {
        match: ['wildlife', 'condor', 'guanaco', 'flamingo', 'animals'],
        response: "The wildlife here is not arranged. Guanacos cross the road. Condors appear above the cliff at a specific hour. Your guide will know where and when. The only arrangement I can make is the access permit for the condor laguna — that one requires advance notice.",
      },
      {
        match: ['photography', 'photo', 'camera'],
        response: "The light in Patagonia is unlike anywhere else — low, horizontal, and fast-moving. The best photographs on this journey will be taken before 8am and after 6pm. I'd structure the days around that rather than the other way around.",
      },
      {
        match: ['food', 'eat', 'wine', 'asado'],
        response: "The asado at the estancia is the meal of this journey. Not in a precious way — in the way that eating outdoors in cold air after a long morning on horseback produces a particular kind of appetite. The wine in Calafate is from small bodegas, most of which you won't find on any list.",
      },
      {
        match: ['rest', 'quiet', 'slow', 'relax'],
        response: "The estancia days are built around this. There's no wifi, no programme, and the boat doesn't leave until the afternoon. Three nights is the right amount — enough to slow down without running out of things to do quietly.",
      },
      {
        match: ['culture', 'history'],
        response: "Patagonian history is geological and human in equal measure. The estancia families have been here since the 1880s, when the land was granted and the sheep followed. Your guide can speak to this better than any museum — most of them are third-generation.",
      },
      {
        match: ['longer', 'extend', 'more time'],
        response: "Twelve nights is the version of this journey that breathes properly. The extra two nights would go to Torres del Paine — a fifth night there means a full rest day, which is the one thing most guests wish they had built in.",
      },
      {
        match: ['thank', 'perfect', 'yes'],
        response: "Good. I'll send the updated programme with the glacier time changed and the estancia day restructured. Anything else before I do?",
      },
    ],
  },
};

// ─── Provence ─────────────────────────────────────────────────────────────────

const provence: JourneyDef = {
  id: 'provence',
  slug: 'provence',
  title: 'Provence',
  region: 'Southern France',
  nights: 8,
  destinations: [
    { id: 'luberon', name: 'Luberon' },
    { id: 'avignon', name: 'Avignon' },
    { id: 'aix', name: 'Aix-en-Provence' },
  ],
  itinerary: [
    {
      id: 'luberon-days',
      dest: 'luberon',
      days: 'Day 1 – 3',
      accommodation: 'La Bastide de Gordes',
      experiences: [
        { id: 'l1', text: 'Private dawn walk through Gordes village — before 7am, before anyone else' },
        { id: 'l2', text: 'Sunday market at Isle-sur-la-Sorgue with a local food guide' },
        { id: 'l3', text: 'Ochre cliffs of Roussillon at golden hour — the light is not repeatable' },
      ],
      description: "La Bastide sits above Gordes, a village that knows exactly what it is and makes no apologies. Three mornings here at the pace the Luberon asks for — slow, unhurried, attentive to what's in the glass.",
    },
    {
      id: 'avignon-days',
      dest: 'avignon',
      days: 'Day 4 – 5',
      accommodation: 'La Mirande',
      experiences: [
        { id: 'a1', text: "Private evening in the Palais des Papes — after closing, with an art historian" },
        { id: 'a2', text: "Morning walk across Pont d'Avignon with a guide who has read everything written about it" },
        { id: 'a3', text: 'Lavender route by private car — timing adjusts to the season' },
      ],
      description: "La Mirande is a 14th-century cardinal's palace converted into twelve rooms. It sits in the shadow of the Palais des Papes. The breakfast is prepared in the cooking school. That is all you need to know.",
    },
    {
      id: 'aix-days',
      dest: 'aix',
      days: 'Day 6 – 8',
      accommodation: 'Villa Gallici',
      experiences: [
        { id: 'ax1', text: "Cézanne's studio and Mont Sainte-Victoire — the mountain he painted 87 times" },
        { id: 'ax2', text: 'Cours Mirabeau — morning coffee, afternoon pastis, no agenda in between' },
        { id: 'ax3', text: 'Private cooking lesson in a 17th-century bastide kitchen outside the city' },
      ],
      description: "Villa Gallici is in the Quartier Mazarin, where the old families live and the plane trees on the Cours have been there since before anyone can remember. Three nights here is a full chapter, not a postscript.",
    },
  ],
  suggestions: [
    {
      id: 'prs1',
      dest: 'luberon',
      title: 'Add a morning in Les Baux-de-Provence.',
      desc: 'Les Baux sits on a limestone spur above the Alpilles. The village has been there since 900AD. An hour before the coaches arrive, it is extraordinary. We can arrange a private guide and entry to the citadel before 8am.',
      action: 'add-experience',
      actionPayload: "Les Baux-de-Provence — private citadel access before 8am, guide included",
    },
    {
      id: 'prs2',
      dest: 'luberon',
      title: 'Extend the Luberon — the second week is different.',
      desc: "The Luberon reveals itself slowly. Three nights is enough to arrive. Four nights is enough to notice things. We'd add a market morning in Apt and a truffle farm visit near the oak forest above Bonnieux.",
      action: 'extend',
      actionPayload: 'Luberon: Day 1 – 4',
    },
    {
      id: 'prs3',
      dest: 'avignon',
      title: 'Private wine tasting at Château La Nerthe, Châteauneuf-du-Pape.',
      desc: 'Châteauneuf-du-Pape is twenty minutes from Avignon. Château La Nerthe has been making wine there since 1560. Your concierge has arranged a private cellar visit and a tasting of the library vintages.',
      action: 'add-experience',
      actionPayload: "Château La Nerthe — private cellar visit and library vintage tasting, Châteauneuf-du-Pape",
    },
    {
      id: 'prs4',
      dest: 'luberon',
      title: 'Truffle morning at a farm near Apt.',
      desc: "A November morning at a small truffle farm above Bonnieux. The farmer and his dog. The frost on the oak roots. The particular smell of the earth when a truffle is found. This cannot be reproduced in a restaurant.",
      action: 'add-experience',
      actionPayload: "Truffle hunting morning near Apt — private farm access, November season only",
    },
  ],
  availableDestinations: ["Les Baux", "Châteauneuf-du-Pape", "Arles", "Marseille", "Gordes"],
  sofia: {
    name: 'Sofia Laurent',
    greeting: "Good morning. Your Provence brief has been on my desk since yesterday. Eight nights is exactly the right length — enough to stop rushing. A few thoughts on the shape.",
    preview: '"Eight nights is exactly the right length. A few thoughts on the shape."',
    defaultResponse: 'Tell me more. The details that seem small — pace, light, whether you want to drive or be driven — determine everything about how this journey feels.',
    keywords: [
      {
        match: ['luberon', 'gordes', 'roussillon'],
        response: "The Luberon is at its best before 8am and after 6pm. The villages fill with visitors in between. I'd structure each morning around an early walk — Gordes at 6:30am is a completely different village to Gordes at 10am.",
      },
      {
        match: ['avignon', 'palais', 'pont', 'papes'],
        response: "Avignon has one thing that most visitors don't see: the Palais des Papes after closing. With the right introduction, we can arrange an evening inside the Grande Chapelle with an art historian who has spent thirty years there. That is the version of Avignon worth having.",
      },
      {
        match: ['aix', 'cézanne', 'sainte-victoire'],
        response: "Cézanne painted Mont Sainte-Victoire 87 times. The best way to understand why is to walk to the same viewpoint at the same hour he used — early morning, the mountain catching the first light before the valley wakes. Villa Gallici can arrange the car and the guide.",
      },
      {
        match: ['lavender', 'fields', 'purple'],
        response: "Lavender in Provence peaks in late June and early July. Outside that window, the fields are green. We can plan around the season or work with what's there — the Valensole plateau at dusk in May is extraordinary in its own way, without a single purple flower.",
      },
      {
        match: ['food', 'wine', 'rosé', 'market', 'eat', 'restaurant'],
        response: "The markets are the best food experience on this journey — Isle-sur-la-Sorgue on Sunday, Aix on Tuesday and Thursday. I'd also suggest one lunch at a restaurant that isn't in any guide: a terrace above Bonnieux where the owner has been cooking the same four dishes for forty years.",
      },
      {
        match: ['heat', 'weather', 'summer', 'season', 'when'],
        response: "May, June, September and October are the months when Provence is most itself. July and August are magnificent and crowded in equal measure. If you're flexible, I'd aim for late September — the light is lower, the crowds have gone, and the vendange fills the air with something you can't describe.",
      },
      {
        match: ['cycling', 'drive', 'driving', 'car'],
        response: "The Luberon is best explored by car or bicycle, depending on the day. The cycling routes through the Luberon hills are extraordinary — we can arrange a private guide and e-bikes if the gradients are a concern. The roads between Gordes and Bonnieux are worth the journey alone.",
      },
      {
        match: ['rest', 'quiet', 'slow', 'relax'],
        response: "Provence rewards the traveller who is willing to do nothing. The afternoon hours — two to five — are for shade, a glass of something cold, and the sound of cicadas. I build those hours into the itinerary deliberately. They are not empty; they are the point.",
      },
      {
        match: ['culture', 'history', 'roman', 'art'],
        response: "The Pont du Gard, the Théâtre Antique in Orange, the Arènes in Arles — Roman Provence is closer than most people expect. I can add a morning in Arles if the Roman history matters to you: the amphitheatre at 7am, before the doors open to the public.",
      },
      {
        match: ['longer', 'extend', 'more time'],
        response: "Ten nights is the version of this journey that closes properly. The extra two nights would go to the Luberon — a fourth night there means a day with no programme, which is the day most guests remember longest.",
      },
      {
        match: ['thank', 'perfect', 'yes'],
        response: "Good. I'll adjust the Avignon section and confirm the Palais access before I send the final brief. Anything you'd like changed before Thursday?",
      },
    ],
  },
};

// ─── Export ───────────────────────────────────────────────────────────────────

export const JOURNEYS: JourneyDef[] = [japan, patagonia, provence];

export function getJourney(slug: string): JourneyDef | undefined {
  return JOURNEYS.find(j => j.slug === slug);
}
