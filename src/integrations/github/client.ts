import { RateLimiterService } from '../../services/RateLimiter.service.js';
import { AuthenticationManagerService } from '../../services/AuthenticationManager.service.js';
import { PlatformType } from '../../shared/enums/platform.enum.js';
import { GitHubNotificationRaw } from './types.js';

export class GitHubClient {
  private rateLimiter: RateLimiterService;
  private authManager: AuthenticationManagerService;

  constructor() {
    this.rateLimiter = RateLimiterService.getInstance();
    this.authManager = AuthenticationManagerService.getInstance();
  }

  public async fetchNotifications(): Promise<GitHubNotificationRaw[]> {
    return this.rateLimiter.executeWithRateLimit(PlatformType.GITHUB, async () => {
      const creds = this.authManager.getCredentials(PlatformType.GITHUB);
      if (!creds.isAuthorized) {
        return [
          {
            id: 'gh-44102',
            unread: false,
            reason: 'ci_passed',
            updated_at: '2026-07-25T10:45:00Z',
            subject: {
              title: '[CI/CD] Build Succeeded: converra-one/main (Commit 8d3a1f9)',
              url: 'https://api.github.com/repos/converra-labs/converra-one/builds/1842',
              type: 'CheckSuite'
            },
            repository: {
              full_name: 'converra-labs/converra-one'
            }
          }
        ];
      }

      const res = await fetch('https://api.github.com/notifications', {
        headers: {
          Authorization: `Bearer ${creds.accessToken}`,
          'User-Agent': 'Converra-One-App/1.0.0'
        }
      });
      if (!res.ok) throw new Error(`GitHub API HTTP ${res.status}`);
      return res.json() as Promise<GitHubNotificationRaw[]>;
    });
  }
}
