export const marqueeItems = [
  "Online Coaching",
  "Nutrition Plans",
  "Body Transformation",
  "Muscle Building",
  "Fat Loss Protocol",
  "Strength Training",
  "Lifestyle Coaching",
  "24/7 Support",
];

export const credentials = [
  "Certified Personal Trainer & Nutrition Coach",
  "Specialist in Body Recomposition & Fat Loss",
  "Online Coaching — Work from anywhere",
  "500+ Verified Client Transformations",
  "12+ Years Industry Experience",
];

export const processSteps = [
  {
    num: "01",
    title: "Apply & Consult",
    desc: "Fill out the intake form. We hop on a free call to understand your goals, schedule, and training history.",
  },
  {
    num: "02",
    title: "Custom Blueprint",
    desc: "Within 48 hours, receive your fully personalized training program + nutrition plan built for your body.",
  },
  {
    num: "03",
    title: "Execute & Adapt",
    desc: "You train. I track. Weekly check-ins and constant adjustments ensure you're always progressing.",
  },
  {
    num: "04",
    title: "Transform & Own",
    desc: "Achieve your goal physique and the knowledge to maintain it forever. This is your new normal.",
  },
];

/** Portrait + initials keyed by display name (results marquee & cards) */
export const clientAvatars: Record<string, { image: string; initials: string }> = {
  "Ahmed Nisar": { image: "/clients/ahmed-k.jpg", initials: "AN" },
  "Sara R.": { image: "/clients/sara-r.jpg", initials: "SR" },
  "Osama Baig": { image: "/clients/usman-m.jpg", initials: "OB" },
  "Safina Riaz": { image: "/clients/fatima-h.jpg", initials: "SR" },
  "Ibrar Ali": { image: "/clients/naveed-m.jpg", initials: "IA" },
  "Zain A.": { image: "/clients/zain-a.jpg", initials: "ZA" },
  "Zain Abbas": { image: "/clients/zain-a.jpg", initials: "ZA" },
  "Hira Asif": { image: "/clients/hira-a.jpg", initials: "HA" },
  "Bilal Khan": { image: "/clients/bilal-k.jpg", initials: "BK" },
  "Hamza S.": { image: "/clients/hamza-s.jpg", initials: "HS" },
};

export const clientResults = [
  {
    name: "Ahmed Nisar",
    initials: "AK",
    program: "Elite Plan",
    quote:
      "I never thought I could look like this at 34. Arbaz changed my whole relationship with fitness. It's now a lifestyle.",
    metrics: [
      { value: "22kg", label: "Lost" },
      { value: "16wk", label: "Duration" },
    ],
    image: clientAvatars["Ahmed Nisar"].image,
  },
  {
    name: "Sara R.",
    initials: "SR",
    program: "Premium Plan",
    quote:
      "Lost 15kg and completely changed my body. The meal plans were realistic — I actually enjoyed eating.",
    metrics: [
      { value: "15kg", label: "Lost" },
      { value: "12wk", label: "Duration" },
    ],
    image: clientAvatars["Sara R."].image,
  },
  {
    name: "Osama Baig",
    initials: "UM",
    program: "Starter Plan",
    quote:
      "Gained 8kg of muscle in 4 months. My lifts went through the roof. Arbaz's programming is elite.",
    metrics: [
      { value: "+8kg", label: "Muscle" },
      { value: "16wk", label: "Duration" },
    ],
    image: clientAvatars["Osama Baig"].image,
  },
  {
    name: "Safina Riaz",
    initials: "SR",
    program: "Premium Plan",
    quote:
      "The WhatsApp support alone is worth everything. Having Arbaz in my corner kept me accountable every single week.",
    metrics: [
      { value: "18kg", label: "Lost" },
      { value: "20wk", label: "Duration" },
    ],
    image: clientAvatars["Safina Riaz"].image,
  },
];

/** Real client stories — stats, voice notes, and written testimonials for the results marquee */
export type ResultsMarqueeItem =
  | { type: "stat"; value: string; label: string; name: string; plan: string }
  | { type: "quote"; quote: string; name: string; location: string; plan: string }
  | {
      type: "voice";
      name: string;
      plan: string;
      location: string;
      duration: string;
      durationSec: number;
      transcript: string;
      audioSrc: string;
    };

