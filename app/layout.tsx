import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'DigitalGrowth | Performance Marketing for Trades & Home Services',
    template: '%s | DigitalGrowth',
  },
  description: 'Conversion-focused Google Ads, Meta Ads, and tracking for trades & home services in Adelaide and across Australia.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900">{children}</body>
    </html>
  )
}
