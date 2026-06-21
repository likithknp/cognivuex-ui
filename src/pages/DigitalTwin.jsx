import React, {
  useEffect,
  useState,
} from "react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  getDigitalTwin,
} from "../services/digitalTwinService";

const DigitalTwin = () => {

  const [data, setData] = useState(null);

  useEffect(() => {
    loadTwin();
  }, []);

  const loadTwin = async () => {
    try {
      const response =
        await getDigitalTwin();

      setData(response);
    } catch (error) {
      console.error(error);
    }
  };

  if (!data)
    return (
      <div className="p-10">
        Loading...
      </div>
    );

  const systems = [
    {
      name: "Cardiovascular",
      value: data.cardiovascularScore,
    },
    {
      name: "Immune",
      value: data.immuneScore,
    },
    {
      name: "Metabolic",
      value: data.metabolicScore,
    },
    {
      name: "Respiratory",
      value: data.respiratoryScore,
    },
    {
      name: "Endocrine",
      value: data.endocrineScore,
    },
    {
      name: "Nervous",
      value: data.nervousSystemScore,
    },
  ];

  const projection = Array.from(
    { length: 15 },
    (_, index) => ({
      year: 2025 + index,
      age:
        Number(data.biologicalAge) +
        index,
    })
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">

      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-8">

        <h1 className="text-4xl font-bold">
          Your Digital Twin
        </h1>

        <div className="grid grid-cols-5 gap-4 mt-8">

          <Card
            title="Biological Age"
            value={data.biologicalAge}
          />

          <Card
            title="Health Span"
            value={data.healthSpanPrediction}
          />

          <Card
            title="Risk Score"
            value={data.riskScore}
          />

          <Card
            title="Longevity"
            value={data.longevityIndex}
          />

          <Card
            title="Twin Accuracy"
            value={data.twinAccuracy}
          />

        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-6">

        <div className="bg-slate-900 p-6 rounded-3xl">

          <h2 className="text-xl font-semibold mb-4">
            Biological Systems Health
          </h2>

          {systems.map((item) => (
            <div
              key={item.name}
              className="mb-4"
            >
              <div className="flex justify-between">
                <span>{item.name}</span>
                <span>{item.value}%</span>
              </div>

              <div className="w-full h-2 bg-slate-700 rounded-full">

                <div
                  className="h-2 bg-blue-500 rounded-full"
                  style={{
                    width: `${item.value}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-900 p-6 rounded-3xl">

          <h2 className="text-xl font-semibold">
            Health Insights
          </h2>

          <div className="mt-4 space-y-3">

            <p>
              Wellness Score:
              {data.wellnessScore}
            </p>

            <p>
              Sleep Score:
              {data.sleepScore}
            </p>

            <p>
              Heart Score:
              {data.heartScore}
            </p>

            <p>
              Stress Score:
              {data.stressScore}
            </p>

            <p>
              Recovery Score:
              {data.recoveryScore}
            </p>

          </div>

        </div>

      </div>

      <div className="bg-slate-900 rounded-3xl p-6 mt-6">

        <h2 className="text-xl font-semibold mb-4">
          Biological Age Projection
        </h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <AreaChart data={projection}>

            <XAxis dataKey="year" />

            <YAxis />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="age"
              stroke="#3B82F6"
              fill="#2563EB"
            />

          </AreaChart>
        </ResponsiveContainer>

      </div>

      <div className="bg-slate-900 rounded-3xl p-6 mt-6">

        <h2 className="text-xl font-semibold">
          Disease Risks
        </h2>

        <p className="mt-4">
          {data.diseaseRisks}
        </p>

      </div>

      <div className="bg-slate-900 rounded-3xl p-6 mt-6">

        <h2 className="text-xl font-semibold">
          AI Suggestions
        </h2>

        <p className="mt-4">
          {data.suggestions}
        </p>

      </div>

    </div>
  );
};

const Card = ({
  title,
  value,
}) => (
  <div className="bg-slate-800 rounded-2xl p-4">
    <p className="text-gray-400">
      {title}
    </p>

    <h3 className="text-3xl font-bold">
      {value}
    </h3>
  </div>
);

export default DigitalTwin;