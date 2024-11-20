export const metadata = {
    title: 'About',
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