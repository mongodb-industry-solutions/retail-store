export const metadata = {
    title: 'Shop',
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