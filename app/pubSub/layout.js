export const metadata = {
    title: 'pubSub',
    description: '',
  }

export default function PubSubLayout({
    children,
  }) {
    return (
      <section>
        <nav></nav>
        {children}
      </section>
    )
  }