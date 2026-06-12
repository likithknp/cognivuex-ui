export default function SleepIntelligence() {
  return (
    <div style={{padding:"40px"}}>
      <h1>Sleep Intelligence</h1>

      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(3,1fr)",
        gap:"20px",
        marginTop:"30px"
      }}>
        <div>Sleep Score: 8.5/10</div>
        <div>Avg Duration: 7.8h</div>
        <div>Deep Sleep: 2.1h</div>
      </div>
    </div>
  );
}