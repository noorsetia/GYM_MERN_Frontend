// Opt into React Router v7 future flags to silence upgrade warnings and opt-in
// to upcoming behaviors. These are safe to enable now and will remove console
// warnings about future changes.
window.__react_router_future__ = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
};

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)