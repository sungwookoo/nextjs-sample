import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'nextjs-sample · swkoo.kr',
  description: 'Sample Next.js app hosted on swkoo.kr (PaaS Phase 1 self-test).',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body
        style={{
          margin: 0,
          fontFamily:
            'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
          background: '#0f172a',
          color: '#f1f5f9',
        }}
      >
        {children}
      </body>
    </html>
  );
}
