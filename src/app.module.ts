import { McpApp, Module, ConfigModule } from '@nitrostack/core';
import { SystemHealthCheck } from './health/system.health.js';

/**
 * Converra One - Root Application Module
 * 
 * Main module that bootstraps the Converra One MCP server.
 * Registers widgets, resources, tools, health checks, and shared modules.
 * Integrations and AI agent modules are scaffolded and ready to be plugged in for Phase 2.
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
    // Integration modules will be enabled in Phase 2:
    // GmailModule, SlackModule, DiscordModule, GithubModule, NotionModule, CalendarModule
  ],
  providers: [
    // Health Checks
    SystemHealthCheck
  ]
})
export class AppModule {}
