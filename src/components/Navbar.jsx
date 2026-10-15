import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { NAV } from '../data/content'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <Link to="/" className="logo" onClick={() => setOpen(false)}>
          <span className="logo-mark">🚦</span>
          PulseTraffic<span style={{ color: 'var(--green)' }}>AI</span>
        </Link>

        <div className="nav-links">
          {NAV.slice(0, 4).map((n) => (
            <NavLink key={n.to} to={n.to} className={({ isActive }) => (isActive ? 'active' : '')}>
              {n.label}
            </NavLink>
          ))}
          <Link to="/contact" className="btn btn-primary btn-sm" style={{ marginLeft: 8 }}>
            Request Pilot
          </Link>
        </div>

        <button className="nav-toggle" aria-label="Menu" onClick={() => setOpen(!open)}
          style={{ display: 'none' }}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="container" style={{ paddingBottom: 16, display: 'grid', gap: 4 }}>
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} onClick={() => setOpen(false)}
              style={{ padding: '10px 12px', borderRadius: 8, color: 'var(--muted)' }}>
              {n.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  )
}
