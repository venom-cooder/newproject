import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown, CheckCircle2 } from 'lucide-react'
import Reveal from '../components/Reveal'
import { CAPABILITIES, PIPELINE, SECURITY, PRICING, FAQ, INTEGRATIONS } from '../data/content'

export default function Platform() {
  const [open, setOpen] = useState(0)

  return (
    <>
      <section className="section" style={{ paddingBottom: 40 }}>
        <div className="container">
          <Reveal>
            <span className="eyebrow">The Platform</span>
            <h1 style={{ marginTop: 20, maxWidth: 820 }}>
              From raw camera feed to a committed signal plan — in under 80&nbsp;milliseconds.
            </h1>
            <p className="lead" style={{ marginTop: 18 }}>
              PulseTraffic AI is an edge-first adaptive signal control platform. It ingests
              existing CCTV streams, runs computer vision at the cabinet, and continuously
              re-plans signal timing — while standing ready to clear a Green Corridor the
              instant an emergency vehicle is detected.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PIPELINE */}
      <section className="section-sm">
        <div className="container">
          <Reveal>
            <div className="glass" style={{ padding: 28 }}>
              <div className="badge-live" style={{ marginBottom: 20 }}><span className="pulse-dot" /> INFERENCE PIPELINE · PER FRAME</div>
              <div style={{ display: 'flex', alignItems: 'stretch', gap: 10, flexWrap: 'wrap' }}>
                {PIPELINE.map((p, i) => (
                  <div key={p.label} style={{ display: 'contents' }}>
                    <div className="glass" style={{ padding: 16, flex: '1 1 160px', minWidth: 150 }}>
                      <p.icon size={20} color="var(--green)" />
                      <div style={{ fontWeight: 600, fontSize: '.92rem', marginTop: 10 }}>{p.label}</div>
                      <div className="mono muted" style={{ fontSize: '.76rem', marginTop: 3 }}>{p.val}</div>
                    </div>
                    {i < PIPELINE.length - 1 && (
                      <div style={{ display: 'grid', placeItems: 'center', color: 'var(--green)' }}>
                        <ArrowRight size={18} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* capabilities deep */}
      <section className="section">
        <div className="container">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.title}>
              <div style={{ display: 'grid', gridTemplateColumns: i % 2 ? '1fr 1fr' : '1fr 1fr', gap: 40, alignItems: 'center', padding: '28px 0', borderTop: i ? '1px solid var(--border-soft)' : 'none' }} className="cap-row">
                <div style={{ order: i % 2 ? 2 : 1 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--green-dim)', border: '1px solid var(--border)', display: 'grid', placeItems: 'center', marginBottom: 16 }}>
                    <c.icon size={24} color="var(--green)" />
                  </div>
                  <h2 style={{ fontSize: '1.7rem' }}>{c.title}</h2>
                  <p className="muted" style={{ marginTop: 12, fontSize: '1rem' }}>{c.desc}</p>
                  <ul style={{ marginTop: 18, display: 'grid', gap: 10 }}>
                    {c.points.map((p) => (
                      <li key={p} style={{ display: 'flex', gap: 10, fontSize: '.95rem' }}>
                        <CheckCircle2 size={17} color="var(--green)" style={{ flex: 'none', marginTop: 3 }} /> {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ order: i % 2 ? 1 : 2 }}>
                  <div className="glass" style={{ padding: 22, aspectRatio: '4/3', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'radial-gradient(400px 200px at 30% 20%, rgba(0,229,153,.07), transparent)' }}>
                    <div className="mono muted" style={{ fontSize: '.74rem' }}>{`// module.${c.title.toLowerCase().replace(/[^a-z]+/g, '_')}`}</div>
                    <div className="mono" style={{ fontSize: '.84rem', marginTop: 12, lineHeight: 2, color: 'var(--text)' }}>
                      <div><span style={{ color: 'var(--blue)' }}>status</span> : <span style={{ color: 'var(--green)' }}>active</span></div>
                      <div><span style={{ color: 'var(--blue)' }}>latency</span> : <span style={{ color: 'var(--green)' }}>{(60 + i * 6)}ms</span></div>
                      <div><span style={{ color: 'var(--blue)' }}>confidence</span> : <span style={{ color: 'var(--amber)' }}>{(0.91 + i * 0.01).toFixed(2)}</span></div>
                      <div><span style={{ color: 'var(--blue)' }}>mode</span> : edge · failover_ready</div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SECURITY */}
      <section className="section" style={{ background: 'var(--bg-2)' }}>
        <div className="container">
          <Reveal>
            <div className="center" style={{ marginBottom: 40 }}>
              <span className="eyebrow">Security & Governance</span>
              <h2 style={{ marginTop: 16 }}>Built for municipal data governance</h2>
            </div>
          </Reveal>
          <div className="grid grid-4">
            {SECURITY.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.07}>
                <div className="glass glass-hover" style={{ padding: 24, height: '100%' }}>
                  <s.icon size={24} color="var(--green)" />
                  <h3 style={{ marginTop: 14, fontSize: '1.05rem' }}>{s.title}</h3>
                  <p className="muted" style={{ fontSize: '.88rem', marginTop: 6 }}>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div style={{ marginTop: 36, display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
              {INTEGRATIONS.map((t) => <span key={t} className="tag">{t}</span>)}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRICING */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="center" style={{ marginBottom: 46 }}>
              <span className="eyebrow">Deployment Tiers</span>
              <h2 style={{ marginTop: 16 }}>Start with one corridor. Scale to the whole grid.</h2>
            </div>
          </Reveal>
          <div className="grid grid-3">
            {PRICING.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08}>
                <div className={`glass ${p.pop ? 'price-pop' : ''}`} style={{ padding: 30, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontWeight: 700, fontSize: '1.15rem' }}>{p.name}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 10 }}>
                    <span className="stat-value" style={{ fontSize: '2.2rem' }}>{p.price}</span>
                    <span className="muted mono" style={{ fontSize: '.8rem' }}>{p.unit}</span>
                  </div>
                  <p className="muted" style={{ fontSize: '.9rem', marginTop: 12 }}>{p.desc}</p>
                  <ul style={{ margin: '20px 0', display: 'grid', gap: 10 }}>
                    {p.feats.map((f) => (
                      <li key={f} style={{ display: 'flex', gap: 9, fontSize: '.9rem' }}>
                        <CheckCircle2 size={16} color="var(--green)" style={{ flex: 'none', marginTop: 3 }} /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className={`btn ${p.pop ? 'btn-primary' : 'btn-ghost'}`} style={{ marginTop: 'auto', width: '100%' }}>{p.cta}</Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: 'var(--bg-2)' }}>
        <div className="container" style={{ maxWidth: 840 }}>
          <Reveal>
            <div className="center" style={{ marginBottom: 36 }}>
              <span className="eyebrow">FAQ</span>
              <h2 style={{ marginTop: 16 }}>Questions procurement teams ask first</h2>
            </div>
          </Reveal>
          {FAQ.map((f, i) => (
            <div key={f.q} className="accordion-item">
              <button className="accordion-q" onClick={() => setOpen(open === i ? -1 : i)}>
                {f.q}
                <ChevronDown size={18} style={{ flex: 'none', transition: '.2s', transform: open === i ? 'rotate(180deg)' : 'none', color: 'var(--green)' }} />
              </button>
              {open === i && <div className="accordion-a">{f.a}</div>}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
