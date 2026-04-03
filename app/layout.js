import './globals.css';

export const metadata = {
  title: 'My Portfolio',
  description: 'Personal portfolio built with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}