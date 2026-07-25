import { BaseAgent } from '../../shared/abstracts/BaseAgent.abstract.js';
import { AgentType } from '../../shared/enums/agent.enum.js';
import { AgentResponse } from '../../shared/interfaces/AgentResponse.interface.js';
import { CalendarEvent } from '../../shared/interfaces/CalendarEvent.interface.js';
import { PlatformType } from '../../shared/enums/platform.enum.js';
import { AgentHealthMonitorService } from '../../services/AgentHealthMonitor.service.js';

export interface CalendarAgentInput {
  action: 'GET_EVENTS' | 'CREATE_REMINDER';
  title?: string;
  startTime?: Date;
}

export interface CalendarAgentResult {
  events: CalendarEvent[];
  createdEvent?: CalendarEvent;
}

export class CalendarAgent extends BaseAgent<CalendarAgentInput, CalendarAgentResult> {
  public readonly name = 'CalendarAgent';
  public readonly type = AgentType.CALENDAR;
  public readonly description = 'Parses meeting invites, checks availability, and creates calendar reminders';

  private healthMonitor: AgentHealthMonitorService;

  constructor() {
    super();
    this.healthMonitor = AgentHealthMonitorService.getInstance();
  }

  public async execute(input: CalendarAgentInput): Promise<AgentResponse<CalendarAgentResult>> {
    const startTime = Date.now();
    try {
      const mockEvents: CalendarEvent[] = [
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
          attendees: [{ name: 'Dr. Evelyn Vance', email: 'e.vance@stanford.edu' }],
          platform: PlatformType.CALENDAR
        }
      ];

      let createdEvent: CalendarEvent | undefined;

      if (input.action === 'CREATE_REMINDER' && input.title) {
        createdEvent = {
          id: `evt-${Date.now()}`,
          title: input.title,
          description: 'AI Generated Calendar Reminder',
          startTime: input.startTime || new Date(),
          endTime: new Date((input.startTime || new Date()).getTime() + 1800000),
          isAllDay: false,
          attendees: [],
          platform: PlatformType.CALENDAR
        };
        mockEvents.push(createdEvent);
      }

      const duration = Date.now() - startTime;
      this.healthMonitor.recordExecution(this.name, duration, true);

      return this.createSuccessResponse(
        { events: mockEvents, createdEvent },
        duration,
        input.action === 'CREATE_REMINDER' ? 'Calendar reminder created' : 'Fetched today schedule'
      );
    } catch (err: unknown) {
      const duration = Date.now() - startTime;
      const errorMsg = err instanceof Error ? err.message : String(err);
      this.healthMonitor.recordExecution(this.name, duration, false, errorMsg);
      return this.createErrorResponse(errorMsg, duration);
    }
  }
}
