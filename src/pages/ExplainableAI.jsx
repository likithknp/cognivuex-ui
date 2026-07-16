import React, { useEffect, useState } from 'react';

const featureSets = [
  {
    title: 'AI Feature Importance 1',
    features: [
      { name: 'Sleep Quality', value: 90 },
      { name: 'Heart Rate', value: 80 },
      { name: 'Activity Level', value: 70 },
      { name: 'Nutrition', value: 60 },
    ],
  },
  {
    title: 'AI Feature Importance 2',
    features: [
      { name: 'Sleep Quality', value: 90 },
      { name: 'Heart Rate', value: 80 },
      { name: 'Activity Level', value: 70 },
      { name: 'Nutrition', value: 60 },
    ],
  },
];

function ProgressBar({ value }) {
  return (
    <div style={{ height: 10, background: '#eef3f8', borderRadius: 6 }}>
      <div
        style={{
          height: '100%',
          width: `${value}%`,
          background: 'linear-gradient(90deg,#2b9aff,#4c6bff)',
          borderRadius: 6,
        }}
      />
    </div>
  );
}

export default function ExplainableAI() {
  const [latest, setLatest] = useState(null);

  useEffect(() => {
    fetch('/api/reports/latest')
      .then((r) => r.json())
      .then((j) => setLatest(j.latest))
      .catch(() => setLatest(null));
  }, []);

  const score = latest?.score ?? 96;

  return (
    <div style={{ padding: 24, fontFamily: 'Inter, Arial, sans-serif' }}>
      <h2 style={{ margin: 0, marginBottom: 16 }}>ExplainableAIDashboard</h2>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(90deg,#7b2ff7,#4c6bff)',
          color: 'white',
          padding: 20,
          borderRadius: 12,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontWeight: 700, fontSize: 18 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🧠</div>
            AI Analysis
          </div>
          <div style={{ opacity: 0.9, marginTop: 6 }}>Explainable and trustworthy AI insights</div>
        </div>

        <div style={{ fontSize: 48, fontWeight: 800 }}>{score}%</div>
      </div>

      <div style={{ display: 'flex', gap: 20, marginTop: 20 }}>
        {featureSets.map((set) => (
          <div
            key={set.title}
            style={{
              flex: 1,
              background: 'white',
              borderRadius: 10,
              padding: 18,
              boxShadow: '0 6px 18px rgba(20,40,80,0.05)',
              border: '1px solid #eef3f8',
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 12 }}>{set.title}</div>
            {set.features.map((f) => (
              <div key={f.name} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                  <div style={{ color: '#334155' }}>{f.name}</div>
                  <div style={{ color: '#64748b' }}>{f.value}%</div>
                </div>
                <ProgressBar value={f.value} />
              </div>
            ))}
          </div>
        ))}
      </div>

      {latest && (
        <div style={{ marginTop: 20, background: '#fff', padding: 16, borderRadius: 8, border: '1px solid #eef3f8' }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Latest analysis</div>
          <div style={{ color: '#475569' }}>Score: {latest.score}%</div>
          <div style={{ color: '#475569' }}>Findings: {latest.findings?.join(', ')}</div>
          <div style={{ marginTop: 8, color: '#64748b' }}>Files: {latest.files?.map(f => f.originalName).join(', ')}</div>
        </div>
      )}
    </div>
  );
}
