/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standalone output emits a self-contained server.js that we can run
  // from a tiny runtime image — keeps the Docker image small.
  output: 'standalone',
  reactStrictMode: true,
};

module.exports = nextConfig;
