import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  DEVICES as INIT_DEVICES,
  ALERTS as INIT_ALERTS,
  LOGS as INIT_LOGS,
  TELEMETRY as INIT_TELEMETRY,
  SPARKLINES as INIT_SPARKLINES,
} from '../data/fleet.js';

const FleetContext = createContext();

export function useFleet() {
  return useContext(FleetContext);
}

function clamp(val, min, max) {
  return Math.min(max, Math.max(min, val));
}

function fluctuate(value, min, max, delta) {
  return clamp(Math.round(value + (Math.random() - 0.5) * 2 * delta), min, max);
}

const LOG_TEMPLATES = [
  { m: 'Fleet heartbeat sync completed', c: 'ok' },
  { m: 'VHC-0042 telemetry received', c: '' },
  { m: 'SEN-0018 temperature nominal', c: 'ok' },
  { m: 'VHC-0219 route checkpoint logged', c: '' },
  { m: 'VHC-0107 battery level declining', c: 'warn' },
  { m: 'Network throughput spike detected', c: 'warn' },
  { m: 'SEN-0027 signal strength fluctuating', c: '' },
  { m: 'VHC-0451 fuel level check passed', c: 'ok' },
  { m: 'VHC-0334 recovery ping sent', c: 'err' },
  { m: 'System metrics within threshold', c: 'ok' },
  { m: 'MQTT broker keepalive acknowledged', c: '' },
  { m: 'VHC-0502 maintenance timer updated', c: '' },
];

function newLogEntry() {
  const now = new Date();
  const t = now.toLocaleTimeString('en-US', {
    hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
  const template = LOG_TEMPLATES[Math.floor(Math.random() * LOG_TEMPLATES.length)];
  return { t, ...template };
}

export function FleetProvider({ children }) {
  const [devices, setDevices] = useState(INIT_DEVICES);
  const [alerts, setAlerts] = useState(INIT_ALERTS);
  const [logs, setLogs] = useState(INIT_LOGS);
  const [telemetry, setTelemetry] = useState(INIT_TELEMETRY);
  const [sparklines, setSparklines] = useState(INIT_SPARKLINES);
  const [selected, setSelected] = useState(null);
  const [time, setTime] = useState(new Date());

  // Clock — ticks every second
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // Sparkline data — rolls forward every 3s
  useEffect(() => {
    const id = setInterval(() => {
      setSparklines(prev => ({
        net:  [...prev.net.slice(1),  fluctuate(prev.net[prev.net.length - 1], 55, 100, 5)],
        temp: [...prev.temp.slice(1), fluctuate(prev.temp[prev.temp.length - 1], 65, 85, 3)],
        up:   [...prev.up.slice(1),   Math.random() > 0.15 ? 100 : fluctuate(prev.up[prev.up.length - 1], 95, 100, 2)],
      }));
    }, 3000);
    return () => clearInterval(id);
  }, []);

  // Telemetry values — fluctuate every 4s
  useEffect(() => {
    const id = setInterval(() => {
      setTelemetry(prev => prev.map(item => {
        switch (item.label) {
          case 'CPU Load': {
            const val = fluctuate(item.val, 15, 80, 5);
            return { ...item, val, fill: val };
          }
          case 'Memory': {
            const val = fluctuate(item.val, 40, 85, 3);
            return { ...item, val, fill: val };
          }
          case 'Latency': {
            const val = fluctuate(item.val, 5, 50, 4);
            return { ...item, val, fill: clamp(val * 2, 0, 100) };
          }
          case 'Packet Loss': {
            const val = Math.max(0, +(item.val + (Math.random() - 0.5) * 0.4).toFixed(1));
            return { ...item, val, fill: clamp(val * 10, 0, 100) };
          }
          default: return item;
        }
      }));
    }, 4000);
    return () => clearInterval(id);
  }, []);

  // Device signal/battery — drifts every 5s
  useEffect(() => {
    const id = setInterval(() => {
      setDevices(prev => prev.map(d => {
        if (d.status === 'offline') return d;
        return {
          ...d,
          signal: d.status === 'maintenance' ? d.signal : fluctuate(d.signal, 20, 100, 3),
          battery: Math.max(1, d.battery + (Math.random() > 0.7 ? -1 : 0)),
          temp: d.temp > 0 ? fluctuate(d.temp, 30, 95, 2) : 0,
        };
      }));
    }, 5000);
    return () => clearInterval(id);
  }, []);

  // Log stream — new entry every 7s
  useEffect(() => {
    const id = setInterval(() => {
      setLogs(prev => [newLogEntry(), ...prev.slice(0, 14)]);
    }, 7000);
    return () => clearInterval(id);
  }, []);

  const dismissAlert = useCallback((index) => {
    setAlerts(prev => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <FleetContext.Provider value={{
      devices, alerts, logs, telemetry, sparklines,
      selected, setSelected, time, dismissAlert,
    }}>
      {children}
    </FleetContext.Provider>
  );
}
