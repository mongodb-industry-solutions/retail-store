export const metadata = {
    title: 'About',
    description: '',
  }

export default function AboutLayout({
    children,
  }) {
    return (
      <html>
        <body>
        {children}
        </body>
      </html>
    )
  }