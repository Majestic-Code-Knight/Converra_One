# Converra One - System Architecture & Component Hierarchy

This document provides a deep technical architectural overview of **Converra One**, explaining how widgets, modules, MCP protocols, agents, and platform integrations interact within the NitroStack ecosystem.

---

## 📐 High-Level Architectural Layers

Converra One follows a clean 5-layer decoupled architecture:

```
[Layer 5: Presentation / UI] ----> NitroStack Widgets (Dashboard, Inbox, Tasks, Calendar, Search)
                                       |
[Layer 4: Protocol / MCP]   ----> MCP Server (Tools, Resources, Prompts) via Stdio / SSE
                                       |
[Layer 3: Orchestration]    ----> Master Orchestrator Agent (Workflow Routing & Pipeline Control)
                                       |
[Layer 2: Specialized AI]   ----> Collector, Priority, Summary, Task, Reply, Memory, Search Agents
                                       |
[Layer 1: Integrations]     ----> Platform Providers (Gmail, Slack, Discord, GitHub, Notion, Calendar)
```

---

## 1. Widget Hierarchy (`src/widgets`)

Widgets provide visual interactive surfaces hosted within NitroStack Studio or embedded dashboards.

```
BaseWidget (Abstract)
├── DashboardWidget       (Main unified operational hub)
├── InboxWidget           (Aggregated multi-channel messaging stream)
├── TasksWidget           (Kanban & list task management view)
├── CalendarWidget        (Interactive event timeline & meeting view)
├── BriefingWidget        (Daily AI Executive Briefing UI card)
├── SearchWidget          (Global search bar & results modal)
├── NotificationsWidget   (Urgent alerts & toast feed)
├── SidebarWidget         (Platform navigation drawer)
└── SettingsWidget        (Integration credentials & preference panel)
```

**Data Flow**:
Widgets consume normalized models (`DashboardData`, `UnifiedInboxModel`, `TaskModel`) provided via MCP Resources or direct agent tool invocations.

---

## 2. Module Hierarchy (`src/modules`)

Each module encapsulates a distinct domain capability within the application.

```
src/modules/
├── collector/            # Harvesters and normalizers for incoming raw platform events
├── priority/             # Priority scoring, urgency classification & ranking algorithms
├── summary/              # Thread summarization and executive briefing generator
├── task/                 # Action-item extraction & task management logic
├── reply/                # Context-aware reply generator & tone tuner
├── search/               # Hybrid semantic + keyword search engine
├── memory/               # Commitment memory & contextual long-term store
├── calendar/             # Scheduling assistant & calendar conflict resolver
└── orchestrator/         # Master pipeline routing agent connecting all modules
```

---

## 3. MCP Hierarchy (`src/tools`, `src/resources`, `src/prompts`)

Converra One exposes its agentic capabilities to clients through the **Model Context Protocol (MCP)** standard via NitroStack.

```
MCP Server Root (AppModule)
│
├── MCP Tools (Executable actions invoked by clients or agents)
│   ├── collect_messages        # Ingest new messages from registered platforms
│   ├── calculate_priority      # Score and rank message urgency
│   ├── summarize_thread        # Summarize conversation thread
│   ├── extract_tasks           # Parse action items from text
│   ├── generate_reply          # Generate smart response drafts
│   └── search_workspace        # Execute global workspace search
│
├── MCP Resources (Read-only state streams)
│   ├── converra://inbox/unread         # Live unread message stream
│   ├── converra://dashboard/metrics    # Current dashboard metrics JSON
│   ├── converra://tasks/pending        # Pending task list JSON
│   └── converra://calendar/today       # Today's event agenda JSON
│
└── MCP Prompts (Pre-configured agent prompt templates)
    ├── executive_briefing_prompt       # Generates morning executive summary
    ├── reply_draft_prompt              # Prompts LLM for tone-tailored responses
    └── task_extraction_prompt          # Prompts LLM for structured task JSON
```

---

## 4. Agent Hierarchy (`src/shared/abstracts/BaseAgent.abstract.ts`)

All AI Agents inherit from `BaseAgent<TInput, TOutput>` ensuring a predictable input/output pipeline and error reporting contract.

```
BaseAgent<TInput, TOutput>
├── CollectorAgent       (Inputs: void | SinceDate -> Outputs: Message[])
├── PriorityAgent        (Inputs: Message -> Outputs: PriorityResult)
├── SummaryAgent         (Inputs: Conversation -> Outputs: SummaryResult)
├── TaskExtractorAgent   (Inputs: Message -> Outputs: Task[])
├── ReplyGeneratorAgent  (Inputs: { message: Message, tone: string } -> Outputs: ReplySuggestion)
├── SearchAgent          (Inputs: SearchQuery -> Outputs: SearchResult)
├── MemoryAgent          (Inputs: Message -> Outputs: Commitment[])
└── OrchestratorAgent    (Inputs: SystemEvent -> Outputs: PipelineExecutionResult)
```

---

## 5. Integration Hierarchy (`src/shared/abstracts/BaseIntegration.abstract.ts`)

Platform connectors abstract the underlying REST/GraphQL/WebSocket APIs into a uniform interface for the rest of the application.

```
BaseIntegration (Abstract)
├── GmailIntegration      (Google APIs / OAuth2 / Gmail REST)
├── SlackIntegration      (Slack Web API / Bolt Framework)
├── DiscordIntegration    (Discord API / Bot Token)
├── GitHubIntegration     (GitHub REST / Octokit / GraphQL)
├── NotionIntegration     (Notion Client API)
└── CalendarIntegration   (Google Calendar API / iCal)
```

**Normalization**:
Every integration translates vendor-specific payloads into the standard `Message`, `Conversation`, `Task`, and `CalendarEvent` interfaces defined in `src/shared/interfaces`.
