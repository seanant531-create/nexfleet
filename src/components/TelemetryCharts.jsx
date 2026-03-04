import { useFleet } from '../context/FleetContext.jsx';

function Sparkline({ data, color = '#00e5ff', height = 55 }) {
  const w = 300;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min + 1;

  const toPoint = (value, index) => {
    const x = (index / (data.length - 1)) * w;
    const y = height - ((value - min) / range) * height * 0.9 - height * 0.05;
    return { x, y };
  };

  const points = data.map((v, i) => toPoint(v, i));
  const polyline = points.map(({ x, y }) => `${x},${y}`).join(' ');
  const areaPath =
    `M0,${height} ` +
    points.map(({ x, y }) => `L${x},${y}`).join(' ') +
    ` L${w},${height} Z`;
  
  const gradientId = `grad-${color.replace('#', '')}`;

  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="sparkline-svg">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gradientId})`} />
      <polyline
        points={polyline}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const TIME_LABELS = ['-20m', '-15m', '-10m', '-5m', 'NOW'];

export default function TelemetryCharts() {
  const { sparklines } = useFleet();

  const charts = [
    { label: 'Network Throughput (Mbps)',  data: sparklines.net,  color: '#00e5ff' },
    { label: 'Avg Fleet Temperature (°F)', data: sparklines.temp, color: '#ff6b35' },
    { label: 'Fleet Uptime (%)',           data: sparklines.up,   color: '#7fff00' },
  ];
  return (
    <div className="panel">
      <div className="panel-header">Telemetry Trends</div>
      <div className="panel-body">
        {charts.map((chart, i) => (
          <div key={chart.label} className={i < charts.length - 1 ? 'chart-block' : ''}>
            <div className="chart-title">{chart.label}</div>
            <div className="chart-area" style={{ height: 55 }}>
              <Sparkline data={chart.data} color={chart.color} height={55} />
            </div>
            <div className="chart-labels">
              {TIME_LABELS.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}