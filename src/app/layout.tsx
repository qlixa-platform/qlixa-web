import type { Metadata } from 'next'
import '../styles/globals.css'
import ScrollArrows from '@/components/layout/ScrollArrows'

export const metadata: Metadata = {
  title: 'QLIXA — Reports in one click',
  description: 'Smart online accounting platform for foreigners in Austria. Buchhaltung made simple.',
  keywords: 'accounting austria, buchhaltung, foreigners austria, business austria, QLIXA',
  openGraph: {
    title: 'QLIXA — Reports in one click',
    description: 'Smart online accounting platform for foreigners in Austria.',
    url: 'https://qlixa.eu',
    siteName: 'QLIXA',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <ScrollArrows />
      </body>
    </html>
  )
}
