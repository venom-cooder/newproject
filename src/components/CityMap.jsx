import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { INTERSECTIONS } from '../data/content'

// corridor route for emergency mode (intersection ids in order)
const CORRIDOR = ['A', 'D', 'E', 'C']

function light(mode, id, tick) {
  if (mode === 'emergency' && CORRIDOR.includes(id)) return 'var(--green)'
  // pseudo-random but stable-ish per tick for "live" feel
  const seed = (id.charCodeAt(0) * 7 + tick) % 10
  if (seed < 4) return 'var(--green)'
  if (seed < 6) return 'var(--amber)'
  return 'var(--red)'
}

export default function CityMap() {
  const [mode, setMode] = useState('standard')
  const [tick, setTick] = useState(0)
  const [selected, setSelected] = useState(null)
  const [counts, setCounts] = useState(() =>
    Object.fromEntries(INTERSECTIONS.map((i) => [i.id, 20 + Math.floor(Math.random() * 40)]))
  )

  useEffect(() => {
    const t = setInterval(() => {
      setTick((x) => x + 1)
      setCounts((prev) => {
        const next = { ...prev }
        INTERSECTIONS.forEach((i) => {
          const drift = Math.round((Math.random() - 0.5) * 10)
          let v = prev[i.id] + drift
          if (mode === 'emergency' && CORRIDOR.includes(i.id)) v = Math.max(2, v - 6)
          next[i.id] = Math.max(3, Math.min(96, v))
        })
        return next
      })
    }, 1400)
    return () => clearInterval(t)
  }, [mode])

  const sel = INTERSECTIONS.find((i) => i.id === selected)

  // build corridor path points
  const pts = CORRIDOR.map((id) => INTERSECTIONS.find((i) => i.id === id)).filter(Boolean)
  const pathD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')

  return (
    <div className="glass map-wrap" style={{ padding: 20 }}>
      <div className="kicker-row" style={{ marginBottom: 18 }}>
        <div>
          <div className="badge-live"><span className={`pulse-dot ${mode === 'emergency' ? 'red' : ''}`} />
            {mode === 'emergency' ? 'ACTIVE EMERGENCY MODE' : 'LIVE · STANDARD PEAK HOURS'}</div>
          <div className="muted" style={{ fontSize: '.85rem', marginTop: 4 }}>
            Downtown grid · 5 intersections · click any node for detail
          </div>
        </div>
        <div className="mode-switch">
          <button className={mode === 'standard' ? 'on-std' : ''} onClick={() => setMode('standard')}>Standard</button>
          <button className={mode === 'emergency' ? 'on-emg' : ''} onClick={() => setMode('emergency')}>Emergency</button>
        </div>
      </div>

      <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', background: 'radial-gradient(600px 300px at 50% 40%, rgba(47,128,255,.06), transparent)' }}>
        <svg viewBox="0 0 700 380" style={{ width: '100%', display: 'block' }}>
          {/* roads */}
          <g stroke="rgba(255,255,255,.06)" strokeWidth="26" strokeLinecap="round" fill="none">
            <path d="M150 120 L360 90 L560 150" />
            <path d="M150 120 L300 260 L520 300 L560 150" />
            <path d="M360 90 L300 260" />
            <path d="M520 300 L360 90" opacity=".5" />
          </g>
          <g stroke="rgba(255,255,255,.12)" strokeWidth="1.5" strokeDasharray="4 8" fill="none">
            <path d="M150 120 L360 90 L560 150" />
            <path d="M150 120 L300 260 L520 300 L560 150" />
            <path d="M360 90 L300 260" />
          </g>

          {/* emergency corridor */}
          <AnimatePresence>
            {mode === 'emergency' && (
              <motion.path
                d={pathD}
                stroke="var(--green)" strokeWidth="8" fill="none" strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
                style={{ filter: 'drop-shadow(0 0 10px var(--green))' }}
              />
            )}
          </AnimatePresence>

          {/* animated ambulance along corridor */}
          {mode === 'emergency' && (
            <motion.circle r="7" fill="#fff"
              style={{ filter: 'drop-shadow(0 0 8px var(--red))' }}>
              <animateMotion dur="3.2s" repeatCount="indefinite" path={pathD} rotate="auto" />
            </motion.circle>
          )}

          {/* intersections */}
          {INTERSECTIONS.map((i) => {
            const c = light(mode, i.id, tick)
            const isCorr = mode === 'emergency' && CORRIDOR.includes(i.id)
            return (
              <g key={i.id} className="intersection" onClick={() => setSelected(i.id)}>
                {isCorr && (
                  <circle cx={i.x} cy={i.y} r="22" fill="none" stroke="var(--green)" strokeWidth="1.5" opacity=".5">
                    <animate attributeName="r" values="14;24;14" dur="1.6s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values=".6;0;.6" dur="1.6s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle cx={i.x} cy={i.y} r="14" fill="#0d1426" stroke={c} strokeWidth="2.5"
                  style={{ filter: `drop-shadow(0 0 6px ${c})` }} />
                <circle cx={i.x} cy={i.y} r="5" fill={c} />
                <text x={i.x} y={i.y - 22} textAnchor="middle" fill="var(--text)" fontSize="11"
                  fontFamily="var(--mono)" fontWeight="700">{i.id}</text>
                <text x={i.x} y={i.y + 30} textAnchor="middle" fill="var(--muted)" fontSize="9.5"
                  fontFamily="var(--mono)">{counts[i.id]} veh</text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* detail panel */}
      <AnimatePresence mode="wait">
        <motion.div key={selected || 'none'}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="glass" style={{ marginTop: 16, padding: 16, display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          {sel ? (
            <>
              <div>
                <div style={{ fontWeight: 700 }}>{sel.name} <span className="tag" style={{ marginLeft: 6 }}>Node {sel.id}</span></div>
                <div className="muted mono" style={{ fontSize: '.8rem', marginTop: 4 }}>{sel.lanes} lanes monitored · CAM-{sel.id}4N · RTSP 1080p</div>
              </div>
              <div style={{ display: 'flex', gap: 24 }}>
                <div><div className="mono" style={{ fontSize: '1.4rem', fontWeight: 800 }}>{counts[sel.id]}</div><div className="muted" style={{ fontSize: '.72rem' }}>vehicles</div></div>
                <div><div className="mono" style={{ fontSize: '1.4rem', fontWeight: 800, color: counts[sel.id] > 60 ? 'var(--red)' : counts[sel.id] > 35 ? 'var(--amber)' : 'var(--green)' }}>{counts[sel.id] > 60 ? 'HIGH' : counts[sel.id] > 35 ? 'MED' : 'LOW'}</div><div className="muted" style={{ fontSize: '.72rem' }}>congestion</div></div>
                <div><div className="mono" style={{ fontSize: '1.4rem', fontWeight: 800, color: mode === 'emergency' && CORRIDOR.includes(sel.id) ? 'var(--green)' : 'var(--text)' }}>{mode === 'emergency' && CORRIDOR.includes(sel.id) ? 'GREEN' : 'ADAPT'}</div><div className="muted" style={{ fontSize: '.72rem' }}>signal</div></div>
              </div>
            </>
          ) : (
            <div className="muted" style={{ fontSize: '.9rem' }}>
              Select an intersection above to inspect live density, congestion class and signal state.
              Toggle <strong style={{ color: 'var(--red)' }}>Emergency</strong> to watch a Green Corridor commit across the grid.
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
