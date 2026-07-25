import { PlatformType } from '../shared/enums/platform.enum.js';

export interface OAuthCredentials {
  platform: PlatformType;
  accessToken?: string;
  refreshToken?: string;
  clientId?: string;
  clientSecret?: string;
  expiresAt?: number;
  tokenType?: string;
  isAuthorized: boolean;
}

export class AuthenticationManagerService {
  private static instance: AuthenticationManagerService;
  private credentialsMap: Map<PlatformType, OAuthCredentials>;

  constructor() {
    this.credentialsMap = new Map();
    this.loadFromEnvironment();
  }

  public static getInstance(): AuthenticationManagerService {
    if (!AuthenticationManagerService.instance) {
      AuthenticationManagerService.instance = new AuthenticationManagerService();
    }
    return AuthenticationManagerService.instance;
  }

  private loadFromEnvironment(): void {
    // 1. Gmail Credentials
    const gmailToken = process.env.GMAIL_ACCESS_TOKEN || process.env.GMAIL_CLIENT_ID;
    this.credentialsMap.set(PlatformType.GMAIL, {
      platform: PlatformType.GMAIL,
      clientId: process.env.GMAIL_CLIENT_ID,
      clientSecret: process.env.GMAIL_CLIENT_SECRET,
      accessToken: gmailToken,
      isAuthorized: Boolean(gmailToken)
    });

    // 2. Google Calendar Credentials
    const calToken = process.env.GOOGLE_CALENDAR_CLIENT_ID || process.env.GMAIL_CLIENT_ID;
    this.credentialsMap.set(PlatformType.CALENDAR, {
      platform: PlatformType.CALENDAR,
      clientId: process.env.GOOGLE_CALENDAR_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CALENDAR_CLIENT_SECRET,
      accessToken: calToken,
      isAuthorized: Boolean(calToken)
    });

    // 3. GitHub Personal Access Token
    const ghToken = process.env.GITHUB_TOKEN;
    this.credentialsMap.set(PlatformType.GITHUB, {
      platform: PlatformType.GITHUB,
      accessToken: ghToken,
      isAuthorized: Boolean(ghToken)
    });

    // 4. Discord Bot Token
    const discordToken = process.env.DISCORD_BOT_TOKEN;
    this.credentialsMap.set(PlatformType.DISCORD, {
      platform: PlatformType.DISCORD,
      accessToken: discordToken,
      isAuthorized: Boolean(discordToken)
    });

    // 5. Slack Bot Token
    const slackToken = process.env.SLACK_BOT_TOKEN;
    this.credentialsMap.set(PlatformType.SLACK, {
      platform: PlatformType.SLACK,
      accessToken: slackToken,
      isAuthorized: Boolean(slackToken)
    });

    // 6. Notion API Token
    const notionToken = process.env.NOTION_API_TOKEN;
    this.credentialsMap.set(PlatformType.NOTION, {
      platform: PlatformType.NOTION,
      accessToken: notionToken,
      isAuthorized: Boolean(notionToken)
    });
  }

  public getCredentials(platform: PlatformType): OAuthCredentials {
    return this.credentialsMap.get(platform) || {
      platform,
      isAuthorized: false
    };
  }

  public setCredentials(platform: PlatformType, credentials: Partial<OAuthCredentials>): void {
    const existing = this.getCredentials(platform);
    this.credentialsMap.set(platform, {
      ...existing,
      ...credentials,
      platform,
      isAuthorized: Boolean(credentials.accessToken || existing.accessToken || credentials.clientId)
    });
  }

  public isTokenExpired(platform: PlatformType): boolean {
    const creds = this.getCredentials(platform);
    if (!creds.expiresAt) return false;
    return Date.now() >= creds.expiresAt;
  }

  public sanitizeLogData(data: Record<string, unknown>): Record<string, unknown> {
    const sanitized = { ...data };
    const secretKeys = ['accessToken', 'refreshToken', 'clientSecret', 'token', 'authorization', 'password'];

    secretKeys.forEach((key) => {
      if (key in sanitized) {
        sanitized[key] = '[REDACTED_SECRET]';
      }
    });

    return sanitized;
  }
}
