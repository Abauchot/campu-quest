import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  manifest: '/manifest.json',
  title: 'Campus Quest',
  description: 'A quest to find the best campus in the world',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
