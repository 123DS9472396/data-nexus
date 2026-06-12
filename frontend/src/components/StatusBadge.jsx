const colors = {
  active:  { bg: "var(--color-background-success)", color: "var(--color-text-success)" },
  running: { bg: "var(--color-background-info)",    color: "var(--color-text-info)" },
  failed:  { bg: "var(--color-background-danger)",  color: "var(--color-text-danger)" },
  paused:  { bg: "var(--color-background-warning)", color: "var(--color-text-warning)" },
  success: { bg: "var(--color-background-success)", color: "var(--color-text-success)" },
};

export default function StatusBadge({ status }) {
  const style = colors[status] || colors.paused;
  return (
    <span style={{
      ...style, fontSize: 11, padding: "3px 10px",
      borderRadius: 20, fontWeight: 500
    }}>
      {status}
    </span>
  );
}
