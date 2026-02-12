import './globals.css'

export const metadata = {
  title: 'DigitalGrowth',
  description: 'Conversion-focused digital marketing for Adelaide businesses.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900">
        {children}
      </body>
    </html>
  )
}
