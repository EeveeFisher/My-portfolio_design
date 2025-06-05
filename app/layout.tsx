// app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'EduQuiz Pro',
  description: 'An advanced quiz platform for education',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
