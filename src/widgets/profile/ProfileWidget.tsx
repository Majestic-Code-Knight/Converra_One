'use client';

import React from 'react';

export interface ProfileWidgetProps {
  userName?: string;
  userRole?: string;
  userEmail?: string;
  statusText?: string;
  onOpenSettings?: () => void;
}

export const ProfileWidget: React.FC<ProfileWidgetProps> = ({
  userName = 'Alex Mercer',
  userRole = 'Principal Systems Architect',
  userEmail = 'alex.mercer@converra.io',
  statusText = 'Focus Mode • In CS340 Blueprint Sync',
  onOpenSettings
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <img
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
          alt={userName}
          style={{ width: '56px', height: '56px', borderRadius: '50%', border: '2px solid #38bdf8' }}
        />
        <div style={{ flexGrow: 1 }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#f8fafc' }}>
            {userName}
          </h3>
          <div style={{ fontSize: '12px', color: '#38bdf8', fontWeight: 600, marginTop: '2px' }}>
            {userRole}
          </div>
          <div style={{ fontSize: '11px', color: '#64748b', marginTop: '1px' }}>
            {userEmail}
          </div>
          <div style={{ fontSize: '11px', color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '2px 8px', borderRadius: '10px', display: 'inline-block', marginTop: '6px' }}>
            ● {statusText}
          </div>
        </div>

        {onOpenSettings && (
          <button
            onClick={onOpenSettings}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#cbd5e1',
              borderRadius: '8px',
              padding: '8px 14px',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            ⚙️ Preferences
          </button>
        )}
      </div>
    </div>
  );
};
