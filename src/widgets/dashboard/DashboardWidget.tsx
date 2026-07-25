'use client';

import React from 'react';
import { BriefingWidget } from '../briefing/BriefingWidget.js';
import { PriorityMessagesWidget } from '../priority/PriorityMessagesWidget.js';
import { TaskWidget } from '../tasks/TaskWidget.js';
import { CalendarWidget } from '../calendar/CalendarWidget.js';
import { UnifiedInboxWidget } from '../inbox/UnifiedInboxWidget.js';
import { AgentActivityWidget } from '../agent/AgentActivityWidget.js';
import { PlatformStatusWidget } from '../platform/PlatformStatusWidget.js';
import { Message } from '../../shared/interfaces/Message.interface.js';

export interface DashboardWidgetProps {
  onOpenMessage?: (message: Message) => void;
  onDraftReply?: (message: Message) => void;
  onNavigateTab?: (tab: string) => void;
  onQuickAction?: (actionName: string) => void;
}

export const DashboardWidget: React.FC<DashboardWidgetProps> = ({
  onOpenMessage,
  onDraftReply,
  onNavigateTab,
  onQuickAction
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      {/* 1. Quick Actions Bar embedded in Dashboard Top */}
      <div
        style={{
          background: 'rgba(19, 25, 39, 0.7)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px' }}>⚡</span>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#f8fafc' }}>
            Quick Actions
          </span>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {[
            { name: 'Create Meeting', icon: '📅', action: 'meeting' },
            { name: 'Create Task', icon: '📋', action: 'task' },
            { name: 'Search Messages', icon: '🔍', action: 'search' },
            { name: 'Compose Reply', icon: '✏️', action: 'reply' },
            { name: 'Refresh Inbox', icon: '🔄', action: 'refresh' },
          ].map((act) => (
            <button
              key={act.name}
              onClick={() => onQuickAction ? onQuickAction(act.action) : onNavigateTab && onNavigateTab(act.action)}
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: '#cbd5e1',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <span>{act.icon}</span>
              <span>{act.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Daily AI Briefing Banner */}
      <BriefingWidget
        userName="Alex"
        onViewPriority={() => onNavigateTab && onNavigateTab('inbox')}
      />

      {/* 3. Priority Messages Grid */}
      <PriorityMessagesWidget
        onOpenMessage={onOpenMessage}
        onDraftReply={onDraftReply}
      />

      {/* 4 & 5. Tasks and Calendar 2-Column Split */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        <TaskWidget />
        <CalendarWidget />
      </div>

      {/* 6. Unified Inbox Preview */}
      <UnifiedInboxWidget
        onOpenMessage={onOpenMessage}
        onQuickReply={onDraftReply}
      />

      {/* 7 & 8. Agent Activity Execution Timeline & Platform Status */}
      <AgentActivityWidget />
      <PlatformStatusWidget />

      {/* 9. Recent Activity Stream */}
      <div
        style={{
          background: 'rgba(19, 25, 39, 0.7)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '20px'
        }}
      >
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>
          Recent Activity & Audit Trail
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: '#cbd5e1' }}>
          <div>• <strong>10:45 AM</strong> — GitHub CI/CD Pipeline #1842 passed all tests for <code>converra-one/main</code>.</div>
          <div>• <strong>10:05 AM</strong> — Priority Agent assigned score 0.96 to Prof. Evelyn Vance email.</div>
          <div>• <strong>09:16 AM</strong> — Collector Agent harvested 14 Gmail threads and 28 Slack messages.</div>
        </div>
      </div>
    </div>
  );
};
