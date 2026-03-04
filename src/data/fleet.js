export const DEVICES = [
  { id: "VHC-0042", type: "Cargo Truck",      status: "online",      signal: 94, battery: 87, temp: 72, location: [22, 35] },
  { id: "VHC-0107", type: "Delivery Van",     status: "warning",     signal: 61, battery: 23, temp: 91, location: [55, 55] },
  { id: "VHC-0219", type: "Refriger. Unit",   status: "online",      signal: 98, battery: 95, temp: 38, location: [75, 25] },
  { id: "VHC-0334", type: "Cargo Truck",      status: "offline",     signal:  0, battery: 12, temp:  0, location: [40, 70] },
  { id: "VHC-0451", type: "Tanker",           status: "online",      signal: 88, battery: 76, temp: 69, location: [85, 65] },
  { id: "VHC-0502", type: "Utility Van",      status: "maintenance", signal: 45, battery: 58, temp: 74, location: [15, 80] },
  { id: "SEN-0018", type: "Warehouse Sensor", status: "online",      signal: 100, battery: 100, temp: 68, location: [60, 45] },
  { id: "SEN-0027", type: "Cold Storage",     status: "warning",     signal: 72, battery: 44, temp: 34, location: [30, 50] },
];

export const ALERTS = [
  { type: "crit", icon: "⚠", title: "VHC-0334 — Connection Lost",     meta: "02:14 ago · GPS signal absent · Last seen: Zone 4B",            time: "02:14" },
  { type: "warn", icon: "🔋", title: "VHC-0107 — Low Battery (23%)",  meta: "08:31 ago · Projected shutdown in 47 min · Route #14",          time: "08:31" },
  { type: "warn", icon: "🌡", title: "VHC-0107 — High Engine Temp",   meta: "12:05 ago · 91°F exceeds threshold · Alert sent to driver",     time: "12:05" },
  { type: "info", icon: "🔧", title: "VHC-0502 — Maintenance Mode",   meta: "1h 20m ago · Scheduled service · Bay 7 · ETA: 2h",             time: "1h 20m" },
  { type: "info", icon: "📶", title: "SEN-0027 — Weak Signal",        meta: "2h 05m ago · 72% signal · Check antenna positioning",           time: "2h 05m" },
];

export const LOGS = [
  { t: "14:32:07", m: "VHC-0042 heartbeat received",              c: "ok" },
  { t: "14:32:01", m: "VHC-0107 battery critical threshold",      c: "warn" },
  { t: "14:31:58", m: "VHC-0219 route updated: Zone 3→5",         c: "" },
  { t: "14:31:44", m: "SEN-0027 low signal warning",              c: "warn" },
  { t: "14:31:30", m: "VHC-0451 checkpoint logged",               c: "" },
  { t: "14:31:12", m: "VHC-0334 connection timeout",              c: "err" },
  { t: "14:30:55", m: "VHC-0502 entered maintenance mode",        c: "" },
  { t: "14:30:41", m: "SEN-0018 temp within normal range",        c: "ok" },
  { t: "14:30:28", m: "Fleet sync completed: 8/8 polled",         c: "ok" },
];

export const NAV = [
  { icon: "◈", label: "Fleet Overview", badge: null },
  { icon: "◉", label: "Live Map",       badge: null },
  { icon: "⊡", label: "Analytics",     badge: null },
  { icon: "⚠", label: "Alerts",        badge: "3", badgeType: "crit" },
  { icon: "☰", label: "Diagnostics",   badge: "2", badgeType: "warn" },
  { icon: "◷", label: "History",       badge: null },
  { icon: "⊞", label: "Devices",       badge: null },
  { icon: "⚙", label: "Settings",      badge: null },
];

export const TELEMETRY = [
  { label: "CPU Load",    val: 34,  unit: "%",  fill: 34, color: "#00e5ff" },
  { label: "Memory",      val: 61,  unit: "%",  fill: 61, color: "#ff6b35" },
  { label: "Latency",     val: 12,  unit: "ms", fill: 24, color: "#7fff00" },
  { label: "Packet Loss", val: 0.3, unit: "%",  fill: 3,  color: "#ffb300" },
];

export const SPARKLINES = {
  net:  [62,71,68,82,76,90,85,91,88,95,87,92,89,94,96,91,88,93,97,95],
  temp: [68,70,72,69,74,76,73,71,78,80,77,74,72,75,79,76,73,71,74,77],
  up:   [99,100,99,98,100,100,97,99,100,99,100,98,99,100,100,99,97,100,99,98],
};
