import React, { useState, useRef, useEffect } from 'react';

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
    whiteSpace: 'pre-wrap',
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
  const [files, setFiles] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    // auto-scroll to bottom when messages change
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  async function sendMessage() {
    const question = input.trim();
    if (!question && files.length === 0) return;

    const userMsg = { role: 'user', text: question || (files.length ? 'Uploaded reports for analysis' : '') };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const form = new FormData();
      form.append('question', question);
      files.forEach((f) => form.append('files', f));

      const res = await fetch('http://localhost:4000/api/copilot', {
        method: 'POST',
        body: form,
      });

      if (!res.ok) throw new Error('Backend unavailable');

      const data = await res.json();
      const { answer, score, findings } = data;
      let assistantText = answer || 'Sorry, I could not compute an answer.';
      if (typeof score === 'number') assistantText += `\n\nHealth score: ${score}%`;
      if (Array.isArray(findings) && findings.length) assistantText += `\nFindings: ${findings.join('; ')}`;

      setMessages((m) => [...m, { role: 'assistant', text: assistantText }]);
      // clear files after successful analysis
      setFiles([]);
    } catch (err) {
      // Fallback simulated response when backend not reachable — small heuristic for realistic reply
      const fallback = generateFallbackReply(question, files);
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

  function generateFallbackReply(question, uploadedFiles) {
    const q = (question || '').toLowerCase();
    const fileText = uploadedFiles.map((f) => f.name.toLowerCase()).join(' ');
    const combined = `${q} ${fileText}`;

    let score = 80;
    const findings = [];
    if (combined.includes('cholesterol') || combined.includes('ldl')) { findings.push('High cholesterol'); score -= 15; }
    if (combined.includes('blood pressure') || combined.includes('bp') || combined.includes('hypertension')) { findings.push('Blood pressure concerns'); score -= 12; }
    if (combined.includes('glucose') || combined.includes('hba1c') || combined.includes('sugar')) { findings.push('Elevated glucose'); score -= 12; }
    if (combined.includes('normal') || combined.includes('within range')) { score += 6; }
    score = Math.max(10, Math.min(99, score));

    let reply = 'I don\'t have live backend access right now. Here is a simulated analysis based on provided inputs.';
    reply += `\n\nHealth score (simulated): ${score}%`;
    if (findings.length) reply += `\nFindings: ${findings.join('; ')}`;
    reply += '\n\nProvide more specific values (e.g., cholesterol: 240 mg/dL, BP: 140/90) for a focused recommendation.';
    return reply;
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
            <div style={{ color: '#64748b', fontSize: 13 }}>Ask me anything about your health or upload reports for analysis</div>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', paddingRight: 8 }} ref={containerRef}>
          {messages.map((m, i) => (
            <MessageBubble key={i} role={m.role} text={m.text} />
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexDirection: 'column' }}>
          <div style={{ alignSelf: 'stretch', display: 'flex', gap: 12, alignItems: 'center' }}>
            <input
              type="file"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files))}
              disabled={loading}
            />
            <div style={{ fontSize: 13, color: '#475569' }}>{files.length ? `${files.length} file(s) selected` : 'No files selected'}</div>
          </div>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center', width: '100%' }}>
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
              {loading ? 'Analyzing…' : 'Send'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
