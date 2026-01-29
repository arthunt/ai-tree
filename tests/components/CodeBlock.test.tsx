import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CodeBlock } from '@/components/CodeBlock';

describe('CodeBlock', () => {
  const defaultProps = {
    code: 'const x = 1;\nconsole.log(x);',
    language: 'javascript' as const,
    explanation: 'A simple variable declaration',
  };

  it('renders code content', () => {
    render(<CodeBlock {...defaultProps} />);
    expect(screen.getByText('const x = 1;')).toBeInTheDocument();
    expect(screen.getByText('console.log(x);')).toBeInTheDocument();
  });

  it('shows language badge', () => {
    render(<CodeBlock {...defaultProps} />);
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
  });

  it('shows explanation when provided', () => {
    render(<CodeBlock {...defaultProps} />);
    expect(screen.getByText('A simple variable declaration')).toBeInTheDocument();
  });

  it('does not show explanation section when empty', () => {
    render(<CodeBlock {...defaultProps} explanation="" />);
    expect(screen.queryByText('explanation')).not.toBeInTheDocument();
  });

  it('shows copy button', () => {
    render(<CodeBlock {...defaultProps} />);
    expect(screen.getByText('copy')).toBeInTheDocument();
  });

  it('copies code to clipboard', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      writable: true,
      configurable: true,
    });

    render(<CodeBlock {...defaultProps} />);
    await user.click(screen.getByText('copy'));

    expect(writeText).toHaveBeenCalledWith('const x = 1;\nconsole.log(x);');
  });

  it('shows line numbers', () => {
    render(<CodeBlock {...defaultProps} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('supports Python language', () => {
    render(<CodeBlock code="print('hello')" language="python" explanation="" />);
    expect(screen.getByText('Python')).toBeInTheDocument();
  });

  it('supports TypeScript language', () => {
    render(<CodeBlock code="const x: number = 1;" language="typescript" explanation="" />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });
});
