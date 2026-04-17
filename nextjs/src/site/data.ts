import type { StaticImageData } from "next/image";
import { Compass, Landmark, Network, Rocket, Users, Wallet } from "lucide-react";
import darrenPhoto from "@/assets/members/darren-rogan.png";
import salPhoto from "@/assets/members/sal-samani.png";
import kinsleighPhoto from "@/assets/members/kinsleigh-j.png";

export type ImportedImage = string | StaticImageData;

export function imageSrc(src: ImportedImage | undefined): string | undefined {
  if (!src) {
    return undefined;
  }
  return typeof src === "string" ? src : src.src;
}

export type Route = "home" | "members" | "design-system";

export type MissionTrack = {
  title: string;
  summary: string;
  points: string[];
  icon: typeof Rocket;
  accent: string;
};

export type ImpactMetric = {
  label: string;
  value: number;
  suffix: string;
  description: string;
};

export type EventItem = {
  title: string;
  city: string;
  date: string;
  format: string;
  summary: string;
  status: "Upcoming" | "Past";
  tag: string;
  link: string;
  imageUrl?: string;
};

export type Member = {
  name: string;
  initials: string;
  role: string;
  company: string;
  location: string;
  badge: string;
  photoUrl?: ImportedImage;
  xUrl: string;
  githubUrl?: string;
  highlight: string;
  contribution: string;
  skills: string[];
  filters: string[];
  featured?: boolean;
};

export type SocialSignal = {
  title: string;
  copy: string;
  meta: string;
};

/** Illustrative X-style posts for the Community section (not live API data). */
export type SimulatedTweet = {
  time: string;
  text: string;
};

export const simulatedTweets: SimulatedTweet[] = [
  {
    time: "2h",
    text: "Melbourne Launch Night — RSVP on Luma.",
  },
  {
    time: "5h",
    text: "Office hours: bring one concrete question. Quick feedback.",
  },
  {
    time: "1d",
    text: "New AU-tagged earn listings. Pick a bounty, ship proof.",
  },
  {
    time: "2d",
    text: "Hackathon recap: demos, ships, lessons learned.",
  },
];

