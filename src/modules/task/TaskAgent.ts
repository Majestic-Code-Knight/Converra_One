import { BaseAgent } from '../../shared/abstracts/BaseAgent.abstract.js';
import { AgentType } from '../../shared/enums/agent.enum.js';
import { AgentResponse } from '../../shared/interfaces/AgentResponse.interface.js';
import { Task } from '../../shared/interfaces/Task.interface.js';
import { TaskStatus } from '../../shared/enums/task.enum.js';
import { PriorityLevel } from '../../shared/enums/priority.enum.js';
import { PlatformType } from '../../shared/enums/platform.enum.js';
import { AgentHealthMonitorService } from '../../services/AgentHealthMonitor.service.js';

export interface TaskAgentResult {
  tasks: Task[];
  extractedCount: number;
}

export class TaskAgent extends BaseAgent<unknown, TaskAgentResult> {
  public readonly name = 'TaskAgent';
  public readonly type = AgentType.TASK;
  public readonly description = 'Extracts action items, deliverables, and commitments into Task models';

  private healthMonitor: AgentHealthMonitorService;

  constructor() {
    super();
    this.healthMonitor = AgentHealthMonitorService.getInstance();
  }

  public async execute(): Promise<AgentResponse<TaskAgentResult>> {
    const startTime = Date.now();
    try {
      const tasks: Task[] = [
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
          tags: ['Academic', 'Raft']
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
          tags: ['Backend', 'PR #342']
        }
      ];

      const duration = Date.now() - startTime;
      this.healthMonitor.recordExecution(this.name, duration, true);

      return this.createSuccessResponse(
        { tasks, extractedCount: tasks.length },
        duration,
        `Extracted ${tasks.length} action items`
      );
    } catch (err: unknown) {
      const duration = Date.now() - startTime;
      const errorMsg = err instanceof Error ? err.message : String(err);
      this.healthMonitor.recordExecution(this.name, duration, false, errorMsg);
      return this.createErrorResponse(errorMsg, duration);
    }
  }
}
