import { Link } from "react-router-dom";
import {
  Utensils, QrCode, Receipt, MessageSquare, ShieldCheck,
  Package, ArrowRight, Check, Lock, Clock, Calendar,
  Building2, AlertCircle, ChefHat, FileText, HelpCircle
} from "lucide-react";

const mealSchedule = [
  { name: "Breakfast", time: "07:30 - 09:30 AM", cutoff: "Cutoff: 05:30 AM", type: "Morning Session" },
  { name: "Lunch", time: "12:00 - 02:00 PM", cutoff: "Cutoff: 10:00 AM", type: "Afternoon Session" },
  { name: "Evening Snacks", time: "05:00 - 06:30 PM", cutoff: "Cutoff: 03:00 PM", type: "Evening Session" },
  { name: "Dinner", time: "07:30 - 09:30 PM", cutoff: "Cutoff: 05:30 PM", type: "Night Session" }
];

const portalServices = [
  {
    icon: Utensils,
    title: "Daily Menus & Dietary Info",
    desc: "View upcoming breakfast, lunch, snacks, and dinner menus published by the Mess Committee with vegetarian, non-veg, and allergen markings."
  },
  {
    icon: QrCode,
    title: "Digital QR Attendance",
    desc: "Present your secure digital meal pass at the mess service counter for instant check-in. Manual roll-number verification is also supported by staff."
  },
  {
    icon: Receipt,
    title: "Itemized Mess Ledger",
    desc: "Track your running monthly consumption in real time. Access detailed transaction statements, downloadable receipts, and refund requests."
  },
  {
    icon: MessageSquare,
    title: "Grievance Redressal Desk",
    desc: "Submit suggestions or complaints regarding food taste, cleanliness, or service directly to the Mess Committee with real-time status tracking."
  },
  {
    icon: Calendar,
    title: "Pre-Booking & Leave Management",
    desc: "Reserve meals in advance or submit leave requests when away from the hostel to pause daily billing within policy deadlines."
  },
  {
    icon: Package,
    title: "Kitchen Inventory & Wastage",
    desc: "Kitchen staff record daily ingredient requisitions and food wastage logs to maintain hygiene standards and eliminate leftovers."
  }
];

const diningGuidelines = [
  {
    title: "Registration Cutoffs",
    desc: "For the 1st Floor mess, meals must be booked at least 2 hours before the start of each session so the kitchen can prepare accurately."
  },
  {
    title: "Cancellation Policy",
    desc: "Booked meals may be cancelled up to 1 hour prior to session opening. Once the cancellation window expires, the meal is billed."
  },
  {
    title: "Counter Verification",
    desc: "Every resident must display their active QR pass or present their university ID number before taking a dining tray."
  },
  {
    title: "Semester Plan Roster",
    desc: "Students registered under the Ground Floor semester package are enrolled for the full term (minimum 3 meals required)."
  }
];

