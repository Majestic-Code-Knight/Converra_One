'use client';

import React from 'react';
import { MOCK_EVENTS } from '../mockData.js';
import { CalendarEvent } from '../../shared/interfaces/CalendarEvent.interface.js';

export interface CalendarWidgetProps {
  events?: CalendarEvent[];
  onJoinMeeting?: (meetingUrl: string) => void;
}

export const CalendarWidget: React.FC<CalendarWidgetProps> = ({
  events = MOCK_EVENTS,
  onJoinMeeting
}) => {
  return (
    <div
      style={{
        background: 'rgba(19, 25, 39, 0.7)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        padding: '20px',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '20px' }}>📅</span>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#f8fafc' }}>
              Today&apos;s Schedule & Commitments
            </h3>
            <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#94a3b8' }}>
              Synchronized by Calendar Agent from Google Calendar & extracted email invites
            </p>
          </div>
        </div>

        <span style={{ fontSize: '11px', background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', padding: '4px 10px', borderRadius: '12px', fontWeight: 600, border: '1px solid rgba(168, 85, 247, 0.3)' }}>
          {events.length} Upcoming Events
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {events.map((evt) => {
          const startTimeStr = new Date(evt.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const endTimeStr = new Date(evt.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

          return (
            <div
              key={evt.id}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderLeft: '4px solid #a855f7',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ textAlign: 'center', minWidth: '64px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#c084fc' }}>
                    {startTimeStr}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                    {endTimeStr}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#f1f5f9' }}>
                    {evt.title}
                  </div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>
                    {evt.description}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                    <span style={{ fontSize: '11px', color: '#cbd5e1', background: 'rgba(255, 255, 255, 0.06)', padding: '2px 8px', borderRadius: '4px' }}>
                      📍 {evt.location || 'Online'}
                    </span>
                    <span style={{ fontSize: '10px', color: '#a855f7', background: 'rgba(168, 85, 247, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                      🤖 Calendar Agent
                    </span>
                  </div>
                </div>
              </div>

              {evt.meetingUrl && (
                <button
                  onClick={() => onJoinMeeting && onJoinMeeting(evt.meetingUrl!)}
                  style={{
                    background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 14px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(168, 85, 247, 0.3)',
                    flexShrink: 0
                  }}
                >
                  📹 Join Meeting
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
