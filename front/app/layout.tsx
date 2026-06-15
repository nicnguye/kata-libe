import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/components/Navbar";

export const metadata: Metadata = {
  title: "Kata Libe",
  description: "Kata Liberation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
    >
      <body className="flex flex-col h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
