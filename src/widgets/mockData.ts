import { PlatformType } from '../shared/enums/platform.enum.js';
import { PriorityLevel } from '../shared/enums/priority.enum.js';
import { MessageStatus } from '../shared/enums/message.enum.js';
import { TaskStatus } from '../shared/enums/task.enum.js';
import { NotificationType } from '../shared/enums/notification.enum.js';
import { AgentType } from '../shared/enums/agent.enum.js';
import { Message } from '../shared/interfaces/Message.interface.js';
import { Task } from '../shared/interfaces/Task.interface.js';
import { CalendarEvent } from '../shared/interfaces/CalendarEvent.interface.js';
import { Notification } from '../shared/interfaces/Notification.interface.js';

export interface AgentExecutionLog {
  id: string;
  agent: AgentType;
  agentName: string;
  action: string;
  details: string;
  timestamp: string;
  durationMs: number;
  status: 'completed' | 'in_progress' | 'pending' | 'failed';
  mcpTool?: string;
}

export interface PlatformConnection {
  platform: PlatformType;
  name: string;
  status: 'connected' | 'syncing' | 'disconnected';
  lastSync: string;
  account: string;
  activeCount: number;
  icon: string;
}

export const MOCK_PLATFORM_CONNECTIONS: PlatformConnection[] = [
  { platform: PlatformType.GMAIL, name: 'Gmail Workspace', status: 'connected', lastSync: '1 min ago', account: 'alex.mercer@converra.io', activeCount: 14, icon: '✉️' },
  { platform: PlatformType.SLACK, name: 'Slack HQ', status: 'connected', lastSync: 'Just now', account: '#engineering-core', activeCount: 28, icon: '💬' },
  { platform: PlatformType.DISCORD, name: 'Discord Devs', status: 'connected', lastSync: '3 mins ago', account: 'AlexM#4920', activeCount: 8, icon: '🎮' },
  { platform: PlatformType.GITHUB, name: 'GitHub Enterprise', status: 'connected', lastSync: '12 mins ago', account: 'converra-labs', activeCount: 19, icon: '🐙' },
  { platform: PlatformType.NOTION, name: 'Notion Workspace', status: 'connected', lastSync: '5 mins ago', account: 'Engineering Hub', activeCount: 6, icon: '📝' },
  { platform: PlatformType.CALENDAR, name: 'Google Calendar', status: 'connected', lastSync: 'Just now', account: 'alex.mercer@converra.io', activeCount: 4, icon: '📅' },
];

