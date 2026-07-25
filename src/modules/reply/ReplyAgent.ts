import { BaseAgent } from '../../shared/abstracts/BaseAgent.abstract.js';
import { AgentType } from '../../shared/enums/agent.enum.js';
import { AgentResponse } from '../../shared/interfaces/AgentResponse.interface.js';
import { ReplySuggestion } from '../../shared/interfaces/ReplySuggestion.interface.js';
import { AgentHealthMonitorService } from '../../services/AgentHealthMonitor.service.js';

export interface ReplyAgentInput {
  messageId: string;
  tone?: string;
}

export class ReplyAgent extends BaseAgent<ReplyAgentInput, ReplySuggestion> {
  public readonly name = 'ReplyAgent';
  public readonly type = AgentType.REPLY;
  public readonly description = 'Generates context-aware smart responses across multiple tones';

  private healthMonitor: AgentHealthMonitorService;

  constructor() {
    super();
    this.healthMonitor = AgentHealthMonitorService.getInstance();
  }

  public async execute(input: ReplyAgentInput): Promise<AgentResponse<ReplySuggestion>> {
    const startTime = Date.now();
    try {
      const toneMap: Record<string, 'professional' | 'casual' | 'concise' | 'detailed' | 'decline'> = {
        Professional: 'professional',
        Friendly: 'casual',
        Formal: 'professional',
        Short: 'concise',
        Detailed: 'detailed'
      };

      const mappedTone = toneMap[input.tone || 'Professional'] || 'professional';

      const draft =
        `Hi Dr. Vance,\n\nI have reviewed Section 4.2 of the CS340 architecture blueprint and adjusted the Raft consensus timeout parameters accordingly.\n\n3:00 PM works great for our call.\n\nBest regards,\nAlex Mercer`;

      const result: ReplySuggestion = {
        messageId: input.messageId,
        conversationId: 'conv-01',
        suggestions: [
          {
            id: 'opt-01',
            tone: mappedTone,
            suggestedText: draft,
            confidenceScore: 0.94
          }
        ],
        recommendedOptionId: 'opt-01',
        generatedAt: new Date()
      };

      const duration = Date.now() - startTime;
      this.healthMonitor.recordExecution(this.name, duration, true);

      return this.createSuccessResponse(result, duration, `Generated ${mappedTone} smart reply draft`);
    } catch (err: unknown) {
      const duration = Date.now() - startTime;
      const errorMsg = err instanceof Error ? err.message : String(err);
      this.healthMonitor.recordExecution(this.name, duration, false, errorMsg);
      return this.createErrorResponse(errorMsg, duration);
    }
  }
}
