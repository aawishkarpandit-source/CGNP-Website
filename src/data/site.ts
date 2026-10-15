/**
 * VELTRION — page content as data.
 * Copy is verbatim from the site's published content (no invented claims).
 */

export type NavItem = { href: string; label: string };

/* ---------- Navigation ---------- */
export const HERO_NAV: NavItem[] = [
  { href: "about.html", label: "About Us" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#faq", label: "FAQ" },
  { href: "download.html", label: "Downloads" },
];

export const HERO_MENU: NavItem[] = [
  { href: "index.html", label: "Home" },
  ...HERO_NAV,
];

export const PAGE_NAV: NavItem[] = [
  { href: "index.html", label: "Home" },
  { href: "about.html", label: "About Us" },
  { href: "download.html", label: "Downloads" },
];

/* ---------- Home: section side rail ---------- */
export const RAIL: { href: string; n: string; nm: string }[] = [
  { href: "#hero", n: "01", nm: "Home" },
  { href: "#services", n: "02", nm: "Services" },
  { href: "#process", n: "03", nm: "Process" },
  { href: "#why", n: "04", nm: "Why Us" },
  { href: "#faq", n: "05", nm: "FAQ" },
  { href: "#start", n: "06", nm: "Start" },
];

/* ---------- Marquee bands ---------- */
export const BAND_WORDS = [
  "Websites", "Custom Software", "Business Systems",
  "Design", "Marketing", "Support",
];
export const BAND_ACCENT = ["VELTRION", "Engineered for What's Next"];
export const GLITCH_WORD = "VELTRION";

/* ---------- Services ---------- */
export type Service = { num: string; title: string; desc: string; tags: string[] };

export const SERVICES: Service[] = [
  { num: "01", title: "Business Websites", desc: "Professional websites that build trust and bring enquiries.", tags: ["Trust", "Enquiries"] },
  { num: "02", title: "Custom Software", desc: "Software made for your exact business needs.", tags: ["Exact fit", "Business needs"] },
  { num: "03", title: "Web Applications", desc: "Online booking, billing, customer portals and more.", tags: ["Booking", "Billing", "Portals"] },
  { num: "04", title: "Records & Database", desc: "Safe, organized records and easy reports.", tags: ["Safe records", "Easy reports"] },
  { num: "05", title: "Business Management System", desc: "Sales, stock, staff and accounts in one place.", tags: ["Sales", "Stock", "Staff", "Accounts"] },
  { num: "06", title: "Design & Branding", desc: "Logo, graphics and clean, easy-to-use designs.", tags: ["Logo", "Graphics", "Clean UI"] },
  { num: "07", title: "Marketing & Promotion", desc: "Get found on Google and social media.", tags: ["Google", "Social media"] },
  { num: "08", title: "Support & Hosting", desc: "We look after your website and software for you.", tags: ["Updates", "Backups", "Help"] },
];

export const ACCENT_CELL = {
  title: "Something custom?",
  desc: "Tell us what your business needs — we shape a practical solution around it.",
  cta: { href: "#process", label: "How we work" },
};

/* ---------- Process ---------- */
export type Step = { num: string; title: string; desc: string };

export const PROCESS: Step[] = [
  { num: "01", title: "Plan", desc: "We understand your needs and agree a clear scope." },
  { num: "02", title: "We design", desc: "See a preview and request changes until you are happy." },
  { num: "03", title: "We build & launch", desc: "We develop, test and launch your website or system." },
  { num: "04", title: "We support", desc: "Training plus ongoing care and promotion." },
];

/* ---------- Why VELTRION ---------- */
export const WHY_PILLS = ["Precision", "Reliability", "Simplicity", "Professionalism"];

export type Stat = { num: string; label: string; desc: string; span2?: boolean };

export const WHY_STATS: Stat[] = [
  { num: "01", label: "Business-first approach", desc: "We understand shops, offices and organizations — we suggest only what you need." },
  { num: "02", label: "On-time delivery", desc: "Clear timeline and regular updates throughout the project." },
  { num: "03", label: "Long-term care", desc: "After launch we stay with you — training, updates, backups and help whenever needed.", span2: true },
];

/* ---------- FAQ ---------- */
export type FaqItem = { q: string; a: string };

export const FAQS: FaqItem[] = [
  { q: "What does VELTRION do?", a: "We build business websites, custom software, web applications, records and database systems, and business management systems — plus design, marketing and ongoing support." },
  { q: "How does your process work?", a: "Four simple steps: we plan the scope together, you review the design, we build and launch — and then we support you with training, updates and backups." },
  { q: "Do you provide support after launch?", a: "Yes. Support and hosting is one of our services — we look after your website and software, with updates, backups and help whenever you need it." },
  { q: "Who do you work with?", a: "Shops, offices, organizations and individuals — anyone who wants reliable, easy-to-use digital tools." },
  { q: "Is the pricing clear?", a: "Yes. We agree the scope and the price up front, keep you updated with regular progress, and deliver on time." },
  { q: "Where do I download official software?", a: "All official VELTRION releases are published on the Downloads page — including version, size and installation details. Please avoid downloading our software from other sites." },
];

/* ---------- CTA panel ---------- */
export const CTA_LIST = [
  "Clear scope and pricing agreed up front",
  "On-time delivery with regular updates",
  "Training so your staff can use everything confidently",
  "Support after launch — updates and backups",
];

/* ---------- About: team ---------- */
export type Member = { initials: string; name: string; role: string; bio: string };

export const TEAM: Member[] = [
  { initials: "AP", name: "Awishkar Pandit", role: "Chairman & Lead Developer", bio: "Leads the company and oversees all software development and quality." },
  { initials: "AB", name: "Abhinav Basnet", role: "Lead Marketing Agent", bio: "Looks after marketing, promotion and bringing new clients." },
  { initials: "SB", name: "Sakshyam Basnet", role: "Lead Creative Designer", bio: "Handles branding, graphics and creative design work." },
  { initials: "PS", name: "Pranjal Sharma", role: "Business Manager", bio: "Manages daily operations, clients and project delivery." },
  { initials: "LB", name: "Laxmi Bhandari", role: "Legal Advisor", bio: "Provides legal guidance and ensures proper business practice." },
];

export const ORG_NOTE = {
  title: "How we are organized",
  bio: "The Chairman leads the company. Marketing, Design and Business teams handle daily work, while the Legal Advisor guides independently.",
};

/* ---------- About: company table ---------- */
export type TableRow = { topic: string; detail: string };

export const COMPANY_ROWS: TableRow[] = [
  { topic: "Brand", detail: "VELTRION" },
  { topic: "Tagline", detail: "Engineered for What's Next." },
  { topic: "Industry", detail: "Software & Digital Technology" },
  { topic: "What we do", detail: "Software development and digital services" },
  { topic: "Who we serve", detail: "Businesses, organizations and individuals" },
];

/* ---------- Downloads ---------- */
export const COACH = {
  num: "01",
  name: "Coach Dashboard",
  desc: "Classroom software — teacher control window and student screen in one install.",
  version: "v1.0.9",
  platform: "Windows",
  size: "~79.6 MB",
  downloadUrl: "https://github.com/aawishkarpandit-source/coach-dashboard/releases/download/v1.0.9/Coach-Dashboard-Setup-1.0.9.exe",
  releasesUrl: "https://github.com/aawishkarpandit-source/coach-dashboard/releases",
};

export const DOWNLOAD_NOTES = [
  "All files here are official and safe. Avoid downloading our software from other sites.",
  "Each release will show version, size and simple installation steps.",
  "New versions will be announced here when published.",
];

/* ---------- Footer ---------- */
export const FOOTER_NAV: NavItem[] = [
  { href: "index.html", label: "Home" },
  { href: "about.html", label: "About Us" },
  { href: "download.html", label: "Downloads" },
  { href: "about.html#team", label: "Our Team" },
];

export const FOOTER_SERVICES = [
  "Business Websites",
  "Custom Software",
  "Web Applications",
  "Records & Database",
  "Business Management Systems",
  "Design & Branding",
  "Marketing & Promotion",
  "Support & Hosting",
];
