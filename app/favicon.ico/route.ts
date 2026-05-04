const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#0f172a" />
  <path d="M20 45V19h9.5c9 0 14.5 4.8 14.5 13s-5.5 13-14.5 13H20Zm8-6h1.3c4.9 0 8.4-2.3 8.4-7s-3.5-7-8.4-7H28v14Z" fill="#f8fafc"/>
  <circle cx="47" cy="19" r="7" fill="#22c55e"/>
</svg>
`.trim();

export async function GET() {
  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
