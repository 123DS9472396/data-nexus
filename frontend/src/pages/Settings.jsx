import { useAuth } from "../context/AuthContext";

export default function Settings() {
  const { user, logout } = useAuth();

  return (
    <div className="animate-enter" style={{ padding: "40px", maxWidth: "1280px", margin: "0 auto" }}>
      <header style={{ marginBottom: "40px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "8px" }}>Settings & Profile</h1>
        <p style={{ color: "var(--color-text-secondary)" }}>Manage your account and workspace configurations.</p>
      </header>

      <div style={{ display: "grid", gap: "32px", maxWidth: "800px" }}>
        
        {/* Profile Section */}
        <div className="glass-card" style={{ padding: "32px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "24px", color: "var(--color-text-primary)" }}>User Profile</h2>
          
          <div style={{ display: "flex", gap: "24px", alignItems: "center", marginBottom: "32px" }}>
            <div style={{ 
              width: "80px", height: "80px", borderRadius: "50%", 
              background: "var(--color-accent-gradient)", display: "flex", 
              alignItems: "center", justifyContent: "center", fontSize: "32px", fontWeight: "700" 
            }}>
              {(user?.username || 'A')[0].toUpperCase()}
            </div>
            <div>
              <p style={{ fontSize: "24px", fontWeight: "600" }}>{user?.username || 'Admin User'}</p>
              <p style={{ color: "var(--color-text-secondary)", marginBottom: "8px" }}>{user?.email || 'admin@example.com'}</p>
              <span style={{ background: "var(--color-bg-tertiary)", padding: "4px 12px", borderRadius: "12px", fontSize: "12px", fontWeight: "500", color: "var(--color-text-secondary)", textTransform: "uppercase" }}>
                Role: {user?.role || 'Superuser'}
              </span>
            </div>
          </div>
          
          <button onClick={logout} style={{ 
            background: "var(--status-danger-bg)", color: "var(--status-danger-text)", 
            border: "1px solid rgba(239, 68, 68, 0.2)", padding: "12px 24px", 
            borderRadius: "8px", fontWeight: "600", cursor: "pointer", transition: "all 0.2s"
          }}
          onMouseOver={e => e.currentTarget.style.background = "rgba(239, 68, 68, 0.25)"}
          onMouseOut={e => e.currentTarget.style.background = "var(--status-danger-bg)"}
          >
            Sign Out
          </button>
        </div>

        {/* Workspace Section */}
        <div className="glass-card" style={{ padding: "32px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "24px", color: "var(--color-text-primary)" }}>Workspace Preferences</h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ fontWeight: "500", marginBottom: "4px" }}>Dark Mode</p>
                <p style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>Use the dark theme for the entire application.</p>
              </div>
              <div style={{ width: "48px", height: "24px", background: "var(--color-accent-primary)", borderRadius: "12px", position: "relative" }}>
                <div style={{ width: "20px", height: "20px", background: "white", borderRadius: "50%", position: "absolute", right: "2px", top: "2px" }}></div>
              </div>
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--color-border)", paddingTop: "24px" }}>
              <div>
                <p style={{ fontWeight: "500", marginBottom: "4px" }}>Slack Notifications</p>
                <p style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>Receive alerts when a pipeline fails.</p>
              </div>
              <button style={{ background: "transparent", border: "1px solid var(--color-border)", color: "var(--color-text-primary)", padding: "8px 16px", borderRadius: "6px", cursor: "pointer" }}>
                Configure
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