export const resultsMarqueeItems: ResultsMarqueeItem[] = [
  { type: "stat", value: "22kg", label: "Lost", name: "Ahmed Nisar", plan: "Elite Plan" },
  {
    type: "voice",
    name: "Ahmed Nisar",
    plan: "Elite Plan",
    location: "Karachi, PK",
    duration: "0:38",
    durationSec: 38,
    transcript:
      "Assalam o Alaikum — I lost 22 kilos in four months. Arbaz never let me skip check-ins. Honestly the best decision I made for my health.",
    audioSrc: "/audios/1NEW.mp3",
  },
  {
    type: "quote",
    quote:
      "I never thought I could look like this at 34. Arbaz changed my whole relationship with fitness — it's a lifestyle now.",
    name: "Ahmed Nisar",
    location: "Karachi, PK",
    plan: "Elite Plan",
  },
  { type: "stat", value: "+8kg", label: "Muscle", name: "Osama Baig", plan: "Starter Plan" },
  {
    type: "voice",
    name: "Osama Baig",
    plan: "Starter Plan",
    location: "Islamabad, PK",
    duration: "0:35",
    durationSec: 35,
    transcript:
      "Gained 8kg of muscle in four months. My bench and squat went up every single week — Arbaz's programming is actually elite.",
    audioSrc: "/audios/4(1).mp3",
  },
  {
    type: "quote",
    quote: "My lifts went through the roof. Programming is elite — worth every rupee.",
    name: "Osama Baig",
    location: "Islamabad, PK",
    plan: "Starter Plan",
  },
  { type: "stat", value: "18kg", label: "Lost", name: "Safina Riaz", plan: "Premium Plan" },
  {
    type: "voice",
    name: "Safina Riaz",
    plan: "Premium Plan",
    location: "Karachi, PK",
    duration: "0:31",
    durationSec: 31,
    transcript:
      "Assalamualikum Arbaz, my one month completed. I lost around 6-7kg. I have noticed a big difference in my strength and energy levels. Thank you!",
    audioSrc: "/audios/2_k5l8h231.mp3",
  },
  {
    type: "quote",
    quote: "And your plan is highly recommended. I got pretty good results — 20 days, 3 kgs. Thanks!!",
    name: "Safina Riaz",
    location: "Karachi, PK",
    plan: "Premium Plan",
  },
  { type: "stat", value: "20kg", label: "Lost", name: "Ibrar Ali", plan: "Elite Plan" },
  {
    type: "voice",
    name: "Ibrar Ali",
    plan: "Elite Plan",
    location: "Dubai, UAE",
    duration: "0:44",
    durationSec: 44,
    transcript:
      "I'm based in Dubai — lost 20kg in five months and finally learned how to eat properly. Results speak for themselves.",
    audioSrc: "/audios/3.mp3",
  },
  {
    type: "quote",
    quote: "Hey I just weighed myself. I actually lost 4.4 kgs in about 2.5 weeks. Unbelievable progress!",
    name: "Bilal Khan",
    location: "Lahore, PK",
    plan: "Premium Plan",
  },
];

export const testimonials = [
  {
    quote:
      "Honestly the best investment I've made for my health. In 3 months I went from embarrassed to take my shirt off to genuinely proud of how I look.",
    name: "Zain Abbas",
    initials: "ZA",
    image: clientAvatars["Zain Abbas"].image,
    location: "Lahore, PK",
  },
  {
    quote:
      "I'm based in Dubai and was skeptical about online coaching but the results speak for themselves. Lost 20kg in 5 months and learned how to eat properly.",
    name: "Ibrar Ali",
    initials: "MN",
    image: clientAvatars["Ibrar Ali"].image,
    location: "Dubai, UAE",
  },
  {
    quote:
      "The level of personalization is insane. He actually read my food preferences, my schedule, my gym equipment and built the plan around ME. Not some generic template.",
    name: "Hira Asif",
    initials: "HA",
    image: clientAvatars["Hira Asif"].image,
    location: "Karachi, PK",
  },
];

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#plans", label: "Plans" },
  { href: "#results", label: "Results" },
  { href: "#process", label: "Process" },
  { href: "#subscribe", label: "Contact" },
];
