export const config = {
  matcher: ['/((?!login\\.html|login|api/login|favicon-conv\\.png|_vercel).*)'],
};

export default async function middleware(request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const session = parseCookie(cookieHeader, 'ik12_session');

  if (!session) {
    return Response.redirect(new URL('/login', request.url));
  }

  const pipeIdx = session.indexOf('|');
  if (pipeIdx === -1) {
    return Response.redirect(new URL('/login', request.url));
  }

  const username = session.substring(0, pipeIdx);
  const token    = session.substring(pipeIdx + 1);

  let clients;
  try {
    clients = JSON.parse(process.env.CLIENTS || '{}');
  } catch {
    return Response.redirect(new URL('/login', request.url));
  }

  const client = Object.values(clients).find(c => c.username === username);
  if (!client) {
    return Response.redirect(new URL('/login', request.url));
  }

  const expected = await hmac(
    username + ':' + client.password,
    process.env.SECRET_KEY || 'change-me-in-vercel'
  );

  if (token !== expected) {
    return Response.redirect(new URL('/login', request.url));
  }
}

function parseCookie(header, name) {
  const entry = header.split(';').map(s => s.trim()).find(s => s.startsWith(name + '='));
  return entry ? decodeURIComponent(entry.slice(name.length + 1)) : null;
}

async function hmac(data, secret) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw', enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false, ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(data));
  return btoa(String.fromCharCode(...new Uint8Array(sig)));
}
