export const metadata = {
    title: 'Leafy Pop-Up Store',
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