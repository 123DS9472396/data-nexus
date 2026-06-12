import { useState, useEffect } from "react";

export default function Integrations() {
  const [integrations, setIntegrations] = useState([
    { id: 1, name: "Snowflake", provider: "snowflake", type: "Data Warehouse", status: "Disconnected", color: "#29B5E8" },
    { id: 2, name: "PostgreSQL", provider: "postgres", type: "Relational DB", status: "Disconnected", color: "#336791" },
    { id: 3, name: "MongoDB Atlas", provider: "mongodb", type: "NoSQL DB", status: "Disconnected", color: "#47A248" },
    { id: 4, name: "Apache Kafka", provider: "kafka", type: "Event Streaming", status: "Disconnected", color: "#231F20" },
    { id: 5, name: "AWS S3", provider: "aws", type: "Object Storage", status: "Disconnected", color: "#FF9900" },
    { id: 6, name: "Salesforce", provider: "salesforce", type: "CRM", status: "Disconnected", color: "#00A1E0" },
  ]);

  const [loading, setLoading] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [credentials, setCredentials] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const submitConnection = async () => {
    if (!credentials) return;
    setLoading(activeModal.id);
    setErrorMsg("");
    
    try {
      const NODE_URL = import.meta.env.VITE_DJANGO_URL || "http://localhost:8000";
      const token = localStorage.getItem("access_token");
      
      const res = await fetch(`${NODE_URL}/api/integrations/connect/`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          provider: activeModal.provider,
          credentials: { uri: credentials }
        })
      });
      
      const data = await res.json();
      
      if (data.status === "success") {
        setIntegrations(prev => prev.map(int => 
          int.id === activeModal.id ? { ...int, status: "Connected" } : int
        ));
        setActiveModal(null);
      } else {
        setErrorMsg(data.message || "Connection failed.");
      }
    } catch (e) {
      setErrorMsg("Network error trying to reach Django.");
    } finally {
      setLoading(null);
      setCredentials("");
    }
  };

  return (
    <div className="animate-enter" style={{ padding: "40px", maxWidth: "1280px", margin: "0 auto" }}>
      <header style={{ marginBottom: "40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "8px" }}>Integrations</h1>
          <p style={{ color: "var(--color-text-secondary)" }}>Manage your external data source connections.</p>
        </div>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>
        {integrations.map((int) => (
          <div key={int.id} className="glass-card" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "var(--color-bg-tertiary)", border: `1px solid ${int.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>
                {int.name[0]}
              </div>
              <span style={{ 
                fontSize: "12px", fontWeight: "600", 
                color: int.status === 'Connected' ? 'var(--status-success-text)' : int.status === 'Warning' ? 'var(--status-warning-text)' : 'var(--color-text-tertiary)',
                background: int.status === 'Connected' ? 'var(--status-success-bg)' : int.status === 'Warning' ? 'var(--status-warning-bg)' : 'var(--color-bg-tertiary)',
                padding: "4px 10px", borderRadius: "20px"
              }}>
                {int.status}
              </span>
            </div>
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "4px" }}>{int.name}</h3>
              <p style={{ fontSize: "14px", color: "var(--color-text-secondary)" }}>{int.type}</p>
            </div>
            <button 
              onClick={() => setActiveModal(int)}
              disabled={int.status === 'Connected'}
              style={{ 
              marginTop: "8px", width: "100%", padding: "10px", borderRadius: "8px", 
              background: int.status === 'Connected' ? "transparent" : "var(--color-bg-tertiary)", 
              border: int.status === 'Connected' ? "1px solid var(--color-border)" : "none",
              color: "var(--color-text-primary)", fontWeight: "500", 
              cursor: int.status === 'Connected' ? "default" : "pointer",
              transition: "all 0.2s"
            }}>
              {int.status === 'Connected' ? 'Configured' : 'Connect API Key'}
            </button>
          </div>
        ))}
      </div>

      {/* Connection Modal */}
      {activeModal && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
          background: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
        }}>
          <div className="glass-card animate-enter" style={{ padding: "32px", width: "400px", maxWidth: "90%", display: "flex", flexDirection: "column", gap: "16px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "600" }}>Connect {activeModal.name}</h2>
            <p style={{ fontSize: "14px", color: "var(--color-text-secondary)" }}>
              Please paste your secure connection string or API Key below.
            </p>
            
            <input 
              type="text" 
              placeholder={activeModal.provider === 'mongodb' ? "mongodb+srv://..." : "API Key or URI"}
              value={credentials}
              onChange={e => setCredentials(e.target.value)}
              style={{
                width: "100%", padding: "12px", background: "var(--color-bg-primary)",
                border: "1px solid var(--color-border)", borderRadius: "8px",
                color: "var(--color-text-primary)", outline: "none", boxSizing: "border-box"
              }}
            />
            
            {errorMsg && (
              <p style={{ color: "var(--status-danger-text)", fontSize: "13px" }}>{errorMsg}</p>
            )}

            <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
              <button 
                onClick={() => setActiveModal(null)}
                style={{ flex: 1, padding: "12px", background: "transparent", border: "1px solid var(--color-border)", color: "white", borderRadius: "8px", cursor: "pointer" }}
              >
                Cancel
              </button>
              <button 
                onClick={submitConnection}
                disabled={loading === activeModal.id}
                style={{ flex: 1, padding: "12px", background: "var(--color-accent-gradient)", border: "none", color: "white", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}
              >
                {loading === activeModal.id ? "Connecting..." : "Connect Server"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
