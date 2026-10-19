// Vercel Serverless Function: /api/scan
// Robust, production-grade VirusTotal v3 REST API Gateway

export default async function handler(req, res) {
  // 1. CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, x-apikey'
  );

  // Handle preflight OPTIONS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 2. Parse payload safely (Handles both JSON POST and GET query parameters)
  let payload = {};
  if (req.method === 'POST') {
    if (typeof req.body === 'string') {
      try {
        payload = JSON.parse(req.body);
      } catch (e) {
        payload = {};
      }
    } else if (req.body && typeof req.body === 'object') {
      payload = req.body;
    }
  } else {
    payload = req.query || {};
  }

  const query = (payload.query || payload.target || '').trim();
  const type = (payload.type || '').trim().toLowerCase();

  if (!query) {
    return res.status(400).json({
      error: 'Missing query parameter. Please provide a file hash, URL, domain, or IP.'
    });
  }

  // 3. Resolve API Key (Environment variable or request header fallback)
  const apiKey = process.env.VIRUSTOTAL_API_KEY || req.headers['x-apikey'] || '';

  if (!apiKey) {
    return res.status(503).json({
      error: 'VIRUSTOTAL_API_KEY_NOT_CONFIGURED',
      message: 'VirusTotal API key is not configured in Vercel Environment Variables. Please set VIRUSTOTAL_API_KEY in Vercel project settings.'
    });
  }

  const vtHeaders = {
    'x-apikey': apiKey,
    'Accept': 'application/json'
  };

  try {
    let vtEndpoint = '';

    // Auto-detect or use explicit type
    if (type === 'file' || type === 'hash' || /^[a-fA-F0-9]{32,64}$/.test(query)) {
      // SHA-256 / SHA-1 / MD5 file hash
      vtEndpoint = `https://www.virustotal.com/api/v3/files/${encodeURIComponent(query)}`;
    } else if (type === 'url' || query.startsWith('http://') || query.startsWith('https://')) {
      // VirusTotal v3 requires URL ID = Base64(url) without trailing '='
      const b64Url = Buffer.from(query).toString('base64').replace(/=+$/, '');
      vtEndpoint = `https://www.virustotal.com/api/v3/urls/${b64Url}`;
    } else if (type === 'ip' || /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(query)) {
      // IPv4
      vtEndpoint = `https://www.virustotal.com/api/v3/ip_addresses/${encodeURIComponent(query)}`;
    } else {
      // Domain lookup
      const cleanDomain = query.replace(/^https?:\/\//i, '').split('/')[0].split('?')[0];
      vtEndpoint = `https://www.virustotal.com/api/v3/domains/${encodeURIComponent(cleanDomain)}`;
    }

    const vtResponse = await fetch(vtEndpoint, {
      method: 'GET',
      headers: vtHeaders
    });

    if (vtResponse.status === 404) {
      return res.status(200).json({
        found: false,
        message: 'No previous analysis found in VirusTotal database for this item.',
        query: query
      });
    }

    if (vtResponse.status === 401 || vtResponse.status === 403) {
      return res.status(401).json({
        error: 'INVALID_API_KEY',
        message: 'The configured VirusTotal API key is invalid, inactive, or quota exceeded.'
      });
    }

    if (!vtResponse.ok) {
      const errText = await vtResponse.text();
      return res.status(vtResponse.status).json({
        error: `VirusTotal API responded with status ${vtResponse.status}`,
        details: errText
      });
    }

    const vtData = await vtResponse.json();

    return res.status(200).json({
      found: true,
      data: vtData.data
    });

  } catch (error) {
    return res.status(500).json({
      error: 'SERVER_GATEWAY_ERROR',
      message: 'Failed to communicate with upstream threat intelligence service.',
      details: error.message
    });
  }
}
