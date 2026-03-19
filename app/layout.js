import { DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Celebso — Technical Proposal",
  description:
    "Building India's Stage for 100 Million+ Dreamers. A comprehensive technical blueprint and development partnership proposal — where LinkedIn meets Instagram, purpose-built for India's creator ecosystem.",
  metadataBase: new URL("https://celebso-proposal.vercel.app"),
  openGraph: {
    title: "Celebso — Technical Proposal & Development Partnership",
    description:
      "Building India's Stage for 100 Million+ Dreamers. Full-stack platform blueprint: React Native, Next.js, AWS, real-time video, community, events — 12-week MVP.",
    url: "https://celebso-proposal.vercel.app",
    siteName: "Celebso Technical Proposal",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Celebso — Technical Proposal",
    description:
      "Building India's Stage for 100 Million+ Dreamers. Where LinkedIn meets Instagram — purpose-built for India's creator ecosystem.",
  },
  icons: {
    icon: "https://media.licdn.com/dms/image/v2/D4E0BAQHm9DpoFlZFRA/company-logo_200_200/company-logo_200_200/0/1722409452704/celebso_logo?e=2147483647&v=beta&t=kJpje4OQHM8q6iwGSUJomXYAEaKe3CNBdkFyyrwK3Aw",
    apple:
      "https://media.licdn.com/dms/image/v2/D4E0BAQHm9DpoFlZFRA/company-logo_200_200/company-logo_200_200/0/1722409452704/celebso_logo?e=2147483647&v=beta&t=kJpje4OQHM8q6iwGSUJomXYAEaKe3CNBdkFyyrwK3Aw",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${jetbrainsMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
