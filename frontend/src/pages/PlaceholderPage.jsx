export default function PlaceholderPage({ title, description, icon }) {
  return (
    <div style={{ padding: "40px", maxWidth: "1280px", margin: "0 auto", minHeight: "100vh" }}>
      <header className="animate-enter" style={{ marginBottom: "40px" }}>
        <h1 style={{ 
          fontSize: "36px", 
          fontWeight: "700", 
          letterSpacing: "-0.5px",
          color: "var(--color-text-primary)",
          marginBottom: "8px"
        }}>
          {title}
        </h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "16px", fontWeight: "400" }}>
          {description}
        </p>
      </header>

      <div className="glass-card animate-enter" style={{ 
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "80px 20px", textAlign: "center", minHeight: "400px", animationDelay: "0.1s"
      }}>
        <div style={{ fontSize: "64px", marginBottom: "24px", opacity: 0.8 }}>
          {icon}
        </div>
        <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "12px", color: "var(--color-text-primary)" }}>
          Module Under Development
        </h2>
        <p style={{ fontSize: "16px", color: "var(--color-text-secondary)", maxWidth: "400px", lineHeight: "1.6" }}>
          The <strong>{title}</strong> module is currently being finalized for the next release cycle. It will integrate directly with our Django REST APIs.
        </p>
      </div>
    </div>
  );
}
