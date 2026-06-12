import {
  LayoutDashboard,
  Calendar,
  Brain,
  Activity,
  HeartPulse,
  Bot,
  Watch,
  Settings,
  ChevronDown
} from "lucide-react";

import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      style={{
        width: 240,
        background: "#ffffff",
        borderRight: "1px solid #e5e7eb",
        padding: "20px",
        minHeight: "100vh"
      }}
    >
      <div style={{ marginBottom: 30 }}>
        <h2 style={{ color: "#0f172a" }}>
          CognivueX
        </h2>

        <p
          style={{
            fontSize: 12,
            color: "#64748b"
          }}
        >
          Predict. Prevent. Personalize.
        </p>
      </div>

      <MenuLink to="/dashboard" icon={<LayoutDashboard size={18} />} text="Dashboard" />

      <MenuLink to="/digital-twin" icon={<Brain size={18} />} text="Digital Twin" />

      <MenuLink to="/timeline" icon={<Calendar size={18} />} text="Health Timeline" />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 20,
          marginBottom: 10,
          color: "#64748b",
          fontSize: 14
        }}
      >
        Intelligence
        <ChevronDown size={14} />
      </div>

      <MenuLink to="/disease-risk" icon={<Activity size={18} />} text="Disease Risk" />

      <MenuLink to="/biological-age" icon={<HeartPulse size={18} />} text="Biological Age" />

      <MenuLink to="/genomics" icon={<Brain size={18} />} text="Genomics" />

      <MenuLink to="/copilot" icon={<Bot size={18} />} text="AI Copilot" />

      <MenuLink to="/wearables" icon={<Watch size={18} />} text="Wearables" />

      <div
        style={{
          marginTop: 20,
          marginBottom: 10,
          color: "#64748b",
          fontSize: 14
        }}
      >
        AI Analysis
      </div>

      <MenuLink to="/ai/explainable" text="Explainable AI" />
      <MenuLink to="/ai/confidence" text="AI Confidence" />
      <MenuLink to="/ai/reasoning" text="AI Reasoning" />

      <div style={{ marginTop: 30 }}>
        <MenuLink
          to="/settings"
          icon={<Settings size={18} />}
          text="Settings"
        />
      </div>
    </div>
  );
}

function MenuLink({ to, icon, text }) {
  return (
    <Link
      to={to}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "12px",
        borderRadius: 12,
        marginBottom: 5,
        color: "#334155"
      }}
    >
      {icon}
      {text}
    </Link>
  );
}