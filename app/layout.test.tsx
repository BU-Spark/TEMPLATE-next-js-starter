import { render, screen } from '@testing-library/react';
import RootLayout, { metadata } from './layout';

describe('RootLayout', () => {
  const mockChildren = <div data-testid="mock-child">Test Content</div>;

  beforeEach(() => {
    // Suppress console errors from ErrorBoundary during expected error tests
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('rendering', () => {
    it('renders without crashing', () => {
      render(<RootLayout>{mockChildren}</RootLayout>);
      expect(screen.getByTestId('mock-child')).toBeInTheDocument();
    });

    it('renders children inside the layout', () => {
      render(<RootLayout>{mockChildren}</RootLayout>);
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('wraps children in ErrorBoundary', () => {
      const { container } = render(<RootLayout>{mockChildren}</RootLayout>);
      // ErrorBoundary should be present (we can check by verifying children render normally)
      expect(screen.getByTestId('mock-child')).toBeInTheDocument();
    });

    it('renders children within main-content-container', () => {
      const { container } = render(<RootLayout>{mockChildren}</RootLayout>);
      const mainContentContainer = container.querySelector('.main-content-container');
      expect(mainContentContainer).toBeInTheDocument();
      expect(mainContentContainer).toContainElement(screen.getByTestId('mock-child'));
    });
  });

  describe('HTML structure', () => {
    it('renders html element with lang attribute', () => {
      const { container } = render(<RootLayout>{mockChildren}</RootLayout>);
      const htmlElement = container.querySelector('html');
      expect(htmlElement).toBeInTheDocument();
      expect(htmlElement).toHaveAttribute('lang', 'en');
    });

    it('applies Outfit font variable class to html element', () => {
      const { container } = render(<RootLayout>{mockChildren}</RootLayout>);
      const htmlElement = container.querySelector('html');
      expect(htmlElement?.className).toMatch(/--font-outfit/);
    });

    it('renders body element', () => {
      const { container } = render(<RootLayout>{mockChildren}</RootLayout>);
      const bodyElement = container.querySelector('body');
      expect(bodyElement).toBeInTheDocument();
    });

    it('has proper nesting: html > body > ErrorBoundary > div.main-content-container > children', () => {
      const { container } = render(<RootLayout>{mockChildren}</RootLayout>);
      const htmlElement = container.querySelector('html');
      const bodyElement = htmlElement?.querySelector('body');
      const mainContentContainer = bodyElement?.querySelector('.main-content-container');
      
      expect(htmlElement).toBeInTheDocument();
      expect(bodyElement).toBeInTheDocument();
      expect(mainContentContainer).toBeInTheDocument();
      expect(mainContentContainer).toContainElement(screen.getByTestId('mock-child'));
    });
  });

  describe('ErrorBoundary integration', () => {
    it('catches errors from children and shows fallback UI', () => {
      const ThrowError = () => {
        throw new Error('Test error');
      };

      render(
        <RootLayout>
          <ThrowError />
        </RootLayout>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    it('renders multiple children correctly', () => {
      render(
        <RootLayout>
          <div data-testid="child-1">Child 1</div>
          <div data-testid="child-2">Child 2</div>
        </RootLayout>
      );

      expect(screen.getByTestId('child-1')).toBeInTheDocument();
      expect(screen.getByTestId('child-2')).toBeInTheDocument();
    });
  });

  describe('children prop', () => {
    it('accepts and renders string children', () => {
      render(<RootLayout>Plain text content</RootLayout>);
      expect(screen.getByText('Plain text content')).toBeInTheDocument();
    });

    it('accepts and renders React element children', () => {
      render(
        <RootLayout>
          <h1>Heading</h1>
        </RootLayout>
      );
      expect(screen.getByRole('heading', { name: 'Heading' })).toBeInTheDocument();
    });

    it('accepts and renders complex nested children', () => {
      render(
        <RootLayout>
          <div>
            <nav>Navigation</nav>
            <main>Main Content</main>
            <footer>Footer</footer>
          </div>
        </RootLayout>
      );
      expect(screen.getByText('Navigation')).toBeInTheDocument();
      expect(screen.getByText('Main Content')).toBeInTheDocument();
      expect(screen.getByText('Footer')).toBeInTheDocument();
    });
  });

  describe('CSS classes', () => {
    it('main-content-container has correct class name', () => {
      const { container } = render(<RootLayout>{mockChildren}</RootLayout>);
      const mainContentContainer = container.querySelector('.main-content-container');
      expect(mainContentContainer).toHaveClass('main-content-container');
    });
  });
});

describe('metadata', () => {
  it('exports metadata with correct title', () => {
    expect(metadata.title).toBe('Spark\! Next.js Template');
  });

  it('exports metadata with correct description', () => {
    expect(metadata.description).toBe('Spark\! Next.js Template');
  });

  it('exports metadata with correct keywords array', () => {
    expect(metadata.keywords).toEqual(['Next.js', 'React', 'TypeScript', 'Template']);
  });

  it('metadata keywords include all expected terms', () => {
    expect(metadata.keywords).toContain('Next.js');
    expect(metadata.keywords).toContain('React');
    expect(metadata.keywords).toContain('TypeScript');
    expect(metadata.keywords).toContain('Template');
  });

  it('metadata is an object with expected properties', () => {
    expect(metadata).toHaveProperty('title');
    expect(metadata).toHaveProperty('description');
    expect(metadata).toHaveProperty('keywords');
  });

  it('metadata keywords is an array', () => {
    expect(Array.isArray(metadata.keywords)).toBe(true);
  });

  it('metadata keywords has correct length', () => {
    expect(metadata.keywords).toHaveLength(4);
  });
});