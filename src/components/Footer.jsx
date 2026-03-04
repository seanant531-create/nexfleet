import { useState, useEffect } from 'react';

export default function Footer() {
  const [uptime, setUptime] = useState({ d: 14, h: 6, m: 32, s: 0 });

  useEffect(() => {
    const id = setInterval(() => {
      setUptime(prev => {
        let { d, h, m, s } = prev;
        s++;
        if (s >= 60) { s = 0; m++; }
        if (m >= 60) { m = 0; h++; }
        if (h >= 24) { h = 0; d++; }
        return { d, h, m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <footer style={{
      height: 28, display: 'flex', alignItems: 'center', padding: '0 24px',
      borderTop: '1px solid var(--border)', justifyContent: 'space-between',
      fontFamily: "'Share Tech Mono', monospace", fontSize: 10, color: 'var(--dim)',
      background: 'var(--panel)',
    }}>
      <span>NEXFLEET v4.2.1 · OPERATIONAL · KERNEL 6.8.0</span>
      <div style={{ display: 'flex', gap: 20 }}>
        <span>UPTIME: {uptime.d}d {pad(uptime.h)}h {pad(uptime.m)}m {pad(uptime.s)}s</span>
        <span>NODES: 8/8</span>
        <span>MQTT: CONNECTED</span>
        <span style={{ color: 'var(--accent3)' }}>● SYS NOMINAL</span>
      </div>
    </footer>
  );
}