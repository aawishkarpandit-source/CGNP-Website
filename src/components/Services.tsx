/** @jsx h */
import { h } from "../runtime/jsx";

export type Service = { icon: string; title: string; desc: string };

export const SERVICES: Service[] = [
  { icon: "🌐", title: "Business Websites", desc: "Professional websites that build trust and bring enquiries." },
  { icon: "💻", title: "Custom Software", desc: "Software made for your exact business needs." },
  { icon: "📱", title: "Web Applications", desc: "Booking, billing and customer portals." },
  { icon: "🗄️", title: "Records & Database", desc: "Safe records and easy reports." },
  { icon: "🏢", title: "Business Management", desc: "Sales, stock, staff and accounts in one place." },
  { icon: "🎨", title: "Design & Branding", desc: "Logo, graphics and clean designs." },
  { icon: "📈", title: "Marketing", desc: "Get found on Google and social media." },
  { icon: "🔧", title: "Support & Hosting", desc: "We look after everything for you." },
];

export function ServiceCard(s: Service) {
  return (
    <div class="card">
      <div class="icon">{s.icon}</div>
      <h3>{s.title}</h3>
      <p>{s.desc}</p>
    </div>
  );
}
