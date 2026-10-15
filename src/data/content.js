import {
  Camera, Gauge, Siren, Network, Cpu, ShieldCheck, Activity, Radio,
  Waypoints, LineChart, Server, Lock, Clock, Leaf, TrafficCone, Eye,
  Zap, GitBranch, Bell, MapPin
} from 'lucide-react'

export const CAPABILITIES = [
  {
    icon: Camera,
    title: 'Camera-Based Density Detection',
    desc: 'Connects to existing city CCTV and IP traffic cameras and runs edge computer vision to count vehicles and measure real-time lane congestion — no new ground loops or radar required.',
    points: ['Per-lane vehicle counting at 30 FPS', 'Queue-length & occupancy estimation', 'Works in rain, fog & low-light (IR fusion)']
  },
  {
    icon: Gauge,
    title: 'Dynamic Signal Control',
    desc: 'Replaces fixed-time timers. Lanes carrying heavy traffic automatically get longer green phases, balanced against cross-traffic to prevent gridlock and starvation.',
    points: ['Adaptive phase extension & truncation', 'Coordinated green-wave corridors', 'MUTCD / IRC-93 compliant phase logic']
  },
  {
    icon: Siren,
    title: 'Automated Green Corridors',
    desc: 'Instantly identifies approaching ambulances, fire engines and police vehicles — then turns every signal along their route green to clear a path with zero dispatcher delay.',
    points: ['Acoustic siren + visual beacon detection', 'Pre-emptive multi-intersection clearance', 'Automatic hand-back to adaptive mode']
  },
  {
    icon: Network,
    title: 'Hardware-Agnostic Integration',
    desc: 'Compatible with existing RTSP / ONVIF municipal CCTV and most signal controllers over NTCIP, so cities deploy on infrastructure they already own.',
    points: ['RTSP, ONVIF, HLS stream ingest', 'NTCIP 1202 controller bridge', 'Edge gateway or cloud inference']
  },
  {
    icon: Cpu,
    title: 'Edge-AI Inference Engine',
    desc: 'A hardened inference node runs at the cabinet so detection continues even if the uplink drops. Models update over-the-air with signed, verifiable manifests.',
    points: ['Sub-80 ms per-frame latency', 'Offline-first failover to safe timing', 'OTA model updates, SHA-256 verified']
  },
  {
    icon: ShieldCheck,
    title: 'Privacy & Compliance by Design',
    desc: 'All inference is anonymized at the edge — no faces, no plates stored. Built for municipal data-governance, FISMA, and India CCTV guidelines.',
    points: ['On-device anonymization', 'No PII leaves the cabinet', 'Full audit trail & role-based access']
  }
]

export const METRICS = [
  { value: 38, suffix: '%', label: 'Faster ambulance arrival', sub: 'median across pilot corridors', color: 'var(--green)' },
  { value: 27, suffix: '%', label: 'Reduction in peak congestion', sub: 'avg. intersection delay drop', color: 'var(--blue)' },
  { value: 19, suffix: '%', label: 'Lower idling emissions', sub: 'estimated CO₂ at signals', color: 'var(--green)' },
  { value: 4.2, suffix: 's', label: 'Siren → clear intersection', decimals: 1, label2: 'Green Corridor latency', color: 'var(--amber)' }
]

export const BIG_STATS = [
  { value: 1240, suffix: '+', label: 'Intersections under adaptive control' },
  { value: 36, suffix: '', label: 'Cities & authorities deployed' },
  { value: 8700, suffix: '+', label: 'Green Corridors cleared' },
  { value: 99.95, suffix: '%', decimals: 2, label: 'Edge node uptime (12-mo)' }
]

export const DEMO_STEPS = [
  { t: '00.0s', title: 'Siren Detected', desc: 'Acoustic model flags an emergency siren signature 420 m from the Ring Road junction.', state: 'warn', icon: Radio },
  { t: '00.8s', title: 'Vehicle Classified', desc: 'Computer vision confirms a Type-II ambulance with active beacons on camera CAM-14N.', state: 'warn', icon: Eye },
  { t: '01.6s', title: 'Route Projected', desc: 'Pathfinder projects the corridor across 4 downstream intersections toward City Hospital.', state: 'ok', icon: Waypoints },
  { t: '02.9s', title: 'Signals Pre-empted', desc: 'Conflicting phases cleared; green wave committed with safe inter-green buffers.', state: 'ok', icon: Zap },
  { t: '04.2s', title: 'Corridor Clear', desc: 'All four intersections green along route. Average civilian delay +3.1 s.', state: 'ok', icon: ShieldCheck }
]

export const PIPELINE = [
  { icon: Camera, label: 'Stream Ingest', val: 'RTSP · 1080p · 30fps' },
  { icon: Cpu, label: 'Object Detection', val: 'YOLO-edge · 78ms' },
  { icon: Activity, label: 'Density Model', val: 'per-lane queue est.' },
  { icon: GitBranch, label: 'Signal Planner', val: 'NTCIP phase plan' },
  { icon: TrafficCone, label: 'Controller', val: 'green committed' }
]

