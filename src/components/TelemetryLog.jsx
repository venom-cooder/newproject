import { useEffect, useRef, useState } from 'react'

const CAMS = ['CAM-14N', 'CAM-03E', 'CAM-22S', 'CAM-08W', 'CAM-19N']
const EVENTS = [
  { lvl: 'ok', msg: (c) => `${c} · detection ok · 6 veh · lane bias L2` },
  { lvl: 'ok', msg: (c) => `${c} · phase extended +4.0s (queue 11)` },
  { lvl: 'warn', msg: (c) => `${c} · siren signature candidate 0.71 conf` },
  { lvl: 'ok', msg: (c) => `${c} · frame 78ms · yolo-edge · 0 drops` },
  { lvl: 'warn', msg: (c) => `${c} · occupancy spike 84% · rebalancing` },
  { lvl: 'crit', msg: (c) => `${c} · EMERGENCY confirmed · corridor commit` },
  { lvl: 'ok', msg: (c) => `${c} · green wave hand-back → adaptive` },
  { lvl: 'ok', msg: (c) => `${c} · NTCIP ack · phase plan applied` }
]

function stamp() {
  const d = new Date()
  return d.toTimeString().slice(0, 8) + '.' + String(d.getMilliseconds()).padStart(3, '0').slice(0, 2)
}

export default function TelemetryLog() {
  const [lines, setLines] = useState([])
  const boxRef = useRef(null)

  useEffect(() => {
    const t = setInterval(() => {
      const e = EVENTS[Math.floor(Math.random() * EVENTS.length)]
      const c = CAMS[Math.floor(Math.random() * CAMS.length)]
      setLines((prev) => [...prev.slice(-40), { id: Math.random(), ts: stamp(), lvl: e.lvl, msg: e.msg(c) }])
    }, 900)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight
  }, [lines])

  return (
    <div className="glass" style={{ padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <div className="badge-live"><span className="pulse-dot" /> EDGE TELEMETRY STREAM</div>
        <span className="tag mono">live · 1 Hz</span>
      </div>
      <div className="telemetry-log" ref={boxRef}>
        {lines.length === 0 && <div className="muted">connecting to edge gateway…</div>}
        {lines.map((l) => (
          <div key={l.id}>
            <span className="ts">{l.ts}</span>{' '}
            <span className={l.lvl}>[{l.lvl.toUpperCase()}]</span>{' '}
            {l.msg}
          </div>
        ))}
      </div>
    </div>
  )
}
