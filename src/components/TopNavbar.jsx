import { Bell } from "lucide-react";

export default function TopNavbar() {
  return (
    <div
      style={{
        height:"70px",
        background:"#fff",
        borderBottom:"1px solid #e2e8f0",
        display:"flex",
        alignItems:"center",
        justifyContent:"space-between",
        padding:"0 30px"
      }}
    >
      <input
        placeholder="Search health data..."
        style={{
          width:"320px",
          padding:"10px 15px",
          borderRadius:"12px",
          border:"1px solid #e2e8f0"
        }}
      />

      <div style={{display:"flex",gap:"20px"}}>
        <Bell />
        <span>Profile</span>
      </div>
    </div>
  );
}