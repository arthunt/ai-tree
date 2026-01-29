import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WelcomeModal } from '@/components/WelcomeModal';

describe('WelcomeModal', () => {
  const onClose = vi.fn();

  beforeEach(() => {
    onClose.mockClear();
  });

  it('renders when open', () => {
    render(<WelcomeModal isOpen={true} onClose={onClose} />);
    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getByText('subtitle')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<WelcomeModal isOpen={false} onClose={onClose} />);
    expect(screen.queryByText('title')).not.toBeInTheDocument();
  });

  it('shows step 1 content by default', () => {
    render(<WelcomeModal isOpen={true} onClose={onClose} />);
    expect(screen.getByText('step1Title')).toBeInTheDocument();
    expect(screen.getByText('step1Item1')).toBeInTheDocument();
  });

  it('navigates to next step', async () => {
    const user = userEvent.setup();
    render(<WelcomeModal isOpen={true} onClose={onClose} />);

    await user.click(screen.getByText('next'));
    expect(screen.getByText('step2Title')).toBeInTheDocument();
  });

  it('navigates back', async () => {
    const user = userEvent.setup();
    render(<WelcomeModal isOpen={true} onClose={onClose} />);

    // Go to step 2
    await user.click(screen.getByText('next'));
    expect(screen.getByText('step2Title')).toBeInTheDocument();

    // Go back to step 1
    await user.click(screen.getByText('back'));
    expect(screen.getByText('step1Title')).toBeInTheDocument();
  });

  it('shows Get Started on last step', async () => {
    const user = userEvent.setup();
    render(<WelcomeModal isOpen={true} onClose={onClose} />);

    await user.click(screen.getByText('next')); // step 2
    await user.click(screen.getByText('next')); // step 3
    expect(screen.getByText('getStarted')).toBeInTheDocument();
  });

  it('calls onClose when Get Started is clicked', async () => {
    const user = userEvent.setup();
    render(<WelcomeModal isOpen={true} onClose={onClose} />);

    await user.click(screen.getByText('next')); // step 2
    await user.click(screen.getByText('next')); // step 3
    await user.click(screen.getByText('getStarted'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Skip is clicked', async () => {
    const user = userEvent.setup();
    render(<WelcomeModal isOpen={true} onClose={onClose} />);

    await user.click(screen.getByText('skip'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when X button is clicked', async () => {
    const user = userEvent.setup();
    render(<WelcomeModal isOpen={true} onClose={onClose} />);

    const closeButton = screen.getByLabelText('close');
    await user.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('has 3 progress dots', () => {
    render(<WelcomeModal isOpen={true} onClose={onClose} />);
    const dots = screen.getAllByLabelText('stepOf');
    expect(dots).toHaveLength(3);
  });
});
