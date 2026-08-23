import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TaskFlow — Move work forward, without the busywork.",
  description:
    "TaskFlow is a focused project management workspace for teams to organize tasks, collaborate clearly, and keep work moving.",
  keywords: [
    "TaskFlow",
    "project management",
    "task management",
    "team collaboration",
    "SaaS",
    "productivity",
  ],
  openGraph: {
    title: "TaskFlow — Move work forward, without the busywork.",
    description:
      "TaskFlow is a focused project management workspace for teams to organize tasks, collaborate clearly, and keep work moving.",
    type: "website",
    locale: "en_US",
    siteName: "TaskFlow",
  },
  twitter: {
    card: "summary_large_image",
    title: "TaskFlow — Move work forward, without the busywork.",
    description:
      "TaskFlow is a focused project management workspace for teams to organize tasks, collaborate clearly, and keep work moving.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
