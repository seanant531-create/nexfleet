import { useState } from 'react';
import Header from './components/Header.jsx';
import Sidebar       from './components/Sidebar.jsx';
import StatCards     from './components/StatCards.jsx';
import LiveMap       from './components/LiveMap.jsx';
import AlertsFeed    from './components/AlertsFeed.jsx';
import DeviceTable   from './components/DeviceTable.jsx';
import TelemetryCharts from './components/TelemetryCharts.jsx';
import RightPanel    from './components/RightPanel.jsx';
import Footer        from './components/Footer.jsx';

export default function App() {
  const [activeNav, setActiveNav] = useState(0);

  return (
    <>
      {/* Background effects */}
      <div className="grid-bg" />
      <div className="scanline" />

      <div className="app">
        <Header />

        <div className="main">
          <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />

          <div className="content">
            <StatCards />

            <div className="panel-row-3">
              <LiveMap />
              <AlertsFeed />
            </div>

            <div className="panel-row">
              <DeviceTable />
              <TelemetryCharts />
            </div>
          </div>

          <RightPanel />
        </div>

        <Footer />
      </div>
    </>
  );
}
