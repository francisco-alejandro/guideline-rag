import type { Metadata } from "next";
import { Footer } from "./footer";

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
      <body className="flex flex-col items-center justify-center h-screen">
        <main className="w-full max-w-screen-md p-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
