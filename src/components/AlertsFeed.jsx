import { useFleet } from '../context/FleetContext.jsx';

export default function AlertsFeed() {
  const { alerts, dismissAlert } = useFleet();

  return (
    <div className="panel">
      <div className="panel-header">
        Active Alerts
        <span className="mono alert-count">{alerts.length} OPEN</span>
      </div>

      <div className="alert-list-wrap">
        {alerts.length === 0 ? (
          <div className="alert-empty mono">No active alerts</div>
        ) : (
          <div className="alert-list">
            {alerts.map((alert, i) => (
              <div
                key={i}
                className={`alert-item alert-${alert.type}`}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="alert-icon">{alert.icon}</div>
                <div style={{ flex: 1 }}>
                  <div className="alert-title">{alert.title}</div>
                  <div className="alert-meta">{alert.meta}</div>
                </div>
                <button className="alert-dismiss" onClick={() => dismissAlert(i)} title="Dismiss">✕</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}