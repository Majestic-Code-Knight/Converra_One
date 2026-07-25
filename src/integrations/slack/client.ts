import { RateLimiterService } from '../../services/RateLimiter.service.js';
import { AuthenticationManagerService } from '../../services/AuthenticationManager.service.js';
import { PlatformType } from '../../shared/enums/platform.enum.js';
import { SlackMessageRaw } from './types.js';

export class SlackClient {
  private rateLimiter: RateLimiterService;
  private authManager: AuthenticationManagerService;

  constructor() {
    this.rateLimiter = RateLimiterService.getInstance();
    this.authManager = AuthenticationManagerService.getInstance();
  }

  public async fetchMessages(): Promise<SlackMessageRaw[]> {
    return this.rateLimiter.executeWithRateLimit(PlatformType.SLACK, async () => {
      const creds = this.authManager.getCredentials(PlatformType.SLACK);
      if (!creds.isAuthorized) {
        return [
          {
            ts: '1721900000.000100',
            user: 'usr-devlead',
            channel: 'C01234567',
            text: '@alex The release candidate for NitroStack v1.4 hit a memory leak on worker node 3. Need GC parameters review before approving PR #342.'
          }
        ];
      }

      const res = await fetch('https://slack.com/api/conversations.history?channel=C01234567', {
        headers: { Authorization: `Bearer ${creds.accessToken}` }
      });
      if (!res.ok) throw new Error(`Slack API HTTP ${res.status}`);
      const data = await res.json() as { messages?: SlackMessageRaw[] };
      return data.messages || [];
    });
  }
}
