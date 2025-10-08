import { User, Role, UserProfilePageData, ActivityLog, UserPreferences } from '../user.types';

describe('user.types', () => {
  describe('Role enum', () => {
    it('has ADMIN role', () => {
      expect(Role.ADMIN).toBe('ADMIN');
    });

    it('has USER role', () => {
      expect(Role.USER).toBe('USER');
    });

    it('has EDITOR role', () => {
      expect(Role.EDITOR).toBe('EDITOR');
    });

    it('contains exactly three roles', () => {
      const roles = Object.values(Role);
      expect(roles).toHaveLength(3);
    });

    it('all role values are strings', () => {
      Object.values(Role).forEach(role => {
        expect(typeof role).toBe('string');
      });
    });

    it('role values match their keys', () => {
      expect(Role.ADMIN).toBe('ADMIN');
      expect(Role.USER).toBe('USER');
      expect(Role.EDITOR).toBe('EDITOR');
    });
  });

  describe('User interface', () => {
    it('accepts valid user object with all required fields', () => {
      const user: User = {
        id: '123',
        username: 'john_doe',
        email: 'john@example.com',
        isActive: true,
        roles: [Role.USER],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(user.id).toBe('123');
      expect(user.username).toBe('john_doe');
      expect(user.email).toBe('john@example.com');
      expect(user.isActive).toBe(true);
      expect(user.roles).toEqual([Role.USER]);
    });

    it('accepts user with optional firstName', () => {
      const user: User = {
        id: '123',
        username: 'john_doe',
        email: 'john@example.com',
        firstName: 'John',
        isActive: true,
        roles: [Role.USER],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(user.firstName).toBe('John');
    });

    it('accepts user with optional lastName', () => {
      const user: User = {
        id: '123',
        username: 'john_doe',
        email: 'john@example.com',
        lastName: 'Doe',
        isActive: true,
        roles: [Role.USER],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(user.lastName).toBe('Doe');
    });

    it('accepts user with both optional name fields', () => {
      const user: User = {
        id: '123',
        username: 'john_doe',
        email: 'john@example.com',
        firstName: 'John',
        lastName: 'Doe',
        isActive: true,
        roles: [Role.USER],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(user.firstName).toBe('John');
      expect(user.lastName).toBe('Doe');
    });

    it('accepts user with multiple roles', () => {
      const user: User = {
        id: '123',
        username: 'admin_user',
        email: 'admin@example.com',
        isActive: true,
        roles: [Role.ADMIN, Role.EDITOR],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(user.roles).toHaveLength(2);
      expect(user.roles).toContain(Role.ADMIN);
      expect(user.roles).toContain(Role.EDITOR);
    });

    it('accepts user with empty roles array', () => {
      const user: User = {
        id: '123',
        username: 'no_role_user',
        email: 'norole@example.com',
        isActive: false,
        roles: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(user.roles).toHaveLength(0);
    });

    it('handles inactive users', () => {
      const user: User = {
        id: '123',
        username: 'inactive_user',
        email: 'inactive@example.com',
        isActive: false,
        roles: [Role.USER],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(user.isActive).toBe(false);
    });

    it('stores date objects for timestamps', () => {
      const now = new Date();
      const user: User = {
        id: '123',
        username: 'test_user',
        email: 'test@example.com',
        isActive: true,
        roles: [Role.USER],
        createdAt: now,
        updatedAt: now,
      };

      expect(user.createdAt).toBeInstanceOf(Date);
      expect(user.updatedAt).toBeInstanceOf(Date);
    });
  });

  describe('ActivityLog interface', () => {
    it('accepts valid activity log object', () => {
      const log: ActivityLog = {
        id: 'log-1',
        timestamp: new Date(),
        action: 'login',
      };

      expect(log.id).toBe('log-1');
      expect(log.action).toBe('login');
      expect(log.timestamp).toBeInstanceOf(Date);
    });

    it('accepts activity log with optional details', () => {
      const log: ActivityLog = {
        id: 'log-1',
        timestamp: new Date(),
        action: 'update_profile',
        details: {
          field: 'email',
          oldValue: 'old@example.com',
          newValue: 'new@example.com',
        },
      };

      expect(log.details).toBeDefined();
      expect(log.details?.field).toBe('email');
    });

    it('accepts activity log with empty details object', () => {
      const log: ActivityLog = {
        id: 'log-1',
        timestamp: new Date(),
        action: 'login',
        details: {},
      };

      expect(log.details).toBeDefined();
      expect(Object.keys(log.details!)).toHaveLength(0);
    });
  });

  describe('UserPreferences interface', () => {
    it('accepts valid user preferences with light theme', () => {
      const prefs: UserPreferences = {
        theme: 'light',
        notifications: {
          email: true,
          push: false,
        },
        language: 'en',
      };

      expect(prefs.theme).toBe('light');
      expect(prefs.notifications.email).toBe(true);
      expect(prefs.notifications.push).toBe(false);
      expect(prefs.language).toBe('en');
    });

    it('accepts valid user preferences with dark theme', () => {
      const prefs: UserPreferences = {
        theme: 'dark',
        notifications: {
          email: false,
          push: true,
        },
        language: 'en',
      };

      expect(prefs.theme).toBe('dark');
    });

    it('accepts valid user preferences with system theme', () => {
      const prefs: UserPreferences = {
        theme: 'system',
        notifications: {
          email: true,
          push: true,
        },
        language: 'en',
      };

      expect(prefs.theme).toBe('system');
    });

    it('accepts various language codes', () => {
      const languages = ['en', 'es', 'fr', 'de', 'ja', 'zh'];
      languages.forEach(lang => {
        const prefs: UserPreferences = {
          theme: 'light',
          notifications: { email: true, push: false },
          language: lang,
        };
        expect(prefs.language).toBe(lang);
      });
    });

    it('handles all notification combinations', () => {
      const combinations = [
        { email: true, push: true },
        { email: true, push: false },
        { email: false, push: true },
        { email: false, push: false },
      ];

      combinations.forEach(notifs => {
        const prefs: UserPreferences = {
          theme: 'light',
          notifications: notifs,
          language: 'en',
        };
        expect(prefs.notifications).toEqual(notifs);
      });
    });
  });

  describe('UserProfilePageData interface', () => {
    it('accepts valid user profile page data', () => {
      const user: User = {
        id: '123',
        username: 'john_doe',
        email: 'john@example.com',
        isActive: true,
        roles: [Role.USER],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const recentActivity: ActivityLog[] = [
        {
          id: 'log-1',
          timestamp: new Date(),
          action: 'login',
        },
      ];

      const preferences: UserPreferences = {
        theme: 'light',
        notifications: { email: true, push: false },
        language: 'en',
      };

      const pageData: UserProfilePageData = {
        user,
        recentActivity,
        preferences,
      };

      expect(pageData.user).toEqual(user);
      expect(pageData.recentActivity).toEqual(recentActivity);
      expect(pageData.preferences).toEqual(preferences);
    });

    it('accepts empty recent activity array', () => {
      const user: User = {
        id: '123',
        username: 'new_user',
        email: 'new@example.com',
        isActive: true,
        roles: [Role.USER],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const pageData: UserProfilePageData = {
        user,
        recentActivity: [],
        preferences: {
          theme: 'light',
          notifications: { email: true, push: false },
          language: 'en',
        },
      };

      expect(pageData.recentActivity).toHaveLength(0);
    });

    it('accepts multiple activity logs', () => {
      const user: User = {
        id: '123',
        username: 'active_user',
        email: 'active@example.com',
        isActive: true,
        roles: [Role.USER],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const recentActivity: ActivityLog[] = [
        { id: 'log-1', timestamp: new Date(), action: 'login' },
        { id: 'log-2', timestamp: new Date(), action: 'update_profile' },
        { id: 'log-3', timestamp: new Date(), action: 'logout' },
      ];

      const pageData: UserProfilePageData = {
        user,
        recentActivity,
        preferences: {
          theme: 'dark',
          notifications: { email: true, push: true },
          language: 'en',
        },
      };

      expect(pageData.recentActivity).toHaveLength(3);
    });
  });

  describe('type compatibility and relationships', () => {
    it('User can have all role types', () => {
      const adminUser: User = {
        id: '1',
        username: 'admin',
        email: 'admin@example.com',
        isActive: true,
        roles: [Role.ADMIN],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const editorUser: User = {
        id: '2',
        username: 'editor',
        email: 'editor@example.com',
        isActive: true,
        roles: [Role.EDITOR],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const regularUser: User = {
        id: '3',
        username: 'user',
        email: 'user@example.com',
        isActive: true,
        roles: [Role.USER],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(adminUser.roles[0]).toBe(Role.ADMIN);
      expect(editorUser.roles[0]).toBe(Role.EDITOR);
      expect(regularUser.roles[0]).toBe(Role.USER);
    });

    it('UserProfilePageData properly composes all related types', () => {
      const completeProfile: UserProfilePageData = {
        user: {
          id: '456',
          username: 'complete_user',
          email: 'complete@example.com',
          firstName: 'Complete',
          lastName: 'User',
          isActive: true,
          roles: [Role.ADMIN, Role.EDITOR],
          createdAt: new Date('2023-01-01'),
          updatedAt: new Date('2023-06-01'),
        },
        recentActivity: [
          {
            id: 'act-1',
            timestamp: new Date(),
            action: 'login',
            details: { ip: '192.168.1.1', userAgent: 'Mozilla/5.0' },
          },
        ],
        preferences: {
          theme: 'dark',
          notifications: { email: true, push: true },
          language: 'en',
        },
      };

      expect(completeProfile.user.firstName).toBe('Complete');
      expect(completeProfile.user.roles).toHaveLength(2);
      expect(completeProfile.recentActivity[0].details).toBeDefined();
      expect(completeProfile.preferences.theme).toBe('dark');
    });
  });
});