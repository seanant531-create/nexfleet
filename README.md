# NEXFLEET — Real-Time IoT Fleet Monitoring Dashboard

A fully interactive, real-time IoT fleet operations dashboard built from scratch with **React 18** and **Vite**. Simulates a live command center for monitoring vehicles, sensors, and infrastructure — with streaming telemetry, an interactive asset map, and a dark-themed ops UI.

> **Live data. No backend required.** All telemetry, device metrics, and system logs update in real time via simulated data streams powered by React Context.

---

## Features

| Feature                   | Description                                                                                                                       |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Live Telemetry Charts** | SVG sparkline charts that roll forward every 3 seconds with new data points for network throughput, fleet temperature, and uptime |
| **Interactive Asset Map** | Click device pins to view live signal, battery, and temperature readings with positioned tooltips                                 |
| **Device Registry**       | Sortable table with real-time signal/battery bars, status badges, and **full-text search** filtering by ID, type, or status       |
| **Alert Management**      | Active alerts feed with severity indicators (critical, warning, info) and **dismiss** functionality                               |
| **Fleet Health Gauges**   | Animated SVG arc gauges computing live averages from actual device data — not hardcoded values                                    |
| **System Telemetry**      | CPU load, memory, latency, and packet loss metrics that fluctuate in real time                                                    |
| **Streaming System Log**  | New log entries generated every 7 seconds with live timestamps                                                                    |
| **Live Uptime Counter**   | Footer uptime ticks every second                                                                                                  |
| **Responsive Layout**     | Three breakpoints (1200px, 900px, 600px) — sidebar and right panel collapse gracefully                                            |

## Tech Stack

- **React 18** — Functional components, hooks, Context API for global state
- **Vite** — Fast HMR development and optimized production builds
- **Pure CSS** — Custom properties, CSS Grid, Flexbox, keyframe animations — zero CSS frameworks
- **SVG** — Hand-built sparkline charts and arc gauges — no charting libraries

## Architecture

```
src/
├── main.jsx                    # Entry point — wraps App in FleetProvider
├── App.jsx                     # Root layout shell
├── context/
│   └── FleetContext.jsx        # Global state + real-time data simulation engine
├── data/
│   └── fleet.js                # Seed data: devices, alerts, logs, nav, telemetry
├── styles/
│   └── global.css              # Design system: variables, animations, all component styles
└── components/
    ├── Header.jsx              # Brand bar, live status chips, real-time clock
    ├── Sidebar.jsx             # Navigation with alert/diagnostic badges
    ├── StatCards.jsx            # KPI cards — device count, uptime, alerts, throughput
    ├── LiveMap.jsx              # Grid-based asset map with clickable device pins
    ├── AlertsFeed.jsx           # Dismissible alert feed with severity levels
    ├── DeviceTable.jsx          # Searchable device registry with live metric bars
    ├── TelemetryCharts.jsx      # Rolling SVG sparkline trend charts
    ├── RightPanel.jsx           # Fleet health gauges, telemetry grid, streaming log
    └── Footer.jsx               # System status bar with live uptime counter
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## What This Demonstrates

- **State management at scale** — Single React Context manages 6+ live data streams (devices, alerts, logs, telemetry, sparklines, selections) with independent update intervals
- **Real-time UI patterns** — Multiple `setInterval` hooks coordinated to simulate realistic IoT data without performance degradation
- **Component architecture** — Clean separation of concerns across 9 focused components, each consuming only the context slices they need
- **CSS systems thinking** — A cohesive design system with 13 CSS custom properties, 6 keyframe animations, and consistent spacing/typography scales — all in one stylesheet
- **SVG data visualization** — Sparkline charts and arc gauges built from raw SVG math (no D3, no Recharts)
- **Interactive data patterns** — Cross-component selection sync (map ↔ table), search filtering, alert dismissal with empty states

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
