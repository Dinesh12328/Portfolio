import type { Metadata } from "next";
import "./globals.css";

const siteTitle = "Dinesh Pyla | Java Backend Developer";
const siteDescription =
  "Immersive portfolio for Dinesh Pyla, a Java and Spring Boot backend developer focused on REST APIs, JWT security, microservices, Kafka, Docker, and production-ready systems.";
const metadataBase = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dinesh-pyla-portfolio.vercel.app",
);

export const metadata: Metadata = {
  metadataBase,
  title: siteTitle,
  description: siteDescription,
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    url: metadataBase.toString(),
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Dinesh Pyla Java backend developer portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
