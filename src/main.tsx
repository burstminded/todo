import React from 'react'
import ReactDOM from 'react-dom/client'
import AppProvider from './App/App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <AppProvider />
  </React.StrictMode>,
)
