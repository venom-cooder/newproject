import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play, Pause, RotateCcw, ArrowRight } from 'lucide-react'
import CityMap from '../components/CityMap'
import TelemetryLog from '../components/TelemetryLog'
import Reveal from '../components/Reveal'
import { DEMO_STEPS } from '../data/content'

export default function Demo() {
  const [playing, setPlaying] = useState(false)
  const [step, setStep] = useState(-1)
  const timer = useRef(null)

  useEffect(() => {
    if (!playing) return
    timer.current = setInterval(() => {
      setStep((s) => {
        if (s >= DEMO_STEPS.length - 1) { setPlaying(false); return s }
        return s + 1
      })
    }, 1400)
    return () => clearInterval(timer.current)
  }, [playing])

  const start = () => { if (step >= DEMO_STEPS.length - 1) setStep(-1); setPlaying(true) }
  const reset = () => { setPlaying(false); setStep(-1) }

  const dotColor = (st) => st === 'crit' ? 'var(--red)' : st === 'warn' ? 'var(--amber)' : 'var(--green)'

  return (
    <>
      <section className="section" style={{ paddingBottom: 30 }}>
        <div className="container">
          <Reveal>
            <span className="eyebrow"><span className="pulse-dot red" /> Interactive Demonstration</span>
            <h1 style={{ marginTop: 20, maxWidth: 860 }}>
              See Green Corridor in Action: From Siren Detection to Clear Intersection in <span className="grad-text">4.2 seconds</span>.
            </h1>
            <p className="lead" style={{ marginTop: 16 }}>
              Press play to watch the full pre-emption sequence, step by step — siren
              detection, vehicle classification, route projection, signal pre-emption and corridor clearance.
            </p>
          </Reveal>
        </div>
      </section>

      {/* video player + timeline */}
      <section className="section-sm" style={{ paddingTop: 10 }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24 }} >
          {/* "video" stage */}
          <Reveal>
            <div className="glass" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ position: 'relative', aspectRatio: '16/9', background: 'radial-gradient(500px 300px at 50% 30%, rgba(47,128,255,.12), #060a14)', display: 'grid', placeItems: 'center' }}>
                {/* scanning grid */}
                <svg viewBox="0 0 640 360" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: .5 }}>
                  <defs>
                    <pattern id="g" width="32" height="32" patternUnits="userSpaceOnUse">
                      <path d="M32 0H0V32" fill="none" stroke="rgba(255,255,255,.05)" />
                    </pattern>
                  </defs>
                  <rect width="640" height="360" fill="url(#g)" />
                  {/* detection boxes */}
                  {step >= 1 && [[120, 200, 70, 44], [230, 170, 60, 38], [410, 150, 90, 56]].map((b, i) => (
                    <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <rect x={b[0]} y={b[1]} width={b[2]} height={b[3]} fill="none"
                        stroke={i === 2 ? 'var(--red)' : 'var(--green)'} strokeWidth="2" rx="3" />
                      <text x={b[0]} y={b[1] - 5} fill={i === 2 ? 'var(--red)' : 'var(--green)'} fontSize="10" fontFamily="var(--mono)">
                        {i === 2 ? 'AMBULANCE 0.97' : `car 0.9${i}`}
                      </text>
                    </motion.g>
                  ))}
                </svg>

                <div style={{ textAlign: 'center', zIndex: 2 }}>
                  {!playing && step < 0 && (
                    <button className="btn btn-primary" onClick={start} style={{ borderRadius: '50%', width: 72, height: 72, padding: 0 }}>
                      <Play size={28} />
                    </button>
                  )}
                  {(playing || step >= 0) && (
                    <motion.div key={step} initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }}
                      className="mono" style={{ fontSize: '2.2rem', fontWeight: 800, color: step >= 0 ? dotColor(DEMO_STEPS[step].state) : '#fff' }}>
                      {step >= 0 ? DEMO_STEPS[step].t : '00.0s'}
                    </motion.div>
                  )}
                  {step >= 0 && <div style={{ marginTop: 6, fontWeight: 600 }}>{DEMO_STEPS[step].title}</div>}
                </div>

                <div className="tag red" style={{ position: 'absolute', top: 14, left: 14 }}>● REC · CAM-14N</div>
                <div className="tag" style={{ position: 'absolute', top: 14, right: 14 }}>City Hospital Route</div>
              </div>

              {/* controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', borderTop: '1px solid var(--border-soft)' }}>
                <button className="btn btn-ghost btn-sm" onClick={() => (playing ? setPlaying(false) : start())}>
                  {playing ? <><Pause size={15} /> Pause</> : <><Play size={15} /> Play</>}
                </button>
                <button className="btn btn-ghost btn-sm" onClick={reset}><RotateCcw size={15} /> Reset</button>
                <div style={{ flex: 1, height: 5, borderRadius: 3, background: 'rgba(255,255,255,.08)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${((step + 1) / DEMO_STEPS.length) * 100}%`, background: 'var(--green)', transition: '.4s' }} />
                </div>
                <span className="mono muted" style={{ fontSize: '.78rem' }}>{Math.max(0, step + 1)}/{DEMO_STEPS.length}</span>
              </div>
            </div>
          </Reveal>

          {/* step breakdown */}
          <Reveal delay={0.1}>
            <div className="glass" style={{ padding: 20, height: '100%' }}>
              <div className="badge-live" style={{ marginBottom: 16 }}><span className="pulse-dot red" /> TELEMETRY BREAKDOWN</div>
              <div style={{ display: 'grid', gap: 4 }}>
                {DEMO_STEPS.map((s, i) => {
                  const active = i <= step
                  return (
                    <div key={s.title} style={{ display: 'flex', gap: 14, padding: '12px 10px', borderRadius: 10, background: i === step ? 'rgba(0,229,153,.06)' : 'transparent', opacity: active ? 1 : 0.4, transition: '.3s' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                        <div style={{ width: 30, height: 30, borderRadius: 8, display: 'grid', placeItems: 'center', background: active ? dotColor(s.state) + '22' : 'rgba(255,255,255,.04)', border: `1px solid ${active ? dotColor(s.state) : 'var(--border-soft)'}` }}>
                          <s.icon size={15} color={active ? dotColor(s.state) : 'var(--muted)'} />
                        </div>
                        {i < DEMO_STEPS.length - 1 && <div style={{ width: 1, flex: 1, minHeight: 10, background: 'var(--border-soft)' }} />}
                      </div>
                      <div>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <span style={{ fontWeight: 600, fontSize: '.92rem' }}>{s.title}</span>
                          <span className="mono muted" style={{ fontSize: '.72rem' }}>{s.t}</span>
                        </div>
                        <div className="muted" style={{ fontSize: '.82rem', marginTop: 2 }}>{s.desc}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* live map + telemetry */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="center" style={{ marginBottom: 36 }}>
              <span className="eyebrow">Live Simulation</span>
              <h2 style={{ marginTop: 16 }}>Drive the grid yourself</h2>
              <p className="lead mx-auto center" style={{ marginTop: 12 }}>
                Toggle Emergency Mode on the map to commit a Green Corridor across the downtown grid,
                and watch the edge telemetry stream react in real time.
              </p>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24, alignItems: 'start' }} className="demo-grid">
            <Reveal><CityMap /></Reveal>
            <Reveal delay={0.1}><TelemetryLog /></Reveal>
          </div>
        </div>
      </section>

      <section className="section-sm">
        <div className="container center">
          <Reveal>
            <h2 style={{ fontSize: '1.8rem' }}>Want this running on your corridor?</h2>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 22, flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn btn-primary">Request Municipal Pilot <ArrowRight size={16} /></Link>
              <Link to="/resources" className="btn btn-ghost">Read the Architecture</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
