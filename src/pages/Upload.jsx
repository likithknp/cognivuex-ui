import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { uploadReport } from "../services/reportService";

const Upload = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  const handleAnalyze = async () => {
    if (!file) {
      alert("Please upload a report");
      return;
    }

    try {
      setLoading(true);

      const response = await uploadReport(file);
      const reportData =
        response?.report ?? response?.data?.report ?? response?.data ?? response;
      const predictionData =
        response?.prediction ?? response?.data?.prediction;

      console.debug("Upload response:", response);
      console.debug("Normalized report data:", reportData);

      // Store the upload response which contains both report and prediction
      localStorage.setItem(
        "uploadResponse",
        JSON.stringify(response)
      );

      // Store the report payload for dashboard rendering
      localStorage.setItem(
        "lastUploadedReport",
        JSON.stringify(reportData)
      );

      if (predictionData !== undefined) {
        localStorage.setItem(
          "prediction",
          JSON.stringify(predictionData)
        );
      }

      navigate("/dashboard");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Analysis Failed: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-slate-900 rounded-3xl p-10 shadow-2xl border border-slate-800">

        <h1 className="text-4xl font-bold mb-3">
          Upload Health Report
        </h1>

        <p className="text-slate-400 mb-8">
          Upload PDF, JPG, JPEG or PNG medical reports for AI analysis
        </p>

        <div className="border-2 border-dashed border-cyan-500 rounded-3xl p-10 text-center bg-slate-950">

          <input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-5 block w-full text-sm text-slate-300
            file:mr-4 file:py-3 file:px-6
            file:rounded-xl file:border-0
            file:bg-cyan-500 file:text-white
            hover:file:bg-cyan-400"
          />

          {file && (
            <div className="text-green-400 mt-4">
              Selected File: {file.name}
            </div>
          )}
        </div>

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="w-full mt-8 bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 py-4 rounded-2xl text-lg font-semibold disabled:opacity-50"
        >
          {loading ? "Analyzing Report..." : "Analyze Report"}
        </button>

      </div>
    </div>
  );
};

export default Upload;

