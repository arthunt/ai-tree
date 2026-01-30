import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock translation function factory (shared by next-intl and paraglide mocks)
const createMockTranslations = () => {
  return (key: string, params?: Record<string, string | number>) => {
    if (params) {
      let result = key;
      for (const [k, v] of Object.entries(params)) {
        result = result.replace(`{${k}}`, String(v));
      }
      return result;
    }
    return key;
  };
};

// Mock next-intl (still used by layout.tsx and i18n.ts)
vi.mock('next-intl', () => ({
  useTranslations: () => createMockTranslations(),
}));

// Mock ParaglideJS translations hook (used by all migrated components)
vi.mock('@/hooks/useParaglideTranslations', () => ({
  useParaglideTranslations: () => createMockTranslations(),
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useParams: () => ({ locale: 'en' }),
  usePathname: () => '/en',
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
}));

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    motion: new Proxy(
      {},
      {
        get: (_target, prop) => {
          if (typeof prop === 'string') {
            // Return a forwardRef component for all motion.* elements
            return ({ children, ...props }: Record<string, unknown>) => {
              const tag = prop as string;
              // Filter out motion-specific props
              const filtered: Record<string, unknown> = {};
              for (const [key, val] of Object.entries(props)) {
                if (
                  !key.startsWith('drag') &&
                  !key.startsWith('layout') &&
                  !key.startsWith('while') &&
                  !['initial', 'animate', 'exit', 'transition', 'variants', 'onDragEnd', 'onDragStart'].includes(key)
                ) {
                  filtered[key] = val;
                }
              }
              const { createElement } = require('react');
              return createElement(tag, filtered, children as React.ReactNode);
            };
          }
          return undefined;
        },
      }
    ),
    useMotionValue: () => ({ set: vi.fn(), get: () => 0 }),
  };
});

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });
Object.defineProperty(window, 'sessionStorage', { value: localStorageMock });

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
Object.defineProperty(window, 'IntersectionObserver', {
  value: MockIntersectionObserver,
});

// Mock scrollIntoView
Element.prototype.scrollIntoView = vi.fn();

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
