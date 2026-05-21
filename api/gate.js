const crypto = require('crypto');
const fs     = require('fs');
const path   = require('path');

function hmac(data, secret) {
  return crypto.createHmac('sha256', secret).update(data).digest('base64');
}

function parseCookie(header, name) {
  const entry = (header || '').split(';').map(s => s.trim()).find(s => s.startsWith(name + '='));
  return entry ? decodeURIComponent(entry.slice(name.length + 1)) : null;
}

module.exports = (req, res) => {
  const session = parseCookie(req.headers.cookie || '', 'ik12_session');

  if (!session) {
    res.writeHead(302, { Location: '/login' });
    res.end();
    return;
  }

  const pipeIdx = session.indexOf('|');
  if (pipeIdx === -1) {
    res.writeHead(302, { Location: '/login' });
    res.end();
    return;
  }

  const username = session.substring(0, pipeIdx);
  const token    = session.substring(pipeIdx + 1);

  let clients;
  try {
    clients = JSON.parse(process.env.CLIENTS || '{}');
  } catch {
    res.writeHead(302, { Location: '/login' });
    res.end();
    return;
  }

  const client = Object.values(clients).find(c => c.username === username);
  if (!client) {
    res.writeHead(302, { Location: '/login' });
    res.end();
    return;
  }

  const expected = hmac(username + ':' + client.password, process.env.SECRET_KEY || 'change-me-in-vercel');
  if (token !== expected) {
    res.writeHead(302, { Location: '/login' });
    res.end();
    return;
  }

  // Authenticated — serve index.html
  try {
    const html = fs.readFileSync(path.join(process.cwd(), 'index.html'), 'utf8');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(html);
  } catch {
    res.writeHead(500);
    res.end('Internal Server Error');
  }
};
