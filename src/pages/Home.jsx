import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHeartbeat,
  FaBrain,
  FaChartLine,
  FaFileMedical,
} from "react-icons/fa";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-800 text-white">

      {/* Navbar */}
      <nav className="w-full fixed top-0 left-0 z-50 backdrop-blur-lg bg-black/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <h1 className="text-3xl font-bold tracking-wide text-cyan-300">
            CognivueX
          </h1>

          <div className="flex gap-4">
            <Link to="/login">
              <button className="px-5 py-2 rounded-xl border border-white/20 hover:bg-white/10 transition duration-300">
                Login
              </button>
            </Link>

            <Link to="/register">
              <button className="px-5 py-2 rounded-xl bg-cyan-400 text-slate-900 font-semibold hover:scale-105 transition duration-300 shadow-lg">
                Register
              </button>
            </Link>
          </div>

        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-40 pb-20 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
            AI-Powered <br />
            Health Prediction Dashboard
          </h1>

          <p className="text-xl text-gray-300 leading-relaxed mb-10">
            Upload medical reports, extract health metrics using OCR,
            and generate intelligent disease risk predictions using AI.
          </p>

          <div className="flex flex-wrap gap-5">
            <Link to="/upload">
              <button className="bg-cyan-400 text-slate-900 px-8 py-4 rounded-2xl text-lg font-bold hover:scale-105 transition duration-300 shadow-2xl">
                Upload Report
              </button>
            </Link>

            <Link to="/dashboard">
              <button className="border border-white/20 px-8 py-4 rounded-2xl text-lg hover:bg-white/10 transition duration-300">
                Explore Dashboard
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Right Cards */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-8 shadow-2xl">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="bg-white/10 rounded-2xl p-6 hover:scale-105 transition duration-300">
                <FaHeartbeat className="text-4xl text-red-400 mb-4" />
                <h3 className="text-2xl font-semibold mb-2">
                  Heart Risk
                </h3>
                <p className="text-gray-300">
                  Predict cardiovascular risks instantly.
                </p>
              </div>

              <div className="bg-white/10 rounded-2xl p-6 hover:scale-105 transition duration-300">
                <FaBrain className="text-4xl text-cyan-300 mb-4" />
                <h3 className="text-2xl font-semibold mb-2">
                  AI Analysis
                </h3>
                <p className="text-gray-300">
                  OCR powered intelligent prediction engine.
                </p>
              </div>

              <div className="bg-white/10 rounded-2xl p-6 hover:scale-105 transition duration-300">
                <FaChartLine className="text-4xl text-green-400 mb-4" />
                <h3 className="text-2xl font-semibold mb-2">
                  Health Trends
                </h3>
                <p className="text-gray-300">
                  Interactive analytics & health charts.
                </p>
              </div>

              <div className="bg-white/10 rounded-2xl p-6 hover:scale-105 transition duration-300">
                <FaFileMedical className="text-4xl text-yellow-300 mb-4" />
                <h3 className="text-2xl font-semibold mb-2">
                  OCR Reports
                </h3>
                <p className="text-gray-300">
                  Extract medical parameters automatically.
                </p>
              </div>

            </div>

          </div>
        </motion.div>

      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">

        <h2 className="text-5xl font-bold text-center mb-16">
          Why Choose CognivueX?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-lg border border-white/10">
            <h3 className="text-2xl font-semibold mb-4">
              Smart OCR
            </h3>

            <p className="text-gray-300">
              Extract BP, sugar, cholesterol, BMI and more directly from reports.
            </p>
          </div>

          <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-lg border border-white/10">
            <h3 className="text-2xl font-semibold mb-4">
              AI Predictions
            </h3>

            <p className="text-gray-300">
              Generate diabetes, heart disease and obesity risk scores instantly.
            </p>
          </div>

          <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-lg border border-white/10">
            <h3 className="text-2xl font-semibold mb-4">
              Modern Dashboard
            </h3>

            <p className="text-gray-300">
              Beautiful analytics, charts and responsive mobile-friendly UI.
            </p>
          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-gray-400">
        © 2026 CognivueX • AI Assisted Healthcare Platform
      </footer>

    </div>
  );
}

export default Home;