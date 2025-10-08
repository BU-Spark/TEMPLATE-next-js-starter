import { render, screen } from '@testing-library/react';
import { StylingFreedomDetails } from '../StylingFreedomDetails';

describe('StylingFreedomDetails', () => {
  it('renders without crashing', () => {
    render(<StylingFreedomDetails />);
    expect(screen.getByText(/This template does not impose a specific styling library/i)).toBeInTheDocument();
  });

  describe('introductory content', () => {
    it('renders introductory paragraph about flexibility', () => {
      render(<StylingFreedomDetails />);
      expect(
        screen.getByText(/This template does not impose a specific styling library, giving you flexibility/i)
      ).toBeInTheDocument();
    });

    it('mentions CSS Modules with link', () => {
      render(<StylingFreedomDetails />);
      const cssModulesLink = screen.getByRole('link', { name: /css modules/i });
      expect(cssModulesLink).toBeInTheDocument();
      expect(cssModulesLink).toHaveAttribute(
        'href',
        'https://nextjs.org/docs/app/building-your-application/styling/css-modules'
      );
    });

    it('explains CSS Modules usage', () => {
      render(<StylingFreedomDetails />);
      expect(screen.getByText(/used for base components as a lightweight example/i)).toBeInTheDocument();
    });
  });

  describe('Popular Choices section', () => {
    it('renders Popular Choices heading', () => {
      render(<StylingFreedomDetails />);
      expect(screen.getByText('Popular Choices:')).toBeInTheDocument();
    });

    it('lists Tailwind CSS with correct link', () => {
      render(<StylingFreedomDetails />);
      const tailwindLink = screen.getByRole('link', { name: /tailwind css/i });
      expect(tailwindLink).toBeInTheDocument();
      expect(tailwindLink).toHaveAttribute('href', 'https://tailwindcss.com');
    });

    it('lists Emotion with correct link', () => {
      render(<StylingFreedomDetails />);
      const emotionLink = screen.getByRole('link', { name: /emotion/i });
      expect(emotionLink).toBeInTheDocument();
      expect(emotionLink).toHaveAttribute('href', 'https://emotion.sh');
    });

    it('lists Styled Components with correct link', () => {
      render(<StylingFreedomDetails />);
      const styledLink = screen.getByRole('link', { name: /styled components/i });
      expect(styledLink).toBeInTheDocument();
      expect(styledLink).toHaveAttribute('href', 'https://styled-components.com');
    });
  });

  describe('Component Libraries section', () => {
    it('renders Component Libraries heading', () => {
      render(<StylingFreedomDetails />);
      expect(screen.getByText('Component Libraries:')).toBeInTheDocument();
    });

    it('lists Material UI with correct link and description', () => {
      render(<StylingFreedomDetails />);
      const muiLink = screen.getByRole('link', { name: /material ui/i });
      expect(muiLink).toBeInTheDocument();
      expect(muiLink).toHaveAttribute('href', 'https://mui.com');
      expect(screen.getByText(/Google's own component library/i)).toBeInTheDocument();
    });

    it('lists Chakra UI with correct link', () => {
      render(<StylingFreedomDetails />);
      const chakraLink = screen.getByRole('link', { name: /chakra ui/i });
      expect(chakraLink).toBeInTheDocument();
      expect(chakraLink).toHaveAttribute('href', 'https://chakra-ui.com');
    });

    it('lists Mantine with correct link', () => {
      render(<StylingFreedomDetails />);
      const mantineLink = screen.getByRole('link', { name: /mantine/i });
      expect(mantineLink).toBeInTheDocument();
      expect(mantineLink).toHaveAttribute('href', 'https://mantine.dev');
    });

    it('lists Radix UI with correct link and description', () => {
      render(<StylingFreedomDetails />);
      const radixLink = screen.getByRole('link', { name: /radix ui/i });
      expect(radixLink).toBeInTheDocument();
      expect(radixLink).toHaveAttribute('href', 'https://radix-ui.com');
      expect(screen.getByText(/Primitives/i)).toBeInTheDocument();
    });

    it('lists Ant Design with correct link and description', () => {
      render(<StylingFreedomDetails />);
      const antLink = screen.getByRole('link', { name: /ant design/i });
      expect(antLink).toBeInTheDocument();
      expect(antLink).toHaveAttribute('href', 'https://ant.design/');
      expect(screen.getByText(/Alibaba's affiliate component library/i)).toBeInTheDocument();
    });

    it('lists shadcn/ui with correct link and description', () => {
      render(<StylingFreedomDetails />);
      const shadcnLink = screen.getByRole('link', { name: /shadcn\/ui/i });
      expect(shadcnLink).toBeInTheDocument();
      expect(shadcnLink).toHaveAttribute('href', 'https://ui.shadcn.com');
      expect(screen.getByText(/Built with Radix primitives \+ Tailwind/i)).toBeInTheDocument();
    });
  });

  describe('structure and accessibility', () => {
    it('renders correct number of sections', () => {
      render(<StylingFreedomDetails />);
      const headings = screen.getAllByRole('heading', { level: 4 });
      expect(headings).toHaveLength(2);
      expect(headings[0]).toHaveTextContent(/Popular Choices/i);
      expect(headings[1]).toHaveTextContent(/Component Libraries/i);
    });

    it('renders two lists with proper structure', () => {
      render(<StylingFreedomDetails />);
      const lists = screen.getAllByRole('list');
      expect(lists).toHaveLength(2);
    });

    it('Popular Choices list has correct number of items', () => {
      render(<StylingFreedomDetails />);
      const lists = screen.getAllByRole('list');
      const popularChoicesList = lists[0];
      const items = popularChoicesList.querySelectorAll('li');
      expect(items).toHaveLength(3);
    });

    it('Component Libraries list has correct number of items', () => {
      render(<StylingFreedomDetails />);
      const lists = screen.getAllByRole('list');
      const componentLibsList = lists[1];
      const items = componentLibsList.querySelectorAll('li');
      expect(items).toHaveLength(6);
    });

    it('all external links open in new tab with security attributes', () => {
      render(<StylingFreedomDetails />);
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });

    it('renders expected total number of links', () => {
      render(<StylingFreedomDetails />);
      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(10);
    });
  });

  describe('content organization', () => {
    it('separates styling approaches from component libraries', () => {
      render(<StylingFreedomDetails />);
      expect(screen.getByText('Popular Choices:')).toBeInTheDocument();
      expect(screen.getByText('Component Libraries:')).toBeInTheDocument();
    });

    it('includes major CSS-in-JS solutions', () => {
      render(<StylingFreedomDetails />);
      expect(screen.getByRole('link', { name: /emotion/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /styled components/i })).toBeInTheDocument();
    });

    it('includes utility-first frameworks', () => {
      render(<StylingFreedomDetails />);
      expect(screen.getByRole('link', { name: /tailwind/i })).toBeInTheDocument();
    });

    it('includes comprehensive UI libraries', () => {
      render(<StylingFreedomDetails />);
      expect(screen.getByRole('link', { name: /material ui/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /chakra ui/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /ant design/i })).toBeInTheDocument();
    });

    it('includes headless/primitive libraries', () => {
      render(<StylingFreedomDetails />);
      expect(screen.getByRole('link', { name: /radix ui/i })).toBeInTheDocument();
    });
  });

  describe('special characters and formatting', () => {
    it('handles apostrophes in text correctly', () => {
      render(<StylingFreedomDetails />);
      expect(screen.getByText(/Google's own/i)).toBeInTheDocument();
      expect(screen.getByText(/Alibaba's affiliate/i)).toBeInTheDocument();
    });

    it('handles forward slashes in library names', () => {
      render(<StylingFreedomDetails />);
      expect(screen.getByRole('link', { name: /shadcn\/ui/i })).toBeInTheDocument();
    });

    it('uses strong tags for library names', () => {
      const { container } = render(<StylingFreedomDetails />);
      const strongTags = container.querySelectorAll('strong');
      expect(strongTags.length).toBeGreaterThan(0);
    });
  });
});