export default function LandingPage() {
  return (
    <div className="landing">
      {/* Navigation */}
      <header className="landing-nav">
        <Link to="/" className="landing-brand">
          <img src="/favicon.svg" alt="MealTrack Logo" width="34" height="34" />
          <span>MealTrack</span>
        </Link>
        <nav className="landing-nav-links">
          <a href="#schedule">Daily Schedule</a>
          <a href="#plans">Dining Plans</a>
          <a href="#services">Services</a>
          <a href="#guidelines">Guidelines</a>
        </nav>
        <div className="landing-nav-cta">
          <Link to="/login" className="landing-btn landing-btn-ghost">Sign In</Link>
          <Link to="/register" className="landing-btn landing-btn-solid">New Student Registration <ArrowRight size={16} /></Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="landing-hero-inner">
          <div className="landing-hero-copy">
            <span className="landing-eyebrow">
              <span className="landing-eyebrow-dot" /> IIIT BHUBANESWAR &bull; HOSTEL DINING PORTAL
            </span>
            <h1>
              Central Mess<br />
              <span className="hero-accent">Management System</span>
            </h1>
            <p className="landing-hero-sub">
              Official dining administration portal for IIIT Bhubaneswar hostel residents, mess committees,
              and kitchen staff. Register daily meals, verify passes, and monitor billing transparently.
            </p>
            <div className="landing-hero-actions">
              <Link to="/login" className="landing-btn landing-btn-solid landing-btn-lg">
                Sign in to Portal <ArrowRight size={18} />
              </Link>
              <Link to="/register" className="landing-btn landing-btn-ghost-light landing-btn-lg">
                Student Registration
              </Link>
            </div>
            <div className="landing-trust">
              <span><ShieldCheck size={15} /> Institutional Authentication</span>
              <span><Clock size={15} /> Automated Cutoff Windows</span>
              <span><Receipt size={15} /> Transparent Mess Billing</span>
            </div>
          </div>

          {/* Institutional Today's Schedule Card */}
          <div className="landing-hero-visual" style={{ height: "auto", display: "block" }}>
            <div style={{
              background: "rgba(255, 255, 255, 0.96)",
              backdropFilter: "blur(14px)",
              borderRadius: "var(--radius-lg)",
              padding: "24px",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)",
              border: "1px solid rgba(255, 255, 255, 0.6)",
              color: "var(--brand-900)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Clock size={18} color="var(--primary-600)" />
                  <strong style={{ fontSize: 15 }}>Today's Mess Schedule</strong>
                </div>
                <span className="pill pill-green" style={{ fontSize: 10 }}>Live System</span>
              </div>

              <div style={{ display: "grid", gap: 10 }}>
                {mealSchedule.map((m) => (
                  <div key={m.name} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 12px",
                    background: "var(--surface)",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border)",
                    fontSize: 13
                  }}>
                    <div>
                      <strong style={{ display: "block", color: "var(--brand-900)" }}>{m.name}</strong>
                      <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{m.cutoff}</span>
                    </div>
                    <span style={{ fontWeight: 600, color: "var(--primary-600)", fontFamily: "monospace" }}>{m.time}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 14, padding: "8px 10px", background: "var(--primary-50)", borderRadius: 8, fontSize: 11, color: "var(--primary-700)", display: "flex", alignItems: "center", gap: 6 }}>
                <AlertCircle size={14} style={{ flexShrink: 0 }} />
                <span>Registrations and cancellations must be submitted before designated cutoff times.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dining Plans Section */}
      <section id="plans" className="landing-section">
        <div className="landing-section-head">
          <span className="landing-eyebrow">Hostel Dining Plans</span>
          <h2>Two Operating Mess Facilities</h2>
          <p>Hostel residents choose their preferred dining model according to their academic schedule.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
          {/* Plan 1 */}
          <div className="card" style={{ padding: 30, borderTop: "4px solid var(--primary-500)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "var(--primary-50)",
                color: "var(--primary-600)",
                display: "grid",
                placeItems: "center"
              }}>
                <Utensils size={22} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: 18 }}>1st Floor Mess &bull; Pay-Per-Meal</h3>
                <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Flexible Daily Registration</span>
              </div>
            </div>
            <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 18 }}>
              Students select which individual meals they wish to take each day. Daily meal costs are aggregated into a transparent monthly ledger bill.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px", display: "grid", gap: 8, fontSize: 13, color: "var(--brand-800)" }}>
              <li style={{ display: "flex", gap: 8, alignItems: "center" }}><Check size={16} color="var(--primary-600)" /> Register for any session daily before cutoff</li>
              <li style={{ display: "flex", gap: 8, alignItems: "center" }}><Check size={16} color="var(--primary-600)" /> Cancel without penalty before cancellation window</li>
              <li style={{ display: "flex", gap: 8, alignItems: "center" }}><Check size={16} color="var(--primary-600)" /> Itemized end-of-month mess billing</li>
            </ul>
            <div style={{ paddingTop: 14, borderTop: "1px solid var(--border)", fontSize: 12, color: "var(--text-muted)" }}>
              Pricing controlled and fixed by institute administration per meal.
            </div>
          </div>

          {/* Plan 2 */}
          <div className="card" style={{ padding: 30, borderTop: "4px solid var(--accent-500)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "var(--accent-50)",
                color: "var(--accent-500)",
                display: "grid",
                placeItems: "center"
              }}>
                <Building2 size={22} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: 18 }}>Ground Floor Mess &bull; Semester Package</h3>
                <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Fixed Term Enrollment</span>
              </div>
            </div>
            <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 18 }}>
              One-time semester fee covering your selected daily meal package throughout the full academic semester with no recurring per-meal bills.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px", display: "grid", gap: 8, fontSize: 13, color: "var(--brand-800)" }}>
              <li style={{ display: "flex", gap: 8, alignItems: "center" }}><Check size={16} color="var(--accent-500)" /> One-time payment for entire academic term</li>
              <li style={{ display: "flex", gap: 8, alignItems: "center" }}><Check size={16} color="var(--accent-500)" /> Minimum 3 daily meal slots required upon enrollment</li>
              <li style={{ display: "flex", gap: 8, alignItems: "center" }}><Check size={16} color="var(--accent-500)" /> Direct counter access without daily reservation</li>
            </ul>
            <div style={{ paddingTop: 14, borderTop: "1px solid var(--border)", fontSize: 12, color: "var(--text-muted)" }}>
              Includes printable verified Semester Dining Pass.
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="landing-section" style={{ background: "white", maxWidth: "none", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 clamp(16px, 4vw, 48px)" }}>
          <div className="landing-section-head">
            <span className="landing-eyebrow">Portal Services</span>
            <h2>Mess Facilities &amp; Student Services</h2>
            <p>Centralized tools supporting residents, committee members, and kitchen staff daily.</p>
          </div>
          <div className="landing-features">
            {portalServices.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="landing-feature">
                <div className="landing-feature-icon"><Icon size={22} /></div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guidelines Section */}
      <section id="guidelines" className="landing-section">
        <div className="landing-section-head">
          <span className="landing-eyebrow">Rules &amp; Policies</span>
          <h2>Mess Operational Guidelines</h2>
          <p>Key hostel rules to ensure smooth meal operations and minimize food wastage.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {diningGuidelines.map((g, idx) => (
            <div key={g.title} className="card" style={{ padding: 22 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--primary-600)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>
                Rule 0{idx + 1}
              </div>
              <h3 style={{ margin: "0 0 8px", fontSize: 16 }}>{g.title}</h3>
              <p style={{ margin: 0, fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>{g.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Student Portal Access */}
      <section className="landing-cta" style={{ background: "linear-gradient(135deg, var(--brand-950) 0%, var(--brand-900) 100%)" }}>
        <div className="landing-cta-inner">
          <h2>Hostel Resident Portal Access</h2>
          <p>Sign in using your IIIT Bhubaneswar student credentials or register a new resident profile.</p>
          <div className="landing-hero-actions" style={{ justifyContent: "center" }}>
            <Link to="/login" className="landing-btn landing-btn-solid landing-btn-lg">
              Sign In to Portal <ArrowRight size={18} />
            </Link>
            <Link to="/register" className="landing-btn landing-btn-ghost-light landing-btn-lg">
              New Student Registration
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <div className="landing-footer-brand">
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <img src="/favicon.svg" alt="" width="30" height="30" />
              <span>MealTrack</span>
            </div>
            <p style={{ fontSize: 13, color: "rgba(255, 255, 255, 0.6)", lineHeight: 1.6 }}>
              Central Mess Management System<br />
              Hostel &amp; Dining Administration<br />
              IIIT Bhubaneswar, Gothapatna, Odisha
            </p>
          </div>
          <div className="landing-footer-cols">
            <div>
              <strong>Quick Links</strong>
              <a href="#schedule">Daily Schedule</a>
              <a href="#plans">Dining Plans</a>
              <a href="#services">Services</a>
              <a href="#guidelines">Guidelines</a>
            </div>
            <div>
              <strong>Portal Access</strong>
              <Link to="/login">Resident Sign In</Link>
              <Link to="/register">Student Sign-Up</Link>
            </div>
            <div>
              <strong>Institution</strong>
              <span>IIIT Bhubaneswar</span>
              <span>Gothapatna, PO: Malipada</span>
              <span>Bhubaneswar - 751003</span>
            </div>
          </div>
        </div>
        <div className="landing-footer-bottom">
          <span>&copy; {new Date().getFullYear()} MealTrack &bull; IIIT Bhubaneswar Mess Management System</span>
          <span>Hostel Administration &bull; All Rights Reserved</span>
        </div>
      </footer>
    </div>
  );
}
