import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

const siteTitle = "Dinesh Pyla | Java Backend Developer";
const siteDescription =
  "Immersive portfolio for Dinesh Pyla, a Java and Spring Boot backend developer focused on REST APIs, JWT security, microservices, Kafka, Docker, and production-ready systems.";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:5173";
  const protocol =
    host.includes("localhost") || host.includes("127.0.0.1") ? "http" : "https";
  const metadataBase = new URL(`${protocol}://${host}`);
  const imageUrl = new URL("/og.png", metadataBase).toString();

  return {
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
          url: imageUrl,
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
      images: [imageUrl],
    },
  };
}

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
