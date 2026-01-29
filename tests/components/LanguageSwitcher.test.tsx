import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

// Mock useRouter
const mockReplace = vi.fn();
vi.mock('next/navigation', () => ({
  useParams: () => ({ locale: 'en' }),
  usePathname: () => '/en',
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    mockReplace.mockClear();
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
    expect(mockReplace).toHaveBeenCalledWith('/et', { scroll: false });
  });

  it('does not switch to same locale', async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher />);

    await user.click(screen.getByText('EN'));
    expect(mockReplace).not.toHaveBeenCalled();
  });
});
