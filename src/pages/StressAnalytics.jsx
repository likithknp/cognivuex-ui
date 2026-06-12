export default function StressAnalytics() {
  return (
    <div style={{padding:"40px"}}>
      <h1>Stress Analytics</h1>

      <h3>Excellent</h3>

      <p>
        AI-powered insights for optimal health
      </p>

      <div
        style={{
          display:"grid",
          gridTemplateColumns:"repeat(3,1fr)",
          gap:"20px",
          marginTop:"30px"
        }}
      >
        <div>Metric 1 : 91</div>
        <div>Metric 2 : 92</div>
        <div>Metric 3 : 93</div>
        <div>Metric 4 : 94</div>
        <div>Metric 5 : 95</div>
        <div>Metric 6 : 96</div>
      </div>
    </div>
  );
}