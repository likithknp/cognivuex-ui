import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer
} from "recharts";

const data = [
  { day: 1, value: 88 },
  { day: 5, value: 95 },
  { day: 10, value: 100 },
  { day: 15, value: 92 },
  { day: 20, value: 82 },
  { day: 25, value: 76 },
  { day: 30, value: 80 }
];

export default function HealthTrendChart() {
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
      <h3>Health Trend</h3>

      <p style={{color:"#64748b"}}>
        Last 30 days
      </p>

      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#2563eb"
            fill="#dbeafe"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}