import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button Component', () => {

  it('should correctly render the children text', () => {
    render(<Button>Cliquez ici</Button>);

    const buttonElement = screen.getByRole('button', { name: /cliquez ici/i });
    expect(buttonElement).toBeInTheDocument();
  });

  // Native HTML attributes
  it('should apply "button" type by default and accept "submit" type', () => {
    const { rerender } = render(<Button>Bouton</Button>);
    let buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveAttribute('type', 'button');

    // Re-render the component with a different type attribute
    rerender(<Button type="submit">Bouton</Button>);
    expect(buttonElement).toHaveAttribute('type', 'submit');
  });

  it('should be disabled when the disabled prop is true', () => {
    render(<Button disabled>Désactivé</Button>);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeDisabled();
  });

  // User interaction
  it('should trigger the onClick callback function when clicked', async () => {
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Action</Button>);

    const buttonElement = screen.getByRole('button');
    await userEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Class name management (Tailwind + cn utility)
  it('should merge and override CSS classes via cn()', () => {
    render(<Button className="bg-red-600 w-full">Bouton Rouge</Button>);

    const buttonElement = screen.getByRole('button');

    expect(buttonElement).toHaveClass('bg-red-600');
    expect(buttonElement).toHaveClass('w-full');
    expect(buttonElement).not.toHaveClass('bg-indigo-600');
  });
});
