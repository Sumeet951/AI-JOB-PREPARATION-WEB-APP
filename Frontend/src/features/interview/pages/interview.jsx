import { useState } from "react";

const REPORT = {
  matchScore: 88,
  technicalQuestions: [
    {
      question: "Explain the Node.js event loop and how it handles asynchronous I/O operations.",
      intention: "To assess the candidate's deep understanding of Node.js internal architecture and non-blocking I/O.",
      answer: "The candidate should explain the different phases of the event loop (timers, pending callbacks, idle/prepare, poll, check, close). They should mention how Libuv handles the thread pool and how the callback queue works with the call stack to ensure performance without blocking the main thread.",
    },
    {
      question: "How do you optimize a MongoDB aggregation pipeline for high-volume data?",
      intention: "To test practical experience with database performance and the candidate's claim of reducing response times by 35%.",
      answer: "Focus on using $match as early as possible to reduce the dataset, ensuring fields used in $match and $sort are indexed, and avoiding $unwind if possible as it inflates the document count. Mention the use of 'explain()' to analyze execution plans.",
    },
    {
      question: "Can you describe the Cache-Aside pattern and when you would use Redis in a Node.js application?",
      intention: "To evaluate the candidate's understanding of caching strategies, given their basic knowledge of Redis.",
      answer: "The candidate should explain that the application first checks the cache; if data is missing (cache miss), it fetches from the DB, stores it in the cache, and returns it. They should discuss TTL (Time to Live) and cache invalidation strategies to prevent stale data.",
    },
    {
      question: "What are the challenges of migrating a monolithic application to a modular service-based architecture?",
      intention: "To explore the candidate's experience with architectural changes and service boundaries.",
      answer: "Discuss data consistency across services, communication overhead (REST vs gRPC), service discovery, and the complexity of managing multiple deployments.",
    },
  ],
  behavioralQuestions: [
    {
      question: "Describe a time when you had to optimize a piece of code that was causing production delays. How did you identify the bottleneck?",
      intention: "To evaluate problem-solving skills and the use of monitoring/profiling tools.",
      answer: "The candidate should use the STAR method. They should mention using tools like Chrome DevTools, New Relic, or MongoDB Atlas Profiler, the specific metrics they looked at, and the measurable impact of their fix.",
    },
    {
      question: "How do you approach learning a new technology, such as your recent work with the Gemini API?",
      intention: "To assess adaptability and the ability to stay updated with industry trends.",
      answer: "The candidate should describe their process: reading official documentation, building a proof-of-concept, understanding the limitations, and eventually integrating it into a structured project.",
    },
  ],
  skillGaps: [
    { skill: "Message Queues (Kafka/RabbitMQ)", severity: "high" },
    { skill: "Advanced Docker & CI/CD Pipelines", severity: "medium" },
    { skill: "Distributed Systems Design", severity: "medium" },
    { skill: "Production-level Redis management", severity: "low" },
  ],
  preparationPlan: [
    { day: 1, focus: "Node.js Internals & Streams", tasks: ["Deep dive into the Event Loop phases and process.nextTick vs setImmediate.", "Practice implementing Node.js Streams for handling large data sets."] },
    { day: 2, focus: "Advanced MongoDB & Indexing", tasks: ["Study Compound Indexes, TTL Indexes, and Text Indexes.", "Practice writing complex Aggregation pipelines and using the .explain('executionStats') method."] },
    { day: 3, focus: "Caching & Redis Strategies", tasks: ["Read about Redis data types beyond strings (Sets, Hashes, Sorted Sets).", "Implement a Redis-based rate limiter or a caching layer for a sample API."] },
    { day: 4, focus: "System Design & Microservices", tasks: ["Study Microservices communication patterns (Synchronous vs Asynchronous).", "Learn about the API Gateway pattern and Circuit Breakers."] },
    { day: 5, focus: "Message Queues & DevOps Basics", tasks: ["Watch introductory tutorials on RabbitMQ or Kafka.", "Dockerize a project and write a simple GitHub Actions workflow for CI."] },
    { day: 6, focus: "Data Structures & Algorithms", tasks: ["Solve 5-10 Medium LeetCode problems focusing on Arrays, Strings, and Hash Maps.", "Review common sorting and searching algorithms."] },
    { day: 7, focus: "Mock Interview & Project Review", tasks: ["Conduct a mock interview focusing on explaining the Real-time Chat Application architecture.", "Prepare concise summaries for all work experience bullets."] },
  ],
};

