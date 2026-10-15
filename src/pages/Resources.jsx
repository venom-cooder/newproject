import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, BookOpen, Video, FileCode2, CheckCircle2, ArrowRight } from 'lucide-react'
import Reveal from '../components/Reveal'

const LIBRARY = [
  { icon: FileText, tag: 'Whitepaper', title: 'Architecture of Adaptive Signal Control & Emergency Corridor Logistics', meta: 'PDF · 48 pages · v2.4', desc: 'The full municipal technical reference — edge inference, NTCIP bridging, corridor pathfinding and failover design.' },
  { icon: BookOpen, tag: 'Case Study', title: 'University Road Corridor: 38% Faster Ambulance Transit', meta: 'PDF · 12 pages', desc: 'How one city cut median emergency transit from 11.4 to 7.0 minutes in a single quarter.' },
  { icon: FileCode2, tag: 'Integration', title: 'ONVIF / RTSP Onboarding Guide for Signal Engineers', meta: 'PDF · 20 pages', desc: 'Step-by-step stream onboarding, controller bridging and shadow-mode validation checklist.' },
  { icon: Video, tag: 'Webinar', title: 'Green Corridors 101 for Municipal Mobility Cells', meta: 'Video · 34 min', desc: 'A non-technical walkthrough for decision-makers and first-responder leadership.' },
  { icon: FileText, tag: 'Compliance', title: 'Data Governance, Privacy & Edge Anonymization Brief', meta: 'PDF · 16 pages', desc: 'How PulseTraffic AI keeps PII inside the cabinet and satisfies municipal data-governance review.' },
  { icon: BookOpen, tag: 'ROI', title: 'Pilot-to-Grid ROI Calculator & Methodology', meta: 'PDF · 9 pages', desc: 'The measurement methodology behind our delay, transit-time and emissions figures.' }
]

