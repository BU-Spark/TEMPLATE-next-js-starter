import { render, screen } from '@testing-library/react';
import { DevToolsDetails } from '../DevToolsDetails';

describe('DevToolsDetails', () => {
  it('renders without crashing', () => {
    render(<DevToolsDetails />);
    expect(screen.getByText('ESLint')).toBeInTheDocument();
  });

  describe('ESLint section', () => {
    it('renders ESLint heading with correct link', () => {
      render(<DevToolsDetails />);
      const eslintLink = screen.getByRole('link', { name: /eslint/i });
      expect(eslintLink).toBeInTheDocument();
      expect(eslintLink).toHaveAttribute('href', 'https://eslint.org');
      expect(eslintLink).toHaveAttribute('target', '_blank');
      expect(eslintLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders all ESLint feature points', () => {
      render(<DevToolsDetails />);
      expect(screen.getByText(/Identifies & fixes code patterns/i)).toBeInTheDocument();
      expect(screen.getByText(/Configurable, plugins, instant editor feedback/i)).toBeInTheDocument();
      expect(screen.getByText(/Maintains large codebases/i)).toBeInTheDocument();
    });
  });

  describe('Prettier section', () => {
    it('renders Prettier heading with correct link', () => {
      render(<DevToolsDetails />);
      const prettierLink = screen.getByRole('link', { name: /prettier/i });
      expect(prettierLink).toBeInTheDocument();
      expect(prettierLink).toHaveAttribute('href', 'https://prettier.io');
      expect(prettierLink).toHaveAttribute('target', '_blank');
      expect(prettierLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders all Prettier feature points', () => {
      render(<DevToolsDetails />);
      expect(screen.getByText(/Auto-formats code for consistent style/i)).toBeInTheDocument();
      expect(screen.getByText(/Opinionated \(minimal setup\)/i)).toBeInTheDocument();
      expect(screen.getByText(/Saves time, ends style debates/i)).toBeInTheDocument();
    });
  });

  describe('Husky section', () => {
    it('renders Husky heading with correct link', () => {
      render(<DevToolsDetails />);
      const huskyLink = screen.getByRole('link', { name: /husky/i });
      expect(huskyLink).toBeInTheDocument();
      expect(huskyLink).toHaveAttribute('href', 'https://typicode.github.io/husky');
      expect(huskyLink).toHaveAttribute('target', '_blank');
      expect(huskyLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders all Husky feature points', () => {
      render(<DevToolsDetails />);
      expect(screen.getByText(/Manages Git hooks to run scripts/i)).toBeInTheDocument();
      expect(screen.getByText(/Simplifies hook setup/i)).toBeInTheDocument();
      expect(screen.getByText(/Automates pre-commit\/push quality gates/i)).toBeInTheDocument();
    });
  });

  describe('Jest section', () => {
    it('renders Jest heading with correct link', () => {
      render(<DevToolsDetails />);
      const jestLink = screen.getByRole('link', { name: /^jest$/i });
      expect(jestLink).toBeInTheDocument();
      expect(jestLink).toHaveAttribute('href', 'https://jestjs.io');
      expect(jestLink).toHaveAttribute('target', '_blank');
      expect(jestLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders all Jest feature points', () => {
      render(<DevToolsDetails />);
      expect(screen.getByText(/JavaScript testing framework/i)).toBeInTheDocument();
      expect(screen.getByText(/Fast, all-in-one/i)).toBeInTheDocument();
      expect(screen.getByText(/Widely used for JS\/React testing/i)).toBeInTheDocument();
    });
  });

  describe('React Testing Library section', () => {
    it('renders React Testing Library heading with correct link', () => {
      render(<DevToolsDetails />);
      const rtlLink = screen.getByRole('link', { name: /react testing library/i });
      expect(rtlLink).toBeInTheDocument();
      expect(rtlLink).toHaveAttribute('href', 'https://testing-library.com/docs/react-testing-library/intro');
      expect(rtlLink).toHaveAttribute('target', '_blank');
      expect(rtlLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders all React Testing Library feature points', () => {
      render(<DevToolsDetails />);
      expect(screen.getByText(/Tests React components via user interactions/i)).toBeInTheDocument();
      expect(screen.getByText(/Encourages maintainable, user-centric tests/i)).toBeInTheDocument();
      expect(screen.getByText(/Popular for React component testing/i)).toBeInTheDocument();
    });
  });

  describe('structure and accessibility', () => {
    it('renders all sections in correct order', () => {
      render(<DevToolsDetails />);
      const headings = screen.getAllByRole('heading', { level: 4 });
      expect(headings).toHaveLength(5);
      expect(headings[0]).toHaveTextContent('ESLint');
      expect(headings[1]).toHaveTextContent('Prettier');
      expect(headings[2]).toHaveTextContent('Husky');
      expect(headings[3]).toHaveTextContent('Jest');
      expect(headings[4]).toHaveTextContent('React Testing Library');
    });

    it('renders all lists with proper structure', () => {
      render(<DevToolsDetails />);
      const lists = screen.getAllByRole('list');
      expect(lists).toHaveLength(5);
      lists.forEach(list => {
        expect(list.querySelectorAll('li').length).toBeGreaterThan(0);
      });
    });

    it('all external links open in new tab with security attributes', () => {
      render(<DevToolsDetails />);
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });
  });
});