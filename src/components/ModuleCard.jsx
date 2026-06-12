import { Link } from "react-router-dom";

export default function ModuleCard({
  title,
  desc,
  link
}) {
  return (
    <div
      style={{
        background:"#fff",
        border:"1px solid #e2e8f0",
        borderRadius:"18px",
        padding:"20px"
      }}
    >
      <h3>{title}</h3>

      <p
        style={{
          color:"#64748b",
          margin:"10px 0"
        }}
      >
        {desc}
      </p>

      <Link
        to={link}
        style={{
          color:"#2563eb",
          fontWeight:"600"
        }}
      >
        Explore →
      </Link>
    </div>
  );
}