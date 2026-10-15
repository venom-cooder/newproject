import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Zap, CheckCircle2 } from 'lucide-react'
import CityMap from '../components/CityMap'
import Counter from '../components/Counter'
import Reveal from '../components/Reveal'
import { CAPABILITIES, METRICS, CASE_STUDIES, INTEGRATIONS, BENEFITS, BIG_STATS } from '../data/content'

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="section" style={{ paddingTop: 72, paddingBottom: 40 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 48, alignItems: 'center' }} className="hero-grid">
            <div>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}>
                <span className="eyebrow"><span className="pulse-dot" /> Smart City · B2G SaaS Platform</span>
              </motion.div>
              <motion.h1 style={{ marginTop: 22 }}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .05 }}>
                Intelligent Traffic Flow.<br />
                <span className="grad-text">Zero Gridlock.</span><br />
                Guaranteed Emergency Clearance.
              </motion.h1>
              <motion.p className="lead" style={{ marginTop: 20 }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .6, delay: .15 }}>
                Edge-AI camera integration calculating intersection density in real
                time and clearing instant green corridors for first responders —
                on the municipal CCTV you already own.
              </motion.p>
              <motion.div style={{ display: 'flex', gap: 12, marginTop: 30, flexWrap: 'wrap' }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .6, delay: .25 }}>
                <Link to="/contact" className="btn btn-primary">Request Municipal Pilot <ArrowRight size={17} /></Link>
                <Link to="/demo" className="btn btn-ghost"><Play size={16} /> Explore Interactive Demo</Link>
              </motion.div>
              <motion.div style={{ display: 'flex', gap: 22, marginTop: 34, flexWrap: 'wrap' }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .6, delay: .35 }}>
                {['No new road sensors', 'RTSP / ONVIF ready', 'Edge-first & offline-safe'].map((t) => (
                  <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: '.86rem', color: 'var(--muted)' }}>
                    <CheckCircle2 size={15} color="var(--green)" /> {t}
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .7, delay: .2 }}>
              <CityMap />
            </motion.div>
          </div>
        </div>
      </section>

      {/* integrations marquee */}
      <section className="section-sm" style={{ paddingTop: 24 }}>
        <div className="container center" style={{ marginBottom: 22 }}>
          <span className="mono muted" style={{ fontSize: '.78rem', letterSpacing: '.1em' }}>INTEGRATES WITH THE HARDWARE CITIES ALREADY RUN</span>
        </div>
        <div className="marquee">
          <div className="marquee-track">
            {[...INTEGRATIONS, ...INTEGRATIONS].map((b, i) => (
              <span key={i} className="marquee-item"><Zap size={14} color="var(--green)" /> {b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="center" style={{ marginBottom: 46 }}>
              <span className="eyebrow">Measured Impact</span>
              <h2 style={{ marginTop: 18 }}>Outcomes cities can put in a cabinet report</h2>
              <p className="lead mx-auto center" style={{ marginTop: 12 }}>
                Figures are medians across active pilot corridors, measured against each city's own pre-deployment baseline.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-4">
            {METRICS.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.08}>
                <div className="glass glass-hover" style={{ padding: 28, height: '100%' }}>
                  <div className="stat-value" style={{ color: m.color }}>
                    <Counter to={m.value} decimals={m.decimals || 0} suffix={m.suffix} />
                  </div>
                  <div className="stat-label" style={{ fontWeight: 600, color: 'var(--text)', marginTop: 12 }}>{m.label2 || m.label}</div>
                  <div className="muted" style={{ fontSize: '.8rem', marginTop: 4 }}>{m.label2 ? m.label : m.sub}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="section" style={{ background: 'var(--bg-2)' }}>
        <div className="container">
          <Reveal>
            <div className="kicker-row">
              <div>
                <span className="eyebrow">Core Capabilities</span>
                <h2 style={{ marginTop: 16 }}>One platform. Three jobs, done automatically.</h2>
              </div>
              <Link to="/platform" className="btn btn-ghost btn-sm">Full platform tour <ArrowRight size={15} /></Link>
            </div>
          </Reveal>
          <div className="grid grid-3">
            {CAPABILITIES.map((c, i) => (
              <Reveal key={c.title} delay={(i % 3) * 0.08}>
                <div className="glass glass-hover" style={{ padding: 26, height: '100%' }}>
                  <div style={{ width: 46, height: 46, borderRadius: 12, background: 'var(--green-dim)', border: '1px solid var(--border)', display: 'grid', placeItems: 'center', marginBottom: 18 }}>
                    <c.icon size={22} color="var(--green)" />
                  </div>
                  <h3>{c.title}</h3>
                  <p className="muted" style={{ fontSize: '.92rem', marginTop: 10 }}>{c.desc}</p>
                  <ul style={{ marginTop: 16, display: 'grid', gap: 8 }}>
                    {c.points.map((p) => (
                      <li key={p} style={{ display: 'flex', gap: 9, fontSize: '.86rem', color: 'var(--muted)' }}>
                        <CheckCircle2 size={15} color="var(--green)" style={{ flex: 'none', marginTop: 3 }} /> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BIG STATS band */}
      <section className="section-sm">
        <div className="container">
          <div className="glass" style={{ padding: '36px 28px' }}>
            <div className="grid grid-4">
              {BIG_STATS.map((s) => (
                <div key={s.label} className="center">
                  <div className="stat-value" style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)' }}>
                    <Counter to={s.value} decimals={s.decimals || 0} suffix={s.suffix} />
                  </div>
                  <div className="muted" style={{ fontSize: '.84rem', marginTop: 8 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="center" style={{ marginBottom: 44 }}>
              <span className="eyebrow">Deployed & Proven</span>
              <h2 style={{ marginTop: 16 }}>What authorities report after go-live</h2>
            </div>
          </Reveal>
          <div className="grid grid-3">
            {CASE_STUDIES.map((cs, i) => (
              <Reveal key={cs.city} delay={i * 0.08}>
                <div className="glass glass-hover" style={{ padding: 26, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="tag green">{cs.tag}</span>
                    <span className="mono" style={{ fontSize: '.78rem', color: 'var(--green)', fontWeight: 700 }}>{cs.stat}</span>
                  </div>
                  <p style={{ marginTop: 18, fontSize: '.98rem', lineHeight: 1.6 }}>"{cs.quote}"</p>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 'auto', paddingTop: 20 }}>
                    <div className="avatar">{cs.name.split(' ').map((w) => w[0]).slice(-2).join('')}</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '.9rem' }}>{cs.name}</div>
                      <div className="muted" style={{ fontSize: '.8rem' }}>{cs.role} · {cs.city}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section" style={{ background: 'var(--bg-2)' }}>
        <div className="container">
          <div className="grid grid-4">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.07}>
                <div style={{ padding: 8 }}>
                  <b.icon size={26} color="var(--green)" />
                  <h3 style={{ marginTop: 14, fontSize: '1.08rem' }}>{b.title}</h3>
                  <p className="muted" style={{ fontSize: '.88rem', marginTop: 8 }}>{b.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="glass center" style={{ padding: '56px 28px', background: 'linear-gradient(140deg, rgba(0,229,153,.08), rgba(47,128,255,.05))', borderColor: 'var(--border)' }}>
              <h2 className="mx-auto" style={{ maxWidth: 680 }}>Ready to clear your city's busiest corridor?</h2>
              <p className="lead mx-auto center" style={{ marginTop: 14 }}>
                Start with a fixed-scope pilot on one corridor. Live in weeks, measured against your own baseline, with no new road hardware.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 28, flexWrap: 'wrap' }}>
                <Link to="/contact" className="btn btn-primary">Request Municipal Pilot <ArrowRight size={17} /></Link>
                <Link to="/resources" className="btn btn-ghost">Download Whitepaper</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
