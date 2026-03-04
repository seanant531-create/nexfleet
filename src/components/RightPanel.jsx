import { useFleet } from '../context/FleetContext.jsx';

function Gauge({ value, max = 100, color, label, size = 60 }) {
  const r = 22;
  const cx = size / 2;
  const cy = size / 2;
  const circ = 2 * Math.PI * r;
  const arc = circ * 0.75;
  const offset = arc - (value / max) * arc;

  return (
    <div className="gauge-wrap">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={cx} cy={cy} r={r}
          fill="none" stroke="#1a2540" strokeWidth="4"
          strokeDasharray={`${arc} ${circ}`}
          transform={`rotate(135 ${cx} ${cy})`}
        />
        <circle
          cx={cx} cy={cy} r={r}
          fill="none" stroke={color} strokeWidth="4"
          strokeDasharray={`${arc} ${circ}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(135 ${cx} ${cy})`}
          style={{
            transition: 'stroke-dashoffset 1s ease',
            filter: `drop-shadow(0 0 4px ${color})`,
          }}
        />
        <text
          x={cx} y={cy + 5}
          textAnchor="middle" fontSize="11"
          fontFamily="Share Tech Mono" fill="#fff"
        >
          {value}
        </text>
      </svg>
      <div className="gauge-label">{label}</div>
    </div>
  );
}

function TelemetryItem({ label, val, unit, fill, color }) {
  return (
    <div className="tele-item">
      <div className="tele-label">{label}</div>
      <div className="tele-val mono">
        {val}<small>{unit}</small>
      </div>
      <div className="tele-bar">
        <div className="tele-fill" style={{ width: `${fill}%`, background: color }} />
      </div>
    </div>
  );
}

function LogEntry({ time, message, color }) {
  return (
    <div className="log-entry">
      <span className="log-time">{time}</span>
      <span className={`log-msg ${color}`}>{message}</span>
    </div>
  );
}

export default function RightPanel() {
  const { devices, logs, telemetry } = useFleet();

  const onlineCount = devices.filter((d) => d.status === 'online').length;
  const activeDevices = devices.filter(d => d.status !== 'offline');
  const avgSignal = Math.round(activeDevices.reduce((s, d) => s + d.signal, 0) / activeDevices.length);
  const avgBattery = Math.round(devices.reduce((s, d) => s + d.battery, 0) / devices.length);

  const gauges = [
    { value: onlineCount, max: devices.length, color: '#7fff00', label: 'ONLINE' },
    { value: avgSignal,   max: 100,            color: '#00e5ff', label: 'SIGNAL' },
    { value: avgBattery,  max: 100,            color: '#ff6b35', label: 'BATTERY' },
  ];

  return (
    <div className="right-panel">
      <div className="rp-section">
        <div className="rp-title">Fleet Health</div>
        <div className="gauge-row">
          {gauges.map((g) => (
            <Gauge key={g.label} {...g} />
          ))}
        </div>
      </div>

      <div className="rp-section">
        <div className="rp-title">Telemetry</div>
        <div className="telemetry-grid">
          {telemetry.map((t, i) => (
            <TelemetryItem key={i} {...t} />
          ))}
        </div>
      </div>

      <div className="rp-section rp-log-section">
        <div className="rp-title">
          System Log <span className="cursor">_</span>
        </div>
        <div className="log-list">
          {logs.map((log, i) => (
            <LogEntry key={i} time={log.t} message={log.m} color={log.c} />
           ))}
        </div>
      </div>
    </div>
  );
}
