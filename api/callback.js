function siteOrigin() {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, '')
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return 'http://localhost:4321'
}

export default async function handler(req, res) {
  const code = req.query?.code
  const error = req.query?.error

  if (error || !code) {
    res.status(400).send(`Autorização cancelada ou inválida: ${error || 'sem code'}`)
    return
  }

  const clientId = process.env.GITHUB_CLIENT_ID
  const clientSecret = process.env.GITHUB_CLIENT_SECRET
  if (!clientId || !clientSecret) {
    res.status(500).send('GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET não configurados.')
    return
  }

  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: `${siteOrigin()}/api/callback`,
      }),
    })

    const tokenData = await tokenRes.json()
    if (tokenData.error || !tokenData.access_token) {
      res.status(400).send(`Erro OAuth: ${tokenData.error_description || tokenData.error || 'token ausente'}`)
      return
    }

    const content = JSON.stringify({
      token: tokenData.access_token,
      provider: 'github',
    })

    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.status(200).send(`<!doctype html><html><body><script>
      window.opener.postMessage('authorization:github:success:' + ${JSON.stringify(content)}, '*');
      window.close();
    </script></body></html>`)
  } catch (err) {
    res.status(500).send(`Erro ao trocar code por token: ${err.message}`)
  }
}
