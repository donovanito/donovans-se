import type { Metadata, Viewport } from "next";
import "./globals.css";

const title = "Enhörningsspelet";
const description = "Ett lugnt hinderspel med enhörningar och regnbågar. Hoppa, samla stjärnor och hjärtan - alla får medalj!";
const shareTitle = "Enhörningsspelet - ett lugnt hinderspel";

export const metadata: Metadata = {
  metadataBase: new URL("https://enhorningsspelet.donovans.se"),
  title,
  description,
  applicationName: title,
  robots: { index: false, follow: false },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  appleWebApp: { capable: true, title: "Enhörningar", statusBarStyle: "default" },
  formatDetection: { telephone: false },
  other: { "apple-mobile-web-app-capable": "yes" }, // older iOS versions

  openGraph: {
    title: shareTitle,
    description,
    url: "/",
    siteName: title,
    locale: "sv_SE",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Åtta enhörningar med ryttare på en regnbågsbana" }],
  },
  twitter: {
    card: "summary_large_image",
    title: shareTitle,
    description,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#e9dcff",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sv">
      <body>{children}</body>
    </html>
  );
}
