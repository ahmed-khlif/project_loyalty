import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "njiw. — Application foundation",
  description: "A calm, trustworthy foundation for local café loyalty.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
