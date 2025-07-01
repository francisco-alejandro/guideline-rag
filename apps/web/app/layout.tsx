import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Code AI Assistant",
  description: "Your code assistant",
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
