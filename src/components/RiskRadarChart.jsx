import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer
} from "recharts";

const data = [
  { subject: "Cardiovascular", A: 18 },
  { subject: "Metabolic", A: 12 },
  { subject: "Cognitive", A: 8 },
  { subject: "Immune", A: 15 },
  { subject: "Stress", A: 20 }
];

export default function RiskRadarChart() {
  return (
    <div
      style={{
        background:"#fff",
        border:"1px solid #e2e8f0",
        borderRadius:"18px",
        padding:"20px",
        height:"320px"
      }}
    >
      <h3>Risk Assessment</h3>

      <p style={{color:"#64748b"}}>
        AI-predicted risk factors
      </p>

      <ResponsiveContainer width="100%" height="80%">
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />

          <Radar
            dataKey="A"
            stroke="#2563eb"
            fill="#2563eb"
            fillOpacity={0.5}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}