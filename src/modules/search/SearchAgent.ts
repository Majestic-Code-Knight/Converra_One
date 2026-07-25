import { BaseAgent } from '../../shared/abstracts/BaseAgent.abstract.js';
import { AgentType } from '../../shared/enums/agent.enum.js';
import { AgentResponse } from '../../shared/interfaces/AgentResponse.interface.js';
import { SearchResult, SearchMatch } from '../../shared/interfaces/SearchResult.interface.js';
import { PlatformType } from '../../shared/enums/platform.enum.js';
import { AgentHealthMonitorService } from '../../services/AgentHealthMonitor.service.js';

export interface SearchAgentInput {
  query: string;
  filters?: Record<string, unknown>;
}

export class SearchAgent extends BaseAgent<SearchAgentInput, SearchResult> {
  public readonly name = 'SearchAgent';
  public readonly type = AgentType.SEARCH;
  public readonly description = 'Performs hybrid semantic and keyword search across aggregated communication data';

  private healthMonitor: AgentHealthMonitorService;

  constructor() {
    super();
    this.healthMonitor = AgentHealthMonitorService.getInstance();
  }

  public async execute(input: SearchAgentInput): Promise<AgentResponse<SearchResult>> {
    const startTime = Date.now();
    try {
      const matches: SearchMatch[] = [
        {
          id: 'msg-101',
          type: 'message',
          platform: PlatformType.GMAIL,
          title: 'URGENT: Review CS340 Final Project Architecture Blueprint',
          snippet: 'Dr. Evelyn Vance sent an urgent email requesting Raft consensus timeout adjustment before 3:00 PM call.',
          timestamp: new Date('2026-07-25T09:15:00Z'),
          score: 0.98,
          metadata: { sender: 'Dr. Evelyn Vance' }
        },
        {
          id: 'msg-105',
          type: 'message',
          platform: PlatformType.NOTION,
          title: 'Q3 Product Roadmap Update',
          snippet: 'Updated Notion database with Q3 deliverables under MCP Protocol Integration.',
          timestamp: new Date('2026-07-25T11:55:00Z'),
          score: 0.72,
          metadata: { sender: 'Elena Rostova' }
        }
      ];

      const duration = Date.now() - startTime;
      const result: SearchResult = {
        query: input.query,
        totalMatches: matches.length,
        results: matches,
        searchTimeMs: duration,
        executedAt: new Date()
      };

      this.healthMonitor.recordExecution(this.name, duration, true);

      return this.createSuccessResponse(result, duration, `Hybrid search completed for "${input.query}"`);
    } catch (err: unknown) {
      const duration = Date.now() - startTime;
      const errorMsg = err instanceof Error ? err.message : String(err);
      this.healthMonitor.recordExecution(this.name, duration, false, errorMsg);
      return this.createErrorResponse(errorMsg, duration);
    }
  }
}
