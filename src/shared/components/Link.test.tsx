import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Link from './Link';

describe('Link Component', () => {

  it('should correctly render the children text', () => {
    render(<Link href="#home">Home</Link>);

    const linkElement = screen.getByRole('link', { name: /home/i });
    expect(linkElement).toBeInTheDocument();
  });

  // URL attribute validation (href)
  it('should correctly apply the href attribute', () => {
    render(<Link href="https://google.com">Google</Link>);

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', 'https://google.com');
  });

  // Forwarding of native anchor attributes (target, rel...)
  it('should forward native attributes like target and rel', () => {
    render(
      <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
        GitHub
      </Link>
    );

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('target', '_blank');
    expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
  });

  // User interaction simulation (click event)
  it('should trigger the onClick callback function when clicked', async () => {
    const handleClick = jest.fn();

    render(<Link href="#action" onClick={handleClick}>Click me</Link>);

    const linkElement = screen.getByRole('link');
    await userEvent.click(linkElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Intelligent CSS class merging (via cn utility)
  it('should merge default styles and accept custom overrides', () => {
    render(<Link href="#test" className="bg-red-600 mt-4">Red Link</Link>);

    const linkElement = screen.getByRole('link');

    expect(linkElement).toHaveClass('bg-red-600');
    expect(linkElement).toHaveClass('mt-4');
    expect(linkElement).toHaveClass('px-3');
  });
});
