import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Bell, X } from "lucide-react";
import { useMyNotificationsQuery } from "../../app/api.js";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const { data } = useMyNotificationsQuery();
  const ref = useRef(null);
  const panelRef = useRef(null);

  const notifications = data?.data?.notifications || [];
  const unread = notifications.filter((n) => !n.readAt).length;

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target) &&
          panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const panel = open && (
    <>
      <div onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 9998 }} />
      <div ref={panelRef} style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "min(420px, calc(100vw - 32px))",
        maxHeight: "calc(100vh - 80px)",
        overflowY: "auto",
        background: "white",
        color: "#0f172a",
        borderRadius: 14,
        boxShadow: "0 25px 80px rgba(0,0,0,0.3)",
        padding: 18,
        zIndex: 9999,
        border: "1px solid var(--border, #e2e8f0)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div>
            <h4 style={{ margin: 0, fontSize: 15, color: "var(--brand-900, #0f172a)" }}>Notifications</h4>
            {unread > 0 && <p style={{ margin: "2px 0 0", fontSize: 12, color: "var(--text-muted, #64748b)" }}>{unread} unread</p>}
          </div>
          <button onClick={() => setOpen(false)} style={{ background: "transparent", border: "none", cursor: "pointer", padding: 6, color: "var(--text-muted, #64748b)" }}>
            <X size={20} />
          </button>
        </div>
        {notifications.length === 0 ? (
          <p style={{ margin: 0, fontSize: 13, color: "var(--text-muted, #64748b)", textAlign: "center", padding: "30px 0" }}>No notifications yet.</p>
        ) : (
          notifications.slice(0, 20).map((n) => (
            <div key={n._id} style={{ padding: "12px 4px", borderBottom: "1px solid #f1f5f9", fontSize: 13 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                <strong style={{ fontSize: 13 }}>{n.title}</strong>
                {!n.readAt && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--primary-500, #6366f1)", flexShrink: 0, marginTop: 6 }} />}
              </div>
              {n.message && <p style={{ margin: "4px 0 0", color: "var(--text-muted, #64748b)", fontSize: 12, lineHeight: 1.4 }}>{n.message.slice(0, 140)}{n.message.length > 140 ? "..." : ""}</p>}
            </div>
          ))
        )}
      </div>
    </>
  );

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={() => setOpen(!open)} style={{
        background: "transparent", border: "none", color: "rgba(255,255,255,0.8)",
        cursor: "pointer", padding: 6, borderRadius: 6, position: "relative"
      }} aria-label="Notifications">
        <Bell size={18} />
        {unread > 0 && (
          <span style={{
            position: "absolute", top: 0, right: 0, background: "#dc2626", color: "white",
            fontSize: 10, fontWeight: 700, borderRadius: 999, minWidth: 16, height: 16,
            display: "grid", placeItems: "center", padding: "0 4px"
          }}>{unread > 9 ? "9+" : unread}</span>
        )}
      </button>
      {typeof document !== "undefined" ? createPortal(panel, document.body) : null}
    </div>
  );
}