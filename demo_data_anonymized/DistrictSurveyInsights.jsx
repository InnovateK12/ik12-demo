// DistrictSurveyInsights.jsx
// Drop into your Next.js pages or app directory, e.g. /app/survey/demo/page.jsx
// Replace image src paths with your actual image file locations in /public/

import Image from "next/image";

// ─── Data ────────────────────────────────────────────────────────────────────

const overviewStats = [
  { value: "174", label: "Total respondents" },
  { value: "Spring 2026", label: "Survey period" },
  { value: "7", label: "Satisfaction dimensions" },
  { value: "275", label: "Open-ended responses" },
];

const audienceBreakdown = [
  { group: "Students", pct: "54.6%" },
  { group: "Staff", pct: "21.8%" },
  { group: "Parents & guardians", pct: "15.5%" },
  { group: "Community members", pct: "6.9%" },
];

const sentimentSummary = {
  positive: "73.7%",
  neutral: "21.8%",
  negative: "4.5%",
  total: "772 classifiable responses",
};

const executiveSummary = `The Greenfield Unified School District Spring 2026 survey reveals a strongly positive overall 
sentiment — 73.7% of responses across seven satisfaction dimensions were positive, with only 4.5% negative. 
The district's greatest strength is communication clarity, leading at 92.3% positive with zero negative responses. 
Post-secondary preparedness confidence among parents averages 8.3 out of 10. Staff quality, inclusive 
opportunities, and the Communications Department earned enthusiastic praise.

The most critical finding is a clear gap between interpersonal excellence and digital infrastructure. 
Website usability is the district's weakest dimension at 60.3% positive, generating the most open-ended 
complaints (14 mentions). Parents struggle most — 18.5% rated the site "Difficult to use" versus only 3.2% 
of students — making a parent-focused redesign the top priority.`;

const themes = [
  {
    rank: "01",
    title: "Communication preferences",
    count: "62 responses",
    pct: "22.5%",
    detail:
      "Stakeholders strongly prefer individual targeted emails (25 mentions) over consolidated formats like a daily digest (5 mentions). The district communication platform was mentioned 15 times.",
  },
  {
    rank: "02",
    title: "Staff-related topics",
    count: "41 responses",
    pct: "14.9%",
    detail:
      "Respondents sought staff contact information and expressed appreciation for staff recognition programs.",
  },
  {
    rank: "03",
    title: "Technology & website",
    count: "34 responses",
    pct: "12.4%",
    detail:
      "Digital access, broken search functionality, outdated athletic content, and navigation issues were the core concerns.",
  },
];

const keywords = [
  { word: "staff", count: 38 },
  { word: "contact", count: 27 },
  { word: "info", count: 27 },
  { word: "continue", count: 26 },
  { word: "individual", count: 25 },
  { word: "targeted", count: 25 },
  { word: "emails", count: 25 },
  { word: "communication platform", count: 15 },
  { word: "website", count: 14 },
  { word: "daily digest", count: 5 },
];

const quotes = [
  {
    type: "positive",
    text: "The district communications team is doing a fantastic job!",
    source: "Community respondent",
  },
  {
    type: "positive",
    text: "My child enjoys the adults they work with — as teacher, coach, or counselor. There are a lot of opportunities for students to get involved.",
    source: "Parent",
  },
  {
    type: "positive",
    text: "I love the options for classes and the fact the district does a good job of celebrating academics not just athletics.",
    source: "Parent",
  },
  {
    type: "critical",
    text: "Nothing is easy to find on the website. I want scores of athletic events, can't find it. I want athletic schedules, can't find it. The search feature doesn't work well either.",
    source: "Staff member",
  },
  {
    type: "critical",
    text: "Please reconsider the timing of weekend phone notifications — staff members would prefer communications during business hours.",
    source: "Staff member",
  },
];

const recommendations = [
  {
    priority: "P1",
    title: "Redesign website navigation & search",
    detail:
      "Fix the search feature, update athletic schedules and rosters regularly, remove expired links, and conduct user testing with parents — the group that struggles most.",
    urgency: "high",
  },
  {
    priority: "P2",
    title: "Restructure weekend phone notifications",
    detail:
      "Shift weekend content to a Friday email digest or Monday morning notification, preserving information delivery while respecting personal time.",
    urgency: "high",
  },
  {
    priority: "P3",
    title: "Consolidate communication platforms",
    detail:
      "Audit which platforms serve which purpose — then provide clear guidance to families to reduce confusion.",
    urgency: "medium",
  },
  {
    priority: "P4",
    title: "Enhance post-secondary counseling depth",
    detail:
      "Supplement assemblies with individualized counseling sessions, practical application workshops, and parent-specific information sessions.",
    urgency: "medium",
  },
  {
    priority: "P5",
    title: "Maintain and celebrate existing strengths",
    detail:
      "Communication clarity, staff quality, inclusive opportunities, and special education accommodations are genuine differentiators — protect and highlight them.",
    urgency: "low",
  },
];

