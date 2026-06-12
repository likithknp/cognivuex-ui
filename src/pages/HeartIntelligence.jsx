export default function HeartIntelligence() {
  return (
    <div style={{padding:"40px"}}>
      <h1>Heart Intelligence</h1>

      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(3,1fr)",
        gap:"20px",
        marginTop:"30px"
      }}>
        <div>Resting HR: 68 bpm</div>
        <div>HRV: 68 ms</div>
        <div>Cardiac Fitness: 94/100</div>
      </div>
    </div>
  );
}