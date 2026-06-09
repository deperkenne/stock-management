import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NavigationBar,{type NavLink,type DropdownConfig} from './NavigationBar';
const mockLinks: NavLink[] = [
  { label: 'Orders', href: '#orders' },
  { label: 'About', href: '#about' },
];

const mockDropdowns: DropdownConfig[] = [
  {
    label: 'Admin',
    links: [{ label: 'Dashboard', href: '#dashboard' }],
  },
];

describe('NavigationBar Component', () => {

  // Desktop layout data injection
  it('should render logo, navigation links, and dropdowns on desktop view', () => {
    render(
      <NavigationBar
        logo={<span data-testid="test-logo">MyLogo</span>}
        navigationLinks={mockLinks}
        dropdowns={mockDropdowns}
        actions={<button>Login</button>}
      />
    );

    expect(screen.getByTestId('test-logo')).toBeInTheDocument();

    const ordersLink = screen.getByRole('link', { name: /orders/i });
    expect(ordersLink).toBeInTheDocument();
    expect(ordersLink).toHaveAttribute('href', '#orders');

    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  // Mobile state tracking (useState testing)
  it('should toggle the mobile menu visibility when clicking the hamburger button', async () => {
    render(
      <NavigationBar
        navigationLinks={mockLinks}
        dropdowns={mockDropdowns}
        mobileActions={<button>Mobile Login</button>}
      />
    );

    let mobileLoginBtn = screen.queryByRole('button', { name: /mobile login/i });
    expect(mobileLoginBtn).not.toBeInTheDocument();

    const hamburgerBtn = screen.getByRole('button', { name: /open main menu/i });
    expect(hamburgerBtn).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(hamburgerBtn);

    expect(hamburgerBtn).toHaveAttribute('aria-expanded', 'true');
    mobileLoginBtn = screen.getByRole('button', { name: /mobile login/i });
    expect(mobileLoginBtn).toBeInTheDocument();

    const adminLabels = screen.getAllByText('Admin');
    expect(adminLabels.length).toBeGreaterThan(0);

    await userEvent.click(hamburgerBtn);

    expect(hamburgerBtn).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('button', { name: /mobile login/i })).not.toBeInTheDocument();
  });

  // Fallback safety checks
  it('should fallback to default actions if mobileActions prop is omitted', async () => {
    render(
      <NavigationBar
        actions={<button>Shared Login</button>}
      />
    );

    const hamburgerBtn = screen.getByRole('button', { name: /open main menu/i });
    await userEvent.click(hamburgerBtn);

    const fallBackActions = screen.getAllByRole('button', { name: /shared login/i });
    expect(fallBackActions.length).toBeGreaterThan(0);
  });
});
