import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateMyProfileMutation } from "../../app/api.js";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/auth/authSlice.js";
import { toast } from "sonner";
import { Building2, UtensilsCrossed, Check, ArrowRight } from "lucide-react";

export default function ChooseMessSystemPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [update] = useUpdateMyProfileMutation();
  const [busy, setBusy] = useState(null);

  const pickFirstFloor = async () => {
    setBusy("1st_floor");
    try {
      const res = await update({ messSystem: "1st_floor" }).unwrap();
      dispatch(setUser(res.data.user));
      toast.success("Welcome to 1st Floor mess");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      toast.error(err?.data?.message || "Failed");
      setBusy(null);
    }
  };

  const pickGroundFloor = () => {
    navigate("/ground-floor/enroll", { replace: true });
  };

  return (
    <div style={{ maxWidth: 960, margin: "60px auto", padding: "0 20px" }}>
      <header style={{ textAlign: "center", marginBottom: 40 }}>
        <h1 style={{ fontSize: 32, marginBottom: 8, color: "var(--brand-900, #0f172a)", letterSpacing: "-0.03em" }}>Choose Your Dining Plan</h1>
        <p style={{ color: "var(--text-muted, #64748b)", maxWidth: 560, margin: "0 auto", fontSize: 15 }}>
          Select the dining model that suits your schedule. Both plans feature full menu access.
        </p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
        <div className="card" style={{ padding: 32, border: "1px solid var(--border, #e2e8f0)", boxShadow: "var(--shadow-md)" }}>
          <div style={{ width: 50, height: 50, background: "var(--primary-50, #eef2ff)", color: "var(--primary-600, #4f46e5)", borderRadius: 14, display: "grid", placeItems: "center", marginBottom: 20 }}>
            <UtensilsCrossed size={24} />
          </div>
          <h2 style={{ fontSize: 22, marginBottom: 8, color: "var(--brand-900, #0f172a)" }}>Flex Pay-Per-Meal</h2>
          <p style={{ color: "var(--text-muted, #64748b)", marginBottom: 18, fontSize: 14, lineHeight: 1.5 }}>
            Ideal for flexible schedules. Pre-register per meal, cancel before cutoffs, and settle via monthly ledger.
          </p>
          <ul style={{ listStyle: "none", padding: 0, marginBottom: 24, display: "grid", gap: 10, fontSize: 13, color: "var(--brand-800, #1e293b)" }}>
            <li style={{ display: "flex", gap: 8, alignItems: "center" }}><Check size={16} color="var(--primary-600, #4f46e5)" /> Register on-demand daily</li>
            <li style={{ display: "flex", gap: 8, alignItems: "center" }}><Check size={16} color="var(--primary-600, #4f46e5)" /> Flexible cancellations prior to cutoff</li>
            <li style={{ display: "flex", gap: 8, alignItems: "center" }}><Check size={16} color="var(--primary-600, #4f46e5)" /> Itemized monthly billing ledger</li>
          </ul>
          <button className="btn-primary" onClick={pickFirstFloor} disabled={busy === "1st_floor"} style={{ width: "100%" }}>
            {busy === "1st_floor" ? "Selecting..." : <>Select Flex Plan <ArrowRight size={15} /></>}
          </button>
        </div>

        <div className="card" style={{ padding: 32, border: "1px solid var(--border, #e2e8f0)", boxShadow: "var(--shadow-md)" }}>
          <div style={{ width: 50, height: 50, background: "var(--accent-50, #fff7ed)", color: "var(--accent-500, #f97316)", borderRadius: 14, display: "grid", placeItems: "center", marginBottom: 20 }}>
            <Building2 size={24} />
          </div>
          <h2 style={{ fontSize: 22, marginBottom: 8, color: "var(--brand-900, #0f172a)" }}>All-Inclusive Semester Plan</h2>
          <p style={{ color: "var(--text-muted, #64748b)", marginBottom: 18, fontSize: 14, lineHeight: 1.5 }}>
            One-time prepaid semester package. Guaranteed meal enrollment with no daily booking hassle.
          </p>
          <ul style={{ listStyle: "none", padding: 0, marginBottom: 24, display: "grid", gap: 10, fontSize: 13, color: "var(--brand-800, #1e293b)" }}>
            <li style={{ display: "flex", gap: 8, alignItems: "center" }}><Check size={16} color="var(--accent-500, #f97316)" /> Single one-time semester payment</li>
            <li style={{ display: "flex", gap: 8, alignItems: "center" }}><Check size={16} color="var(--accent-500, #f97316)" /> Choose your preferred daily meal slots</li>
            <li style={{ display: "flex", gap: 8, alignItems: "center" }}><Check size={16} color="var(--accent-500, #f97316)" /> Unlimited walk-in dining access</li>
          </ul>
          <button className="btn-primary" onClick={pickGroundFloor} disabled={!!busy} style={{ width: "100%", background: "linear-gradient(135deg, var(--accent-500), #ea580c)" }}>
            Continue to Enroll <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}