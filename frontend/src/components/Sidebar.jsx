import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menu = [
    { name: "Dashboard", path: "/", icon: "📊" },
    { name: "Pipelines", path: "/pipelines", icon: "⚡" },
    { name: "Datasets", path: "/datasets", icon: "🗄️" },
    { name: "Integrations", path: "/integrations", icon: "🔗" },
    { name: "Activity Logs", path: "/logs", icon: "📜" },
    { name: "Settings", path: "/settings", icon: "⚙️" },
  ];

  return (
    <div style={{
      width: "260px",
      height: "100vh",
      background: "var(--color-bg-secondary)",
      borderRight: "1px solid var(--color-border)",
      padding: "24px 16px",
      display: "flex",
      flexDirection: "column",
      position: "fixed",
      left: 0,
      top: 0,
    }}>
      <div style={{ marginBottom: "40px", padding: "0 12px" }}>
        <h1 style={{ 
          fontSize: "24px", 
          fontWeight: "700", 
          letterSpacing: "-0.5px",
          background: "var(--color-accent-gradient)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          DataNexus
        </h1>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {menu.map((item) => {
          const isActive = location.pathname === item.path || 
                           (item.path !== "/" && location.pathname.startsWith(item.path));
          return (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              style={{
                background: isActive ? "var(--color-bg-tertiary)" : "transparent",
                color: isActive ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                border: "1px solid",
                borderColor: isActive ? "var(--color-border)" : "transparent",
                padding: "12px 16px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.2s ease",
                textAlign: "left"
              }}
              onMouseOver={(e) => {
                if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.02)";
              }}
              onMouseOut={(e) => {
                if (!isActive) e.currentTarget.style.background = "transparent";
              }}
            >
              <span style={{ fontSize: "16px" }}>{item.icon}</span>
              {item.name}
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: "auto", padding: "16px", background: "rgba(59, 130, 246, 0.1)", borderRadius: "12px", border: "1px solid rgba(59, 130, 246, 0.2)" }}>
        <p style={{ fontSize: "12px", color: "var(--color-accent-primary)", fontWeight: "600", marginBottom: "4px" }}>System Status</p>
        <p style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>All microservices operational</p>
      </div>
    </div>
  );
}
