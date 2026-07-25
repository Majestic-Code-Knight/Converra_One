import { McpApp, Module, ConfigModule } from '@nitrostack/core';
import { SystemHealthCheck } from './health/system.health.js';
import { ConverraController } from './controllers/Converra.controller.js';

import {
  DashboardWorkflowService,
  InboxWorkflowService,
  SearchWorkflowService,
  ReplyWorkflowService,
  CalendarWorkflowService,
  TaskWorkflowService
} from './workflows/index.js';

import {
  CollectorAgent,
  PriorityAgent,
  SummaryAgent,
  TaskAgent,
  ReplyAgent,
  CalendarAgent,
  MemoryAgent,
  SearchAgent,
  OrchestratorAgent
} from './modules/index.js';

import {
  ConnectorManagerService,
  AgentEventBusService,
  AgentMemoryCacheService,
  AgentHealthMonitorService
} from './services/index.js';

/**
 * Converra One - Root Enterprise Application Module
 * 
 * Bootstraps the Converra One production MCP Server & Agentic AI Orchestration engine.
 */
@McpApp({
  module: AppModule,
  server: {
    name: 'converra-one-mcp',
    version: '1.0.0'
  },
  logging: {
    level: 'info'
  }
})
@Module({
  name: 'app',
  description: 'Converra One - Intelligent Unified Communication Workspace',
  imports: [
    ConfigModule.forRoot()
  ],
  providers: [
    // MCP Controller (Registers all @Tool, @Resource, @Prompt, @Widget handlers for NitroStack Studio)
    ConverraController,

    // System Telemetry
    SystemHealthCheck,

    // Core Infrastructure Services
    ConnectorManagerService,
    AgentEventBusService,
    AgentMemoryCacheService,
    AgentHealthMonitorService,

    // Specialized AI Agents
    CollectorAgent,
    PriorityAgent,
    SummaryAgent,
    TaskAgent,
    ReplyAgent,
    CalendarAgent,
    MemoryAgent,
    SearchAgent,
    OrchestratorAgent,

    // Workflow Services
    DashboardWorkflowService,
    InboxWorkflowService,
    SearchWorkflowService,
    ReplyWorkflowService,
    CalendarWorkflowService,
    TaskWorkflowService
  ]
})
export class AppModule {}
