const crypto = require('crypto');

function hmac(data, secret) {
  return crypto.createHmac('sha256', secret).update(data).digest('base64');
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).end('Method Not Allowed');
    return;
  }

  // Read the raw form body
  const body = await new Promise((resolve) => {
    let data = '';
    req.on('data', chunk => { data += chunk; });
    req.on('end', () => resolve(data));
  });

  const params   = new URLSearchParams(body);
  const username = (params.get('username') || '').trim();
  const password = (params.get('password') || '').trim();

  if (!username || !password) {
    res.writeHead(302, { Location: '/login?error=1' });
    res.end();
    return;
  }

  let clients;
  try {
    clients = JSON.parse(process.env.CLIENTS || '{}');
  } catch {
    res.writeHead(302, { Location: '/login?error=1' });
    res.end();
    return;
  }

  const client = Object.values(clients).find(
    c => c.username === username && c.password === password
  );

  if (!client) {
    res.writeHead(302, { Location: '/login?error=1' });
    res.end();
    return;
  }

  const secret     = process.env.SECRET_KEY || 'change-me-in-vercel';
  const token      = hmac(username + ':' + password, secret);
  const cookieVal  = encodeURIComponent(username + '|' + token);

  res.writeHead(302, {
    'Set-Cookie': `ik12_session=${cookieVal}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=28800`,
    'Location': '/dashboard',
  });
  res.end();
};
