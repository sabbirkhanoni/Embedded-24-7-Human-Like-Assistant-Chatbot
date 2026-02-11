import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Embedded 24/7 AI Human-Like Assistant Chatbot",
  description: "A cutting-edge AI chatbot that provides human-like interactions, available 24/7. This assistant is designed to seamlessly integrate into various platforms, offering personalized support and engaging conversations. With advanced natural language processing capabilities, it can understand and respond to user queries in a conversational manner, making it an ideal solution for customer service, virtual assistance, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} bg-[#050508] font-sans flex min-h-screen flex-col p-0  text-zinc-50 selection:bg-zinc-800  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
