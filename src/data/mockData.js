export const CURRENCIES = {
  INR: { symbol: '₹', rate: 1, label: 'INR (₹)' },
  USD: { symbol: '$', rate: 0.012, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.011, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.0095, label: 'GBP (£)' }
};

export const VEHICLE_OPTIONS = [
  {
    id: 're_classic',
    name: 'Royal Enfield Classic 350',
    type: 'Cruiser Motorcycle',
    icon: 'Bike',
    vibe: 'Iconic Thumper • Pure Royal Feel',
    mileageKmPerL: 32,
    baseFeeHalfDay: 1499,
    baseFeeFullDay: 2499,
    estPetrolHalfDay: 450,
    estPetrolFullDay: 850,
    recommendedFor: 'Solo travellers seeking heritage roads & lake sunsets'
  },
  {
    id: 're_himalayan',
    name: 'Royal Enfield Himalayan 450',
    type: 'Adventure Tourer',
    icon: 'Compass',
    vibe: 'High Aravali Peaks • Offbeat Trails',
    mileageKmPerL: 28,
    baseFeeHalfDay: 1799,
    baseFeeFullDay: 2899,
    estPetrolHalfDay: 550,
    estPetrolFullDay: 950,
    recommendedFor: 'Bahubali cliffs, Rayta hills & rough terrain'
  },
  {
    id: 'scooter_activa',
    name: 'Honda Activa 125 / Access',
    type: 'Nimble Automatic Scooter',
    icon: 'Zap',
    vibe: 'Smooth • Agile • Old City Specialist',
    mileageKmPerL: 45,
    baseFeeHalfDay: 1099,
    baseFeeFullDay: 1899,
    estPetrolHalfDay: 300,
    estPetrolFullDay: 600,
    recommendedFor: 'Narrow Udaipur old city alleys & relaxed lake hops'
  },
  {
    id: 'cruiser_avenger',
    name: 'Bajaj Avenger 220 Cruise',
    type: 'Low-slung Highway Cruiser',
    icon: 'Wind',
    vibe: 'Comfortable Long Seat • Chill Posture',
    mileageKmPerL: 38,
    baseFeeHalfDay: 1299,
    baseFeeFullDay: 2199,
    estPetrolHalfDay: 380,
    estPetrolFullDay: 720,
    recommendedFor: 'Gentle winding roads towards Sajjangarh & Badi Lake'
  },
  {
    id: 'cab_sedan',
    name: 'Comfort AC Sedan / SUV',
    type: '4-Wheeler Companion Cab',
    icon: 'Car',
    vibe: 'Chilled AC • Luggage Friendly',
    mileageKmPerL: 18,
    baseFeeHalfDay: 2299,
    baseFeeFullDay: 3699,
    estPetrolHalfDay: 700,
    estPetrolFullDay: 1400,
    recommendedFor: 'Monsoon days, travellers with heavy gear or abroad tourists'
  }
];

