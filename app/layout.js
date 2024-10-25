import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import { GeistSans } from 'geist/font/sans';
import ClientProvider from './ClientProvider'; // Adjust the path if needed

export const metadata = {
  title: 'Home',
  description: '',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}