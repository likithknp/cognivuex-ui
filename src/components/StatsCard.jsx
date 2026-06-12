export default function StatsCard({
  title,
  value,
  status
}) {
  return (
    <div
      style={{
        background:"#fff",
        borderRadius:"18px",
        padding:"25px",
        border:"1px solid #e2e8f0"
      }}
    >
      <h2>{value}</h2>

      <p>{title}</p>

      <span
        style={{
          background:"#dcfce7",
          padding:"4px 10px",
          borderRadius:"20px",
          fontSize:"12px"
        }}
      >
        {status}
      </span>
    </div>
  );
}