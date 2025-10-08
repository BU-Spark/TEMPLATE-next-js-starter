import { render, screen } from '@testing-library/react';
import { ModernStackDetails } from '../ModernStackDetails';

describe('ModernStackDetails', () => {
  it('renders without crashing', () => {
    render(<ModernStackDetails />);
    expect(screen.getByText(/This template utilizes a cutting-edge stack/i)).toBeInTheDocument();
  });

  describe('introductory content', () => {
    it('renders introductory paragraph', () => {
      render(<ModernStackDetails />);
      expect(
        screen.getByText(/This template utilizes a cutting-edge stack for building high-performance/i)
      ).toBeInTheDocument();
    });
  });

  describe('Next.js section', () => {
    it('renders Next.js heading with correct link', () => {
      render(<ModernStackDetails />);
      const nextLink = screen.getByRole('link', { name: /next\.js \(v15\+\)/i });
      expect(nextLink).toBeInTheDocument();
      expect(nextLink).toHaveAttribute('href', 'https://nextjs.org');
      expect(nextLink).toHaveAttribute('target', '_blank');
      expect(nextLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders all Next.js feature points', () => {
      render(<ModernStackDetails />);
      expect(screen.getByText(/React Framework: Server Components, App Router/i)).toBeInTheDocument();
      expect(screen.getByText(/Optimized for speed: Images, fonts, scripts/i)).toBeInTheDocument();
      expect(screen.getByText(/Industry standard for full-stack React/i)).toBeInTheDocument();
    });
  });

  describe('React section', () => {
    it('renders React heading with correct link', () => {
      render(<ModernStackDetails />);
      const reactLink = screen.getByRole('link', { name: /^react \(v19\+\)$/i });
      expect(reactLink).toBeInTheDocument();
      expect(reactLink).toHaveAttribute('href', 'https://react.dev');
      expect(reactLink).toHaveAttribute('target', '_blank');
      expect(reactLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders React feature points with nested links', () => {
      render(<ModernStackDetails />);
      expect(screen.getByText(/Latest features:/i)).toBeInTheDocument();
      
      const actionsLink = screen.getByRole('link', { name: /actions/i });
      expect(actionsLink).toHaveAttribute('href', 'https://react.dev/reference/rsc/server-functions');
      
      const useOptimisticLink = screen.getByRole('link', { name: /useOptimistic/i });
      expect(useOptimisticLink).toHaveAttribute('href', 'https://react.dev/reference/react/useOptimistic');
      
      expect(screen.getByText(/Component architecture: Promotes reusability/i)).toBeInTheDocument();
      expect(screen.getByText(/Leading UI library: Evolving, vast ecosystem/i)).toBeInTheDocument();
    });
  });

  describe('TypeScript section', () => {
    it('renders TypeScript heading with correct link', () => {
      render(<ModernStackDetails />);
      const tsLink = screen.getByRole('link', { name: /^typescript$/i });
      expect(tsLink).toBeInTheDocument();
      expect(tsLink).toHaveAttribute('href', 'https://www.typescriptlang.org/');
      expect(tsLink).toHaveAttribute('target', '_blank');
      expect(tsLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders all TypeScript feature points', () => {
      render(<ModernStackDetails />);
      expect(screen.getByText(/Typed JavaScript: Catches errors early/i)).toBeInTheDocument();
      expect(screen.getByText(/Improves readability & maintainability/i)).toBeInTheDocument();
      expect(screen.getByText(/Standard for larger JS projects/i)).toBeInTheDocument();
    });
  });

  describe('structure and accessibility', () => {
    it('renders all main sections in correct order', () => {
      render(<ModernStackDetails />);
      const headings = screen.getAllByRole('heading', { level: 4 });
      expect(headings.length).toBeGreaterThanOrEqual(3);
      expect(headings[0]).toHaveTextContent(/Next\.js/i);
      expect(headings[1]).toHaveTextContent(/React/i);
      expect(headings[2]).toHaveTextContent(/TypeScript/i);
    });

    it('renders all lists with proper structure', () => {
      render(<ModernStackDetails />);
      const lists = screen.getAllByRole('list');
      expect(lists).toHaveLength(3);
      lists.forEach(list => {
        expect(list.querySelectorAll('li').length).toBeGreaterThan(0);
      });
    });

    it('all external links open in new tab with security attributes', () => {
      render(<ModernStackDetails />);
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });

    it('renders the correct number of external links', () => {
      render(<ModernStackDetails />);
      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe('content accuracy', () => {
    it('mentions Server Components', () => {
      render(<ModernStackDetails />);
      expect(screen.getByText(/Server Components/i)).toBeInTheDocument();
    });

    it('mentions App Router', () => {
      render(<ModernStackDetails />);
      expect(screen.getByText(/App Router/i)).toBeInTheDocument();
    });

    it('mentions type safety', () => {
      render(<ModernStackDetails />);
      expect(screen.getByText(/type-safe|Typed JavaScript/i)).toBeInTheDocument();
    });

    it('mentions Core Web Vitals', () => {
      render(<ModernStackDetails />);
      expect(screen.getByText(/Core Web Vitals/i)).toBeInTheDocument();
    });
  });
});