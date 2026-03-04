# NEXFLEET — Smart IoT Fleet Monitoring Platform

A production-grade IoT fleet dashboard built with React + Vite.

## Project Structure

```
nexfleet/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx              # App entry point
    ├── App.jsx               # Root layout
    ├── styles/
    │   └── global.css        # All CSS variables, animations, utility classes
    ├── data/
    │   └── fleet.js          # Mock data: devices, alerts, logs, nav, telemetry
    └── components/
        ├── Header.jsx         # Top bar with brand, status chips, clock
        ├── Sidebar.jsx        # Navigation panel
        ├── StatCards.jsx      # KPI stat cards row
        ├── LiveMap.jsx        # Asset map with device pins & tooltip
        ├── AlertsFeed.jsx     # Active alerts list
        ├── DeviceTable.jsx    # Fleet device registry table
        ├── TelemetryCharts.jsx# Sparkline trend charts
        ├── RightPanel.jsx     # Gauges, telemetry metrics, system log
        └── Footer.jsx         # Status bar
```

## Getting Started

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Features

- **Live Asset Map** — Device pins with ripple animations; click for tooltip details
- **Fleet Registry** — Full device table with status badges, signal & battery bars
- **Telemetry Trends** — SVG sparklines for throughput, temperature, uptime
- **Alerts Feed** — Color-coded critical / warning / info alerts
- **Fleet Health Gauges** — Animated SVG arc gauges
- **System Log** — Scrollable real-time log with severity highlighting
- **Live Clock** — Updates every second
- **Responsive** — Right panel hides on smaller screens
