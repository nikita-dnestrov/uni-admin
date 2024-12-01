import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ClientTokenChecker } from "./layoutClientTokenCheck";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Admin panel",
  description: "Admin panel for the shoe store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClientTokenChecker />
      <body className={`${roboto.className} antialiased flex`}>{children}</body>
    </html>
  );
}
