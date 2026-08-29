function siteOrigin() {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, '')
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return 'http://localhost:4321'
}

export default function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID
  if (!clientId) {
    res.status(500).json({ error: 'GITHUB_CLIENT_ID não configurado na Vercel.' })
    return
  }

  const redirectUri = `${siteOrigin()}/api/callback`
  const scope = 'repo,user'
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope,
  })

  res.writeHead(302, { Location: `https://github.com/login/oauth/authorize?${params}` })
  res.end()
}
