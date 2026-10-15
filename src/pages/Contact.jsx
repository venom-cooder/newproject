import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Calendar, Phone, Mail, MapPin, Clock } from 'lucide-react'
import Reveal from '../components/Reveal'

const SLOTS = ['Tue 10:00', 'Tue 14:30', 'Wed 11:00', 'Wed 16:00', 'Thu 09:30', 'Fri 13:00']

export default function Contact() {
  const [form, setForm] = useState({ authority: '', person: '', email: '', count: '', notes: '' })
  const [slot, setSlot] = useState(null)
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.authority.trim()) e.authority = 'Required'
    if (!form.person.trim()) e.person = 'Required'
    if (!form.email.trim()) e.email = 'Required'
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.count) e.count = 'Required'
    if (!slot) e.slot = 'Pick a demo slot'
    setErrors(e); return Object.keys(e).length === 0
  }
  const set = (k) => (ev) => { setForm({ ...form, [k]: ev.target.value }); if (errors[k]) setErrors({ ...errors, [k]: undefined }) }
  const submit = (ev) => { ev.preventDefault(); if (validate()) setDone(true) }

  return (
    <>
      <section className="section" style={{ paddingBottom: 30 }}>
        <div className="container">
          <Reveal>
            <span className="eyebrow"><span className="pulse-dot" /> Government & Enterprise</span>
            <h1 style={{ marginTop: 20, maxWidth: 760 }}>Request a municipal pilot &amp; book a live POC demo.</h1>
            <p className="lead" style={{ marginTop: 16 }}>
              Tell us about your grid. A mobility specialist will scope a fixed-cost corridor pilot and walk your team through a live proof-of-concept on your own camera feeds.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-sm" style={{ paddingTop: 0 }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 28, alignItems: 'start' }} >
          {/* form */}
          <Reveal>
            <div className="glass" style={{ padding: 32 }}>
              {done ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '28px 0' }}>
                  <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'var(--green-dim)', border: '1px solid var(--border)', display: 'grid', placeItems: 'center', margin: '0 auto 18px' }}>
                    <CheckCircle2 size={30} color="var(--green)" />
                  </div>
                  <h2 style={{ fontSize: '1.6rem' }}>Pilot request received</h2>
                  <p className="muted mx-auto" style={{ maxWidth: 440, marginTop: 10 }}>
                    Thanks, {form.person.split(' ')[0] || 'there'}. We've booked your POC demo for <strong style={{ color: 'var(--green)' }}>{slot}</strong> and
                    sent a calendar invite to <strong style={{ color: 'var(--text)' }}>{form.email}</strong>.
                    Our team will prepare a corridor scoping deck for <strong style={{ color: 'var(--text)' }}>{form.authority}</strong>.
                  </p>
                  <button className="btn btn-ghost" style={{ marginTop: 22 }} onClick={() => { setDone(false); setForm({ authority: '', person: '', email: '', count: '', notes: '' }); setSlot(null) }}>Submit another request</button>
                </motion.div>
              ) : (
                <form onSubmit={submit}>
                  <h3 style={{ marginBottom: 20 }}>Pilot request form</h3>
                  <div className="grid grid-2" style={{ gap: 0, columnGap: 16 }}>
                    <div className="field">
                      <label>City / Authority Name <span className="req">*</span></label>
                      <input className={`input ${errors.authority ? 'invalid' : ''}`} value={form.authority} onChange={set('authority')} placeholder="e.g. Metro Transit Authority" />
                      {errors.authority && <div className="field-error">{errors.authority}</div>}
                    </div>
                    <div className="field">
                      <label>Contact Person <span className="req">*</span></label>
                      <input className={`input ${errors.person ? 'invalid' : ''}`} value={form.person} onChange={set('person')} placeholder="Full name" />
                      {errors.person && <div className="field-error">{errors.person}</div>}
                    </div>
                    <div className="field">
                      <label>Official Email <span className="req">*</span></label>
                      <input className={`input ${errors.email ? 'invalid' : ''}`} value={form.email} onChange={set('email')} placeholder="name@authority.gov" />
                      {errors.email && <div className="field-error">{errors.email}</div>}
                    </div>
                    <div className="field">
                      <label>Intersection Count <span className="req">*</span></label>
                      <select className={`select ${errors.count ? 'invalid' : ''}`} value={form.count} onChange={set('count')}>
                        <option value="">Select range…</option>
                        <option>1–8 (single corridor)</option>
                        <option>9–40 (district)</option>
                        <option>41–150 (city grid)</option>
                        <option>150+ (metro-wide)</option>
                      </select>
                      {errors.count && <div className="field-error">{errors.count}</div>}
                    </div>
                  </div>
                  <div className="field">
                    <label>Notes <span className="muted" style={{ fontWeight: 400 }}>(camera types, controllers, priorities)</span></label>
                    <textarea className="textarea" value={form.notes} onChange={set('notes')} placeholder="e.g. ~210 Hikvision ONVIF cameras, Econolite controllers, priority on hospital corridor…" />
                  </div>

                  <div className="field">
                    <label>Book a live POC demo <span className="req">*</span></label>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {SLOTS.map((s) => (
                        <button type="button" key={s} onClick={() => { setSlot(s); if (errors.slot) setErrors({ ...errors, slot: undefined }) }}
                          className="tag" style={{ cursor: 'pointer', padding: '9px 14px', borderColor: slot === s ? 'var(--green)' : 'var(--border-soft)', color: slot === s ? 'var(--green)' : 'var(--muted)', background: slot === s ? 'var(--green-dim)' : 'rgba(255,255,255,.04)' }}>
                          <Calendar size={13} /> {s}
                        </button>
                      ))}
                    </div>
                    {errors.slot && <div className="field-error">{errors.slot}</div>}
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 8 }}>Request Pilot &amp; Book Demo</button>
                </form>
              )}
            </div>
          </Reveal>

          {/* sidebar */}
          <Reveal delay={0.1}>
            <div style={{ display: 'grid', gap: 16 }}>
              <div className="glass" style={{ padding: 24 }}>
                <h3 style={{ fontSize: '1.05rem' }}>What happens next</h3>
                <div style={{ marginTop: 16, display: 'grid', gap: 14 }}>
                  {[
                    ['Scoping call', 'We map your corridor, cameras and controllers.'],
                    ['Shadow-mode validation', 'Models run alongside existing timing for 1–2 weeks.'],
                    ['Go-live', 'Adaptive control + Green Corridors enabled.'],
                    ['Impact report', 'Results measured against your own baseline.']
                  ].map(([t, d], i) => (
                    <div key={t} style={{ display: 'flex', gap: 12 }}>
                      <span className="step-num">{i + 1}</span>
                      <div><div style={{ fontWeight: 600, fontSize: '.9rem' }}>{t}</div><div className="muted" style={{ fontSize: '.82rem' }}>{d}</div></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass" style={{ padding: 24 }}>
                <h3 style={{ fontSize: '1.05rem', marginBottom: 14 }}>Direct contact</h3>
                <div style={{ display: 'grid', gap: 12 }}>
                  {[
                    [Mail, 'pilots@pulsetraffic.ai'],
                    [Phone, '+1 (800) 555-0142 · Gov desk'],
                    [MapPin, 'Smart Mobility Labs, Bengaluru · Austin'],
                    [Clock, 'Mon–Fri · 09:00–18:00 IST / CST']
                  ].map(([Icon, t]) => (
                    <div key={t} style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: '.88rem', color: 'var(--muted)' }}>
                      <Icon size={16} color="var(--green)" style={{ flex: 'none' }} /> {t}
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass" style={{ padding: 24, background: 'linear-gradient(140deg, rgba(0,229,153,.08), transparent)' }}>
                <div className="badge-live"><span className="pulse-dot" /> AVERAGE RESPONSE</div>
                <div className="stat-value" style={{ fontSize: '2rem', marginTop: 10 }}>&lt; 1 day</div>
                <p className="muted" style={{ fontSize: '.84rem', marginTop: 6 }}>Municipal & enterprise requests are triaged by a dedicated government desk.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
