'use client';

import React from 'react';

export type NavTab = 'dashboard' | 'inbox' | 'tasks' | 'calendar' | 'search' | 'notifications' | 'settings';

export interface SidebarWidgetProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  unreadCount?: number;
  taskCount?: number;
  notificationCount?: number;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const SidebarWidget: React.FC<SidebarWidgetProps> = ({
  activeTab,
  onTabChange,
  unreadCount = 4,
  taskCount = 3,
  notificationCount = 2,
  isCollapsed = false,
  onToggleCollapse
}) => {
  const navItems: { id: NavTab; label: string; icon: string; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '⚡' },
    { id: 'inbox', label: 'Unified Inbox', icon: '📥', badge: unreadCount },
    { id: 'tasks', label: 'Tasks', icon: '📋', badge: taskCount },
    { id: 'calendar', label: 'Calendar', icon: '📅' },
    { id: 'search', label: 'AI Search', icon: '🔍' },
    { id: 'notifications', label: 'Notifications', icon: '🔔', badge: notificationCount },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <aside
      style={{
        width: isCollapsed ? '72px' : '260px',
        height: '100vh',
        background: 'linear-gradient(180deg, #0d1322 0%, #080c16 100%)',
        borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: isCollapsed ? '20px 10px' : '20px 16px',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxSizing: 'border-box',
        userSelect: 'none',
        zIndex: 100
      }}
    >
      {/* Brand Header */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: isCollapsed ? 'center' : 'space-between',
            paddingBottom: '20px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            marginBottom: '20px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #6366f1 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: 'bold',
                fontSize: '18px',
                boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)',
                flexShrink: 0
              }}
            >
              C
            </div>
            {!isCollapsed && (
              <div>
                <h1 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#f8fafc', letterSpacing: '-0.02em' }}>
                  Converra One
                </h1>
                <span style={{ fontSize: '10px', color: '#06b6d4', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  NitroStack AI Studio
                </span>
              </div>
            )}
          </div>
          {onToggleCollapse && !isCollapsed && (
            <button
              onClick={onToggleCollapse}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#94a3b8',
                borderRadius: '6px',
                width: '24px',
                height: '24px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px'
              }}
            >
              ◀
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: isCollapsed ? 'center' : 'space-between',
                  width: '100%',
                  padding: isCollapsed ? '12px' : '10px 14px',
                  borderRadius: '10px',
                  border: isActive ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent',
                  background: isActive
                    ? 'linear-gradient(90deg, rgba(56, 189, 248, 0.15) 0%, rgba(99, 102, 241, 0.1) 100%)'
                    : 'transparent',
                  color: isActive ? '#f8fafc' : '#94a3b8',
                  fontSize: '14px',
                  fontWeight: isActive ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  outline: 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '18px' }}>{item.icon}</span>
                  {!isCollapsed && <span>{item.label}</span>}
                </div>
                {!isCollapsed && item.badge !== undefined && item.badge > 0 && (
                  <span
                    style={{
                      background: isActive ? '#38bdf8' : 'rgba(255, 255, 255, 0.1)',
                      color: isActive ? '#0f172a' : '#cbd5e1',
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '10px'
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Profile Footer */}
      <div
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          paddingTop: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        <div style={{ position: 'relative' }}>
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
            alt="Alex Mercer"
            style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid #38bdf8' }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#10b981',
              border: '2px solid #080c16'
            }}
          />
        </div>
        {!isCollapsed && (
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#f8fafc', whiteSpace: 'nowrap' }}>
              Alex Mercer
            </div>
            <div style={{ fontSize: '11px', color: '#64748b', whiteSpace: 'nowrap' }}>
              Principal UI Architect
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
