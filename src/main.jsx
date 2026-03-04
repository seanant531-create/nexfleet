import React from 'react'
import ReactDOM from 'react-dom/client'
import { FleetProvider } from './context/FleetContext.jsx'
import App from './App.jsx'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FleetProvider>
      <App />
    </FleetProvider>
  </React.StrictMode>
)
