import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

// Mock paraglide runtime
vi.mock('@/paraglide/runtime', () => ({
  languageTag: () => 'en',
  setLanguageTag: vi.fn(),
}));

// Mock paraglide messages
vi.mock('@/paraglide/messages', () => ({
  navigation_switchToEstonian: () => 'Switch to Estonian',
  navigation_switchToEnglish: () => 'Switch to English',
}));

// Mock useRouter
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useParams: () => ({ locale: 'en' }),
  usePathname: () => '/en',
  useRouter: () => ({
    push: mockPush,
    replace: vi.fn(),
  }),
}));

// Mock LanguageContext
const mockSetLocale = vi.fn();
vi.mock('@/context/LanguageContext', () => ({
  useLanguage: () => ({
    locale: 'en',
    setLocale: mockSetLocale,
    availableLocales: ['en', 'et'],
  }),
  LanguageProvider: ({ children }: { children: React.ReactNode }) => children,
}));

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    mockSetLocale.mockClear();
    mockPush.mockClear();
  });

  it('renders language buttons', () => {
    render(<LanguageSwitcher />);
    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.getByText('ET')).toBeInTheDocument();
  });

  it('marks current locale as active', () => {
    render(<LanguageSwitcher />);
    const enButton = screen.getByText('EN').closest('button');
    expect(enButton).toHaveAttribute('aria-current', 'true');
  });

  it('switches language on click', async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher />);

    await user.click(screen.getByText('ET'));
    expect(mockSetLocale).toHaveBeenCalledWith('et');
  });

  it('does not switch to same locale', async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher />);

    await user.click(screen.getByText('EN'));
    expect(mockSetLocale).not.toHaveBeenCalled();
  });
});
