import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../app/api.js";
import { toast } from "sonner";
import { ArrowRight, Lock, AlertCircle, Users, ShieldCheck, ChefHat, GraduationCap, Clock, Receipt } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login({ email, password, role }).unwrap();
      toast.success("Welcome back to MealTrack");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      const msg = err?.data?.message || "Login failed. Please check your credentials.";
      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-side">
        <Link to="/" className="auth-brand">
          <img src="/favicon.svg" alt="" width="36" height="36" />
          <span>MealTrack</span>
        </Link>
        <div className="auth-side-content">
          <h2>Hostel Mess<br />Management Portal</h2>
          <p>Sign in using your institutional credentials to register for daily meals, access your QR attendance pass, and review mess fees.</p>
          <div className="auth-side-points">
            <div><Lock size={16} /> Official IIIT-Bh authentication</div>
            <div><Clock size={16} /> Meal registration &amp; cutoffs</div>
            <div><Receipt size={16} /> Itemized hostel dining ledger</div>
          </div>
        </div>
        <p className="auth-side-foot">IIIT Bhubaneswar &bull; 2026</p>
      </div>

      <div className="auth-main">
        <div className="auth-card">
          <div className="auth-card-head">
            <h1>Sign In</h1>
            <p>Enter your credentials to access the hostel mess portal</p>
          </div>

          {error && (
            <div className="auth-error">
              <AlertCircle size={16} /> <span>{error}</span>
            </div>
          )}

          <div className="auth-info">
            <h4>Who are you?</h4>
            <div className="auth-info-grid">
              <button type="button" className={`auth-info-item auth-role-option${role === "student" ? " selected" : ""}`} onClick={() => setRole("student")} disabled={isLoading} aria-pressed={role === "student"}>
                <GraduationCap size={16} />
                <div>
                  <strong>Student</strong>
                  <span>Register first, then login</span>
                </div>
              </button>
              <button type="button" className={`auth-info-item auth-role-option${role === "admin" ? " selected" : ""}`} onClick={() => setRole("admin")} disabled={isLoading} aria-pressed={role === "admin"}>
                <ShieldCheck size={16} />
                <div>
                  <strong>Mess Admin</strong>
                  <span>Fixed credentials</span>
                </div>
              </button>
              <button type="button" className={`auth-info-item auth-role-option${role === "mess_committee" ? " selected" : ""}`} onClick={() => setRole("mess_committee")} disabled={isLoading} aria-pressed={role === "mess_committee"}>
                <Users size={16} />
                <div>
                  <strong>Mess Committee</strong>
                  <span>Fixed credentials</span>
                </div>
              </button>
              <button type="button" className={`auth-info-item auth-role-option${role === "staff" ? " selected" : ""}`} onClick={() => setRole("staff")} disabled={isLoading} aria-pressed={role === "staff"}>
                <ChefHat size={16} />
                <div>
                  <strong>Kitchen Staff</strong>
                  <span>Fixed credentials</span>
                </div>
              </button>
            </div>
            <p className="auth-role-hint" aria-live="polite">
              {role ? `Selected: ${role === "mess_committee" ? "Mess Committee" : role.charAt(0).toUpperCase() + role.slice(1)}` : "Select your account type to sign in."}
            </p>
            <p className="auth-info-note">
              <strong>New student?</strong> <Link to="/register">Create an account</Link> - an administrator must approve it before you can sign in.
            </p>
          </div>

          <form className="auth-form" onSubmit={submit}>
            <label><span>Email address</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@iiit-bh.ac.in" required disabled={isLoading} autoComplete="email" />
            </label>
            <label><span>Password</span>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required disabled={isLoading} autoComplete="current-password" />
            </label>
            <button type="submit" className="auth-submit" disabled={isLoading || !role}>
              {isLoading ? "Signing in..." : <>Sign In <ArrowRight size={16} /></>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}