export type EcosystemPartner = {
  name: string;
  kind: string;
  href: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type HeroSnapshot = {
  label: string;
  value: string;
};

export type FormState = {
  name: string;
  location: string;
  role: string;
  experience: string;
  skills: string;
  xLink: string;
  github: string;
  portfolio: string;
  lookingFor: string;
};

export const panelClass =
  "glass-panel rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(12,19,36,0.88),rgba(5,9,18,0.74))] shadow-[0_24px_80px_rgba(1,6,16,0.34)] backdrop-blur-xl";

export const navItems = [
  { label: "About", id: "mission" },
  { label: "Support", id: "services" },
  { label: "Events", id: "events" },
  { label: "Members", id: "members-preview" },
  { label: "Ecosystem", id: "ecosystem" },
  { label: "Community", id: "community" },
  { label: "FAQ", id: "faq" },
];

export const externalLinks = {
  global: "https://superteam.fun",
  opportunities: "https://superteam.fun/earn/regions/Australia/all/",
  lumaHub: "https://luma.com/superteam",
  x: "https://x.com/SuperteamAU",
  telegram: "https://t.me/superteamaustralia",
  discord: "https://discord.gg/superteam",
};

export const heroSnapshots: HeroSnapshot[] = [
  { label: "Sydney Launch", value: "15 Apr 2026" },
  { label: "Melbourne Launch", value: "22 Apr 2026" },
  { label: "Weekly Rhythm", value: "Office hours + build sessions" },
];

export const signalLoop = [
  "Sydney Launch - 15 Apr 2026",
  "Melbourne Launch - 22 Apr 2026",
  "Weekly Office Hours",
  "Saturday Build Sessions",
  "Builders x Founders x Creatives",
  "Institutions x Capital x Ecosystem",
  "Australia to Global",
  "Learn. Earn. Build.",
];

export const missionTracks: MissionTrack[] = [
  {
    title: "Builder & Founder Support",
    summary: "Product and technical feedback plus programs that help you ship.",
    points: [
      "Hackathons and bounties",
      "Strategy and GTM checkpoints",
      "Office hours and launch reviews",
    ],
    icon: Rocket,
    accent: "from-[#6acb59] to-[#00833E]",
  },
  {
    title: "Capital & Fundraising",
    summary: "Match capital with credible teams; sharpen pitch and positioning.",
    points: [
      "Investor readiness",
      "Narrative and positioning",
      "Warm intros when ready",
    ],
    icon: Wallet,
    accent: "from-[#FECE00] to-[#b88a00]",
  },
  {
    title: "Growth & Distribution",
    summary: "GTM help: traction, distribution, and ecosystem reach.",
    points: [
      "Launch planning",
      "Community and content",
      "Global Superteam channels",
    ],
    icon: Compass,
    accent: "from-[#FECE00] to-[#00833E]",
  },
  {
    title: "Talent & Hiring",
    summary: "Find engineers, designers, and operators through the network.",
    points: [
      "Member directory",
      "Team matching",
      "Hiring lanes",
    ],
    icon: Users,
    accent: "from-[#58b85a] to-[#f4d54b]",
  },
  {
    title: "Ecosystem & Community",
    summary: "Events, education, and showcases that keep AU visible and active.",
    points: [
      "Launches and build sessions",
      "Onboarding new builders",
      "Global amplification",
    ],
    icon: Network,
    accent: "from-[#ffe57d] to-[#1b9a4f]",
  },
  {
    title: "Institutional Engagement",
    summary: "Connect builders with institutions, policy, and real deployments.",
    points: [
      "Roundtables",
      "Pilots and research",
      "Policy and translation",
    ],
    icon: Landmark,
    accent: "from-[#73be53] to-[#FECE00]",
  },
];

export const impactMetrics: ImpactMetric[] = [
  {
    label: "Members",
    value: 320,
    suffix: "+",
    description: "Builders, creatives, operators, and institutions.",
  },
  {
    label: "Events Hosted",
    value: 18,
    suffix: "",
    description: "Launches, office hours, sessions, demos.",
  },
  {
    label: "Projects Built",
    value: 52,
    suffix: "+",
    description: "Products, pilots, and teams shipping.",
  },
  {
    label: "Bounties Completed",
    value: 74,
    suffix: "",
    description: "Hackathons and ecosystem missions.",
  },
  {
    label: "Community Reach",
    value: 29000,
    suffix: "+",
    description: "Events, content, and channels across Australia.",
  },
];

export const events: EventItem[] = [
  {
    title: "Sydney Launch Night",
    city: "Sydney",
    date: "15 Apr 2026",
    format: "In person",
    summary: "Opening night: builders, founders, capital, one room.",
    status: "Past",
    tag: "Launch",
    link: "https://luma.com/stau.sydlaunch",
    imageUrl:
      "https://images.lumacdn.com/cdn-cgi/image/format%3Dauto%2Cfit%3Dcover%2Cdpr%3D2%2Canim%3Dfalse%2Cbackground%3Dwhite%2Cquality%3D75%2Cwidth%3D180%2Cheight%3D180/event-covers/fd/27039a97-5173-49fa-a7a2-710894cba043.jpg",
  },
  {
    title: "Melbourne Launch Night",
    city: "Melbourne",
    date: "22 Apr 2026",
    format: "In person",
    summary: "Melbourne launch for local builders and new contributors.",
    status: "Upcoming",
    tag: "Launch",
    link: "https://luma.com/stau.mellaunch",
    imageUrl:
      "https://images.lumacdn.com/cdn-cgi/image/format%3Dauto%2Cfit%3Dcover%2Cdpr%3D2%2Canim%3Dfalse%2Cbackground%3Dwhite%2Cquality%3D75%2Cwidth%3D180%2Cheight%3D180/event-covers/18/00e01133-71c7-4261-b564-1b9c3305ef21.png",
  },
  {
    title: "Outback Frontier Builder Office Hours",
    city: "Online",
    date: "Weekly",
    format: "Hybrid",
    summary: "Weekly feedback on product, eng, team, or pitch.",
    status: "Upcoming",
    tag: "Builders",
    link: "https://luma.com/stau.frontierofficehours4",
    imageUrl:
      "https://images.lumacdn.com/cdn-cgi/image/format%3Dauto%2Cfit%3Dcover%2Cdpr%3D2%2Canim%3Dfalse%2Cbackground%3Dwhite%2Cquality%3D75%2Cwidth%3D180%2Cheight%3D180/event-covers/15/55712a02-1777-43bd-8140-392c25c05138.jpg",
  },
  {
    title: "Saturday Build Sessions - National",
    city: "Australia-wide",
    date: "Weekly",
    format: "Google Meet",
    summary: "Weekly national build session — ship and unblock together.",
    status: "Upcoming",
    tag: "Ship",
    link: "https://luma.com/stau.frontiersatbuild1",
    imageUrl:
      "https://images.lumacdn.com/cdn-cgi/image/format%3Dauto%2Cfit%3Dcover%2Cdpr%3D2%2Canim%3Dfalse%2Cbackground%3Dwhite%2Cquality%3D75%2Cwidth%3D180%2Cheight%3D180/event-covers/s4/d3064fbf-038f-4b2f-a42e-a818037197dd.jpg",
  },
  {
    title: "Brisbane Developer Meetup",
    city: "Brisbane",
    date: "30 Apr 2026",
    format: "In person",
    summary: "Local night: workshops, teams, practical Solana.",
    status: "Upcoming",
    tag: "Community",
    link: "https://luma.com/stau.frontierbris",
  },
];

export const members: Member[] = [
  {
    name: "Sal Samani",
    initials: "SS",
    role: "Events and Operations",
    company: "Superteam AU",
    location: "Sydney",
    badge: "Core Team",
    photoUrl: salPhoto,
    xUrl: externalLinks.x,
    highlight: "Runs the calendar and keeps rooms tight.",
    contribution: "Event execution, ops, and follow-through across launches and sessions.",
    skills: ["Community", "Events", "Operations"],
    filters: ["Core Team", "Community"],
    featured: true,
  },
  {
    name: "Darren Rogan",
    initials: "DR",
    role: "Institutional & Events",
    company: "Superteam AU",
    location: "Melbourne",
    badge: "Institutional",
    photoUrl: darrenPhoto,
    xUrl: externalLinks.x,
    highlight: "Connects institutions with community in plain language.",
    contribution: "Event formats and partner touchpoints for clearer local signal.",
    skills: ["Growth", "Events", "Institution"],
    filters: ["Growth"],
    featured: true,
  },
  {
    name: "Kinsleigh J",
    initials: "KJ",
    role: "Country Lead",
    company: "Superteam AU",
    location: "Australia-wide",
    badge: "Country Lead",
    photoUrl: kinsleighPhoto,
    xUrl: externalLinks.x,
    highlight: "Sets direction and keeps the network aligned.",
    contribution: "Strategy across members, partners, events, and visibility.",
    skills: ["Community", "Growth", "Product"],
    filters: ["Growth", "Product", "Community"],
    featured: true,
  },
  {
    name: "Mia Calder",
    initials: "MC",
    role: "Core Contributor",
    company: "Superteam AU",
    location: "Sydney",
    badge: "Core Team",
    xUrl: externalLinks.x,
    highlight: "Runs founder onboarding and turns conversations into structured opportunities.",
    contribution: "Built the launch pipeline for members, events, and ecosystem introductions.",
    skills: ["Community", "Product", "Growth"],
    filters: ["Core Team", "Community", "Growth", "Product"],
    featured: false,
  },
  {
    name: "Noah Sethi",
    initials: "NS",
    role: "Rust Engineer",
    company: "Harbour Labs",
    location: "Melbourne",
    badge: "Builder",
    xUrl: externalLinks.x,
    highlight: "Builds Solana programs for market structure, vaults, and on-chain workflows.",
    contribution: "Led two hackathon prototypes into investor-ready demos.",
    skills: ["Rust", "Smart Contracts", "Security"],
    filters: ["Rust"],
    featured: false,
  },
  {
    name: "Leila Brooks",
    initials: "LB",
    role: "Product Designer",
    company: "Tideframe",
    location: "Gold Coast",
    badge: "Hackathon Winner",
    xUrl: externalLinks.x,
    highlight: "Turns abstract crypto infrastructure into products that feel clear, premium, and usable.",
    contribution: "Won a design bounty focused on wallet onboarding and institutional clarity.",
    skills: ["Design", "UX", "Brand"],
    filters: ["Design"],
    featured: false,
  },
  {
    name: "Arjun Patel",
    initials: "AP",
    role: "Frontend Engineer",
    company: "Signal Deck",
    location: "Perth",
    badge: "Builder",
    xUrl: externalLinks.x,
    highlight: "Builds fast consumer interfaces that make onchain actions feel natural.",
    contribution: "Shipped growth loops and analytics surfaces for two ecosystem projects.",
    skills: ["Frontend", "React", "Motion"],
    filters: ["Frontend"],
    featured: false,
  },
  {
    name: "Talia Chen",
    initials: "TC",
    role: "Content Strategist",
    company: "Orbital Memo",
    location: "Adelaide",
    badge: "Contributor",
    xUrl: externalLinks.x,
    highlight: "Explains internet capital markets in a way institutions and builders both understand.",
    contribution: "Built editorial cadence for launch recaps, ecosystem explainers, and builder stories.",
    skills: ["Content", "Research", "Growth"],
    filters: ["Content", "Growth"],
  },
  {
    name: "Hugo Ramires",
    initials: "HR",
    role: "Growth Operator",
    company: "Current House",
    location: "Sydney",
    badge: "Operator",
    xUrl: externalLinks.x,
    highlight: "Designs conversion funnels from event discovery to active ecosystem participation.",
    contribution: "Scaled signups for local events and tightened follow-up across member cohorts.",
    skills: ["Growth", "Community", "CRM"],
    filters: ["Growth", "Community"],
  },
  {
    name: "Priya Menon",
    initials: "PM",
    role: "Product Lead",
    company: "Delta Foundry",
    location: "Canberra",
    badge: "Founder",
    xUrl: externalLinks.x,
    highlight: "Connects builder needs to policy conversations and real-world pilots.",
    contribution: "Structured an institutional discovery track for tokenized market experiments.",
    skills: ["Product", "Policy", "Institution"],
    filters: ["Product"],
  },
  {
    name: "Jasper Cole",
    initials: "JC",
    role: "Community Lead",
    company: "Guild 16",
    location: "Brisbane",
    badge: "Core Contributor",
    xUrl: externalLinks.x,
    highlight: "Hosts meetups that feel high signal and low friction for new contributors.",
    contribution: "Built an ambassador rhythm across campus, startup, and creator circles.",
    skills: ["Community", "Events", "Operations"],
    filters: ["Community"],
  },
  {
    name: "Ava Ndlovu",
    initials: "AN",
    role: "Brand Designer",
    company: "South Current Studio",
    location: "Melbourne",
    badge: "Creative",
    xUrl: externalLinks.x,
    highlight: "Brings sharp visual systems to products that need trust and memorability.",
    contribution: "Created visual toolkits used across launch assets, event drops, and case studies.",
    skills: ["Design", "Brand", "Motion"],
    filters: ["Design"],
  },
  {
    name: "Kian Doyle",
    initials: "KD",
    role: "Founding Engineer",
    company: "Anchorline",
    location: "Hobart",
    badge: "Builder",
    xUrl: externalLinks.x,
    highlight: "Moves between infra and product with a bias to shipping real code fast.",
    contribution: "Led bounty work on tooling, API reliability, and wallet-friendly UX.",
    skills: ["Rust", "Frontend", "Infra"],
    filters: ["Rust", "Frontend"],
  },
  {
    name: "Sarah Ocampo",
    initials: "SO",
    role: "Ecosystem Analyst",
    company: "Northwind Capital",
    location: "Sydney",
    badge: "Capital Connector",
    xUrl: externalLinks.x,
    highlight: "Maps emerging founders to the capital, context, and intros they need most.",
    contribution: "Built investment brief templates for ecosystem teams approaching capital.",
    skills: ["Growth", "Capital", "Research"],
    filters: ["Growth"],
  },
  {
    name: "Benji Hart",
    initials: "BH",
    role: "Developer Relations",
    company: "Southport Labs",
    location: "Darwin",
    badge: "Contributor",
    xUrl: externalLinks.x,
    highlight: "Translates complex technical primitives into programs people actually want to join.",
    contribution: "Ran live coding sessions and bounty walkthroughs across three community tracks.",
    skills: ["Content", "Community", "Rust"],
    filters: ["Content", "Community", "Rust"],
  },
];

export const memberFilters = [
  "All",
  "Core Team",
  "Rust",
  "Frontend",
  "Design",
  "Content",
  "Growth",
  "Product",
  "Community",
];

export const ecosystemPartners: EcosystemPartner[] = [
  { name: "Solana Foundation", kind: "Global ecosystem", href: "https://solana.org" },
  { name: "Colosseum", kind: "Hackathons", href: "https://www.colosseum.org" },
  { name: "Backpack", kind: "Wallet and exchange", href: "https://backpack.exchange" },
  { name: "Helius", kind: "Infrastructure", href: "https://www.helius.dev" },
  { name: "Meteora", kind: "DeFi", href: "https://www.meteora.ag" },
  { name: "Drift", kind: "Perps and trading", href: "https://www.drift.trade" },
  { name: "Fireblocks", kind: "Custody and operations", href: "https://www.fireblocks.com" },
  { name: "Stone & Chalk", kind: "Startup ecosystem", href: "https://www.stoneandchalk.com.au" },
  { name: "CoinJar", kind: "Australian exchange", href: "https://www.coinjar.com" },
  { name: "BTC Markets", kind: "Australian exchange", href: "https://www.btcmarkets.net" },
  { name: "MonkeDAO", kind: "Community network", href: "https://monkedao.io" },
  { name: "Superteam", kind: "Global network", href: "https://superteam.fun" },
];

export const socialSignals: SocialSignal[] = [
  {
    title: "Builders in motion",
    copy: "Office hours, sprints, and bounties for people who ship.",
    meta: "Events, recaps, launch notes",
  },
  {
    title: "Institutional curiosity",
    copy: "On-chain markets and treasury in the same AU conversation.",
    meta: "Founders, policy, capital",
  },
  {
    title: "Global stage, local edge",
    copy: "Global Superteam reach with local context.",
    meta: "AU-first, globally legible",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote: "Real follow-through: the right people, the right next step.",
    author: "Mia Calder",
    role: "Founder programs and community, Sydney",
  },
  {
    quote: "A local hub where you see who ships and what is live.",
    author: "Darren Rogan",
    role: "Institutional and events, Melbourne",
  },
  {
    quote: "Useful rooms, clear opportunities — that is why people stay.",
    author: "Ava Ndlovu",
    role: "Brand designer and contributor, Melbourne",
  },
];

export const faqs: FaqItem[] = [
  {
    question: "What is Superteam Australia?",
    answer:
      "The Solana community layer in Australia: events, members, and earn — so local talent can collaborate and plug into the global network.",
  },
  {
    question: "How do I get involved?",
    answer:
      "Complete onboarding, join an event, follow earn. Already building? Share what you ship and what you need.",
  },
  {
    question: "What opportunities are available?",
    answer:
      "Jobs, bounties, hackathons, grants, founder support, intros, and programs across the Solana stack.",
  },
  {
    question: "How can institutions engage?",
    answer:
      "Events, roundtables, pilots, research, and intros to teams with real use cases.",
  },
];

export const defaultFormState: FormState = {
  name: "",
  location: "",
  role: "Builder",
  experience: "Early",
  skills: "",
  xLink: "",
  github: "",
  portfolio: "",
  lookingFor: "",
};
