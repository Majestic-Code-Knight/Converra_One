import { PlatformType } from '../shared/enums/platform.enum.js';
import { PriorityLevel } from '../shared/enums/priority.enum.js';
import { MessageStatus } from '../shared/enums/message.enum.js';
import { Message } from '../shared/interfaces/Message.interface.js';

import { GmailIntegrationAdapter } from '../integrations/gmail/adapter.js';
import { GoogleCalendarIntegrationAdapter } from '../integrations/calendar/adapter.js';
import { GitHubIntegrationAdapter } from '../integrations/github/adapter.js';
import { SlackIntegrationAdapter } from '../integrations/slack/adapter.js';
import { DiscordIntegrationAdapter } from '../integrations/discord/adapter.js';
import { NotionIntegrationAdapter } from '../integrations/notion/adapter.js';

export interface PlatformStatusResult {
  platform: PlatformType;
  name: string;
  status: 'connected' | 'syncing' | 'disconnected';
  lastSync: string;
  account: string;
  activeCount: number;
}

export interface IntegrationAdapter {
  platform: PlatformType;
  fetchMessages(): Promise<Message[]>;
  getStatus(): Promise<PlatformStatusResult>;
}

export class MockGmailAdapter implements IntegrationAdapter {
  public platform = PlatformType.GMAIL;
  public async fetchMessages(): Promise<Message[]> {
    return [
      {
        id: 'msg-101',
        conversationId: 'conv-01',
        platform: PlatformType.GMAIL,
        externalId: 'gm-88491',
        sender: { id: 'usr-prof', name: 'Dr. Evelyn Vance', email: 'e.vance@stanford.edu' },
        recipients: [{ id: 'usr-me', name: 'Alex Mercer', email: 'alex.mercer@converra.io' }],
        subject: 'URGENT: Review CS340 Final Project Architecture Blueprint',
        content: 'Hi Alex, regarding the distributed system blueprint: adjust raft consensus parameters in section 4.2 before our 3 PM call.',
        timestamp: new Date('2026-07-25T09:15:00Z'),
        status: MessageStatus.UNREAD,
        priority: PriorityLevel.URGENT,
        tags: ['Academic', 'Raft']
      }
    ];
  }
  public async getStatus(): Promise<PlatformStatusResult> {
    return { platform: PlatformType.GMAIL, name: 'Gmail Workspace', status: 'connected', lastSync: '1 min ago', account: 'alex.mercer@converra.io', activeCount: 14 };
  }
}

export class MockSlackAdapter implements IntegrationAdapter {
  public platform = PlatformType.SLACK;
  public async fetchMessages(): Promise<Message[]> {
    return [
      {
        id: 'msg-102',
        conversationId: 'conv-02',
        platform: PlatformType.SLACK,
        externalId: 'slk-99120',
        sender: { id: 'usr-devlead', name: 'Sarah Chen', email: 'sarah.chen@converra.io' },
        recipients: [{ id: 'usr-me', name: 'Alex Mercer', email: 'alex.mercer@converra.io' }],
        subject: 'NitroStack Core v1.4 Deployment Blockers',
        content: '@alex Release candidate hit a memory leak on worker node 3. Need GC parameters review before approving PR #342.',
        timestamp: new Date('2026-07-25T10:02:00Z'),
        status: MessageStatus.UNREAD,
        priority: PriorityLevel.HIGH,
        tags: ['Release', 'PR #342']
      }
    ];
  }
  public async getStatus(): Promise<PlatformStatusResult> {
    return { platform: PlatformType.SLACK, name: 'Slack HQ', status: 'connected', lastSync: 'Just now', account: '#engineering-core', activeCount: 28 };
  }
}

export class MockGitHubAdapter implements IntegrationAdapter {
  public platform = PlatformType.GITHUB;
  public async fetchMessages(): Promise<Message[]> {
    return [
      {
        id: 'msg-103',
        conversationId: 'conv-03',
        platform: PlatformType.GITHUB,
        externalId: 'gh-44102',
        sender: { id: 'usr-ghbot', name: 'GitHub Actions Bot' },
        recipients: [{ id: 'usr-me', name: 'Alex Mercer', email: 'alex.mercer@converra.io' }],
        subject: '[CI/CD] Build Succeeded: converra-one/main',
        content: 'Pipeline #1842 completed successfully in 2m 14s. 142 tests passed.',
        timestamp: new Date('2026-07-25T10:45:00Z'),
        status: MessageStatus.READ,
        priority: PriorityLevel.MEDIUM,
        tags: ['CI/CD', 'Passing']
      }
    ];
  }
  public async getStatus(): Promise<PlatformStatusResult> {
    return { platform: PlatformType.GITHUB, name: 'GitHub Enterprise', status: 'connected', lastSync: '12 mins ago', account: 'converra-labs', activeCount: 19 };
  }
}

