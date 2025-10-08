import { renderHook, act } from '@testing-library/react';
import useLocalStorage from '../useLocalStorage';

describe('useLocalStorage', () => {
  const TEST_KEY = 'test-key';
  
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('initialization', () => {
    it('returns initial value when localStorage is empty', () => {
      const { result } = renderHook(() => useLocalStorage(TEST_KEY, 'initial'));
      expect(result.current[0]).toBe('initial');
    });

    it('returns stored value when localStorage has data', () => {
      localStorage.setItem(TEST_KEY, JSON.stringify('stored'));
      const { result } = renderHook(() => useLocalStorage(TEST_KEY, 'initial'));
      expect(result.current[0]).toBe('stored');
    });

    it('handles different data types - string', () => {
      localStorage.setItem(TEST_KEY, JSON.stringify('test string'));
      const { result } = renderHook(() => useLocalStorage(TEST_KEY, ''));
      expect(result.current[0]).toBe('test string');
    });

    it('handles different data types - number', () => {
      localStorage.setItem(TEST_KEY, JSON.stringify(42));
      const { result } = renderHook(() => useLocalStorage(TEST_KEY, 0));
      expect(result.current[0]).toBe(42);
    });

    it('handles different data types - boolean', () => {
      localStorage.setItem(TEST_KEY, JSON.stringify(true));
      const { result } = renderHook(() => useLocalStorage(TEST_KEY, false));
      expect(result.current[0]).toBe(true);
    });

    it('handles different data types - object', () => {
      const testObj = { name: 'John', age: 30 };
      localStorage.setItem(TEST_KEY, JSON.stringify(testObj));
      const { result } = renderHook(() => useLocalStorage(TEST_KEY, {}));
      expect(result.current[0]).toEqual(testObj);
    });

    it('handles different data types - array', () => {
      const testArray = [1, 2, 3];
      localStorage.setItem(TEST_KEY, JSON.stringify(testArray));
      const { result } = renderHook(() => useLocalStorage(TEST_KEY, []));
      expect(result.current[0]).toEqual(testArray);
    });

    it('handles different data types - null', () => {
      localStorage.setItem(TEST_KEY, JSON.stringify(null));
      const { result } = renderHook(() => useLocalStorage(TEST_KEY, 'default'));
      expect(result.current[0]).toBe(null);
    });

    it('returns initial value when localStorage contains invalid JSON', () => {
      localStorage.setItem(TEST_KEY, 'invalid json {');
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const { result } = renderHook(() => useLocalStorage(TEST_KEY, 'fallback'));
      expect(result.current[0]).toBe('fallback');
      expect(consoleErrorSpy).toHaveBeenCalled();
      consoleErrorSpy.mockRestore();
    });

    it('handles empty string in localStorage', () => {
      localStorage.setItem(TEST_KEY, '');
      const { result } = renderHook(() => useLocalStorage(TEST_KEY, 'default'));
      expect(result.current[0]).toBe('default');
    });
  });

  describe('state updates', () => {
    it('updates state value', () => {
      const { result } = renderHook(() => useLocalStorage(TEST_KEY, 'initial'));
      
      act(() => {
        result.current[1]('updated');
      });
      
      expect(result.current[0]).toBe('updated');
    });

    it('updates localStorage when state changes', () => {
      const { result } = renderHook(() => useLocalStorage(TEST_KEY, 'initial'));
      
      act(() => {
        result.current[1]('updated');
      });
      
      expect(localStorage.getItem(TEST_KEY)).toBe(JSON.stringify('updated'));
    });

    it('handles functional updates', () => {
      const { result } = renderHook(() => useLocalStorage(TEST_KEY, 5));
      
      act(() => {
        result.current[1]((prev) => prev + 10);
      });
      
      expect(result.current[0]).toBe(15);
      expect(localStorage.getItem(TEST_KEY)).toBe(JSON.stringify(15));
    });

    it('handles multiple sequential updates', () => {
      const { result } = renderHook(() => useLocalStorage(TEST_KEY, 0));
      
      act(() => {
        result.current[1](1);
      });
      act(() => {
        result.current[1](2);
      });
      act(() => {
        result.current[1](3);
      });
      
      expect(result.current[0]).toBe(3);
      expect(localStorage.getItem(TEST_KEY)).toBe(JSON.stringify(3));
    });

    it('handles updating to null', () => {
      const { result } = renderHook(() => useLocalStorage(TEST_KEY, 'initial'));
      
      act(() => {
        result.current[1](null);
      });
      
      expect(result.current[0]).toBe(null);
      expect(localStorage.getItem(TEST_KEY)).toBe(JSON.stringify(null));
    });

    it('handles updating to undefined', () => {
      const { result } = renderHook(() => useLocalStorage<string | undefined>(TEST_KEY, 'initial'));
      
      act(() => {
        result.current[1](undefined);
      });
      
      expect(result.current[0]).toBe(undefined);
      expect(localStorage.getItem(TEST_KEY)).toBe(JSON.stringify(undefined));
    });

    it('handles updating complex objects', () => {
      const initialObj = { name: 'John', age: 30 };
      const updatedObj = { name: 'Jane', age: 25, city: 'NYC' };
      const { result } = renderHook(() => useLocalStorage(TEST_KEY, initialObj));
      
      act(() => {
        result.current[1](updatedObj);
      });
      
      expect(result.current[0]).toEqual(updatedObj);
      expect(localStorage.getItem(TEST_KEY)).toBe(JSON.stringify(updatedObj));
    });
  });

  describe('error handling', () => {
    it('logs error and uses initial value when localStorage.getItem throws', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new Error('localStorage access denied');
      });
      
      const { result } = renderHook(() => useLocalStorage(TEST_KEY, 'fallback'));
      
      expect(result.current[0]).toBe('fallback');
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining(`Error reading localStorage key "${TEST_KEY}"`),
        expect.any(Error)
      );
      
      consoleErrorSpy.mockRestore();
      jest.restoreAllMocks();
    });

    it('logs error when localStorage.setItem throws', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('localStorage quota exceeded');
      });
      
      const { result } = renderHook(() => useLocalStorage(TEST_KEY, 'initial'));
      
      act(() => {
        result.current[1]('new value');
      });
      
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining(`Error writing to localStorage key "${TEST_KEY}"`),
        expect.any(Error)
      );
      
      consoleErrorSpy.mockRestore();
      jest.restoreAllMocks();
    });
  });

  describe('SSR safety', () => {
    it('handles server-side rendering (no window)', () => {
      const originalWindow = global.window;
      // @ts-expect-error - Simulating SSR
      delete global.window;
      
      const { result } = renderHook(() => useLocalStorage(TEST_KEY, 'ssr-initial'));
      
      expect(result.current[0]).toBe('ssr-initial');
      
      global.window = originalWindow;
    });
  });

  describe('different keys', () => {
    it('stores different values for different keys', () => {
      const { result: result1 } = renderHook(() => useLocalStorage('key1', 'value1'));
      const { result: result2 } = renderHook(() => useLocalStorage('key2', 'value2'));
      
      act(() => {
        result1.current[1]('updated1');
        result2.current[1]('updated2');
      });
      
      expect(result1.current[0]).toBe('updated1');
      expect(result2.current[0]).toBe('updated2');
      expect(localStorage.getItem('key1')).toBe(JSON.stringify('updated1'));
      expect(localStorage.getItem('key2')).toBe(JSON.stringify('updated2'));
    });

    it('handles special characters in keys', () => {
      const specialKey = 'test-key:with@special#chars';
      const { result } = renderHook(() => useLocalStorage(specialKey, 'value'));
      
      act(() => {
        result.current[1]('updated');
      });
      
      expect(localStorage.getItem(specialKey)).toBe(JSON.stringify('updated'));
    });
  });

  describe('persistence', () => {
    it('persists value across hook remounts', () => {
      const { result: result1, unmount } = renderHook(() => useLocalStorage(TEST_KEY, 'initial'));
      
      act(() => {
        result1.current[1]('persisted');
      });
      
      unmount();
      
      const { result: result2 } = renderHook(() => useLocalStorage(TEST_KEY, 'initial'));
      expect(result2.current[0]).toBe('persisted');
    });

    it('syncs with manual localStorage changes', () => {
      const { result } = renderHook(() => useLocalStorage(TEST_KEY, 'initial'));
      
      localStorage.setItem(TEST_KEY, JSON.stringify('manual-update'));
      
      const { result: result2 } = renderHook(() => useLocalStorage(TEST_KEY, 'initial'));
      expect(result2.current[0]).toBe('manual-update');
    });
  });

  describe('edge cases', () => {
    it('handles very long strings', () => {
      const longString = 'a'.repeat(10000);
      const { result } = renderHook(() => useLocalStorage(TEST_KEY, ''));
      
      act(() => {
        result.current[1](longString);
      });
      
      expect(result.current[0]).toBe(longString);
    });

    it('handles deeply nested objects', () => {
      const deepObj = {
        level1: {
          level2: {
            level3: {
              level4: {
                value: 'deep'
              }
            }
          }
        }
      };
      
      const { result } = renderHook(() => useLocalStorage(TEST_KEY, {}));
      
      act(() => {
        result.current[1](deepObj);
      });
      
      expect(result.current[0]).toEqual(deepObj);
    });

    it('handles arrays with mixed types', () => {
      const mixedArray = [1, 'two', { three: 3 }, [4, 5], null, true];
      const { result } = renderHook(() => useLocalStorage(TEST_KEY, []));
      
      act(() => {
        result.current[1](mixedArray);
      });
      
      expect(result.current[0]).toEqual(mixedArray);
    });

    it('handles unicode characters', () => {
      const unicodeString = '你好世界 🌍 Привет мир';
      const { result } = renderHook(() => useLocalStorage(TEST_KEY, ''));
      
      act(() => {
        result.current[1](unicodeString);
      });
      
      expect(result.current[0]).toBe(unicodeString);
    });
  });
});