import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Generator from './components/Generator.jsx'

const root = createRoot(document.getElementById('root'))

if (window.location.pathname === '/generate') {
  root.render(
    <StrictMode>
      <Generator />
    </StrictMode>,
  )
} else {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