export const TOUR_PACKAGES = [
  {
    id: 'tour-1',
    title: 'The Royal Lakes & Old City Alleys',
    subtitle: 'City Palace, Gangaur Ghat, Jagdish Temple & Ambrai Twilight',
    duration: 'Half Day (4.5 Hours)',
    distance: '30 km',
    image: '/images/hero_udaipur.jpg',
    badge: 'Most Popular for First Timers',
    badgeColor: 'amber',
    highlights: [
      'Navigate historic narrow streets only two-wheelers can enter',
      'Scenic photography stops at hidden lakeside jharokhas',
      'Local rooftop authentic kulhad masala chai at Lal Ghat',
      'Sunset glow over Jag Mandir and Lake Pichola'
    ],
    bestTime: 'Morning 7:30 AM or Afternoon 3:00 PM',
    idealVehicle: 'Royal Enfield Classic 350 or Activa 125',
    basePriceINR: 1499,
    estPetrolINR: 400
  },
  {
    id: 'tour-2',
    title: 'Sajjangarh Sunset & Aravali Hairpin Curves',
    subtitle: 'Monsoon Palace Peak, Biological Forest & Mountain Ghats',
    duration: 'Half Day (4 Hours)',
    distance: '38 km',
    image: '/images/sajjangarh.jpg',
    badge: 'Scenic Mountain Ride',
    badgeColor: 'cyan',
    highlights: [
      'Winding mountain switchbacks up to Sajjangarh Monsoon Palace',
      '360° panoramic sunset view of Udaipur lake basin & Aravali ridge',
      'Stop at scenic viewpoints for cinematic rider photography',
      'Evening wind down at Tiger Lake (Badi Lake overflow point)'
    ],
    bestTime: '3:30 PM - 7:30 PM (Golden Hour)',
    idealVehicle: 'Royal Enfield Himalayan or Classic 350',
    basePriceINR: 1699,
    estPetrolINR: 480
  },
  {
    id: 'tour-3',
    title: 'The 3 Lakes & Bahubali Hills Cliff Adventure',
    subtitle: 'Fatehsagar Marine Drive, Badi Lake & Bahubali Peak View',
    duration: 'Full Day (7.5 Hours)',
    distance: '65 km',
    image: '/images/bahubali.jpg',
    badge: 'Explorer Favorite',
    badgeColor: 'emerald',
    highlights: [
      'Cruise around Fatehsagar Lake with morning cool breeze',
      'Hike up the famous crocodile-head rock at Bahubali Hills',
      'Offbeat village roads surrounded by Aravali green forests',
      'Authentic Dal Baati Churma local lunch stop with your buddy'
    ],
    bestTime: '8:00 AM - 4:00 PM',
    idealVehicle: 'Royal Enfield Himalayan 450',
    basePriceINR: 2399,
    estPetrolINR: 750
  },
  {
    id: 'tour-4',
    title: 'Kumbhalgarh Fortress & Haldighati Mountain Pass',
    subtitle: 'Great Wall of India, Mewar Battlefield & High Pass Ride',
    duration: 'Full Day Epic (10 Hours)',
    distance: '185 km',
    image: '/images/buddies.jpg',
    badge: 'Long Highway Ride',
    badgeColor: 'amber',
    highlights: [
      'Riding the legendary scenic highway passes of Mewar',
      'Explore Kumbhalgarh Fort - the 2nd longest wall on Earth',
      'Historical stop at Chetak Samadhi & Haldighati mountain pass',
      'Roadside dhaba feast with hot parathas & Rajasthani chai'
    ],
    bestTime: '6:30 AM Departure',
    idealVehicle: 'Royal Enfield Classic 350 or Cruiser 220',
    basePriceINR: 3299,
    estPetrolINR: 1400
  }
];

export const ROUTE_SIMULATOR_STOPS = [
  {
    id: 1,
    name: 'Jagdish Chowk & City Palace Gate',
    km: '0 km',
    time: 'Start',
    elevation: '598 m',
    description: 'Starting point right in the heart of old Udaipur. Meet your buddy, fit helmet, sync navigation.',
    tip: 'Buddy Tip: Early morning ride here avoids tourist crowds and gives golden rays on palace marble.'
  },
  {
    id: 2,
    name: 'Lake Pichola & Ambrai Ghat',
    km: '3.2 km',
    time: '20 min',
    elevation: '595 m',
    description: 'Breathtaking waterfront overlooking Lake Palace hotel (Taj) floating serenely in the middle of water.',
    tip: 'Buddy Tip: We park right by the water steps for stunning bike backdrop photos.'
  },
  {
    id: 3,
    name: 'Fatehsagar Marine Boulevard',
    km: '7.8 km',
    time: '45 min',
    elevation: '587 m',
    description: 'Wide paved lakeside boulevard popular with local college youths and morning coffee stalls.',
    tip: 'Buddy Tip: Best cold coffee with ice cream at "Sai Cold Coffee" near Fatehsagar Paal.'
  },
  {
    id: 4,
    name: 'Sajjangarh Monsoon Palace Peak',
    km: '17.4 km',
    time: '1h 30m',
    elevation: '938 m',
    description: 'A thrilling spiral hill climb with sharp hairpin curves through the wildlife sanctuary up to the white fortress.',
    tip: 'Buddy Tip: Keep speeds in 2nd gear on curves; your buddy leads the line safely.'
  },
  {
    id: 5,
    name: 'Badi Lake & Bahubali Hills Cliff',
    km: '28.1 km',
    time: '2h 45m',
    elevation: '610 m',
    description: 'Turquoise tranquil lake surrounded by rocky hills. 15-minute easy walk to the famous cliff lookout.',
    tip: 'Buddy Tip: The view looks exactly like Lake Como or Vietnam bays from the top rock.'
  },
  {
    id: 6,
    name: 'Rayta Hills Sunset Serpentine Valley',
    km: '41.5 km',
    time: '4h 15m',
    elevation: '745 m',
    description: 'Udaipur’s best kept secret: endless serpentine roads curling through green valleys like Scotland.',
    tip: 'Buddy Tip: Perfect sunset chill spot with gentle breeze and zero traffic noise.'
  }
];

