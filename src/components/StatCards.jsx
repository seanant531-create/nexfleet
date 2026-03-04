import { useFleet } from '../context/FleetContext.jsx';

const STATS = [
  { label: 'Total Devices', icon: '◈', type: '',       delay: '0ms' },
  { label: 'Network Uptime', icon: '◉', type: 'green',  delay: '60ms' },
  { label: 'Active Alerts',  icon: '⚠', type: 'warn',   delay: '120ms' },
  { label: 'Data Throughput', icon: '↑', type: 'orange', delay: '180ms' },
];

export default function StatCards() {
  const { devices, alerts } = useFleet();

  const rows = [
    { value: devices.length, unit: '',      sub: '+2 this week',         trend: 'up' },
    { value: '98.7',         unit: '%',     sub: '▲ 0.3% vs last month', trend: 'up' },
    { value: alerts.length,  unit: '',      sub: '▼ resolved today',     trend: 'up' },
    { value: '4.2',          unit: ' GB/h', sub: '▲ 12% vs yesterday',   trend: 'up' },
  ];
  return (
    <div className="stat-row">
      {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={`stat-card ${stat.type}`}
            style={{ animationDelay: stat.delay }}
          >
            <div className="stat-label">{stat.label}</div>
            <div className="stat-value mono">
              {rows[i].value}<span>{rows[i].unit}</span>
            </div>
            <div className={`stat-sub ${rows[i].trend}`}>{rows[i].sub}</div>
            <div className="stat-icon">{stat.icon}</div>
          </div>
      ))}
    </div>
  );
}