export const metadata = {
    title: 'Leafy Pop-Up Store',
    description: '',
  }

export default function CheckoutLayout({
    children,
  }) {
    return (
      <section>
        <nav></nav>
        {children}
      </section>
    )
  }