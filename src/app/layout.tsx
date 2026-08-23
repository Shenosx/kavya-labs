import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { SessionProvider } from "@/components/providers/SessionProvider";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kavya Labs — Intelligence, engineered for what's next",
  description:
    "Kavya Labs builds intelligent digital products that turn complex problems into simple, scalable experiences.",
  keywords: [
    "Kavya Labs",
    "AI systems",
    "digital products",
    "intelligent software",
    "product engineering",
  ],
  openGraph: {
    title: "Kavya Labs — Intelligence, engineered for what's next",
    description:
      "Kavya Labs builds intelligent digital products that turn complex problems into simple, scalable experiences.",
    type: "website",
    locale: "en_US",
    siteName: "Kavya Labs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kavya Labs — Intelligence, engineered for what's next",
    description:
      "Kavya Labs builds intelligent digital products that turn complex problems into simple, scalable experiences.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className="min-h-screen antialiased">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
