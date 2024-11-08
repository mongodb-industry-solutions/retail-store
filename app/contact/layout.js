export const metadata = {
    title: 'Contact',
    description: '',
  }

export default function ContactLayout({
    children,
  }) {
    return (
      <section>
        <nav></nav>
        {children}
      </section>
    )
  }