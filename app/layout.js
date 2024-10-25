import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './globals.css'

export const metadata = {
  title: 'Home',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>{children}</body>
    </html>
  )
}
