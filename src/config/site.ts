/**
 * Central site config — update WhatsApp number, plans, and URLs here.
 */
export const siteConfig = {
  name: "Arbaz Arif",
  brand: "ARBAZ.ARIF",
  title: "Arbaz Arif — Elite Fitness Coaching",
  description:
    "Pakistan's premier online fitness coach. Personalized training, elite nutrition protocols, and the accountability system to make your transformation permanent.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://arbazarif.com",
  locale: "en_PK",
  instagram: {
    handle: "@arbazxarif_coaching",
    url: "https://www.instagram.com/arbazxarif_coaching/",
  },
  tiktok: {
    handle: "@arbazxarif",
    url: "https://www.tiktok.com/@arbazxarif",
  },
  youtube: {
    handle: "Arbaz Arif",
    url: "https://www.youtube.com/@ArbazArif",
  },
  /** E.164 without + */
  whatsappNumber: "13073925968",
  whatsappDisplay: "+1 307 392 5968",
  email: "hello@arbazarif.com",
  copyrightYear: 2026,
} as const;

export type CoachingPlan = {
  id: string;
  badge: string;
  featured?: boolean;
  pulse?: boolean;
  name: string;
  description: string;
  price: string;
  currency: string;
  tenure: string;
  features: string[];
};

/**
 * PLANS — ordered left to right:
 * 1. Starter (10K / 12wk)
 * 2. Premium (18K / 16wk) [MOST POPULAR]
 * 3. Elite (30K / 20wk)
 *
 * Ramadan plan removed entirely.
 */
export const coachingPlans: CoachingPlan[] = [
  {
    id: "starter",
    badge: "Entry",
    name: "Starter Plan",
    description:
      "Your gateway to serious fitness. A structured 12-week program that builds the foundation for lasting change.",
    price: "10,000",
    currency: "PKR",
    tenure: "12-WEEK PROGRAM",
    features: [
      "Custom weekly workout plan",
      "Calorie + macro targets",
      "Bi-weekly check-ins",
      "Progress tracking dashboard",
    ],
  },
  {
    id: "premium",
    badge: "Most Popular",
    featured: true,
    pulse: true,
    name: "Premium Plan",
    description:
      "The complete transformation package. Personalized training, detailed nutrition, and direct access to Arbaz.",
    price: "18,000",
    currency: "PKR",
    tenure: "16-WEEK PROGRAM",
    features: [
      "Fully custom training split",
      "Detailed nutrition + meal ideas",
      "Daily WhatsApp support",
      "Form video reviews",
      "Monthly progress assessments",
    ],
  },
  {
    id: "elite",
    badge: "Elite",
    name: "Elite Plan",
    description:
      "For those who demand the absolute best. Intensive programming with priority support and accelerated protocols.",
    price: "30,000",
    currency: "PKR",
    tenure: "20-WEEK PROGRAM",
    features: [
      "Advanced periodised training",
      "Full nutrition + supplement protocol",
      "Daily WhatsApp priority access",
      "Weekly form video reviews",
      "Monthly progress assessments",
    ],
  },
];

export const prestigeFeatures = [
  {
    icon: "blueprint",
    title: "Complete Transformation Blueprint",
    desc: "Custom strategy, periodised phases, varied meal options tailored to your lifestyle.",
  },
  {
    icon: "checkins",
    title: "Weekly Check-ins + Adjustments",
    desc: "Macro changes, cardio manipulation, plateau-breaking protocols adjusted weekly.",
  },
  {
    icon: "whatsapp",
    title: "24/7 WhatsApp Priority Access",
    desc: "Direct accountability with Arbaz — no gatekeepers, no delays.",
  },
  {
    icon: "mindset",
    title: "Habit & Mindset Coaching",
    desc: "Discipline frameworks, craving control, travel strategy for consistency.",
  },
  {
    icon: "supplement",
    title: "Supplement Guidance",
    desc: "Exact protocol: protein, creatine, fat burners if needed — nothing generic.",
  },
] as const;

export const prestigeCard = [
  "Complete Transformation Blueprint",
  "Weekly 1-on-1 Check-ins",
  "24/7 WhatsApp Priority",
  "Habit & Mindset Coaching",
  "Supplement Protocol",
] as const;

export function whatsappUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://api.whatsapp.com/send/?phone=${siteConfig.whatsappNumber}&text=${encoded}&type=phone_number&app_absent=0`;
}

/** Footer Connect — opens WhatsApp with the Prestige Plan intro message */
export const whatsappFooterUrl =
  "https://api.whatsapp.com/send/?phone=13073925968&text=Hi+Arbaz%2C+I+want+to+buy+your+Prestige+Plan&type=phone_number&app_absent=0";

export function planWhatsAppUrl(planName: string): string {
  return whatsappUrl(`Hi Arbaz, I'm interested in the ${planName}`);
}
