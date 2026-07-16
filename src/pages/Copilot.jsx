import React, { useState } from 'react';

function MessageBubble({ role, text }) {
  const isUser = role === 'user';
  const containerStyle = {
    display: 'flex',
    gap: 12,
    alignItems: 'flex-start',
    justifyContent: isUser ? 'flex-end' : 'flex-start',
    marginBottom: 12,
  };
  const bubbleStyle = {
    maxWidth: '78%',
    background: isUser ? '#0b72ff' : '#eef8ff',
    color: isUser ? 'white' : '#0b3b66',
    padding: '12px 16px',
    borderRadius: 12,
    borderTopLeftRadius: isUser ? 12 : 4,
    borderTopRightRadius: isUser ? 4 : 12,
    boxShadow: '0 6px 18px rgba(20,40,80,0.04)',
  };

  return (
    <div style={containerStyle}>
      {!isUser && <div style={{ width: 40, textAlign: 'center' }}>🤖</div>}
      <div style={bubbleStyle}>{text}</div>
      {isUser && <div style={{ width: 40 }} />}
    </div>
  );
}

export default function Copilot() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hello — I am your AI Health Assistant. Ask me anything about your health data.' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    const question = input.trim();
    if (!question) return;
    const userMsg = { role: 'user', text: question };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) throw new Error('Backend unavailable');

      const data = await res.json();
      // Expecting { answer: '...' }
      const answer = data?.answer ?? 'Sorry, I could not compute an answer.';
      setMessages((m) => [...m, { role: 'assistant', text: answer }]);
    } catch (err) {
      // Fallback simulated response when backend not reachable — small heuristic for realistic reply
      const fallback = generateFallbackReply(question);
      setMessages((m) => [...m, { role: 'assistant', text: fallback }]);
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function generateFallbackReply(question) {
    const q = question.toLowerCase();
    if (q.includes('sleep')) {
      return 'Based on typical patterns, improving sleep consistency and avoiding screens before bed can raise your sleep quality. Track sleep duration and REM for tailored advice.';
    }
    if (q.includes('heart') || q.includes('bp') || q.includes('blood')) {
      return 'For heart health, prioritise regular aerobic activity, maintain a healthy sodium intake, and monitor resting heart rate trends. Consult a clinician for abnormal readings.';
    }
    if (q.includes('nutrition') || q.includes('diet')) {
      return 'Focus on balanced meals with lean protein, whole grains and vegetables. Track macros and consider a nutritionist for personalised plans.';
    }
    // generic helpful reply
    return 'I don\'t have live backend access right now. Generally, I can analyze your health metrics, highlight risk factors, and suggest interventions. Provide more details (e.g., sleep hours, activity, blood pressure) for a focused answer.';
  }

  return (
    <div style={{ padding: 24, fontFamily: 'Inter, Arial, sans-serif' }}>
      <h2 style={{ marginTop: 0 }}>AI Copilot</h2>

      <div
        style={{
          borderRadius: 12,
          border: '1px solid #eef3f8',
          background: 'white',
          padding: 20,
          minHeight: 420,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          boxShadow: '0 6px 18px rgba(20,40,80,0.03)',
        }}
      >
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 6 }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: '#eef8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🤖</div>
          <div>
            <div style={{ fontWeight: 700 }}>AI Health Assistant</div>
            <div style={{ color: '#64748b', fontSize: 13 }}>Ask me anything about your health</div>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', paddingRight: 8 }}>
          {messages.map((m, i) => (
            <MessageBubble key={i} role={m.role} text={m.text} />
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <textarea
            placeholder="Ask about your health..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            style={{
              flex: 1,
              resize: 'none',
              padding: '12px 14px',
              borderRadius: 10,
              border: '1px solid #e6eef7',
              minHeight: 44,
              fontSize: 14,
            }}
            disabled={loading}
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            style={{
              background: loading ? '#9bbffb' : 'linear-gradient(90deg,#0b72ff,#4c6bff)',
              color: 'white',
              border: 'none',
              padding: '10px 16px',
              borderRadius: 10,
              cursor: loading ? 'default' : 'pointer',
              fontWeight: 700,
            }}
          >
            {loading ? 'Thinking…' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}
