import { RateLimiterService } from '../../services/RateLimiter.service.js';
import { AuthenticationManagerService } from '../../services/AuthenticationManager.service.js';
import { PlatformType } from '../../shared/enums/platform.enum.js';
import { GoogleCalendarEventRaw } from './types.js';

export class GoogleCalendarClient {
  private rateLimiter: RateLimiterService;
  private authManager: AuthenticationManagerService;

  constructor() {
    this.rateLimiter = RateLimiterService.getInstance();
    this.authManager = AuthenticationManagerService.getInstance();
  }

  public async fetchEvents(): Promise<GoogleCalendarEventRaw[]> {
    return this.rateLimiter.executeWithRateLimit(PlatformType.CALENDAR, async () => {
      const creds = this.authManager.getCredentials(PlatformType.CALENDAR);
      if (!creds.isAuthorized) {
        return [
          {
            id: 'evt-01',
            summary: 'Prof. Vance CS340 Project Architecture Call',
            description: '15-min sync to review Raft consensus parameters.',
            start: { dateTime: '2026-07-25T15:00:00Z' },
            end: { dateTime: '2026-07-25T15:15:00Z' },
            location: 'Google Meet',
            hangoutLink: 'https://meet.google.com/abc-defg-hij',
            organizer: { email: 'e.vance@stanford.edu', displayName: 'Dr. Evelyn Vance' }
          }
        ];
      }

      const res = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        headers: { Authorization: `Bearer ${creds.accessToken}` }
      });
      if (!res.ok) throw new Error(`Calendar API HTTP ${res.status}`);
      const data = await res.json() as { items?: GoogleCalendarEventRaw[] };
      return data.items || [];
    });
  }
}