export default function Resources() {
  const [form, setForm] = useState({ city: '', email: '', dept: '' })
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.city.trim()) e.city = 'City or authority name is required'
    if (!form.email.trim()) e.email = 'Official email is required'
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = 'Enter a valid email address'
    if (!form.dept.trim()) e.dept = 'Department is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = (ev) => {
    ev.preventDefault()
    if (validate()) setDone(true)
  }

  const set = (k) => (ev) => { setForm({ ...form, [k]: ev.target.value }); if (errors[k]) setErrors({ ...errors, [k]: undefined }) }

  return (
    <>
      <section className="section" style={{ paddingBottom: 30 }}>
        <div className="container">
          <Reveal>
            <span className="eyebrow">Technical Resources</span>
            <h1 style={{ marginTop: 20, maxWidth: 780 }}>Everything procurement, engineering and operations teams need.</h1>
            <p className="lead" style={{ marginTop: 16 }}>
              Whitepapers, integration guides, compliance briefs and case studies — written for the people who actually sign off a municipal deployment.
            </p>
          </Reveal>
        </div>
      </section>

      {/* lead magnet */}
      <section className="section-sm" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <div className="glass" style={{ padding: 0, overflow: 'hidden', borderColor: 'var(--border)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr' }} className="lead-grid">
                <div style={{ padding: 36, background: 'linear-gradient(140deg, rgba(0,229,153,.1), rgba(47,128,255,.05))' }}>
                  <span className="tag green">Featured Download</span>
                  <h2 style={{ fontSize: '1.7rem', marginTop: 16 }}>Download the Municipal Whitepaper</h2>
                  <p style={{ fontWeight: 600, color: 'var(--text)', marginTop: 8 }}>Architecture of Adaptive Signal Control & Emergency Corridor Logistics</p>
                  <p className="muted" style={{ marginTop: 12, fontSize: '.92rem' }}>
                    A 48-page technical reference covering edge-AI inference, NTCIP controller bridging,
                    Green Corridor pathfinding, offline-safe failover, and the data-governance model.
                  </p>
                  <ul style={{ marginTop: 18, display: 'grid', gap: 9 }}>
                    {['Reference architecture diagrams', 'Deployment & rollout checklist', 'Security & privacy appendix'].map((t) => (
                      <li key={t} style={{ display: 'flex', gap: 9, fontSize: '.9rem' }}>
                        <CheckCircle2 size={16} color="var(--green)" style={{ flex: 'none', marginTop: 3 }} /> {t}
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ padding: 36 }}>
                  {done ? (
                    <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
                      <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--green-dim)', border: '1px solid var(--border)', display: 'grid', placeItems: 'center', margin: '0 auto 16px' }}>
                        <CheckCircle2 size={28} color="var(--green)" />
                      </div>
                      <h3>Your download is ready</h3>
                      <p className="muted" style={{ marginTop: 8, fontSize: '.9rem' }}>
                        We've sent the whitepaper to <strong style={{ color: 'var(--text)' }}>{form.email}</strong>. A mobility specialist will follow up within one business day.
                      </p>
                      <button className="btn btn-primary" style={{ marginTop: 20, width: '100%' }} onClick={(e) => e.preventDefault()}>
                        <Download size={16} /> Download PDF (3.4 MB)
                      </button>
                      <button className="btn btn-ghost btn-sm" style={{ marginTop: 10 }} onClick={() => { setDone(false); setForm({ city: '', email: '', dept: '' }) }}>Request another</button>
                    </motion.div>
                  ) : (
                    <form onSubmit={submit}>
                      <h3 style={{ marginBottom: 6 }}>Get the PDF</h3>
                      <p className="muted" style={{ fontSize: '.85rem', marginBottom: 20 }}>Tell us where you work and we'll email you the whitepaper.</p>
                      <div className="field">
                        <label>City / Authority Name <span className="req">*</span></label>
                        <input className={`input ${errors.city ? 'invalid' : ''}`} value={form.city} onChange={set('city')} placeholder="e.g. Pune Smart City" />
                        {errors.city && <div className="field-error">{errors.city}</div>}
                      </div>
                      <div className="field">
                        <label>Official Email <span className="req">*</span></label>
                        <input className={`input ${errors.email ? 'invalid' : ''}`} value={form.email} onChange={set('email')} placeholder="name@city.gov" />
                        {errors.email && <div className="field-error">{errors.email}</div>}
                      </div>
                      <div className="field">
                        <label>Department <span className="req">*</span></label>
                        <select className={`select ${errors.dept ? 'invalid' : ''}`} value={form.dept} onChange={set('dept')}>
                          <option value="">Select department…</option>
                          <option>Traffic / Signals Engineering</option>
                          <option>Smart City / Mobility Cell</option>
                          <option>Emergency Services / Fire & Rescue</option>
                          <option>IT / Data Governance</option>
                          <option>Procurement</option>
                          <option>Other</option>
                        </select>
                        {errors.dept && <div className="field-error">{errors.dept}</div>}
                      </div>
                      <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 6 }}>
                        <Download size={16} /> Download Whitepaper
                      </button>
                      <p className="muted" style={{ fontSize: '.74rem', marginTop: 12, textAlign: 'center' }}>We respect municipal data policies. No marketing spam.</p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* library */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="kicker-row">
              <div><span className="eyebrow">Resource Library</span><h2 style={{ marginTop: 14 }}>Browse the full library</h2></div>
            </div>
          </Reveal>
          <div className="grid grid-3">
            {LIBRARY.map((r, i) => (
              <Reveal key={r.title} delay={(i % 3) * 0.07}>
                <div className="glass glass-hover" style={{ padding: 24, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ width: 42, height: 42, borderRadius: 11, background: 'var(--green-dim)', border: '1px solid var(--border)', display: 'grid', placeItems: 'center' }}>
                      <r.icon size={20} color="var(--green)" />
                    </div>
                    <span className="tag">{r.tag}</span>
                  </div>
                  <h3 style={{ fontSize: '1.02rem', marginTop: 16 }}>{r.title}</h3>
                  <p className="muted" style={{ fontSize: '.86rem', marginTop: 8 }}>{r.desc}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: 18 }}>
                    <span className="mono muted" style={{ fontSize: '.74rem' }}>{r.meta}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: 'var(--green)', fontSize: '.85rem', fontWeight: 600 }}>Get <ArrowRight size={14} /></span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