const kpis = [
  { label: "Website satisfaction", value: "60.3%", note: "positive — lowest area" },
  { label: "Communication clarity", value: "92.3%", note: "positive — top area" },
  { label: "Post-secondary confidence", value: "8.3 / 10", note: "parent mean score" },
  { label: "Student connectedness", value: "6.3 / 10", note: "mean score" },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function DistrictSurveyInsights() {
  return (
    <main className="survey-page">

      {/* ── Header ── */}
      <header className="page-header">
        <p className="district-tag">Greenfield Unified School District</p>
        <h1>Survey Insights Report</h1>
        <p className="subtitle">Spring 2026 — Communications Family Survey</p>
      </header>

      {/* ── Overview Stats ── */}
      <section className="section" aria-labelledby="overview-heading">
        <h2 id="overview-heading">Survey overview</h2>
        <div className="stat-grid">
          {overviewStats.map((s) => (
            <div className="stat-card" key={s.label}>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
        <div className="audience-row">
          {audienceBreakdown.map((a) => (
            <div className="audience-item" key={a.group}>
              <span className="audience-pct">{a.pct}</span>
              <span className="audience-group">{a.group}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Executive Summary ── */}
      <section className="section" aria-labelledby="exec-heading">
        <h2 id="exec-heading">Executive summary</h2>
        <div className="sentiment-badges">
          <div className="badge badge-positive">
            <span className="badge-val">{sentimentSummary.positive}</span>
            <span className="badge-lbl">Positive</span>
          </div>
          <div className="badge badge-neutral">
            <span className="badge-val">{sentimentSummary.neutral}</span>
            <span className="badge-lbl">Neutral</span>
          </div>
          <div className="badge badge-negative">
            <span className="badge-val">{sentimentSummary.negative}</span>
            <span className="badge-lbl">Negative</span>
          </div>
        </div>
        <p className="summary-note">Across {sentimentSummary.total}</p>
        {executiveSummary.trim().split("\n\n").map((para, i) => (
          <p className="body-text" key={i}>{para.trim()}</p>
        ))}
      </section>

      {/* ── Top Themes ── */}
      <section className="section" aria-labelledby="themes-heading">
        <h2 id="themes-heading">Top themes</h2>
        <p className="section-desc">
          From 275 open-ended responses. Notably, safety, facilities, and curriculum were
          virtually absent — suggesting stakeholder satisfaction with these foundational areas.
        </p>
        <div className="themes-list">
          {themes.map((t) => (
            <div className="theme-card" key={t.rank}>
              <span className="theme-rank">{t.rank}</span>
              <div className="theme-body">
                <div className="theme-header">
                  <strong className="theme-title">{t.title}</strong>
                  <span className="theme-count">{t.count} · {t.pct}</span>
                </div>
                <p className="theme-detail">{t.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Keywords ── */}
      <section className="section" aria-labelledby="keywords-heading">
        <h2 id="keywords-heading">Keywords & phrases</h2>
        <p className="section-desc">
          Most frequently used words across all open-ended responses. Bubble size reflects frequency.
        </p>
        <div className="keyword-cloud">
          {keywords.map((k) => (
            <span
              className="keyword-pill"
              key={k.word}
              style={{ fontSize: `${Math.max(12, Math.min(20, 10 + k.count / 4))}px` }}
            >
              {k.word}
              <span className="keyword-count">{k.count}</span>
            </span>
          ))}
        </div>
      </section>

      {/* ── Representative Quotes ── */}
      <section className="section" aria-labelledby="quotes-heading">
        <h2 id="quotes-heading">Representative insights</h2>
        <div className="quotes-grid">
          {quotes.map((q, i) => (
            <blockquote className={`quote-card quote-${q.type}`} key={i}>
              <p className="quote-text">"{q.text}"</p>
              <footer className="quote-source">— {q.source}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* ── Recommendations ── */}
      <section className="section" aria-labelledby="recs-heading">
        <h2 id="recs-heading">Recommendations</h2>
        <div className="recs-list">
          {recommendations.map((r) => (
            <div className={`rec-card rec-${r.urgency}`} key={r.priority}>
              <span className="rec-priority">{r.priority}</span>
              <div className="rec-body">
                <strong className="rec-title">{r.title}</strong>
                <p className="rec-detail">{r.detail}</p>
              </div>
              <span className={`rec-badge rec-badge-${r.urgency}`}>
                {r.urgency === "high" ? "High priority" : r.urgency === "medium" ? "Medium" : "Maintain"}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Dashboard KPIs ── */}
      <section className="section kpi-section" aria-labelledby="kpi-heading">
        <h2 id="kpi-heading">Dashboard KPIs to monitor</h2>
        <div className="kpi-grid">
          {kpis.map((k) => (
            <div className="kpi-card" key={k.label}>
              <span className="kpi-value">{k.value}</span>
              <span className="kpi-label">{k.label}</span>
              <span className="kpi-note">{k.note}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="page-footer">
        <p>Greenfield Unified School District · Survey Insights Dashboard · Spring 2026</p>
        <p className="footer-note">Analysis generated via Demo District Survey Research · Data source: GUSD Communications Family Survey</p>
      </footer>

    </main>
  );
}
