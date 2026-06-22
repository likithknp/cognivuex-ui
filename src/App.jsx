import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Upload from "./pages/Upload";
import Dashboard from "./pages/Dashboard";
import DigitalTwin from "./pages/DigitalTwin";
import HealthTimeline from "./pages/HealthTimeline";
import DiseaseRisk from "./pages/DiseaseRisk";
import BiologicalAge from "./pages/BiologicalAge";
import Genomics from "./pages/Genomics";
import Copilot from "./pages/Copilot";
import Wearables from "./pages/Wearables";
import ExplainableAI from "./pages/ExplainableAI";
import AIConfidence from "./pages/AIConfidence";
import AIReasoning from "./pages/AIReasoning";
import Settings from "./pages/Settings";

import Login from "./pages/Login";
import Register from "./pages/Register";

import SleepIntelligence from "./pages/SleepIntelligence";
import HeartIntelligence from "./pages/HeartIntelligence";
import CognitiveWellness from "./pages/CognitiveWellness";
import NutritionIntelligence from "./pages/NutritionIntelligence";
import ActivityIntelligence from "./pages/ActivityIntelligence";
import MetabolicHealth from "./pages/MetabolicHealth";
import StressAnalytics from "./pages/StressAnalytics";
import RecoveryReadiness from "./pages/RecoveryReadiness";

function App() {
  return (
    <BrowserRouter>
      <Routes>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

        <Route element={<MainLayout />}>

          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/digital-twin" element={<DigitalTwin />} />
          <Route path="/timeline" element={<HealthTimeline />} />
          <Route path="/disease-risk" element={<DiseaseRisk />} />
          <Route path="/biological-age" element={<BiologicalAge />} />
          <Route path="/genomics" element={<Genomics />} />
          <Route path="/copilot" element={<Copilot />} />
          <Route path="/wearables" element={<Wearables />} />

          <Route path="/ai/explainable" element={<ExplainableAI />} />
          <Route path="/ai/confidence" element={<AIConfidence />} />
          <Route path="/ai/reasoning" element={<AIReasoning />} />

          <Route path="/settings" element={<Settings />} />

          <Route path="/sleep" element={<SleepIntelligence />} />
          <Route path="/heart" element={<HeartIntelligence />} />
          <Route path="/cognitive" element={<CognitiveWellness />} />
          <Route path="/nutrition" element={<NutritionIntelligence />} />
          <Route path="/activity" element={<ActivityIntelligence />} />
          <Route path="/metabolic" element={<MetabolicHealth />} />
          <Route path="/stress" element={<StressAnalytics />} />
          <Route path="/recovery" element={<RecoveryReadiness />} />
          <Route path="/upload" element={<Upload />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;