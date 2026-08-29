export const config = {
  matcher: '/admin/:path*',
}

export default function middleware(request) {
  const user = process.env.ADMIN_BASIC_USER
  const pass = process.env.ADMIN_BASIC_PASSWORD

  // Proteção opcional: só ativa se user e senha estiverem configurados na Vercel.
  if (!user || !pass) {
    return
  }

  const authHeader = request.headers.get('authorization')

  if (authHeader?.startsWith('Basic ')) {
    const encoded = authHeader.slice(6)
    let decoded = ''
    try {
      decoded = atob(encoded)
    } catch {
      decoded = ''
    }

    const separator = decoded.indexOf(':')
    if (separator !== -1) {
      const givenUser = decoded.slice(0, separator)
      const givenPass = decoded.slice(separator + 1)
      if (givenUser === user && givenPass === pass) {
        return
      }
    }
  }

  return new Response('Acesso restrito ao painel admin.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="EB2 em Foco Admin", charset="UTF-8"',
    },
  })
}
