import { useFleet } from '../context/FleetContext.jsx';

const SECTORS = [
  { label: 'SECTOR A', position: { top: 8, left: 8 } },
  { label: 'SECTOR B', position: { top: 8, right: 8 } },
  { label: 'SECTOR C', position: { bottom: 8, left: 8 } },
  { label: 'SECTOR D', position: { bottom: 8, right: 8 } },
];

const SCAN_LINES = [25, 50, 75];

function DevicePin({ device, isSelected, onToggle }) {
  const pinStatus = device.status === 'maintenance' ? 'maint' : device.status;

  return (
    <div
      className={`device-pin ${pinStatus}`}
      style={{ left: `${device.location[0]}%`, top: `${device.location[1]}%` }}
      title={`${device.id} - ${device.type}`}
      onClick={() => onToggle(device)}
    />
  );
}

function MapTooltip({ device }) {
  return (
    <div 
      className="map-tooltip"
      style={{
        left: `${Math.min(device.location[0] + 3, 65)}%`,
        top: `${Math.min(device.location[1] + 3, 70)}%`,
      }}
    >
      <div className="tooltip-id">{device.id}</div>
      <div className="tooltip-type">{device.type}</div>
      <div>Signal:  {device.signal}%</div>
      <div>Battery: {device.battery}%</div>
      <div>Temp:    {device.temp > 0 ? `${device.temp}°F` : '—'}</div>
    </div>
  );
}

export default function LiveMap() {
  const { devices, selected, setSelected } = useFleet();

  const toggle = (device) =>
    setSelected(selected?.id === device.id ? null : device);

  const activeDevice = selected ? devices.find(d => d.id === selected.id) : null;

  return (
    <div className="panel">
      <div className="panel-header">
        Live Asset Map
        <div className="panel-header-right">
          <button className="panel-btn">ZONES</button>
          <button className="panel-btn">ROUTES</button>
          <button className="panel-btn">FULL</button>
        </div>
      </div>

      <div className="map-panel">
        <div className="map-grid" />

        {SCAN_LINES.map((y) => (
          <div key={y} className="map-line" style={{ top: `${y}%`, left: '10%' }} />
        ))}

        {SECTORS.map(({ label, position }) => (
          <div key={label} className="map-overlay-text" style={position}>
            {label}
          </div>
        ))}

        {devices.map((device) => (
          <DevicePin
            key={device.id}
            device={device}
            isSelected={selected?.id === device.id}
            onToggle={toggle}
          />
        ))}

        {activeDevice && <MapTooltip device={activeDevice} />}
      </div>
    </div>
  );
}
