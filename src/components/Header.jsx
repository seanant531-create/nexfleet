import { useFleet } from '../context/FleetContext.jsx';

const STATUS_CHIPS = [
  { key: 'online', label: 'ONLINE', color: 'var(--accent3)' },
  { key: 'warning', label: 'WARNING', color: 'var(--warn)' },
  { key: 'offline', label: 'OFFLINE', color: 'var(--danger)' },
];

function formatTime(date) {
  return date.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

function HexLogo() {
  return (
    <div className="hex-logo">
      <div className="hex-logo-inner" />
      <span className="hex-logo-icon">⬡</span>
    </div>
  );
}

function StatusChip({ count, label, color }) {
  return (
    <div className="status-chip mono">
      <span
        className="status-dot"
        style={{ background: color, boxShadow: `0 0 8px ${color}` }}
      />
      {count} {label}
    </div>
  );
}

export default function Header() {
  const { devices, time } = useFleet();

  const counts = STATUS_CHIPS.map(({ key }) =>
    devices.filter((d) => d.status === key).length
  );

  return (
    <header className="app-header">
      <div className="header-brand">
        <HexLogo />
        <div>
          <div className="header-title">NEXFLEET</div>
          <div className="header-subtitle">IoT Operations Platform</div>
        </div>
      </div>

      <div className="header-status">
        {STATUS_CHIPS.map((chip, i) => (
          <StatusChip 
            key={chip.key}
            count={counts[i]}
            label={chip.label}
            color={chip.color}
          />
        ))}
        <div className="mono header-clock">{formatTime(time)}</div>
      </div>
    </header>
  );
}
    