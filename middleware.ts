import { NextRequest, NextResponse } from 'next/server'
import { availableLanguageTags, sourceLanguageTag } from '@/paraglide/runtime'

const locales = availableLanguageTags
const defaultLocale = 'et' // Estonian as default

// Get locale from pathname
function getLocaleFromPathname(pathname: string): string | null {
  const segments = pathname.split('/')
  const maybeLocale = segments[1]
  if (locales.includes(maybeLocale as any)) {
    return maybeLocale
  }
  return null
}

// Get preferred locale from Accept-Language header
function getPreferredLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language')
  if (!acceptLanguage) return defaultLocale
  
  // Parse Accept-Language header
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [code, q = 'q=1'] = lang.trim().split(';')
      return {
        code: code.split('-')[0].toLowerCase(),
        quality: parseFloat(q.replace('q=', ''))
      }
    })
    .sort((a, b) => b.quality - a.quality)
  
  // Find first matching locale
  for (const { code } of languages) {
    if (locales.includes(code as any)) {
      return code
    }
  }
  
  return defaultLocale
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Skip static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // Static files
  ) {
    return NextResponse.next()
  }
  
  // Check if pathname has locale prefix
  const pathnameLocale = getLocaleFromPathname(pathname)
  
  if (pathnameLocale) {
    // Locale in URL - continue
    const response = NextResponse.next()
    // Set cookie for future requests
    response.cookies.set('NEXT_LOCALE', pathnameLocale, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: '/',
    })
    return response
  }
  
  // No locale in URL - redirect
  // Check cookie first, then Accept-Language
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
  const locale = cookieLocale && locales.includes(cookieLocale as any) 
    ? cookieLocale 
    : getPreferredLocale(request)
  
  // Redirect to localized URL
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  // Match all pathnames except static files
  matcher: [
    // Match all pathnames except:
    // - _next (Next.js internals)
    // - api (API routes)  
    // - Static files with extensions
    '/((?!_next|api|.*\\..*).*)',
  ],
}
