import { useState, useEffect } from "react";
import { datasets } from "../services/api";

export default function Datasets() {
  const [sets, setSets] = useState([]);

  useEffect(() => {
    datasets.list().then(r => setSets(r.data)).catch(console.error);
  }, []);

  return (
    <div className="animate-enter" style={{ padding: "40px", maxWidth: "1280px", margin: "0 auto" }}>
      <header style={{ marginBottom: "40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "8px" }}>Datasets Catalog</h1>
          <p style={{ color: "var(--color-text-secondary)" }}>View and manage registered data tables and streams.</p>
        </div>
        <button style={{ 
          background: "var(--color-bg-secondary)", color: "var(--color-text-primary)", 
          border: "1px solid var(--color-border)", padding: "12px 24px", borderRadius: "8px", 
          fontWeight: "600", cursor: "pointer" 
        }}>
          Register Dataset
        </button>
      </header>

      <div className="glass-card" style={{ padding: "1px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ background: "var(--color-bg-tertiary)", borderBottom: "1px solid var(--color-border)" }}>
              <th style={{ padding: "16px 24px", fontSize: "13px", color: "var(--color-text-secondary)", fontWeight: "600", textTransform: "uppercase" }}>Dataset Name</th>
              <th style={{ padding: "16px 24px", fontSize: "13px", color: "var(--color-text-secondary)", fontWeight: "600", textTransform: "uppercase" }}>Format</th>
              <th style={{ padding: "16px 24px", fontSize: "13px", color: "var(--color-text-secondary)", fontWeight: "600", textTransform: "uppercase" }}>Rows</th>
              <th style={{ padding: "16px 24px", fontSize: "13px", color: "var(--color-text-secondary)", fontWeight: "600", textTransform: "uppercase" }}>Size (MB)</th>
              <th style={{ padding: "16px 24px", fontSize: "13px", color: "var(--color-text-secondary)", fontWeight: "600", textTransform: "uppercase", textAlign: "right" }}>Last Refreshed</th>
            </tr>
          </thead>
          <tbody>
            {sets.map((d, i) => (
              <tr key={d.id} style={{ borderBottom: i === sets.length - 1 ? "none" : "1px solid var(--color-border)", transition: "background 0.2s" }}
                  onMouseOver={e => e.currentTarget.style.background = "var(--color-bg-tertiary)"}
                  onMouseOut={e => e.currentTarget.style.background = "transparent"}>
                <td style={{ padding: "20px 24px", fontWeight: "500", display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(59, 130, 246, 0.1)", color: "var(--color-accent-primary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700", textTransform: "uppercase" }}>
                    {d.source_type.substring(0,3)}
                  </div>
                  {d.name}
                </td>
                <td style={{ padding: "20px 24px", color: "var(--color-text-secondary)", textTransform: "uppercase", fontSize: "13px" }}>{d.source_type}</td>
                <td style={{ padding: "20px 24px", color: "var(--color-text-secondary)" }}>{d.row_count.toLocaleString()}</td>
                <td style={{ padding: "20px 24px", color: "var(--color-text-secondary)" }}>{d.size_mb}</td>
                <td style={{ padding: "20px 24px", textAlign: "right", color: "var(--color-text-tertiary)", fontSize: "13px" }}>
                  {new Date(d.last_refreshed).toLocaleString()}
                </td>
              </tr>
            ))}
            {sets.length === 0 && (
              <tr>
                <td colSpan="5" style={{ padding: "40px", textAlign: "center", color: "var(--color-text-tertiary)" }}>No datasets registered.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
