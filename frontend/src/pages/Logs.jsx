import { useState, useEffect } from "react";

export default function Logs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const NODE_URL = import.meta.env.VITE_NODE_URL || "http://localhost:3001";
    const es = new EventSource(`${NODE_URL}/events/stream`);
    es.onmessage = (e) => {
      const event = JSON.parse(e.data);
      setLogs(prev => [event, ...prev].slice(0, 100));
    };
    return () => es.close();
  }, []);

  return (
    <div className="animate-enter" style={{ padding: "40px", maxWidth: "1280px", margin: "0 auto", height: "100vh", display: "flex", flexDirection: "column" }}>
      <header style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "8px" }}>Activity Logs</h1>
        <p style={{ color: "var(--color-text-secondary)" }}>Real-time system audit trails and error tracing.</p>
      </header>

      <div className="glass-card" style={{ flex: 1, padding: "24px", background: "#050505", overflowY: "auto", fontFamily: "monospace", display: "flex", flexDirection: "column", gap: "8px" }}>
        {logs.length === 0 ? (
          <div style={{ color: "var(--color-text-tertiary)", textAlign: "center", marginTop: "40px" }}>Awaiting real-time events...</div>
        ) : (
          logs.map((log, i) => (
            <div key={i} style={{ 
              display: "flex", gap: "16px", padding: "8px", 
              borderBottom: "1px solid rgba(255,255,255,0.02)",
              color: log.event_type.includes('fail') ? "var(--status-danger-text)" : "var(--color-text-secondary)"
            }}>
              <span style={{ color: "var(--color-text-tertiary)", minWidth: "200px" }}>
                [{new Date(log.created_at).toISOString()}]
              </span>
              <span style={{ color: "var(--color-accent-primary)", minWidth: "150px" }}>
                {log.event_type.toUpperCase()}
              </span>
              <span style={{ color: "var(--color-text-primary)" }}>
                Pipeline: {log.pipeline_name}
              </span>
              <span style={{ color: "var(--status-success-text)", marginLeft: "auto" }}>
                {log.payload ? JSON.stringify(log.payload) : '{}'}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