export const VERIFIED_BUDDIES = [
  {
    id: 'buddy-1',
    name: 'Vikramaditya (Vicky) Singh',
    age: 26,
    city: 'Udaipur Native (Mewar)',
    ridesCompleted: 148,
    rating: 4.96,
    badge: 'Heritage & History Buff',
    bike: 'Royal Enfield Classic 350 (Stealth Black)',
    languages: ['English (Fluent)', 'Hindi', 'Marwari'],
    bio: 'Born and raised in old Udaipur. I know every secret rooftop, fort history story, and ghat corner that tour buses never reach. Loves photography.',
    verified: true,
    safetyChecked: true
  },
  {
    id: 'buddy-2',
    name: 'Priya Rathore',
    age: 24,
    city: 'Udaipur',
    ridesCompleted: 92,
    rating: 4.98,
    badge: 'Female Solo Traveller Specialist',
    bike: 'Hunter 350 & Honda Activa 125',
    languages: ['English', 'Hindi', 'Rajasthani'],
    bio: 'Avid solo rider passionate about making solo women travellers feel 100% safe, empowered, and at home in Udaipur. Expert in café culture and sunset spots.',
    verified: true,
    safetyChecked: true
  },
  {
    id: 'buddy-3',
    name: 'Aryan Sharma',
    age: 25,
    city: 'Udaipur & Mount Abu',
    ridesCompleted: 114,
    rating: 4.94,
    badge: 'Offbeat Trail & Mountain Rider',
    bike: 'Royal Enfield Himalayan 450',
    languages: ['English', 'Hindi', 'Basic German'],
    bio: 'Mechanical engineer by education, wanderer by heart. If you love off-road trails, Bahubali hills, and high mountain switchbacks, let’s throttle together!',
    verified: true,
    safetyChecked: true
  },
  {
    id: 'buddy-4',
    name: 'Rahul Menaria',
    age: 27,
    city: 'Udaipur',
    ridesCompleted: 165,
    rating: 4.97,
    badge: 'Street Food & Night Safari Expert',
    bike: 'Bajaj Avenger 220 Cruise',
    languages: ['English (Fluent)', 'Hindi', 'French (Conversational)'],
    bio: 'Worked with international backpackers for 4 years. From Sukhadiya Circle street food to Kumbhalgarh long highway rides, your Udaipur trip will be unforgettable.',
    verified: true,
    safetyChecked: true
  }
];

export const ABROAD_FEATURES = [
  {
    icon: 'ShieldCheck',
    title: '100% Police Verified & Background Cleared',
    desc: 'Every companion holds valid driving credentials, local address verification, and government ID registration.'
  },
  {
    icon: 'Globe',
    title: 'English & Multi-Lingual Fluency',
    desc: 'Fluent English-speaking buddies who understand international traveller nuances, cultural sensitivities, and pacing.'
  },
  {
    icon: 'Plane',
    title: 'Airport / Train Station Pickup',
    desc: 'Direct meet & greet upon arrival in Udaipur with clean sanitized helmets and luggage transit assistance.'
  },
  {
    icon: 'Wifi',
    title: 'Local SIM & Forex Guidance',
    desc: 'Avoid overpriced airport stalls; your buddy helps you buy genuine Airtel/Jio eSIMs and fair currency exchange.'
  },
  {
    icon: 'HeartHandshake',
    title: 'Female Solo Traveller Safety Protocol',
    desc: 'Dedicated female riding companions available upon request, live GPS ride tracking shareable with family back home.'
  },
  {
    icon: 'DollarSign',
    title: 'Zero Tourist Scams or Forced Shopping',
    desc: 'We strictly ban commission stores. You pay only for genuine experiences and what you personally choose.'
  }
];

