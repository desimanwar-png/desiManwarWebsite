import './globals.css'

export const metadata = {
  title: 'Desi Manwar',
  description: 'Desi Manwar Website',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>{children}</body>
    </html>
  )
}
