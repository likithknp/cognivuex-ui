export default function WellnessBanner({ report }) {

  const getField = (obj, camel, snake, fallback = 0) =>
    obj?.[camel] ?? obj?.[snake] ?? fallback;

  const getRiskColor = () => {
    switch (getField(report, "riskLevel", "risk_level", "Unknown")) {
      case "LOW":
        return "#22c55e";
      case "MEDIUM":
        return "#f59e0b";
      case "HIGH":
        return "#ef4444";
      default:
        return "#ffffff";
    }
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(135deg,#2563eb,#06b6d4)",
        color: "white",
        borderRadius: "24px",
        padding: "30px",
        marginBottom: "25px",
        boxShadow: "0 10px 30px rgba(37,99,235,0.25)"
      }}
    >
      <div
        style={{
          fontSize: "14px",
          opacity: 0.9
        }}
      >
        AI Wellness Score
      </div>

      <h1
        style={{
          fontSize: "70px",
          margin: "0",
          lineHeight: 1
        }}
      >
        {getField(report, "wellnessScore", "wellness_score", 0)}
      </h1>

      <p
        style={{
          marginTop: "8px",
          fontSize: "18px"
        }}
      >
        Risk Level:
        <span
          style={{
            color: getRiskColor(),
            fontWeight: "bold",
            marginLeft: "8px"
          }}
        >
          {getField(report, "riskLevel", "risk_level", "Unknown")}
        </span>
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "20px",
          marginTop: "25px"
        }}
      >
        <div>
          <div
            style={{
              fontSize: "13px",
              opacity: 0.8
            }}
          >
            Biological Age
          </div>

          <h3 style={{ margin: "5px 0" }}>
            {getField(report, "biologicalAge", "biological_age", 0)}
          </h3>
        </div>

        <div>
          <div
            style={{
              fontSize: "13px",
              opacity: 0.8
            }}
          >
            Longevity Index
          </div>

          <h3 style={{ margin: "5px 0" }}>
            {getField(report, "longevityIndex", "longevity_index", 0)}
          </h3>
        </div>

        <div>
          <div
            style={{
              fontSize: "13px",
              opacity: 0.8
            }}
          >
            Patient
          </div>

          <h3 style={{ margin: "5px 0" }}>
            {report?.patientName ?? report?.patient_name ?? report?.patient ?? "Unknown"}
          </h3>
        </div>
      </div>
    </div>
  );
}