export class MockDiscordAdapter implements IntegrationAdapter {
  public platform = PlatformType.DISCORD;
  public async fetchMessages(): Promise<Message[]> {
    return [
      {
        id: 'msg-104',
        conversationId: 'conv-04',
        platform: PlatformType.DISCORD,
        externalId: 'dsc-10928',
        sender: { id: 'usr-designer', name: 'Marcus Brody' },
        recipients: [{ id: 'usr-me', name: 'Alex Mercer', email: 'alex.mercer@converra.io' }],
        subject: 'Figma Token Sync for Glassmorphism Theme',
        content: 'Hey Alex! Updated Figma design tokens for dark glassmorphism gradients.',
        timestamp: new Date('2026-07-25T11:20:00Z'),
        status: MessageStatus.UNREAD,
        priority: PriorityLevel.LOW,
        tags: ['Design', 'Figma']
      }
    ];
  }
  public async getStatus(): Promise<PlatformStatusResult> {
    return { platform: PlatformType.DISCORD, name: 'Discord Devs', status: 'connected', lastSync: '3 mins ago', account: 'AlexM#4920', activeCount: 8 };
  }
}

export class MockNotionAdapter implements IntegrationAdapter {
  public platform = PlatformType.NOTION;
  public async fetchMessages(): Promise<Message[]> {
    return [
      {
        id: 'msg-105',
        conversationId: 'conv-05',
        platform: PlatformType.NOTION,
        externalId: 'ntn-77412',
        sender: { id: 'usr-pm', name: 'Elena Rostova' },
        recipients: [{ id: 'usr-me', name: 'Alex Mercer', email: 'alex.mercer@converra.io' }],
        subject: 'Q3 Product Roadmap Update',
        content: 'Updated Notion database with Q3 deliverables under MCP Protocol Integration.',
        timestamp: new Date('2026-07-25T11:55:00Z'),
        status: MessageStatus.READ,
        priority: PriorityLevel.MEDIUM,
        tags: ['Notion', 'Roadmap']
      }
    ];
  }
  public async getStatus(): Promise<PlatformStatusResult> {
    return { platform: PlatformType.NOTION, name: 'Notion Workspace', status: 'connected', lastSync: '5 mins ago', account: 'Engineering Hub', activeCount: 6 };
  }
}

export class ConnectorManagerService {
  private static instance: ConnectorManagerService;
  private adapters: IntegrationAdapter[];

  constructor() {
    const useReal = process.env.USE_REAL_INTEGRATIONS === 'true';

    if (useReal) {
      this.adapters = [
        new GmailIntegrationAdapter(),
        new GoogleCalendarIntegrationAdapter(),
        new GitHubIntegrationAdapter(),
        new SlackIntegrationAdapter(),
        new DiscordIntegrationAdapter(),
        new NotionIntegrationAdapter()
      ];
    } else {
      this.adapters = [
        new GmailIntegrationAdapter(), // Defaults to mock response when OAuth token missing
        new GoogleCalendarIntegrationAdapter(),
        new GitHubIntegrationAdapter(),
        new MockDiscordAdapter(),
        new MockNotionAdapter()
      ];
    }
  }

  public static getInstance(): ConnectorManagerService {
    if (!ConnectorManagerService.instance) {
      ConnectorManagerService.instance = new ConnectorManagerService();
    }
    return ConnectorManagerService.instance;
  }

  public async fetchAllMessages(): Promise<Message[]> {
    const results = await Promise.all(this.adapters.map(a => a.fetchMessages()));
    return results.flat().sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  public async getPlatformStatuses(): Promise<PlatformStatusResult[]> {
    return Promise.all(this.adapters.map(a => a.getStatus()));
  }
}
