/**
 * ParaglideJS i18n utilities for AI Tree
 * 
 * This file provides language utilities and re-exports from paraglide.
 * 
 * Usage in components:
 * ```tsx
 * import * as m from '@/paraglide/messages'
 * import { languageTag, setLanguageTag, availableLanguageTags } from '@/lib/paraglide'
 * 
 * // Get translation
 * <h1>{m.header_title()}</h1>
 * 
 * // Get current language
 * const lang = languageTag()
 * 
 * // Switch language
 * setLanguageTag('et')
 * ```
 */

// Re-export from paraglide runtime
export {
  languageTag,
  setLanguageTag,
  onSetLanguageTag,
  sourceLanguageTag,
  availableLanguageTags,
  isAvailableLanguageTag,
} from '@/paraglide/runtime'

// Type for available languages
export type AvailableLanguageTag = 'en' | 'et'

// Locale configuration
export const locales = ['en', 'et'] as const
export const defaultLocale = 'et' as const

// Helper to get locale from pathname
export function getLocaleFromPathname(pathname: string): AvailableLanguageTag {
  const segments = pathname.split('/')
  const locale = segments[1]
  if (locale === 'en' || locale === 'et') {
    return locale
  }
  return defaultLocale
}

// Helper to create localized pathname
export function createLocalizedPathname(pathname: string, locale: AvailableLanguageTag): string {
  const segments = pathname.split('/')
  // Check if first segment is a locale
  if (segments[1] === 'en' || segments[1] === 'et') {
    segments[1] = locale
    return segments.join('/')
  }
  // No locale prefix, add it
  return `/${locale}${pathname}`
}

// Language display names
export const languageNames: Record<AvailableLanguageTag, string> = {
  en: 'English',
  et: 'Eesti',
}

// Language display names (native)
export const languageNamesNative: Record<AvailableLanguageTag, string> = {
  en: 'English',
  et: 'Eesti keel',
}
