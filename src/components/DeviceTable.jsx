import { useState } from 'react';
import { useFleet } from '../context/FleetContext.jsx';

const STATUS_MAP = {
  online:      ['badge-online',  '●', 'ONLINE'],
  warning:     ['badge-warn',    '◆', 'WARN'],
  offline:     ['badge-offline', '■',  'OFFLINE'],
  maintenance: ['badge-maint',   '⟳', 'MAINT'],
};

function StatusBadge({ status }) {
  const [cls, icon, label] = STATUS_MAP[status] || STATUS_MAP.offline;
  return <span className={`status-badge ${cls}`}>{icon} {label}</span>;
}

function MiniBar({ value }) {
  const cls = value > 70 ? 'bar-good' : value > 40 ? 'bar-warn' : 'bar-crit';
  return (
    <div className="mini-bar">
      <div className={`mini-bar-fill ${cls}`} style={{ width: `${value}%` }} />
    </div>
  );
}

const COLUMNS = ['DEVICE ID', 'TYPE', 'STATUS', 'SIGNAL', 'BATTERY', 'TEMP'];

export default function DeviceTable() {
  const { devices, selected, setSelected } = useFleet();
  const [search, setSearch] = useState('');

  const toggle = (device) =>
    setSelected(selected?.id === device.id ? null : device);

  const filtered = search
    ? devices.filter(d =>
        d.id.toLowerCase().includes(search.toLowerCase()) ||
        d.type.toLowerCase().includes(search.toLowerCase()) ||
        d.status.toLowerCase().includes(search.toLowerCase())
      )
    : devices;

  return (
    <div className="panel">
      <div className="panel-header">
        Device Registry
        <div className="panel-header-right">
          <input
            className="search-input mono"
            placeholder="Search devices…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="panel-btn">+ ADD DEVICE</button>
        </div>
      </div>

      <table className="device-table">
        <thead>
          <tr>
            {COLUMNS.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map((device) => (
            <tr
              key={device.id}
              className={selected?.id === device.id ? 'row-selected' : ''}
              onClick={() => toggle(device)}
            >
              <td><span className="device-id">{device.id}</span></td>
              <td className="cell-dim">{device.type}</td>
              <td><StatusBadge status={device.status} /></td>
              <td><MiniBar value={device.signal} /></td>
              <td><MiniBar value={device.battery} /></td>
              <td className="mono cell-dim">
                {device.temp > 0 ? `${device.temp}°F` : '—'}
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr><td colSpan={6} className="empty-row mono">No devices match "{search}"</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