const NAV_ITEMS = [
  {
    id: "technical", label: "Technical Questions",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  },
  {
    id: "behavioral", label: "Behavioral Questions",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  },
  {
    id: "roadmap", label: "Road Map",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>,
  },
];

const severityStyles = {
  high: { bg: "rgba(153,27,27,0.25)", border: "rgba(239,68,68,0.4)", color: "#fca5a5" },
  medium: { bg: "rgba(120,53,15,0.25)", border: "rgba(245,158,11,0.4)", color: "#fcd34d" },
  low: { bg: "rgba(20,83,45,0.25)", border: "rgba(34,197,94,0.4)", color: "#86efac" },
};

const QuestionCard = ({ item, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl mb-3 overflow-hidden" style={{ backgroundColor: "#1f2937", border: "1px solid #374151" }}>
      <div
        className="flex items-start gap-3 p-4 cursor-pointer select-none"
        onClick={() => setOpen(o => !o)}
      >
        <span className="shrink-0 text-xs font-bold px-2 py-1 rounded-lg mt-0.5" style={{ backgroundColor: "rgba(236,72,153,0.15)", color: "#f472b6", border: "1px solid rgba(236,72,153,0.3)" }}>
          Q{index + 1}
        </span>
        <p className="flex-1 text-sm font-medium text-white leading-relaxed">{item.question}</p>
        <span className="shrink-0 mt-1 transition-transform duration-200" style={{ color: "#6b7280", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </span>
      </div>
      {open && (
        <div className="px-4 pb-4 flex flex-col gap-3" style={{ borderTop: "1px solid #374151" }}>
          <div className="pt-3">
            <span className="text-xs font-semibold px-2 py-0.5 rounded uppercase tracking-wider" style={{ backgroundColor: "rgba(99,102,241,0.15)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.3)" }}>
              Intention
            </span>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "#9ca3af" }}>{item.intention}</p>
          </div>
          <div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded uppercase tracking-wider" style={{ backgroundColor: "rgba(236,72,153,0.15)", color: "#f472b6", border: "1px solid rgba(236,72,153,0.3)" }}>
              Model Answer
            </span>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "#9ca3af" }}>{item.answer}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const RoadMapDay = ({ day }) => (
  <div className="rounded-xl p-4 mb-3" style={{ backgroundColor: "#1f2937", border: "1px solid #374151" }}>
    <div className="flex items-center gap-3 mb-3">
      <span className="text-xs font-bold px-2 py-1 rounded-lg" style={{ backgroundColor: "rgba(236,72,153,0.15)", color: "#f472b6", border: "1px solid rgba(236,72,153,0.3)" }}>
        Day {day.day}
      </span>
      <h3 className="font-semibold text-white text-sm">{day.focus}</h3>
    </div>
    <ul className="flex flex-col gap-2">
      {day.tasks.map((task, i) => (
        <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#9ca3af" }}>
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "#ec4899" }} />
          {task}
        </li>
      ))}
    </ul>
  </div>
);

const ScoreRing = ({ score }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 80 ? "#4ade80" : score >= 60 ? "#facc15" : "#f87171";

  return (
    <div className="flex flex-col items-center">
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#374151" strokeWidth="8" />
        <circle
          cx="50" cy="50" r={radius} fill="none"
          stroke={color} strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
        <text x="50" y="46" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">{score}</text>
        <text x="50" y="60" textAnchor="middle" fill="#9ca3af" fontSize="10">%</text>
      </svg>
    </div>
  );
};

