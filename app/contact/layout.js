export const metadata = {
    title: 'Contact',
    description: '',
  }

export default function ShopLayout({
    children,
  }) {
    return (
      <section>
        <nav></nav>
        {children}
      </section>
    )
  }