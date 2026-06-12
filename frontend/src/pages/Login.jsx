import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await login(username, password);
      navigate("/");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      padding: "20px"
    }}>
      <div className="glass-card animate-enter" style={{
        padding: "40px",
        width: "100%",
        maxWidth: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "24px"
      }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{
            fontSize: "32px",
            fontWeight: "700",
            letterSpacing: "-0.5px",
            background: "var(--color-accent-gradient)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "8px"
          }}>
            DataNexus
          </h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "14px" }}>
            Sign in to your workspace
          </p>
        </div>

        {error && (
          <div style={{
            background: "var(--status-danger-bg)",
            color: "var(--status-danger-text)",
            padding: "12px",
            borderRadius: "8px",
            fontSize: "14px",
            textAlign: "center",
            border: "1px solid rgba(239, 68, 68, 0.2)"
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                background: "var(--color-bg-primary)",
                border: "1px solid var(--color-border)",
                padding: "12px 16px",
                borderRadius: "8px",
                color: "var(--color-text-primary)",
                outline: "none",
                fontFamily: "inherit"
              }}
              placeholder="e.g. admin"
              required
            />
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                background: "var(--color-bg-primary)",
                border: "1px solid var(--color-border)",
                padding: "12px 16px",
                borderRadius: "8px",
                color: "var(--color-text-primary)",
                outline: "none",
                fontFamily: "inherit"
              }}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" style={{
            background: "var(--color-accent-gradient)",
            color: "white",
            border: "none",
            padding: "14px",
            borderRadius: "8px",
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer",
            marginTop: "8px",
            fontFamily: "inherit",
            transition: "opacity 0.2s"
          }}
          onMouseOver={(e) => e.target.style.opacity = "0.9"}
          onMouseOut={(e) => e.target.style.opacity = "1"}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
