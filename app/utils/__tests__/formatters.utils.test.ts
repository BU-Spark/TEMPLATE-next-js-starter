import { capitalizeFirstLetter, formatDateYYYYMMDD, truncateString } from '../formatters.utils';

describe('formatters.utils', () => {
  describe('capitalizeFirstLetter', () => {
    it('capitalizes the first letter of a lowercase string', () => {
      expect(capitalizeFirstLetter('hello')).toBe('Hello');
    });

    it('capitalizes the first letter of a mixed-case string', () => {
      expect(capitalizeFirstLetter('hELLO')).toBe('HELLO');
    });

    it('returns the same string if first letter is already capitalized', () => {
      expect(capitalizeFirstLetter('Hello')).toBe('Hello');
    });

    it('handles single character strings', () => {
      expect(capitalizeFirstLetter('a')).toBe('A');
      expect(capitalizeFirstLetter('A')).toBe('A');
    });

    it('handles strings with spaces', () => {
      expect(capitalizeFirstLetter('hello world')).toBe('Hello world');
    });

    it('handles strings starting with numbers', () => {
      expect(capitalizeFirstLetter('123abc')).toBe('123abc');
    });

    it('handles strings starting with special characters', () => {
      expect(capitalizeFirstLetter('\!hello')).toBe('\!hello');
      expect(capitalizeFirstLetter('@world')).toBe('@world');
    });

    it('returns empty string for null', () => {
      expect(capitalizeFirstLetter(null)).toBe('');
    });

    it('returns empty string for undefined', () => {
      expect(capitalizeFirstLetter(undefined)).toBe('');
    });

    it('returns empty string for empty string', () => {
      expect(capitalizeFirstLetter('')).toBe('');
    });

    it('handles strings with only whitespace', () => {
      expect(capitalizeFirstLetter('   ')).toBe('   ');
    });

    it('handles unicode characters', () => {
      expect(capitalizeFirstLetter('über')).toBe('Über');
      expect(capitalizeFirstLetter('αβγ')).toBe('Αβγ');
    });

    it('handles emoji at the start', () => {
      expect(capitalizeFirstLetter('😀hello')).toBe('😀hello');
    });
  });

  describe('formatDateYYYYMMDD', () => {
    it('formats a valid date correctly', () => {
      const date = new Date('2023-05-15');
      expect(formatDateYYYYMMDD(date)).toBe('2023-05-15');
    });

    it('pads single-digit months with zero', () => {
      const date = new Date('2023-01-15');
      expect(formatDateYYYYMMDD(date)).toBe('2023-01-15');
    });

    it('pads single-digit days with zero', () => {
      const date = new Date('2023-05-05');
      expect(formatDateYYYYMMDD(date)).toBe('2023-05-05');
    });

    it('handles the first day of the year', () => {
      const date = new Date('2023-01-01');
      expect(formatDateYYYYMMDD(date)).toBe('2023-01-01');
    });

    it('handles the last day of the year', () => {
      const date = new Date('2023-12-31');
      expect(formatDateYYYYMMDD(date)).toBe('2023-12-31');
    });

    it('handles leap year dates', () => {
      const date = new Date('2024-02-29');
      expect(formatDateYYYYMMDD(date)).toBe('2024-02-29');
    });

    it('handles dates in different centuries', () => {
      const date = new Date('1999-12-31');
      expect(formatDateYYYYMMDD(date)).toBe('1999-12-31');
    });

    it('handles dates far in the future', () => {
      const date = new Date('2100-06-15');
      expect(formatDateYYYYMMDD(date)).toBe('2100-06-15');
    });

    it('returns empty string for null', () => {
      expect(formatDateYYYYMMDD(null)).toBe('');
    });

    it('returns empty string for undefined', () => {
      expect(formatDateYYYYMMDD(undefined)).toBe('');
    });

    it('returns empty string for invalid date', () => {
      const invalidDate = new Date('invalid');
      expect(formatDateYYYYMMDD(invalidDate)).toBe('');
    });

    it('returns empty string for NaN date', () => {
      const nanDate = new Date(NaN);
      expect(formatDateYYYYMMDD(nanDate)).toBe('');
    });

    it('handles dates with time components correctly (ignores time)', () => {
      const date = new Date('2023-05-15T14:30:00.000Z');
      const result = formatDateYYYYMMDD(date);
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it('handles dates created with timestamp', () => {
      const date = new Date(1684166400000);
      const result = formatDateYYYYMMDD(date);
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it('handles dates at Unix epoch', () => {
      const date = new Date(0);
      const result = formatDateYYYYMMDD(date);
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  describe('truncateString', () => {
    it('truncates a string longer than maxLength', () => {
      expect(truncateString('Hello, World\!', 5)).toBe('Hello...');
    });

    it('does not truncate a string shorter than maxLength', () => {
      expect(truncateString('Hello', 10)).toBe('Hello');
    });

    it('does not truncate a string equal to maxLength', () => {
      expect(truncateString('Hello', 5)).toBe('Hello');
    });

    it('handles empty strings', () => {
      expect(truncateString('', 5)).toBe('');
    });

    it('handles maxLength of 0', () => {
      expect(truncateString('Hello', 0)).toBe('...');
    });

    it('handles maxLength of 1', () => {
      expect(truncateString('Hello', 1)).toBe('H...');
    });

    it('truncates multi-line strings', () => {
      expect(truncateString('Line 1\nLine 2\nLine 3', 10)).toBe('Line 1\nLin...');
    });

    it('truncates strings with special characters', () => {
      expect(truncateString('Hello\! @#$% World', 8)).toBe('Hello\! @...');
    });

    it('truncates strings with unicode characters', () => {
      expect(truncateString('Hello 世界', 7)).toBe('Hello 世...');
    });

    it('truncates strings with emoji', () => {
      expect(truncateString('Hello 😀 World', 8)).toBe('Hello 😀...');
    });

    it('handles very long strings', () => {
      const longString = 'a'.repeat(1000);
      const result = truncateString(longString, 50);
      expect(result).toBe('a'.repeat(50) + '...');
      expect(result.length).toBe(53);
    });

    it('handles strings with only whitespace', () => {
      expect(truncateString('     ', 3)).toBe('   ...');
    });

    it('preserves the beginning of the string', () => {
      const str = 'The quick brown fox jumps over the lazy dog';
      const result = truncateString(str, 15);
      expect(result).toBe('The quick brown...');
      expect(result.startsWith('The quick brown')).toBe(true);
    });

    it('adds exactly three periods as ellipsis', () => {
      const result = truncateString('Hello, World\!', 5);
      expect(result.endsWith('...')).toBe(true);
      expect(result.match(/\.\.\./g)?.length).toBe(1);
    });
  });
});