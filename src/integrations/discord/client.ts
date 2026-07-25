import { RateLimiterService } from '../../services/RateLimiter.service.js';
import { AuthenticationManagerService } from '../../services/AuthenticationManager.service.js';
import { PlatformType } from '../../shared/enums/platform.enum.js';
import { DiscordMessageRaw } from './types.js';

export class DiscordClient {
  private rateLimiter: RateLimiterService;
  private authManager: AuthenticationManagerService;

  constructor() {
    this.rateLimiter = RateLimiterService.getInstance();
    this.authManager = AuthenticationManagerService.getInstance();
  }

  public async fetchMessages(): Promise<DiscordMessageRaw[]> {
    return this.rateLimiter.executeWithRateLimit(PlatformType.DISCORD, async () => {
      const creds = this.authManager.getCredentials(PlatformType.DISCORD);
      if (!creds.isAuthorized) {
        return [
          {
            id: '10928',
            channel_id: 'chn-01',
            content: 'Hey Alex! I just updated the Figma design tokens for dark glassmorphism gradients and card border highlights.',
            timestamp: '2026-07-25T11:20:00Z',
            author: { id: 'usr-designer', username: 'Marcus Brody' }
          }
        ];
      }

      const res = await fetch('https://discord.com/api/v10/channels/12345/messages', {
        headers: { Authorization: `Bot ${creds.accessToken}` }
      });
      if (!res.ok) throw new Error(`Discord API HTTP ${res.status}`);
      return res.json() as Promise<DiscordMessageRaw[]>;
    });
  }
}
