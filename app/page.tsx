import { headers } from 'next/headers';

interface HelloResponse {
  message: string;
  hostname: string;
  servedAt: string;
  uptimeSeconds: number;
}

async function fetchHello(): Promise<HelloResponse | null> {
  // Same-origin fetch — works because Next.js renders on the same Pod.
  // We use the request host so it works behind any ingress hostname.
  const h = headers();
  const host = h.get('x-forwarded-host') ?? h.get('host');
  const proto = h.get('x-forwarded-proto') ?? 'http';
  if (!host) return null;
  try {
    const res = await fetch(`${proto}://${host}/api/hello`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return (await res.json()) as HelloResponse;
  } catch {
    return null;
  }
}

export default async function Home() {
  const data = await fetchHello();
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <div style={{ maxWidth: 640, width: '100%' }}>
        <p
          style={{
            margin: 0,
            fontSize: 12,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#34d399',
          }}
        >
          Hosted on swkoo.kr
        </p>
        <h1
          style={{
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            margin: '0.5rem 0 1.5rem',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          nextjs-sample
        </h1>
        <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>
          A small Next.js app deployed via the swkoo.kr PaaS Phase 1 flow.
          The page below was server-rendered and the data was fetched from
          the same pod's <code>/api/hello</code> route.
        </p>

        <section
          style={{
            marginTop: '2rem',
            padding: '1.5rem',
            border: '1px solid #1e293b',
            borderRadius: 12,
            background: 'rgba(15, 23, 42, 0.6)',
          }}
        >
          <h2 style={{ marginTop: 0, fontSize: '1rem', color: '#cbd5e1' }}>
            /api/hello
          </h2>
          {data ? (
            <dl style={{ margin: 0, fontSize: 14, color: '#cbd5e1' }}>
              <div style={{ display: 'flex', gap: 12 }}>
                <dt style={{ minWidth: 110, color: '#64748b' }}>message</dt>
                <dd style={{ margin: 0, fontWeight: 600 }}>{data.message}</dd>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <dt style={{ minWidth: 110, color: '#64748b' }}>hostname</dt>
                <dd
                  style={{
                    margin: 0,
                    fontFamily: 'ui-monospace, monospace',
                  }}
                >
                  {data.hostname}
                </dd>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <dt style={{ minWidth: 110, color: '#64748b' }}>servedAt</dt>
                <dd
                  style={{
                    margin: 0,
                    fontFamily: 'ui-monospace, monospace',
                  }}
                >
                  {data.servedAt}
                </dd>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <dt style={{ minWidth: 110, color: '#64748b' }}>uptime</dt>
                <dd style={{ margin: 0 }}>{data.uptimeSeconds}s</dd>
              </div>
            </dl>
          ) : (
            <p style={{ margin: 0, color: '#fca5a5' }}>
              /api/hello is not reachable.
            </p>
          )}
        </section>

        <p
          style={{
            marginTop: '2rem',
            fontSize: 12,
            color: '#64748b',
          }}
        >
          source · github.com/sungwookoo/nextjs-sample
        </p>
      </div>
    </main>
  );
}
