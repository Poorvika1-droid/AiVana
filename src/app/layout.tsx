import type {Metadata} from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import { ClientHeader } from '@/components/ClientHeader';
import React from 'react';

export const metadata: Metadata = {
  title: 'AiVana: Idea Alchemist',
  description: 'Generate your next big idea with the power of AI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>AiVana: Next-Level Project Idea Generator</title>
        <meta name="description" content="Generate unique project ideas with AI. Fast, beautiful, and easy to use." />
        <meta property="og:title" content="AiVana" />
        <meta property="og:description" content="Generate unique project ideas with AI." />
        <meta property="og:image" content="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet"></link>
      </head>
      <body className="font-body antialiased">
        <ClientHeader />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
