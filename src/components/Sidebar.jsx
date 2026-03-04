import { NAV } from '../data/fleet.js';

export default function Sidebar({ activeNav, setActiveNav }) {
  return (
    <nav style={{
      width: 220, borderRight: '1px solid var(--border)',
      background: 'var(--panel)', padding: '16px 0',
      display: 'flex', flexDirection: 'column', gap: 4,
      animation: 'slideIn 0.5s ease',
    }}>
      <div style={{ padding: '8px 16px 4px', fontSize: 10, letterSpacing: 4, color: 'var(--dim)', textTransform: 'uppercase' }}>
        Navigation
      </div>

      {NAV.map((n, i) => (
        <div key={i}
          onClick={() => setActiveNav(i)}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '9px 16px', cursor: 'pointer', transition: 'all 0.2s',
            borderLeft: `2px solid ${i === activeNav ? 'var(--accent)' : 'transparent'}`,
            background: i === activeNav ? 'rgba(0,229,255,0.08)' : 'transparent',
            color: i === activeNav ? 'var(--accent)' : 'var(--text)',
            fontSize: 13, fontWeight: 500, letterSpacing: 1,
          }}
          onMouseEnter={e => { if (i !== activeNav) e.currentTarget.style.background = 'rgba(0,229,255,0.05)'; }}
          onMouseLeave={e => { if (i !== activeNav) e.currentTarget.style.background = 'transparent'; }}
        >
          <span style={{ width: 18, textAlign: 'center', fontSize: 14 }}>{n.icon}</span>
          {n.label}
          {n.badge && (
            <span style={{
              marginLeft: 'auto',
              fontFamily: "'Share Tech Mono', monospace", fontSize: 10,
              padding: '1px 6px', borderRadius: 1,
              background: n.badgeType === 'warn' ? 'rgba(255,179,0,0.2)' : 'rgba(255,23,68,0.2)',
              color: n.badgeType === 'warn' ? 'var(--warn)' : 'var(--danger)',
              border: `1px solid ${n.badgeType === 'warn' ? 'rgba(255,179,0,0.3)' : 'rgba(255,23,68,0.3)'}`,
            }}>
              {n.badge}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
