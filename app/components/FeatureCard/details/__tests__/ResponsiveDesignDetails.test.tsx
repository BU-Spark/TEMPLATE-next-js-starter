import { render, screen } from '@testing-library/react';
import { ResponsiveDesignDetails } from '../ResponsiveDesignDetails';

describe('ResponsiveDesignDetails', () => {
  it('renders without crashing', () => {
    render(<ResponsiveDesignDetails />);
    expect(screen.getByText(/Ensuring your application looks and functions flawlessly/i)).toBeInTheDocument();
  });

  describe('introductory content', () => {
    it('renders introductory paragraph with full content', () => {
      render(<ResponsiveDesignDetails />);
      expect(
        screen.getByText(/Ensuring your application looks and functions flawlessly across all device sizes/i)
      ).toBeInTheDocument();
    });

    it('mentions different device types in intro', () => {
      render(<ResponsiveDesignDetails />);
      expect(screen.getByText(/desktops, tablets, and mobiles/i)).toBeInTheDocument();
    });
  });

  describe('Core Principles section', () => {
    it('renders Core Principles heading with correct link', () => {
      render(<ResponsiveDesignDetails />);
      const principlesLink = screen.getByRole('link', { name: /core principles of rwd/i });
      expect(principlesLink).toBeInTheDocument();
      expect(principlesLink).toHaveAttribute(
        'href',
        'https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Responsive/Responsive_design_building_blocks'
      );
      expect(principlesLink).toHaveAttribute('target', '_blank');
      expect(principlesLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders all core principles', () => {
      render(<ResponsiveDesignDetails />);
      expect(screen.getByText(/Fluid Grids: Relative units for layout widths/i)).toBeInTheDocument();
      expect(screen.getByText(/Flexible Images\/Media: Scale within containers/i)).toBeInTheDocument();
      expect(screen.getByText(/Media Queries: CSS rules based on device characteristics/i)).toBeInTheDocument();
    });

    it('mentions specific units in fluid grids', () => {
      render(<ResponsiveDesignDetails />);
      expect(screen.getByText(/%, vw/i)).toBeInTheDocument();
    });

    it('mentions viewport and orientation in media queries', () => {
      render(<ResponsiveDesignDetails />);
      expect(screen.getByText(/viewport, orientation/i)).toBeInTheDocument();
    });
  });

  describe('Benefits section', () => {
    it('renders Benefits heading', () => {
      render(<ResponsiveDesignDetails />);
      expect(screen.getByText('Benefits of Responsive Design')).toBeInTheDocument();
    });

    it('renders all benefits', () => {
      render(<ResponsiveDesignDetails />);
      expect(screen.getByText(/Better UX: Consistent experience across devices/i)).toBeInTheDocument();
      expect(screen.getByText(/Improved SEO: Google favors mobile-friendly sites/i)).toBeInTheDocument();
      expect(screen.getByText(/Wider Reach & Accessibility: Accessible on all devices/i)).toBeInTheDocument();
    });

    it('mentions user satisfaction', () => {
      render(<ResponsiveDesignDetails />);
      expect(screen.getByText(/higher satisfaction/i)).toBeInTheDocument();
    });

    it('mentions SEO benefits with Google', () => {
      render(<ResponsiveDesignDetails />);
      expect(screen.getByText(/Google favors mobile-friendly/i)).toBeInTheDocument();
    });
  });

  describe('Testing section', () => {
    it('renders Testing heading', () => {
      render(<ResponsiveDesignDetails />);
      expect(screen.getByText('Testing Responsive Design')).toBeInTheDocument();
    });

    it('renders all testing methods', () => {
      render(<ResponsiveDesignDetails />);
      expect(screen.getByText(/Browser DevTools: Simulate various screen sizes/i)).toBeInTheDocument();
      expect(screen.getByText(/Real Device Testing: Catch emulator-missed issues/i)).toBeInTheDocument();
      expect(screen.getByText(/Test Orientations: Portrait and landscape modes/i)).toBeInTheDocument();
    });

    it('mentions simulating screen sizes and resolutions', () => {
      render(<ResponsiveDesignDetails />);
      expect(screen.getByText(/screen sizes\/resolutions/i)).toBeInTheDocument();
    });

    it('mentions portrait and landscape orientations', () => {
      render(<ResponsiveDesignDetails />);
      expect(screen.getByText(/Portrait and landscape/i)).toBeInTheDocument();
    });
  });

  describe('structure and accessibility', () => {
    it('renders all sections in correct order', () => {
      render(<ResponsiveDesignDetails />);
      const headings = screen.getAllByRole('heading', { level: 4 });
      expect(headings).toHaveLength(3);
      expect(headings[0]).toHaveTextContent(/Core Principles/i);
      expect(headings[1]).toHaveTextContent(/Benefits/i);
      expect(headings[2]).toHaveTextContent(/Testing/i);
    });

    it('renders all lists with proper structure', () => {
      render(<ResponsiveDesignDetails />);
      const lists = screen.getAllByRole('list');
      expect(lists).toHaveLength(3);
      lists.forEach(list => {
        const items = list.querySelectorAll('li');
        expect(items.length).toBeGreaterThanOrEqual(3);
      });
    });

    it('external link has proper security attributes', () => {
      render(<ResponsiveDesignDetails />);
      const link = screen.getByRole('link', { name: /core principles/i });
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('content emphasis', () => {
    it('emphasizes user experience', () => {
      render(<ResponsiveDesignDetails />);
      expect(screen.getByText(/user experience and accessibility/i)).toBeInTheDocument();
    });

    it('emphasizes cross-device compatibility', () => {
      render(<ResponsiveDesignDetails />);
      expect(screen.getByText(/across all device sizes/i)).toBeInTheDocument();
    });

    it('uses strong tags for emphasis', () => {
      const { container } = render(<ResponsiveDesignDetails />);
      const strongTags = container.querySelectorAll('strong');
      expect(strongTags.length).toBeGreaterThan(0);
    });
  });
});