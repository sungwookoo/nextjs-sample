# nextjs-sample

Tiny Next.js (App Router) app that ships with both:

- a server-rendered landing page (`app/page.tsx`)
- an API route (`app/api/hello/route.ts`)

It's used to self-test the swkoo.kr PaaS Phase 1 onboarding flow
([`docs/onboarding-friend.md`](https://github.com/sungwookoo/swkoo-portfolio/blob/main/docs/onboarding-friend.md)).
Pushes to `main` build a `linux/arm64` image and push it to GHCR
(`ghcr.io/sungwookoo/nextjs-sample:latest`); swkoo.kr's k3s cluster
then deploys it under `*.apps.swkoo.kr`.

## Local dev

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Build the image locally (optional)

```bash
docker build -t nextjs-sample:dev .
docker run --rm -p 3000:3000 nextjs-sample:dev
```
