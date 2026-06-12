import { useEffect, useState } from "react";
import { getLatestReport } from "../services/api";
import { buildDashboardDisplay } from "../utils/reportDisplay";

import WellnessBanner from "../components/WellnessBanner";
import StatsCard from "../components/StatsCard";
import HealthTrendChart from "../components/HealthTrendChart";
import RiskRadarChart from "../components/RiskRadarChart";
import ModuleCard from "../components/ModuleCard";
import RecommendationCard from "../components/RecommendationCard";

export default function Dashboard() {

  const [report, setReport] = useState(null);

  const loadDisplayData = (rawReport) => {
    const built = buildDashboardDisplay(rawReport || {});
    setReport(built);
    return built;
  };

  useEffect(() => {
    const storedRaw = JSON.parse(
      localStorage.getItem("lastUploadedReport") || "null"
    );

    getLatestReport()
      .then((res) => {
        const raw = res?.data?.report ?? res?.data ?? res;
        if (raw && Object.keys(raw).length > 0) {
          loadDisplayData(raw);
          localStorage.setItem("lastUploadedReport", JSON.stringify(raw));
        } else if (storedRaw) {
          loadDisplayData(storedRaw);
        } else {
          loadDisplayData({});
        }
      })
      .catch((err) => {
        console.error("Failed to load latest report", err);
        if (storedRaw) {
          loadDisplayData(storedRaw);
        } else {
          loadDisplayData({});
        }
      });
  }, []);

  if (!report) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
          fontSize: "24px"
        }}
      >
        Loading Health Dashboard...
      </div>
    );
  }

  return (
    <>
      <h1>Health Intelligence Dashboard</h1>

      <p
        style={{
          color: "#64748b",
          marginBottom: "20px"
        }}
      >
        Your personalized health insights powered by AI
      </p>

      <WellnessBanner report={report} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
          marginTop: "20px"
        }}
      >
          <StatsCard
            title="Sleep Score"
            value={`${report?.sleepScore ?? 0}/100`}
            status="AI Generated"
          />

          <StatsCard
            title="Heart Score"
            value={`${report?.heartScore ?? 0}/100`}
            status="AI Generated"
          />

          <StatsCard
            title="Stress Score"
            value={`${report?.stressScore ?? 0}/100`}
            status="AI Generated"
          />

          <StatsCard
            title="Recovery Score"
            value={`${report?.recoveryScore ?? 0}/100`}
            status="AI Generated"
          />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginTop: "20px"
        }}
      >
        <HealthTrendChart />
        <RiskRadarChart />
      </div>

      <h2 style={{ marginTop: "40px" }}>
        Health Intelligence Modules
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
          marginTop: "20px"
        }}
      >
        <ModuleCard
          title="Sleep Intelligence"
          desc="Deep sleep analysis"
          link="/sleep"
        />

        <ModuleCard
          title="Heart Intelligence"
          desc="HRV & cardiac health"
          link="/heart"
        />

        <ModuleCard
          title="Cognitive Wellness"
          desc="Brain health metrics"
          link="/cognitive"
        />

        <ModuleCard
          title="Nutrition Intelligence"
          desc="Personalized nutrition"
          link="/nutrition"
        />

        <ModuleCard
          title="Activity Intelligence"
          desc="Movement & fitness"
          link="/activity"
        />

        <ModuleCard
          title="Metabolic Health"
          desc="Energy & metabolism"
          link="/metabolic"
        />

        <ModuleCard
          title="Stress Analytics"
          desc="Mental resilience"
          link="/stress"
        />

        <ModuleCard
          title="Recovery Readiness"
          desc="Daily recovery score"
          link="/recovery"
        />
      </div>

      <div
        style={{
          background: "#fff",
          marginTop: "40px",
          border: "1px solid #e2e8f0",
          borderRadius: "18px"
        }}
      >
        <h2 style={{ padding: "20px" }}>
          AI Health Recommendations
        </h2>

        <RecommendationCard
          title="AI Recommendation"
          text={report?.suggestions ?? "No recommendations available"}
        />
      </div>

      <div
        style={{
          background: "#fff",
          marginTop: "20px",
          border: "1px solid #e2e8f0",
          borderRadius: "18px",
          padding: "20px"
        }}
      >
        <h2>Disease Risk Analysis</h2>

        <p
          style={{
            marginTop: "10px",
            color: "#475569",
            lineHeight: "1.8"
          }}
        >
          {report?.diseaseRisks ?? "No disease risks identified"}
        </p>
      </div>
    </>
  );
}