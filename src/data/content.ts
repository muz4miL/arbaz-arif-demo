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
  "10+ Years Industry Experience",
];

export const methodPillars = [
  {
    num: "01",
    title: "Precision Training",
    desc: "Every rep and set calculated for your biomechanics. No guesswork.",
    icon: "layers",
  },
  {
    num: "02",
    title: "Metabolic Nutrition",
    desc: "Custom macros that adapt as your body changes. Sustainable, not starvation.",
    icon: "clock",
  },
  {
    num: "03",
    title: "Accountability Systems",
    desc: "Daily check-ins, form reviews, and real-time adjustments.",
    icon: "users",
  },
  {
    num: "04",
    title: "Lifestyle Integration",
    desc: "Programs built around your schedule. Fitness that fits your life.",
    icon: "shield",
  },
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
  "Ahmed K.": { image: "/clients/ahmed-k.jpg", initials: "AK" },
  "Sara R.": { image: "/clients/sara-r.jpg", initials: "SR" },
  "Usman M.": { image: "/clients/usman-m.jpg", initials: "UM" },
  "Fatima H.": { image: "/clients/fatima-h.jpg", initials: "FH" },
  "Naveed M.": { image: "/clients/naveed-m.jpg", initials: "NM" },
  "Zain A.": { image: "/clients/zain-a.jpg", initials: "ZA" },
  "Zain Abbas": { image: "/clients/zain-a.jpg", initials: "ZA" },
  "M. Naveed": { image: "/clients/naveed-m.jpg", initials: "MN" },
  "Hira Asif": { image: "/clients/hira-a.jpg", initials: "HA" },
};

export const clientResults = [
  {
    name: "Ahmed K.",
    initials: "AK",
    program: "Elite Plan",
    quote:
      "I never thought I could look like this at 34. Arbaz changed my whole relationship with fitness. It's now a lifestyle.",
    metrics: [
      { value: "22kg", label: "Lost" },
      { value: "16wk", label: "Duration" },
    ],
    image: clientAvatars["Ahmed K."].image,
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
    name: "Usman M.",
    initials: "UM",
    program: "Starter Plan",
    quote:
      "Gained 8kg of muscle in 4 months. My lifts went through the roof. Arbaz's programming is elite.",
    metrics: [
      { value: "+8kg", label: "Muscle" },
      { value: "16wk", label: "Duration" },
    ],
    image: clientAvatars["Usman M."].image,
  },
  {
    name: "Fatima H.",
    initials: "FH",
    program: "Premium Plan",
    quote:
      "The WhatsApp support alone is worth everything. Having Arbaz in my corner kept me accountable.",
    metrics: [
      { value: "18kg", label: "Lost" },
      { value: "20wk", label: "Duration" },
    ],
    image: clientAvatars["Fatima H."].image,
  },
];

/** Marquee items for the results/testimonials section */
export const resultsMarqueeItems = [
  { type: "stat" as const, value: "22kg", label: "Lost", name: "Ahmed K.", plan: "Elite Plan" },
  { type: "quote" as const, quote: "Arbaz changed my whole relationship with fitness.", name: "Ahmed K." },
  { type: "stat" as const, value: "15kg", label: "Lost", name: "Sara R.", plan: "Premium Plan" },
  { type: "quote" as const, quote: "The meal plans were realistic — I actually enjoyed eating.", name: "Sara R." },
  { type: "stat" as const, value: "+8kg", label: "Muscle", name: "Usman M.", plan: "Starter Plan" },
  { type: "quote" as const, quote: "My lifts went through the roof. Programming is elite.", name: "Usman M." },
  { type: "stat" as const, value: "18kg", label: "Lost", name: "Fatima H.", plan: "Premium Plan" },
  { type: "quote" as const, quote: "Having Arbaz in my corner kept me accountable.", name: "Fatima H." },
  { type: "stat" as const, value: "20kg", label: "Lost", name: "Naveed M.", plan: "Elite Plan" },
  { type: "quote" as const, quote: "Best investment I've made for my health.", name: "Zain A." },
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
    name: "M. Naveed",
    initials: "MN",
    image: clientAvatars["M. Naveed"].image,
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
  { href: "#about", label: "About" },
  { href: "#plans", label: "Plans" },
  { href: "#results", label: "Results" },
  { href: "#process", label: "Process" },
  { href: "#subscribe", label: "Subscribe" },
];
