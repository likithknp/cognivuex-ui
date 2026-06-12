export default function RecommendationCard({
  title,
  text
}) {
  return (
    <div
      style={{
        padding:"18px",
        borderBottom:"1px solid #e2e8f0"
      }}
    >
      <h4>{title}</h4>

      <p
        style={{
          color:"#64748b",
          marginTop:"8px"
        }}
      >
        {text}
      </p>
    </div>
  );
}