import { RateLimiterService } from '../../services/RateLimiter.service.js';
import { AuthenticationManagerService } from '../../services/AuthenticationManager.service.js';
import { PlatformType } from '../../shared/enums/platform.enum.js';
import { NotionPageRaw } from './types.js';

export class NotionClient {
  private rateLimiter: RateLimiterService;
  private authManager: AuthenticationManagerService;

  constructor() {
    this.rateLimiter = RateLimiterService.getInstance();
    this.authManager = AuthenticationManagerService.getInstance();
  }

  public async fetchPages(): Promise<NotionPageRaw[]> {
    return this.rateLimiter.executeWithRateLimit(PlatformType.NOTION, async () => {
      const creds = this.authManager.getCredentials(PlatformType.NOTION);
      if (!creds.isAuthorized) {
        return [
          {
            id: '77412',
            created_time: '2026-07-25T11:55:00Z',
            last_edited_time: '2026-07-25T11:55:00Z',
            properties: {
              Title: { title: [{ plain_text: 'Q3 Product Roadmap & Agentic AI Milestone Update' }] }
            }
          }
        ];
      }

      const res = await fetch('https://api.notion.com/v1/search', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${creds.accessToken}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json'
        }
      });
      if (!res.ok) throw new Error(`Notion API HTTP ${res.status}`);
      const data = await res.json() as { results?: NotionPageRaw[] };
      return data.results || [];
    });
  }
}