export const TESTIMONIALS = [
  {
    id: 't-1',
    name: 'Elena Rostova',
    country: 'Berlin, Germany',
    role: 'Solo Female Backpacker',
    tour: 'Sajjangarh Sunset & Old City Alleys',
    text: 'As a foreign woman travelling solo in India, I was hesitant at first. But booking with SoloRide Udaipur was the best decision of my trip! Priya was an amazing buddy—she drove so safely, took incredible photos of me, and showed me secret sunset spots no standard tour guide knows. Felt like riding with an old friend.',
    rating: 5,
    date: 'February 2026'
  },
  {
    id: 't-2',
    name: 'Rohan Deshmukh',
    country: 'Mumbai, India',
    role: 'Solo Tech Nomad',
    tour: 'The 3 Lakes & Bahubali Hills Tour',
    text: 'I reached Udaipur by train with zero itinerary. Booked Vicky on SoloRide. The transparent price model is brilliant: I paid the platform fee, and paid petrol directly at the IndianOil pump. Zero hidden drama. Riding a Royal Enfield around Lake Badi curves was pure freedom!',
    rating: 5,
    date: 'January 2026'
  },
  {
    id: 't-3',
    name: 'David & Sarah (UK)',
    country: 'Bristol, United Kingdom',
    role: 'Adventure Travellers',
    tour: 'Kumbhalgarh Fortress Mountain Expedition',
    text: 'Aryan guided us through the winding Aravali passes on two Enfields. We stopped at authentic roadside dhabas for fresh rotis and chai. The booking through Bhuvan was effortless and smooth. Highly recommended for abroad travellers who want the real India.',
    rating: 5,
    date: 'March 2026'
  }
];

export const FAQS = [
  {
    q: 'How does the pricing and petrol split work?',
    a: 'We believe in 100% honesty. When you book a plan, you pay the SoloRide Companion & Platform Fee to Bhuvan (which guarantees a verified riding partner, sanitized helmet, route curation, and customer support). You then pay actual petrol/fuel at the pump directly based on kilometers travelled (typically ₹350 - ₹850 for Udaipur city tours), plus buddy tea/lunch if you take a break together.'
  },
  {
    q: 'How does the buddy get paid?',
    a: 'Our founder Bhuvan Dwivedi pays the local riding companion boy his professional companion fee directly from the platform booking amount. You do not have to negotiate or haggle companion fees at all.'
  },
  {
    q: 'Can I ride the bike myself, or will the companion ride?',
    a: 'You have full flexibility! Option A: Companion rides and you sit pillion (relax, view the scenery, take photos). Option B: You ride the bike with a valid driver’s license, and the companion rides pillion to navigate. Option C: Dual bike convoy (you on your rental bike, buddy on theirs leading the route).'
  },
  {
    q: 'Is this suitable for foreign / international travellers arriving from abroad?',
    a: 'Absolutely! More than 45% of our guests are international solo travellers from Europe, USA, Australia, and Asia. We offer English-fluent companions, airport/hotel pickup, foreign currency conversion guidance, and complete safety verification.'
  },
  {
    q: 'What if I am a solo female traveller?',
    a: 'Your safety is our top priority. We have verified female riding companions (like Priya), live GPS tracking shareable with your loved ones, verified government police clearances, and an emergency SOS button.'
  },
  {
    q: 'Which other cities are you launching in next?',
    a: 'We are starting with Udaipur as our flagship city. Next in line are Jaipur (Pink City), Manali (Himalayan passes), Goa (Coastal trails), Rishikesh (Ganges riverside), and Leh Ladakh.'
  }
];

export const EXPANSION_CITIES = [
  { name: 'Udaipur (City of Lakes)', status: 'Active Now', active: true, rides: '450+ completed' },
  { name: 'Jaipur (Pink City & Forts)', status: 'Launching Next', active: false, rides: 'Opening Soon' },
  { name: 'Manali (Rohtang & Solang)', status: 'Coming Soon', active: false, rides: 'Opening Soon' },
  { name: 'Goa (Beaches & Backwaters)', status: 'Coming Soon', active: false, rides: 'Opening Soon' },
  { name: 'Rishikesh & Haridwar', status: 'Coming Soon', active: false, rides: 'Opening Soon' },
  { name: 'Leh Ladakh (High Passes)', status: 'Coming Soon', active: false, rides: 'Opening Soon' }
];
