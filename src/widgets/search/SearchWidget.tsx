'use client';

import React, { useState } from 'react';
import { MOCK_SEARCH_QUERY_RESPONSE } from '../mockData.js';

export interface SearchWidgetProps {
  onOpenMessage?: (messageId: string) => void;
}

export const SearchWidget: React.FC<SearchWidgetProps> = ({ onOpenMessage }) => {
  const [query, setQuery] = useState<string>('What did my professor say about the project?');
  const [hasSearched, setHasSearched] = useState<boolean>(true);

  const sampleQueries = [
    'What did my professor say about the project?',
    'Show memory leak discussion on worker node 3',
    'Find Figma tokens updated by Marcus',
    'List all urgent tasks due today'
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setHasSearched(true);
    }
  };

  return (
    <div
      style={{
        background: 'rgba(19, 25, 39, 0.7)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(56, 189, 248, 0.25)',
        borderRadius: '20px',
        padding: '24px',
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '24px' }}>🔍</span>
        <div>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#f8fafc' }}>
            Conversational AI Search & Knowledge Engine
          </h3>
          <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#94a3b8' }}>
            Powered by Search Agent • Hybrid Vector & Keyword Search across Gmail, Slack, Discord, GitHub, Notion
          </p>
        </div>
      </div>

      {/* Natural Language Input */}
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px' }}>
        <div style={{ position: 'relative', flexGrow: 1 }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything about your emails, Slack threads, GitHub PRs..."
            style={{
              width: '100%',
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              borderRadius: '12px',
              padding: '14px 18px',
              color: '#f8fafc',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box',
              boxShadow: '0 0 15px rgba(56, 189, 248, 0.15)'
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '12px',
            padding: '0 24px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(6, 182, 212, 0.3)'
          }}
        >
          Search AI
        </button>
      </form>

      {/* Suggested Quick Prompts */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '11px', color: '#64748b', alignSelf: 'center' }}>Suggested:</span>
        {sampleQueries.map((q) => (
          <button
            key={q}
            onClick={() => { setQuery(q); setHasSearched(true); }}
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '4px 12px',
              color: '#94a3b8',
              fontSize: '11px',
              cursor: 'pointer'
            }}
          >
            &quot;{q}&quot;
          </button>
        ))}
      </div>

      {/* Search Results Display */}
      {hasSearched && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Synthesized Answer Box */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
              border: '1px solid rgba(6, 182, 212, 0.25)',
              borderRadius: '14px',
              padding: '18px',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '16px' }}>💡</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#38bdf8' }}>
                  AI Synthesized Answer
                </span>
              </div>
              <span style={{ fontSize: '10px', background: 'rgba(56, 189, 248, 0.2)', color: '#7dd3fc', padding: '2px 8px', borderRadius: '10px', fontFamily: 'monospace' }}>
                🤖 Search Agent (0.18s)
              </span>
            </div>

            <p style={{ margin: 0, fontSize: '14px', color: '#e2e8f0', lineHeight: 1.6 }}>
              {MOCK_SEARCH_QUERY_RESPONSE.answer}
            </p>
          </div>

          {/* Sources Section */}
          <div>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '13px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>
              Primary Sources & Citations
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {MOCK_SEARCH_QUERY_RESPONSE.sources.map((src) => (
                <div
                  key={src.id}
                  onClick={() => onOpenMessage && onOpenMessage(src.id)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '12px',
                    padding: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '14px' }}>✉️</span>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#f1f5f9' }}>
                        {src.subject}
                      </span>
                      <span style={{ fontSize: '10px', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', padding: '1px 6px', borderRadius: '4px' }}>
                        {(src.relevanceScore * 100).toFixed(0)}% Match
                      </span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
                      From: {src.sender} • {src.timestamp}
                    </div>
                    <div style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '4px', fontStyle: 'italic' }}>
                      {src.snippet}
                    </div>
                  </div>

                  <button
                    style={{
                      background: 'rgba(56, 189, 248, 0.1)',
                      border: '1px solid rgba(56, 189, 248, 0.25)',
                      color: '#38bdf8',
                      fontSize: '12px',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      flexShrink: 0
                    }}
                  >
                    View Thread
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
