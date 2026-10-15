import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link to="/" className="logo" style={{ marginBottom: 14 }}>
              <span className="logo-mark">🚦</span>
              PulseTraffic<span style={{ color: 'var(--green)' }}>AI</span>
            </Link>
            <p className="muted" style={{ fontSize: '0.9rem', maxWidth: 320, marginTop: 10 }}>
              AI-powered dynamic traffic density control and automated emergency
              Green Corridors for smart cities — built on the cameras you already own.
            </p>
            <div style={{ marginTop: 18 }} className="badge-live">
              <span className="pulse-dot" /> All regional edge nodes operational
            </div>
          </div>

          <div>
            <h4>Platform</h4>
            <Link to="/platform">Density Detection</Link>
            <Link to="/platform">Dynamic Signals</Link>
            <Link to="/platform">Green Corridors</Link>
            <Link to="/demo">Live Simulation</Link>
          </div>

          <div>
            <h4>Resources</h4>
            <Link to="/resources">Municipal Whitepaper</Link>
            <Link to="/resources">Architecture Docs</Link>
            <Link to="/resources">Case Studies</Link>
            <Link to="/demo">Video Demo</Link>
          </div>

          <div>
            <h4>Company</h4>
            <Link to="/contact">Request a Pilot</Link>
            <Link to="/contact">Book a POC Demo</Link>
            <a href="#">Security & Compliance</a>
            <a href="#">Careers</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 PulseTraffic AI, Inc. All rights reserved.</span>
          <span className="mono">Built for municipalities · NTCIP · ONVIF · Edge-AI</span>
        </div>
      </div>
    </footer>
  )
}