export default function Interview() {
  const [activeNav, setActiveNav] = useState("technical");

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: "#030712", fontFamily: "'Segoe UI', sans-serif" }}>
      <div className="flex h-screen overflow-hidden">

        {/* ── Left Nav ── */}
        <nav className="w-56 shrink-0 flex flex-col gap-1 p-4 pt-6" style={{ backgroundColor: "#111827", borderRight: "1px solid #1f2937" }}>
          <p className="text-xs uppercase tracking-widest mb-3 px-2" style={{ color: "#6b7280" }}>Sections</p>
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all"
              style={{
                backgroundColor: activeNav === item.id ? "rgba(236,72,153,0.12)" : "transparent",
                color: activeNav === item.id ? "#f472b6" : "#9ca3af",
                border: activeNav === item.id ? "1px solid rgba(236,72,153,0.25)" : "1px solid transparent",
              }}
              onMouseOver={e => { if (activeNav !== item.id) e.currentTarget.style.backgroundColor = "#1f2937"; }}
              onMouseOut={e => { if (activeNav !== item.id) e.currentTarget.style.backgroundColor = "transparent"; }}
            >
              <span style={{ color: activeNav === item.id ? "#ec4899" : "#6b7280" }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* ── Center Content ── */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeNav === "technical" && (
            <section>
              <div className="flex items-center gap-3 mb-5">
                <h2 className="text-xl font-bold text-white">Technical Questions</h2>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(236,72,153,0.15)", color: "#f472b6", border: "1px solid rgba(236,72,153,0.3)" }}>
                  {REPORT.technicalQuestions.length} questions
                </span>
              </div>
              {REPORT.technicalQuestions.map((q, i) => <QuestionCard key={i} item={q} index={i} />)}
            </section>
          )}

          {activeNav === "behavioral" && (
            <section>
              <div className="flex items-center gap-3 mb-5">
                <h2 className="text-xl font-bold text-white">Behavioral Questions</h2>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(236,72,153,0.15)", color: "#f472b6", border: "1px solid rgba(236,72,153,0.3)" }}>
                  {REPORT.behavioralQuestions.length} questions
                </span>
              </div>
              {REPORT.behavioralQuestions.map((q, i) => <QuestionCard key={i} item={q} index={i} />)}
            </section>
          )}

          {activeNav === "roadmap" && (
            <section>
              <div className="flex items-center gap-3 mb-5">
                <h2 className="text-xl font-bold text-white">Preparation Road Map</h2>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(236,72,153,0.15)", color: "#f472b6", border: "1px solid rgba(236,72,153,0.3)" }}>
                  {REPORT.preparationPlan.length}-day plan
                </span>
              </div>
              {REPORT.preparationPlan.map(day => <RoadMapDay key={day.day} day={day} />)}
            </section>
          )}
        </main>

        {/* ── Right Sidebar ── */}
        <aside className="w-56 shrink-0 p-4 pt-6 flex flex-col gap-5" style={{ backgroundColor: "#111827", borderLeft: "1px solid #1f2937" }}>

          {/* Match Score */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs uppercase tracking-widest" style={{ color: "#6b7280" }}>Match Score</p>
            <ScoreRing score={REPORT.matchScore} />
            <p className="text-xs text-center font-medium" style={{ color: "#4ade80" }}>Strong match for this role</p>
          </div>

          <div className="h-px w-full" style={{ backgroundColor: "#1f2937" }} />

          {/* Skill Gaps */}
          <div>
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#6b7280" }}>Skill Gaps</p>
            <div className="flex flex-col gap-2">
              {REPORT.skillGaps.map((gap, i) => {
                const s = severityStyles[gap.severity];
                return (
                  <span key={i} className="text-xs font-medium px-2 py-1.5 rounded-lg" style={{ backgroundColor: s.bg, border: `1px solid ${s.border}`, color: s.color }}>
                    {gap.skill}
                  </span>
                );
              })}
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}