export const MOCK_MESSAGES: Message[] = [
  {
    id: 'msg-101',
    conversationId: 'conv-01',
    platform: PlatformType.GMAIL,
    externalId: 'gm-88491',
    sender: { id: 'usr-prof', name: 'Dr. Evelyn Vance', email: 'e.vance@stanford.edu', avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150' },
    recipients: [{ id: 'usr-me', name: 'Alex Mercer', email: 'alex.mercer@converra.io' }],
    subject: 'URGENT: Review CS340 Final Project Architecture Blueprint',
    content: 'Hi Alex, regarding the distributed system blueprint you submitted for the final project: we need to adjust the raft consensus layer timeout parameters before Monday morning review. Could you review section 4.2 and let me know if we can schedule a quick 15-minute call today at 3:00 PM?',
    timestamp: new Date('2026-07-25T09:15:00Z'),
    status: MessageStatus.UNREAD,
    priority: PriorityLevel.URGENT,
    tags: ['Academic', 'Architecture', 'Urgent Call'],
  },
  {
    id: 'msg-102',
    conversationId: 'conv-02',
    platform: PlatformType.SLACK,
    externalId: 'slk-99120',
    sender: { id: 'usr-devlead', name: 'Sarah Chen (Lead Architect)', email: 'sarah.chen@converra.io', avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150' },
    recipients: [{ id: 'usr-me', name: 'Alex Mercer', email: 'alex.mercer@converra.io' }],
    subject: 'NitroStack Core v1.4 Deployment Blockers',
    content: '@alex The release candidate for NitroStack v1.4 hit a memory leak on worker node 3 during stress testing. We need your insight on the garbage collection parameters in the memory module before approving the PR #342.',
    timestamp: new Date('2026-07-25T10:02:00Z'),
    status: MessageStatus.UNREAD,
    priority: PriorityLevel.HIGH,
    tags: ['Release', 'Memory Leak', 'PR Review'],
  },
  {
    id: 'msg-103',
    conversationId: 'conv-03',
    platform: PlatformType.GITHUB,
    externalId: 'gh-44102',
    sender: { id: 'usr-ghbot', name: 'GitHub Actions Bot', avatarUrl: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' },
    recipients: [{ id: 'usr-me', name: 'Alex Mercer', email: 'alex.mercer@converra.io' }],
    subject: '[CI/CD] Build Succeeded: converra-one/main (Commit 8d3a1f9)',
    content: 'Pipeline #1842 completed successfully in 2m 14s. All 142 unit tests and zero integration regressions reported across 8 worker clusters.',
    timestamp: new Date('2026-07-25T10:45:00Z'),
    status: MessageStatus.READ,
    priority: PriorityLevel.MEDIUM,
    tags: ['CI/CD', 'Passing', 'Deploy'],
  },
  {
    id: 'msg-104',
    conversationId: 'conv-04',
    platform: PlatformType.DISCORD,
    externalId: 'dsc-10928',
    sender: { id: 'usr-designer', name: 'Marcus Brody (UX Design)', avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150' },
    recipients: [{ id: 'usr-me', name: 'Alex Mercer', email: 'alex.mercer@converra.io' }],
    subject: 'Figma Token Sync for Converra One Glassmorphism Theme',
    content: 'Hey Alex! I just updated the Figma design tokens for dark glassmorphism gradients and card border highlights. Take a look at the `#design-system` channel when you get a second.',
    timestamp: new Date('2026-07-25T11:20:00Z'),
    status: MessageStatus.UNREAD,
    priority: PriorityLevel.LOW,
    tags: ['Design System', 'UI/UX', 'Figma'],
  },
  {
    id: 'msg-105',
    conversationId: 'conv-05',
    platform: PlatformType.NOTION,
    externalId: 'ntn-77412',
    sender: { id: 'usr-pm', name: 'Elena Rostova (Product Lead)', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
    recipients: [{ id: 'usr-me', name: 'Alex Mercer', email: 'alex.mercer@converra.io' }],
    subject: 'Q3 Product Roadmap & Agentic AI Milestone Update',
    content: 'Updated the Notion database with Q3 deliverables. Alex, please check your assigned deliverables under Section 3: MCP Protocol Integration and mark estimated completion dates.',
    timestamp: new Date('2026-07-25T11:55:00Z'),
    status: MessageStatus.READ,
    priority: PriorityLevel.MEDIUM,
    tags: ['Product', 'Roadmap', 'Notion'],
  }
];

export const MOCK_TASKS: Task[] = [
  {
    id: 'task-01',
    title: 'Adjust Raft Consensus Timeout Parameters for Prof. Vance',
    description: 'Review section 4.2 of CS340 blueprint and submit updated config params prior to review call.',
    status: TaskStatus.PENDING,
    priority: PriorityLevel.URGENT,
    sourcePlatform: PlatformType.GMAIL,
    sourceMessageId: 'msg-101',
    assignee: 'Alex Mercer',
    dueDate: new Date('2026-07-25T15:00:00Z'),
    createdAt: new Date('2026-07-25T09:16:00Z'),
    updatedAt: new Date('2026-07-25T09:16:00Z'),
    tags: ['Academic', 'Raft', 'Urgent'],
  },
  {
    id: 'task-02',
    title: 'Investigate NitroStack Worker Node 3 Memory Leak (PR #342)',
    description: 'Analyze heap snapshot from stress test on worker node 3 with Sarah Chen.',
    status: TaskStatus.IN_PROGRESS,
    priority: PriorityLevel.HIGH,
    sourcePlatform: PlatformType.SLACK,
    sourceMessageId: 'msg-102',
    assignee: 'Alex Mercer',
    dueDate: new Date('2026-07-25T17:30:00Z'),
    createdAt: new Date('2026-07-25T10:05:00Z'),
    updatedAt: new Date('2026-07-25T10:05:00Z'),
    tags: ['Backend', 'Memory', 'PR #342'],
  },
  {
    id: 'task-03',
    title: 'Update Notion Deliverables for Q3 MCP Integration Roadmap',
    description: 'Fill in estimated completion dates for agentic workflow milestones.',
    status: TaskStatus.PENDING,
    priority: PriorityLevel.MEDIUM,
    sourcePlatform: PlatformType.NOTION,
    sourceMessageId: 'msg-105',
    assignee: 'Alex Mercer',
    dueDate: new Date('2026-07-26T12:00:00Z'),
    createdAt: new Date('2026-07-25T11:56:00Z'),
    updatedAt: new Date('2026-07-25T11:56:00Z'),
    tags: ['Product', 'Roadmap'],
  },
  {
    id: 'task-04',
    title: 'Review Marcus Figma Design Tokens for Glassmorphism Cards',
    description: 'Validate color variables in theme.config.ts against Figma specifications.',
    status: TaskStatus.COMPLETED,
    priority: PriorityLevel.LOW,
    sourcePlatform: PlatformType.DISCORD,
    sourceMessageId: 'msg-104',
    assignee: 'Alex Mercer',
    dueDate: new Date('2026-07-24T18:00:00Z'),
    createdAt: new Date('2026-07-24T11:20:00Z'),
    updatedAt: new Date('2026-07-25T08:00:00Z'),
    tags: ['UI/UX', 'Done'],
  }
];

export const MOCK_EVENTS: CalendarEvent[] = [
  {
    id: 'evt-01',
    title: 'Prof. Vance CS340 Project Architecture Call',
    description: '15-min sync to review Raft consensus parameters and blueprint updates.',
    startTime: new Date('2026-07-25T15:00:00Z'),
    endTime: new Date('2026-07-25T15:15:00Z'),
    isAllDay: false,
    location: 'Google Meet',
    meetingUrl: 'https://meet.google.com/abc-defg-hij',
    organizer: { name: 'Dr. Evelyn Vance', email: 'e.vance@stanford.edu', responseStatus: 'accepted' },
    attendees: [
      { name: 'Dr. Evelyn Vance', email: 'e.vance@stanford.edu', responseStatus: 'accepted' },
      { name: 'Alex Mercer', email: 'alex.mercer@converra.io', responseStatus: 'accepted' }
    ],
    platform: PlatformType.CALENDAR
  },
  {
    id: 'evt-02',
    title: 'NitroStack Engineering Standup & PR Sync',
    description: 'Daily team sync discussing release candidate blockers and agentic AI tools.',
    startTime: new Date('2026-07-25T16:30:00Z'),
    endTime: new Date('2026-07-25T17:00:00Z'),
    isAllDay: false,
    location: 'Slack Huddle',
    meetingUrl: 'https://slack.com/huddle/converra-eng',
    organizer: { name: 'Sarah Chen', email: 'sarah.chen@converra.io', responseStatus: 'accepted' },
    attendees: [
      { name: 'Sarah Chen', email: 'sarah.chen@converra.io', responseStatus: 'accepted' },
      { name: 'Alex Mercer', email: 'alex.mercer@converra.io', responseStatus: 'accepted' },
      { name: 'Marcus Brody', email: 'marcus.brody@converra.io', responseStatus: 'tentative' }
    ],
    platform: PlatformType.CALENDAR
  },
  {
    id: 'evt-03',
    title: 'Hackathon Demo Prep & Judges Presentation Dry Run',
    description: 'Reviewing NitroStack Studio widgets, multi-agent timelines, and MCP tool triggers.',
    startTime: new Date('2026-07-25T19:00:00Z'),
    endTime: new Date('2026-07-25T20:00:00Z'),
    isAllDay: false,
    location: 'Zoom Main Room',
    meetingUrl: 'https://zoom.us/j/991204812',
    organizer: { name: 'Elena Rostova', email: 'elena@converra.io', responseStatus: 'accepted' },
    attendees: [
      { name: 'Elena Rostova', email: 'elena@converra.io', responseStatus: 'accepted' },
      { name: 'Alex Mercer', email: 'alex.mercer@converra.io', responseStatus: 'accepted' }
    ],
    platform: PlatformType.CALENDAR
  }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-01',
    type: NotificationType.MESSAGE_URGENT,
    title: 'Urgent Email from Prof. Evelyn Vance',
    body: 'CS340 Raft consensus blueprint requires immediate timeout adjustment prior to 3 PM call.',
    priority: PriorityLevel.URGENT,
    isRead: false,
    createdAt: new Date('2026-07-25T09:16:00Z'),
    metadata: { sourcePlatform: 'GMAIL', messageId: 'msg-101' }
  },
  {
    id: 'notif-02',
    type: NotificationType.TASK_DUE,
    title: 'Task Due in 2 Hours',
    body: 'Investigate NitroStack Worker Node 3 Memory Leak (PR #342)',
    priority: PriorityLevel.HIGH,
    isRead: false,
    createdAt: new Date('2026-07-25T10:05:00Z'),
    metadata: { taskId: 'task-02' }
  },
  {
    id: 'notif-03',
    type: NotificationType.AI_SUMMARY_READY,
    title: 'Daily AI Briefing Synthesized',
    body: 'Priority Agent scored 2 urgent threads. 1 calendar conflict auto-resolved.',
    priority: PriorityLevel.MEDIUM,
    isRead: true,
    createdAt: new Date('2026-07-25T08:00:00Z')
  }
];

export const MOCK_AGENT_LOGS: AgentExecutionLog[] = [
  {
    id: 'log-01',
    agent: AgentType.COLLECTOR,
    agentName: 'Collector Agent',
    action: 'Harvested Channel Stream',
    details: 'Ingested 14 Gmail threads, 28 Slack messages, 8 Discord alerts across 6 integrations',
    timestamp: '10:02:14 AM',
    durationMs: 84,
    status: 'completed',
    mcpTool: 'mcp_harvest_channels'
  },
  {
    id: 'log-02',
    agent: AgentType.PRIORITY,
    agentName: 'Priority Agent',
    action: 'Urgency Classification',
    details: 'Flagged msg-101 (Prof. Vance) as URGENT (Score: 0.96) based on deadline and sender authority',
    timestamp: '10:02:15 AM',
    durationMs: 120,
    status: 'completed',
    mcpTool: 'mcp_score_urgency'
  },
  {
    id: 'log-03',
    agent: AgentType.SUMMARY,
    agentName: 'Summary Agent',
    action: 'Thread Summarization',
    details: 'Generated 3-bullet executive briefing for PR #342 and CS340 Architecture Blueprint',
    timestamp: '10:02:16 AM',
    durationMs: 210,
    status: 'completed',
    mcpTool: 'mcp_summarize_thread'
  },
  {
    id: 'log-04',
    agent: AgentType.TASK,
    agentName: 'Task Agent',
    action: 'Action Item Extraction',
    details: 'Extracted task: "Adjust Raft Timeout Parameters" with due date 2026-07-25T15:00:00Z',
    timestamp: '10:02:17 AM',
    durationMs: 95,
    status: 'completed',
    mcpTool: 'mcp_extract_tasks'
  },
  {
    id: 'log-05',
    agent: AgentType.CALENDAR,
    agentName: 'Calendar Agent',
    action: 'Schedule Verification',
    details: 'Verified 3:00 PM slot availability for Prof. Vance call with zero calendar conflicts',
    timestamp: '10:02:18 AM',
    durationMs: 65,
    status: 'completed',
    mcpTool: 'mcp_check_calendar'
  },
  {
    id: 'log-06',
    agent: AgentType.REPLY,
    agentName: 'Reply Agent',
    action: 'Smart Draft Preparation',
    details: 'Prepared Professional tone response accepting 3:00 PM call and confirming parameter review',
    timestamp: '10:02:19 AM',
    durationMs: 145,
    status: 'completed',
    mcpTool: 'mcp_generate_reply'
  }
];

export const MOCK_SEARCH_QUERY_RESPONSE = {
  query: "What did my professor say about the project?",
  answer: "Dr. Evelyn Vance sent an urgent email regarding your CS340 Final Project Architecture Blueprint. She requested that you adjust the Raft consensus layer timeout parameters in section 4.2 before a 15-minute review call scheduled for today at 3:00 PM.",
  sources: [
    {
      id: 'msg-101',
      platform: PlatformType.GMAIL,
      sender: 'Dr. Evelyn Vance (e.vance@stanford.edu)',
      subject: 'URGENT: Review CS340 Final Project Architecture Blueprint',
      snippet: '...we need to adjust the raft consensus layer timeout parameters before Monday morning review...',
      relevanceScore: 0.98,
      timestamp: '9:15 AM Today'
    }
  ],
  relatedMessages: [
    {
      id: 'msg-105',
      platform: PlatformType.NOTION,
      sender: 'Elena Rostova',
      subject: 'Q3 Product Roadmap & Agentic AI Milestone Update',
      snippet: 'Updated Notion database with Q3 deliverables...',
      relevanceScore: 0.72
    }
  ]
};