export const CASE_STUDIES = [
  {
    city: 'Pune Smart City', tag: 'Corridor Pilot',
    quote: 'Ambulance transit on the University Road corridor dropped from 11.4 to 7.0 minutes within the first quarter. The hand-back to adaptive mode was seamless.',
    name: 'Dr. A. Kulkarni', role: 'Director, City Mobility Cell', stat: '−38% transit time'
  },
  {
    city: 'Metro Transit Authority', tag: 'Congestion Program',
    quote: 'We retrofitted 210 existing ONVIF cameras with zero new field sensors. Peak-hour delay on the eastern grid fell 27% and complaints dropped with it.',
    name: 'J. Fernandes', role: 'Chief Signals Engineer', stat: '210 cameras, 0 new sensors'
  },
  {
    city: 'Coastal Fire & Rescue', tag: 'First-Responder Protocol',
    quote: 'Response crews trust it. The corridor commits before the driver even reaches the junction, and the audit log gives us the accountability our board required.',
    name: 'Capt. R. Mehta', role: 'Station Operations Lead', stat: '4.2s pre-emption'
  }
]

export const INTEGRATIONS = [
  'Axis Communications', 'Hikvision ONVIF', 'Bosch IP', 'Dahua RTSP',
  'Econolite Cobalt', 'Siemens Sitraffic', 'McCain ATC', 'TransCore NTCIP',
  'Milestone XProtect', 'Genetec', 'Teltonika Edge', 'NVIDIA Jetson'
]

export const FAQ = [
  { q: 'Do we need to install new sensors in the road?', a: 'No. PulseTraffic AI is hardware-agnostic and works with your existing RTSP/ONVIF CCTV and traffic cameras. Computer vision replaces inductive loops and radar, so there is no civil work, no lane closures, and no trenching.' },
  { q: 'How does the Green Corridor know an emergency vehicle is approaching?', a: 'Two independent signals: an acoustic model that recognises siren signatures, and a computer-vision model that confirms the vehicle class and active beacons on camera. Requiring both dramatically reduces false pre-emptions.' },
  { q: 'What happens if the network or cloud goes down?', a: 'Every intersection runs an edge inference node that keeps detecting locally. If the uplink drops, the signal falls back to a validated safe adaptive plan — it never reverts to an unsafe state, and all events are buffered and replayed on reconnect.' },
  { q: 'Is any personal data or video stored?', a: 'Inference is anonymized at the edge. We do not store faces or licence plates — only vehicle counts, classes and timing metadata. This keeps deployments aligned with municipal data-governance and privacy guidelines.' },
  { q: 'How long does a pilot deployment take?', a: 'A single-corridor pilot (4–8 intersections) is typically live in 3–5 weeks: stream onboarding, controller bridging, calibration, and a shadow-mode validation period before adaptive control is enabled.' },
  { q: 'Which signal controllers are supported?', a: 'Any controller exposing NTCIP 1202, plus direct integrations with Econolite, Siemens, McCain and TransCore. Our NTCIP bridge sits beside the existing cabinet and requires no controller firmware changes.' }
]

export const PRICING = [
  {
    name: 'Corridor Pilot', price: 'Pilot', unit: '4–8 intersections',
    desc: 'A fixed-scope, time-boxed pilot on one corridor to prove impact with your own cameras.',
    feats: ['Up to 8 intersections', 'Density + adaptive control', 'One Green Corridor route', 'Shadow-mode validation', 'Impact report & dashboard'],
    cta: 'Request Pilot', pop: false
  },
  {
    name: 'City Grid', price: 'Scale', unit: 'per 100 intersections',
    desc: 'Full adaptive grid with unlimited Green Corridors, central operations console and SLAs.',
    feats: ['Unlimited intersections', 'Unlimited emergency corridors', 'Central ops console + GIS', 'OTA edge model updates', '99.9% uptime SLA', 'Dedicated success engineer'],
    cta: 'Talk to Sales', pop: true
  },
  {
    name: 'Sovereign', price: 'Gov', unit: 'on-prem / air-gapped',
    desc: 'Fully on-premise or air-gapped deployment for national and defence-grade authorities.',
    feats: ['On-prem / air-gapped', 'Full source escrow option', 'Custom model training', 'FISMA / IL audit support', 'Role-based access & audit log', '24/7 priority response'],
    cta: 'Contact Gov Team', pop: false
  }
]

export const SECURITY = [
  { icon: Lock, title: 'Edge anonymization', desc: 'No PII leaves the cabinet.' },
  { icon: ShieldCheck, title: 'Signed OTA updates', desc: 'SHA-256 verified model manifests.' },
  { icon: Server, title: 'On-prem option', desc: 'Air-gapped sovereign deployments.' },
  { icon: Clock, title: 'Full audit trail', desc: 'Every pre-emption logged & replayable.' }
]

export const BENEFITS = [
  { icon: Leaf, title: 'Lower emissions', desc: 'Less idling at red lights cuts CO₂ and particulate load at the junction.' },
  { icon: Siren, title: 'Lives saved', desc: 'Every second shaved off ambulance transit improves survival odds.' },
  { icon: LineChart, title: 'Measurable ROI', desc: 'Delay, transit time and throughput reported against your own baseline.' },
  { icon: Bell, title: 'Fewer complaints', desc: 'Smoother peak flow means fewer citizen grievances to field.' }
]

export const NAV = [
  { to: '/', label: 'Home' },
  { to: '/platform', label: 'Platform' },
  { to: '/demo', label: 'Live Demo' },
  { to: '/resources', label: 'Resources' },
  { to: '/contact', label: 'Request Pilot' }
]

export const INTERSECTIONS = [
  { id: 'A', name: 'Ring Road × MG Ave', x: 150, y: 120, lanes: 8 },
  { id: 'B', name: 'University Rd × 5th', x: 360, y: 90, lanes: 6 },
  { id: 'C', name: 'Hospital Gate', x: 560, y: 150, lanes: 4 },
  { id: 'D', name: 'Civic Centre', x: 300, y: 260, lanes: 10 },
  { id: 'E', name: 'Market Square', x: 520, y: 300, lanes: 6 }
]
