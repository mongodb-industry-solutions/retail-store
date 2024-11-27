export const metadata = {
    title: 'About',
    description: '',
  }

export default function AboutLayout({
    children,
  }) {
    return (
      <section>
        {children}
      </section>
    )
  }