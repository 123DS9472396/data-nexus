import { useState, useEffect } from "react";
import { pipelines } from "../services/api";

export default function Pipelines() {
  const [pipes, setPipes] = useState([]);

  useEffect(() => {
    pipelines.list().then(r => setPipes(r.data)).catch(console.error);
  }, []);

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'active': return 'var(--status-success-bg)';
      case 'running': return 'var(--status-info-bg)';
      case 'failed': return 'var(--status-danger-bg)';
      default: return 'var(--status-warning-bg)';
    }
  };

  const getStatusTextColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'active': return 'var(--status-success-text)';
      case 'running': return 'var(--status-info-text)';
      case 'failed': return 'var(--status-danger-text)';
      default: return 'var(--status-warning-text)';
    }
  };

  return (
    <div className="animate-enter" style={{ padding: "40px", maxWidth: "1280px", margin: "0 auto" }}>
      <header style={{ marginBottom: "40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "8px" }}>Pipeline Management</h1>
          <p style={{ color: "var(--color-text-secondary)" }}>Configure and monitor data extraction workflows.</p>
        </div>
        <button style={{ 
          background: "var(--color-accent-gradient)", color: "white", 
          border: "none", padding: "12px 24px", borderRadius: "8px", 
          fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" 
        }}>
          <span>+</span> Create Pipeline
        </button>
      </header>

      <div className="glass-card" style={{ padding: "1px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ background: "var(--color-bg-tertiary)", borderBottom: "1px solid var(--color-border)" }}>
              <th style={{ padding: "16px 24px", fontSize: "13px", color: "var(--color-text-secondary)", fontWeight: "600", textTransform: "uppercase" }}>Name</th>
              <th style={{ padding: "16px 24px", fontSize: "13px", color: "var(--color-text-secondary)", fontWeight: "600", textTransform: "uppercase" }}>Source</th>
              <th style={{ padding: "16px 24px", fontSize: "13px", color: "var(--color-text-secondary)", fontWeight: "600", textTransform: "uppercase" }}>Destination</th>
              <th style={{ padding: "16px 24px", fontSize: "13px", color: "var(--color-text-secondary)", fontWeight: "600", textTransform: "uppercase" }}>Status</th>
              <th style={{ padding: "16px 24px", fontSize: "13px", color: "var(--color-text-secondary)", fontWeight: "600", textTransform: "uppercase", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pipes.map((p, i) => (
              <tr key={p.id} style={{ borderBottom: i === pipes.length - 1 ? "none" : "1px solid var(--color-border)", transition: "background 0.2s" }}
                  onMouseOver={e => e.currentTarget.style.background = "var(--color-bg-tertiary)"}
                  onMouseOut={e => e.currentTarget.style.background = "transparent"}>
                <td style={{ padding: "20px 24px", fontWeight: "500", display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {p.source === 'API' ? '⚡' : p.source === 'Kafka' ? '🚀' : '💾'}
                  </div>
                  {p.name}
                </td>
                <td style={{ padding: "20px 24px", color: "var(--color-text-secondary)" }}>{p.source}</td>
                <td style={{ padding: "20px 24px", color: "var(--color-text-secondary)" }}>{p.destination}</td>
                <td style={{ padding: "20px 24px" }}>
                  <span style={{ 
                    fontSize: "12px", fontWeight: "600", color: getStatusTextColor(p.status), background: getStatusColor(p.status),
                    padding: "4px 10px", borderRadius: "20px", textTransform: "capitalize"
                  }}>
                    {p.status}
                  </span>
                </td>
                <td style={{ padding: "20px 24px", textAlign: "right" }}>
                  <button style={{ background: "transparent", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "12px" }}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
            {pipes.length === 0 && (
              <tr>
                <td colSpan="5" style={{ padding: "40px", textAlign: "center", color: "var(--color-text-tertiary)" }}>No pipelines found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
