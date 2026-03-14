<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>LifeTwin AI 2.0 — Full Project Guide</title>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
  :root {
    --black: #0a0a0a;
    --off-white: #f5f3ee;
    --cream: #ede9e0;
    --accent: #ff4d1c;
    --accent2: #1c6bff;
    --accent3: #00c897;
    --gold: #e8c547;
    --muted: #6b6b6b;
    --border: #d5d0c8;
    --card-bg: #ffffff;
    --code-bg: #0f1117;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'Inter', sans-serif;
    background: var(--off-white);
    color: var(--black);
    font-size: 15px;
    line-height: 1.7;
  }

  /* COVER */
  .cover {
    background: var(--black);
    color: white;
    padding: 80px 60px 70px;
    position: relative;
    overflow: hidden;
    page-break-after: always;
  }
  .cover::before {
    content: '';
    position: absolute;
    top: -100px; right: -100px;
    width: 600px; height: 600px;
    background: radial-gradient(circle, #ff4d1c22 0%, transparent 70%);
  }
  .cover::after {
    content: '';
    position: absolute;
    bottom: -80px; left: -80px;
    width: 400px; height: 400px;
    background: radial-gradient(circle, #1c6bff22 0%, transparent 70%);
  }
  .cover-label {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #888;
    margin-bottom: 32px;
  }
  .cover-title {
    font-family: 'Syne', sans-serif;
    font-size: 72px;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -2px;
    margin-bottom: 8px;
  }
  .cover-title span { color: var(--accent); }
  .cover-sub {
    font-family: 'Syne', sans-serif;
    font-size: 28px;
    font-weight: 400;
    color: #aaa;
    margin-bottom: 48px;
  }
  .cover-tagline {
    font-size: 16px;
    color: #ccc;
    max-width: 600px;
    line-height: 1.8;
    border-left: 3px solid var(--accent);
    padding-left: 20px;
    margin-bottom: 60px;
  }
  .cover-meta {
    display: flex;
    gap: 48px;
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    color: #666;
  }
  .cover-meta strong { color: #fff; display: block; font-size: 13px; margin-bottom: 4px; }

  /* TOC */
  .toc-page {
    padding: 60px;
    background: var(--cream);
    page-break-after: always;
  }
  .toc-title {
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 32px;
  }
  .toc-item {
    display: flex;
    align-items: baseline;
    gap: 8px;
    padding: 10px 0;
    border-bottom: 1px solid var(--border);
    text-decoration: none;
    color: var(--black);
  }
  .toc-item:hover { color: var(--accent); }
  .toc-num {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: var(--accent);
    min-width: 28px;
  }
  .toc-name { font-size: 14px; font-weight: 500; flex: 1; }
  .toc-dots { flex: 1; border-bottom: 1px dotted var(--border); }

  /* CONTENT */
  .content { max-width: 900px; margin: 0 auto; padding: 60px 40px; }

  /* SECTION HEADERS */
  .section-header {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    margin-bottom: 40px;
    padding-top: 60px;
  }
  .section-num {
    font-family: 'Syne', sans-serif;
    font-size: 64px;
    font-weight: 800;
    color: var(--cream);
    line-height: 1;
    min-width: 80px;
    margin-top: -8px;
  }
  .section-title-block {}
  .section-tag {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 4px;
  }
  .section-title {
    font-family: 'Syne', sans-serif;
    font-size: 32px;
    font-weight: 700;
    line-height: 1.1;
  }

  /* PROSE */
  h3 {
    font-family: 'Syne', sans-serif;
    font-size: 18px;
    font-weight: 700;
    margin: 32px 0 12px;
    color: var(--black);
  }
  h4 {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--muted);
    margin: 24px 0 8px;
  }
  p { margin-bottom: 16px; }

  /* HIGHLIGHT BOX */
  .highlight-box {
    background: var(--black);
    color: white;
    border-radius: 12px;
    padding: 28px 32px;
    margin: 28px 0;
    position: relative;
    overflow: hidden;
  }
  .highlight-box::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--accent), var(--accent2), var(--accent3));
  }
  .highlight-box p { margin: 0; font-size: 15px; line-height: 1.8; color: #ddd; }
  .highlight-box strong { color: white; }

  /* INFO BOX */
  .info-box {
    border-left: 3px solid var(--accent2);
    background: #f0f4ff;
    padding: 20px 24px;
    border-radius: 0 8px 8px 0;
    margin: 20px 0;
  }
  .info-box p { margin: 0; font-size: 14px; }

  .warn-box {
    border-left: 3px solid var(--gold);
    background: #fdf9e8;
    padding: 20px 24px;
    border-radius: 0 8px 8px 0;
    margin: 20px 0;
  }
  .warn-box p { margin: 0; font-size: 14px; }

  /* TECH STACK CARDS */
  .stack-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 16px;
    margin: 24px 0;
  }
  .stack-card {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 20px;
    position: relative;
  }
  .stack-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    border-radius: 12px 12px 0 0;
  }
  .stack-card.orange::before { background: var(--accent); }
  .stack-card.blue::before { background: var(--accent2); }
  .stack-card.green::before { background: var(--accent3); }
  .stack-card.gold::before { background: var(--gold); }
  .stack-card.purple::before { background: #9b59b6; }
  .stack-card.pink::before { background: #e91e8c; }
  .stack-name {
    font-family: 'Syne', sans-serif;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 4px;
  }
  .stack-role {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--muted);
    margin-bottom: 10px;
  }
  .stack-desc { font-size: 13px; color: #444; line-height: 1.6; }
  .stack-badge {
    display: inline-block;
    background: #f0fff4;
    color: #1a7a4a;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    padding: 2px 8px;
    border-radius: 4px;
    margin-top: 8px;
    border: 1px solid #b7f5d4;
  }
  .stack-badge.free { background: #f0fff4; color: #1a7a4a; border-color: #b7f5d4; }

  /* CODE BLOCKS */
  .code-block {
    background: var(--code-bg);
    border-radius: 10px;
    padding: 24px;
    margin: 20px 0;
    overflow-x: auto;
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    line-height: 1.8;
    color: #e0e0e0;
  }
  .code-block .comment { color: #546e7a; }
  .code-block .key { color: #82b1ff; }
  .code-block .str { color: #c3e88d; }
  .code-block .type { color: #ffcb6b; }
  .code-block .num { color: #f78c6c; }
  .code-block .kw { color: #c792ea; }
  .code-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    color: var(--muted);
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  /* FILE TREE */
  .file-tree {
    background: var(--code-bg);
    border-radius: 10px;
    padding: 24px;
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    line-height: 2;
    color: #ccc;
    margin: 20px 0;
  }
  .file-tree .dir { color: #82b1ff; }
  .file-tree .file { color: #c3e88d; }
  .file-tree .desc { color: #546e7a; }
  .file-tree .root { color: var(--accent); font-weight: bold; }

  /* UI ELEMENTS SHOWCASE */
  .ui-card {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 24px;
    margin: 16px 0;
  }
  .ui-card-title {
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .badge {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 100px;
    font-size: 10px;
    font-family: 'DM Mono', monospace;
    letter-spacing: 1px;
  }
  .badge-accent { background: #fff0ec; color: var(--accent); border: 1px solid #ffc4b2; }
  .badge-blue { background: #e8f0ff; color: var(--accent2); border: 1px solid #b8ccff; }
  .badge-green { background: #e8fff7; color: #00875a; border: 1px solid #9ee8d2; }

  /* SECURITY SECTION */
  .security-item {
    display: flex;
    gap: 16px;
    padding: 16px 0;
    border-bottom: 1px solid var(--border);
  }
  .security-icon {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    background: #fff0ec;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
  }
  .security-text h4 { margin: 0 0 4px; font-size: 14px; text-transform: none; letter-spacing: 0; color: var(--black); }
  .security-text p { margin: 0; font-size: 13px; color: var(--muted); }

  /* CHARACTER SECTION */
  .char-step {
    display: flex;
    gap: 20px;
    padding: 20px 0;
    border-bottom: 1px solid var(--border);
  }
  .char-step-num {
    width: 40px;
    height: 40px;
    background: var(--black);
    color: white;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 16px;
    flex-shrink: 0;
  }
  .char-step-content h4 { margin: 0 0 6px; font-size: 14px; font-weight: 600; text-transform: none; letter-spacing: 0; color: var(--black); }
  .char-step-content p { margin: 0; font-size: 13px; color: #555; }

  /* DIVIDER */
  .divider {
    border: none;
    border-top: 1px solid var(--border);
    margin: 40px 0;
  }
  .divider-accent {
    border: none;
    height: 2px;
    background: linear-gradient(90deg, var(--accent), transparent);
    margin: 40px 0;
  }

  /* PRINT */
  @media print {
    .cover, .toc-page { page-break-after: always; }
    .section-header { page-break-before: always; }
  }

  /* TWO COL */
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
  @media(max-width: 640px) { .two-col { grid-template-columns: 1fr; } }

  .phase-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--black);
    color: white;
    padding: 8px 16px;
    border-radius: 6px;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    margin: 6px 6px 6px 0;
  }
  .phase-badge span { color: var(--accent); }
</style>
</head>
<body>

<!-- COVER PAGE -->
<div class="cover">
  <div class="cover-label">Project Blueprint · Version 1.0 · 2026</div>
  <div class="cover-title">LifeTwin<br><span>AI 2.0</span></div>
  <div class="cover-sub">Virtual Life Simulation Platform</div>
  <div class="cover-tagline">
    A web platform where users build a digital twin of themselves — a living, breathing, AI-powered simulation that mirrors real-life decisions and forecasts their ripple effects across economics, health, relationships, and beyond.
  </div>
  <div class="cover-meta">
    <div><strong>Codename</strong>ANTIGRAVITY</div>
    <div><strong>Stack</strong>Next.js · Django · Three.js · Gemini API</div>
    <div><strong>Priority</strong>UI/UX · Security · AI Accuracy</div>
    <div><strong>License</strong>All Free / Open Source</div>
  </div>
</div>

<!-- TABLE OF CONTENTS -->
<div class="toc-page">
  <div class="toc-title">Table of Contents</div>
  <a href="#abstract" class="toc-item"><span class="toc-num">01</span><span class="toc-name">Project Abstract</span></a>
  <a href="#architecture" class="toc-item"><span class="toc-num">02</span><span class="toc-name">Core Architecture</span></a>
  <a href="#techstack" class="toc-item"><span class="toc-num">03</span><span class="toc-name">Final Tech Stack</span></a>
  <a href="#filestructure" class="toc-item"><span class="toc-num">04</span><span class="toc-name">File Structure</span></a>
  <a href="#ui" class="toc-item"><span class="toc-num">05</span><span class="toc-name">UI/UX Design System</span></a>
  <a href="#character" class="toc-item"><span class="toc-num">06</span><span class="toc-name">Character Sketch System</span></a>
  <a href="#ai" class="toc-item"><span class="toc-num">07</span><span class="toc-name">AI Decision Engine</span></a>
  <a href="#security" class="toc-item"><span class="toc-num">08</span><span class="toc-name">Security & Privacy</span></a>
  <a href="#roadmap" class="toc-item"><span class="toc-num">09</span><span class="toc-name">Development Roadmap</span></a>
  <a href="#apis" class="toc-item"><span class="toc-num">10</span><span class="toc-name">Free APIs & Resources</span></a>
</div>

<!-- CONTENT -->
<div class="content">

  <!-- 01 ABSTRACT -->
  <div id="abstract" class="section-header">
    <div class="section-num">01</div>
    <div class="section-title-block">
      <div class="section-tag">Project Abstract</div>
      <div class="section-title">What is LifeTwin AI 2.0?</div>
    </div>
  </div>

  <div class="highlight-box">
    <p><strong>LifeTwin AI 2.0</strong> is an interactive web platform that creates a personalized digital twin of the user — a fully simulated virtual life avatar that reflects their real-world identity, habits, goals, and circumstances. Users can input life decisions (career change, investment, diet shift, relocation) and the AI engine simulates how those decisions cascade across all life dimensions over time.</p>
  </div>

  <h3>Core Value Proposition</h3>
  <p>Most people make major life decisions without any structured way to understand downstream consequences. LifeTwin gives them a safe sandbox — a digital simulation of <em>their specific life</em> — where they can test decisions, observe projections, and gain insight before committing to real-world action.</p>

  <div class="two-col">
    <div class="ui-card">
      <div class="ui-card-title">🧬 Digital Identity Layer</div>
      <p style="font-size:13px;color:#555;">A rich profile of the user: demographics, health metrics, personality traits (Big Five), financial baseline, social graph, and life goals — all used to calibrate simulations to their unique context.</p>
    </div>
    <div class="ui-card">
      <div class="ui-card-title">🌐 Decision Simulation Engine</div>
      <p style="font-size:13px;color:#555;">Multivariate AI model that propagates a single decision through 8 life domains — economics, health, relationships, career, mental wellbeing, lifestyle, geography, and legacy.</p>
    </div>
    <div class="ui-card">
      <div class="ui-card-title">🧊 3D Avatar Visualization</div>
      <p style="font-size:13px;color:#555;">A real-time 3D character that physically reflects the simulation state — aging, stress markers, health indicators, and emotional posture all change dynamically.</p>
    </div>
    <div class="ui-card">
      <div class="ui-card-title">📊 Life Analytics Dashboard</div>
      <p style="font-size:13px;color:#555;">Temporal charts, heatmaps, and probability distributions showing how the user's life metrics evolve across decision scenarios and time horizons.</p>
    </div>
  </div>

  <hr class="divider">

  <!-- 02 ARCHITECTURE -->
  <div id="architecture" class="section-header">
    <div class="section-num">02</div>
    <div class="section-title-block">
      <div class="section-tag">System Design</div>
      <div class="section-title">Core Architecture</div>
    </div>
  </div>

  <h3>High-Level System Overview</h3>
  <p>LifeTwin uses a decoupled, layered architecture: a Next.js frontend for the immersive UI, a Django REST backend for business logic and security, and a separate Python AI service for simulation computations — communicating over REST and WebSockets.</p>

  <div class="highlight-box">
    <p>
      <strong>Layer 1 — Frontend (Next.js + Three.js)</strong><br>
      Immersive 3D UI, avatar rendering, user interactions, state management, real-time simulation updates via WebSocket.<br><br>
      <strong>Layer 2 — API Gateway (Django REST Framework)</strong><br>
      Authentication, authorization, session management, data validation, rate limiting, orchestration between frontend and AI service.<br><br>
      <strong>Layer 3 — AI Simulation Service (Python FastAPI)</strong><br>
      Decision modeling, scenario simulation, Google Gemini API integration, multi-domain impact analysis, probabilistic forecasting.<br><br>
      <strong>Layer 4 — Data Layer (PostgreSQL + Redis)</strong><br>
      User profiles, simulation history, decision trees (PostgreSQL). Session cache, real-time events, pub/sub (Redis).
    </p>
  </div>

  <h3>Data Flow</h3>
  <div class="code-label">Decision Simulation Flow</div>
  <div class="code-block">
<span class="comment">// 1. User inputs a decision in the UI</span>
<span class="type">User</span> → <span class="str">"I want to quit my job and start a startup"</span>

<span class="comment">// 2. Frontend sends to Django API</span>
<span class="kw">POST</span> /api/v1/simulate/decision
{
  <span class="key">user_id</span>: <span class="str">"uuid"</span>,
  <span class="key">decision_type</span>: <span class="str">"career"</span>,
  <span class="key">decision_params</span>: { <span class="key">action</span>: <span class="str">"quit_job"</span>, <span class="key">goal</span>: <span class="str">"startup"</span> },
  <span class="key">time_horizon</span>: <span class="str">"5years"</span>
}

<span class="comment">// 3. Django validates, fetches user profile, forwards to AI service</span>
<span class="type">Django</span> → <span class="type">FastAPI AI Service</span> (internal, not exposed)
  user_profile + decision + simulation_config

<span class="comment">// 4. AI service calls Gemini API with structured prompts</span>
<span class="type">FastAPI</span> → <span class="str">Gemini 1.5 Pro</span> (Google AI Studio)
  System: "You are a life simulation engine..."
  User: [structured JSON context + decision]

<span class="comment">// 5. AI returns multi-domain impact JSON</span>
{
  <span class="key">economics</span>: { <span class="key">score_delta</span>: -<span class="num">35</span>, <span class="key">recovery_years</span>: <span class="num">2.5</span>, <span class="key">upside_potential</span>: <span class="num">+180</span> },
  <span class="key">health</span>: { <span class="key">stress_index</span>: +<span class="num">40</span>, <span class="key">sleep_quality</span>: -<span class="num">20</span> },
  <span class="key">relationships</span>: { <span class="key">partner_strain</span>: +<span class="num">25</span>, <span class="key">network_growth</span>: +<span class="num">60</span> },
  <span class="key">avatar_state</span>: { <span class="key">stress_visible</span>: <span class="kw">true</span>, <span class="key">energy</span>: <span class="str">"low"</span>, <span class="key">posture</span>: <span class="str">"tense"</span> }
}

<span class="comment">// 6. Django stores result, streams back to frontend</span>
<span class="type">WebSocket</span> → real-time chart updates + avatar animation trigger
  </div>

  <hr class="divider">

  <!-- 03 TECH STACK -->
  <div id="techstack" class="section-header">
    <div class="section-num">03</div>
    <div class="section-title-block">
      <div class="section-tag">Technology</div>
      <div class="section-title">Final Tech Stack</div>
    </div>
  </div>

  <div class="info-box">
    <p>Every tool below is <strong>100% free</strong> for development and has a generous free tier or is fully open source. No paid licenses required.</p>
  </div>

  <h3>Frontend</h3>
  <div class="stack-grid">
    <div class="stack-card orange">
      <div class="stack-name">Next.js 14+</div>
      <div class="stack-role">Frontend Framework</div>
      <div class="stack-desc">App Router, Server Components, and built-in API routes. Chosen over plain React for its SSR/SSG capabilities, better SEO, and edge runtime support. Performance-optimized out of the box.</div>
      <span class="badge free">✓ Free / MIT</span>
    </div>
    <div class="stack-card blue">
      <div class="stack-name">React Three Fiber</div>
      <div class="stack-role">3D Rendering (THREE.js wrapper)</div>
      <div class="stack-desc">Declarative Three.js in React. Far superior DX to raw Three.js. Paired with <strong>@react-three/drei</strong> for helpers (OrbitControls, Environment, Loader) and <strong>@react-three/rapier</strong> for physics.</div>
      <span class="badge free">✓ Free / MIT</span>
    </div>
    <div class="stack-card green">
      <div class="stack-name">Zustand</div>
      <div class="stack-role">State Management</div>
      <div class="stack-desc">Lightweight and performant global state. Manages simulation state, avatar state, and UI state without Redux boilerplate. Works seamlessly with R3F canvas.</div>
      <span class="badge free">✓ Free / MIT</span>
    </div>
    <div class="stack-card gold">
      <div class="stack-name">Framer Motion</div>
      <div class="stack-role">UI Animations</div>
      <div class="stack-desc">Advanced animations for UI transitions, page reveals, data visualizations, and notification toasts. Used extensively for the layered 3D UI feel.</div>
      <span class="badge free">✓ Free for web</span>
    </div>
    <div class="stack-card purple">
      <div class="stack-name">Recharts / D3.js</div>
      <div class="stack-role">Data Visualization</div>
      <div class="stack-desc">Recharts for out-of-the-box beautiful charts. D3.js for complex custom visualizations (probability clouds, life timelines, decision trees). Both free.</div>
      <span class="badge free">✓ Free / Open Source</span>
    </div>
    <div class="stack-card pink">
      <div class="stack-name">TailwindCSS + shadcn/ui</div>
      <div class="stack-role">Styling System</div>
      <div class="stack-desc">Tailwind for utility-first styling + shadcn/ui for accessible component primitives. Both free. Custom design tokens for LifeTwin's unique visual identity.</div>
      <span class="badge free">✓ Free / MIT</span>
    </div>
  </div>

  <h3>Backend</h3>
  <div class="stack-grid">
    <div class="stack-card orange">
      <div class="stack-name">Django 5.x + DRF</div>
      <div class="stack-role">Core Backend API</div>
      <div class="stack-desc">Django REST Framework for the main API. Handles auth (JWT via SimpleJWT), user profiles, simulation history, data validation, rate limiting, and orchestration. Battle-tested and secure.</div>
      <span class="badge free">✓ Free / BSD</span>
    </div>
    <div class="stack-card blue">
      <div class="stack-name">FastAPI</div>
      <div class="stack-role">AI Microservice</div>
      <div class="stack-desc">Separate Python service for AI-heavy operations. Async, blazing fast, auto-generates OpenAPI docs. Handles all Gemini API calls, simulation computations, and model inference. Internal-only — not exposed publicly.</div>
      <span class="badge free">✓ Free / MIT</span>
    </div>
    <div class="stack-card green">
      <div class="stack-name">Django Channels</div>
      <div class="stack-role">WebSocket / Real-time</div>
      <div class="stack-desc">Extends Django with async WebSocket support. Enables real-time simulation streaming to the frontend — the avatar animates and charts update as AI processes the decision.</div>
      <span class="badge free">✓ Free / BSD</span>
    </div>
    <div class="stack-card gold">
      <div class="stack-name">PostgreSQL + Redis</div>
      <div class="stack-role">Database + Cache</div>
      <div class="stack-desc">PostgreSQL for persistent data (profiles, simulations, decision history). Redis for session cache, WebSocket channel layer, rate limiting, and pub/sub events.</div>
      <span class="badge free">✓ Free / Open Source</span>
    </div>
  </div>

  <h3>AI / ML Layer</h3>
  <div class="stack-grid">
    <div class="stack-card orange">
      <div class="stack-name">Google Gemini 1.5 Pro</div>
      <div class="stack-role">Primary AI Model</div>
      <div class="stack-desc">Via Google AI Studio API. <strong>Free tier: 1,500 requests/day, 1M tokens/min</strong>. Used for life simulation reasoning, narrative generation, decision impact analysis. Best free LLM available with massive context window (1M tokens).</div>
      <span class="badge free">✓ Free Tier Available</span>
    </div>
    <div class="stack-card blue">
      <div class="stack-name">Gemini 1.5 Flash</div>
      <div class="stack-role">Fast Simulation Queries</div>
      <div class="stack-desc">Faster and lighter variant for real-time quick simulations. Free tier: <strong>15 RPM, 1M tokens/min, 1,500 RPD</strong>. Use Flash for interactive responses, Pro for deep analysis.</div>
      <span class="badge free">✓ Free Tier Available</span>
    </div>
    <div class="stack-card green">
      <div class="stack-name">scikit-learn + NumPy</div>
      <div class="stack-role">Quantitative Modeling</div>
      <div class="stack-desc">For structured ML: regression models for financial forecasting, clustering for personality profiling, statistical distributions for probability estimates. Runs locally, no API cost.</div>
      <span class="badge free">✓ Free / Open Source</span>
    </div>
  </div>

  <h3>3D Avatar — Recommended Approach</h3>
  <div class="stack-grid">
    <div class="stack-card purple">
      <div class="stack-name">Ready Player Me</div>
      <div class="stack-role">Avatar Generator SDK</div>
      <div class="stack-desc">Free SDK to generate customizable 3D avatars from selfies or manual customization. Outputs GLB/VRM files compatible with Three.js. Free for web. Embed their avatar creator iframe in your app.</div>
      <span class="badge free">✓ Free SDK</span>
    </div>
    <div class="stack-card pink">
      <div class="stack-name">Mixamo (Adobe)</div>
      <div class="stack-role">Avatar Animations</div>
      <div class="stack-desc">Free 3D animation library (idle, walk, stress, celebration, aging, etc.). Download FBX/GLB animations, convert with <strong>gltfjsx</strong>, and apply dynamically based on simulation state.</div>
      <span class="badge free">✓ Free (Adobe account)</span>
    </div>
    <div class="stack-card orange">
      <div class="stack-name">drei + leva</div>
      <div class="stack-role">R3F Utilities + Controls</div>
      <div class="stack-desc"><strong>drei</strong>: useGLTF, useAnimations, Environment, Float, Stage — all the R3F helpers you need. <strong>leva</strong>: dev GUI for tuning 3D parameters in real time.</div>
      <span class="badge free">✓ Free / MIT</span>
    </div>
  </div>

  <hr class="divider">

  <!-- 04 FILE STRUCTURE -->
  <div id="filestructure" class="section-header">
    <div class="section-num">04</div>
    <div class="section-title-block">
      <div class="section-tag">Project Layout</div>
      <div class="section-title">File Structure</div>
    </div>
  </div>

  <div class="code-label">Root Monorepo</div>
  <div class="file-tree">
<span class="root">lifetwin-ai-2/</span>
├── <span class="dir">frontend/</span>                     <span class="desc"># Next.js App</span>
│   ├── <span class="dir">app/</span>                      <span class="desc"># App Router</span>
│   │   ├── <span class="dir">(auth)/</span>               <span class="desc"># Login / Register group</span>
│   │   │   ├── <span class="file">login/page.tsx</span>
│   │   │   └── <span class="file">register/page.tsx</span>
│   │   ├── <span class="dir">(dashboard)/</span>          <span class="desc"># Protected dashboard group</span>
│   │   │   ├── <span class="file">page.tsx</span>          <span class="desc"># Main dashboard</span>
│   │   │   ├── <span class="dir">simulation/</span>
│   │   │   │   ├── <span class="file">page.tsx</span>      <span class="desc"># Run simulations</span>
│   │   │   │   └── <span class="file">[id]/page.tsx</span> <span class="desc"># Simulation result</span>
│   │   │   ├── <span class="dir">twin/</span>
│   │   │   │   └── <span class="file">page.tsx</span>      <span class="desc"># 3D avatar view</span>
│   │   │   ├── <span class="dir">analytics/</span>
│   │   │   │   └── <span class="file">page.tsx</span>      <span class="desc"># Life analytics</span>
│   │   │   └── <span class="dir">profile/</span>
│   │   │       └── <span class="file">page.tsx</span>      <span class="desc"># User profile editor</span>
│   │   ├── <span class="dir">api/</span>                  <span class="desc"># Next.js API routes (proxy layer)</span>
│   │   │   └── <span class="dir">auth/</span>
│   │   ├── <span class="file">layout.tsx</span>
│   │   └── <span class="file">globals.css</span>
│   ├── <span class="dir">components/</span>
│   │   ├── <span class="dir">3d/</span>                   <span class="desc"># Three.js / R3F components</span>
│   │   │   ├── <span class="file">AvatarScene.tsx</span>   <span class="desc"># Main 3D canvas</span>
│   │   │   ├── <span class="file">Avatar.tsx</span>        <span class="desc"># GLTF avatar loader + animations</span>
│   │   │   ├── <span class="file">Environment.tsx</span>   <span class="desc"># Lighting + background</span>
│   │   │   ├── <span class="file">HealthParticles.tsx</span> <span class="desc"># Health aura particles</span>
│   │   │   └── <span class="file">StressVisualizer.tsx</span>
│   │   ├── <span class="dir">simulation/</span>
│   │   │   ├── <span class="file">DecisionInput.tsx</span>
│   │   │   ├── <span class="file">SimulationResult.tsx</span>
│   │   │   ├── <span class="file">DomainCard.tsx</span>
│   │   │   └── <span class="file">TimelineChart.tsx</span>
│   │   ├── <span class="dir">charts/</span>
│   │   │   ├── <span class="file">LifeRadarChart.tsx</span>
│   │   │   ├── <span class="file">ProbabilityCloud.tsx</span>
│   │   │   └── <span class="file">DecisionTree.tsx</span>
│   │   ├── <span class="dir">ui/</span>                   <span class="desc"># Reusable UI primitives</span>
│   │   └── <span class="dir">layout/</span>
│   ├── <span class="dir">hooks/</span>
│   │   ├── <span class="file">useSimulation.ts</span>
│   │   ├── <span class="file">useWebSocket.ts</span>
│   │   └── <span class="file">useAvatar.ts</span>
│   ├── <span class="dir">store/</span>                    <span class="desc"># Zustand stores</span>
│   │   ├── <span class="file">simulationStore.ts</span>
│   │   ├── <span class="file">avatarStore.ts</span>
│   │   └── <span class="file">userStore.ts</span>
│   ├── <span class="dir">lib/</span>
│   │   ├── <span class="file">api.ts</span>            <span class="desc"># Django API client (axios)</span>
│   │   ├── <span class="file">websocket.ts</span>
│   │   └── <span class="file">utils.ts</span>
│   └── <span class="dir">public/</span>
│       └── <span class="dir">models/</span>           <span class="desc"># GLTF avatar + animation files</span>
│
├── <span class="dir">backend/</span>                     <span class="desc"># Django Project</span>
│   ├── <span class="dir">config/</span>
│   │   ├── <span class="file">settings/</span>
│   │   │   ├── <span class="file">base.py</span>
│   │   │   ├── <span class="file">dev.py</span>
│   │   │   └── <span class="file">prod.py</span>
│   │   ├── <span class="file">urls.py</span>
│   │   └── <span class="file">asgi.py</span>          <span class="desc"># Channels ASGI config</span>
│   ├── <span class="dir">apps/</span>
│   │   ├── <span class="dir">accounts/</span>         <span class="desc"># User auth + profiles</span>
│   │   │   ├── <span class="file">models.py</span>     <span class="desc"># CustomUser, LifeProfile</span>
│   │   │   ├── <span class="file">serializers.py</span>
│   │   │   ├── <span class="file">views.py</span>
│   │   │   └── <span class="file">urls.py</span>
│   │   ├── <span class="dir">simulation/</span>       <span class="desc"># Simulation logic</span>
│   │   │   ├── <span class="file">models.py</span>     <span class="desc"># Simulation, Decision, Outcome</span>
│   │   │   ├── <span class="file">views.py</span>
│   │   │   ├── <span class="file">consumers.py</span> <span class="desc"># WebSocket consumer</span>
│   │   │   └── <span class="file">tasks.py</span>     <span class="desc"># Celery async tasks</span>
│   │   ├── <span class="dir">twin/</span>             <span class="desc"># Digital twin management</span>
│   │   └── <span class="dir">analytics/</span>        <span class="desc"># Analytics aggregation</span>
│   ├── <span class="dir">core/</span>
│   │   ├── <span class="file">permissions.py</span>
│   │   ├── <span class="file">throttling.py</span>
│   │   └── <span class="file">encryption.py</span>    <span class="desc"># Field-level encryption utils</span>
│   └── <span class="file">requirements.txt</span>
│
├── <span class="dir">ai-service/</span>                  <span class="desc"># FastAPI AI Microservice</span>
│   ├── <span class="file">main.py</span>               <span class="desc"># FastAPI app entry</span>
│   ├── <span class="dir">routers/</span>
│   │   ├── <span class="file">simulate.py</span>
│   │   └── <span class="file">analyze.py</span>
│   ├── <span class="dir">models/</span>               <span class="desc"># Pydantic schemas</span>
│   ├── <span class="dir">engines/</span>
│   │   ├── <span class="file">gemini_client.py</span>  <span class="desc"># Google AI Studio wrapper</span>
│   │   ├── <span class="file">life_simulator.py</span> <span class="desc"># Core simulation logic</span>
│   │   ├── <span class="file">domain_models.py</span>  <span class="desc"># Economic, health, etc. models</span>
│   │   └── <span class="file">prompt_builder.py</span> <span class="desc"># Structured prompt engineering</span>
│   ├── <span class="dir">ml/</span>
│   │   ├── <span class="file">financial_model.py</span>
│   │   ├── <span class="file">health_model.py</span>
│   │   └── <span class="file">personality_model.py</span>
│   └── <span class="file">requirements.txt</span>
│
├── <span class="file">docker-compose.yml</span>
├── <span class="file">.env.example</span>
└── <span class="file">README.md</span>
  </div>

  <hr class="divider">

  <!-- 05 UI/UX -->
  <div id="ui" class="section-header">
    <div class="section-num">05</div>
    <div class="section-title-block">
      <div class="section-tag">Design System</div>
      <div class="section-title">UI/UX Design System</div>
    </div>
  </div>

  <h3>Design Philosophy: "Soft Futurism"</h3>
  <p>LifeTwin's UI should feel like operating a <strong>living system</strong> — organic yet technological, warm yet precise. The aesthetic: dark base with luminous accent layers, depth through glassmorphism and subtle gradients, and 3D space that bleeds into the 2D UI.</p>

  <div class="highlight-box">
    <p><strong>Core Visual Identity:</strong> Deep charcoal backgrounds (#0d0f14) with electric teal (#00d9b0) and neural violet (#7c4dff) as primary accents. Typography using <strong>Clash Display</strong> (headings) + <strong>Inter</strong> (body) — both free on Google Fonts. UI elements use glassmorphism (backdrop-filter blur + translucent panels) layered over the 3D avatar scene.</p>
  </div>

  <h3>Layout Architecture</h3>
  <div class="ui-card">
    <div class="ui-card-title">Spatial Layout — 3 Zones</div>
    <p style="font-size:13px;color:#555;margin-bottom:12px;">The screen is divided into three spatial zones that coexist without covering the 3D avatar:</p>
    <div class="code-block" style="margin:0;">
<span class="comment">/* Zone Layout */</span>
<span class="type">Left Panel (320px)</span>: Decision Input + Life Profile sidebar
<span class="type">Center Canvas (flex-1)</span>: Full-screen 3D avatar scene (transparent UI overlaid)
<span class="type">Right Panel (360px)</span>: Simulation results + Analytics charts

<span class="comment">/* All panels are glassmorphic — avatar visible behind them */</span>
<span class="key">background</span>: <span class="str">rgba(13, 15, 20, 0.7)</span>
<span class="key">backdrop-filter</span>: <span class="str">blur(20px)</span>
<span class="key">border</span>: <span class="str">1px solid rgba(255,255,255,0.08)</span>
    </div>
  </div>

  <h3>Key UI Components</h3>

  <div class="ui-card">
    <div class="ui-card-title"><span class="badge badge-accent">MUST HAVE</span> Decision Input Console</div>
    <p style="font-size:13px;color:#555;">A terminal-style input with natural language processing. Type "I want to move to Bangalore and work remotely" — the UI parses it, shows entity tags (LOCATION: Bangalore, ACTION: relocation, WORK: remote), and lets the user confirm before running the simulation. Animated typing effect with AI "thinking" pulse animation while processing.</p>
  </div>

  <div class="ui-card">
    <div class="ui-card-title"><span class="badge badge-blue">3D ELEMENT</span> Life Vitals Ring</div>
    <p style="font-size:13px;color:#555;">An orbital ring system around the 3D avatar — 8 rings, one per life domain. Each ring's radius and glow intensity represent that domain's health score. Rings pulse and animate when a simulation runs. Implemented in R3F using torus geometry + custom shader material.</p>
  </div>

  <div class="ui-card">
    <div class="ui-card-title"><span class="badge badge-green">INTERACTIVE</span> Time Scrubber</div>
    <p style="font-size:13px;color:#555;">A horizontal timeline scrubber at the bottom of the screen. Drag to move through simulation time (months/years). Avatar visually ages and changes as you scrub. Charts sync in real-time. Implemented with Framer Motion drag + R3F morph targets for avatar aging.</p>
  </div>

  <div class="ui-card">
    <div class="ui-card-title"><span class="badge badge-accent">UNIQUE</span> Parallel Universe Split View</div>
    <p style="font-size:13px;color:#555;">Split the screen into 2-3 panels, each running a different decision scenario simultaneously. Watch two versions of yourself diverge in real time. Implemented via a CSS split with three separate R3F Canvas instances sharing one WebGL context.</p>
  </div>

  <div class="ui-card">
    <div class="ui-card-title"><span class="badge badge-blue">ANALYTICS</span> Probability Cloud Chart</div>
    <p style="font-size:13px;color:#555;">Rather than showing a single projection line, show a probability cloud — a D3.js area chart with gradient opacity bands representing confidence intervals. The center line is the most likely path, surrounded by increasingly transparent "what could happen" zones.</p>
  </div>

  <h3>Micro-interactions (Keep Users Engaged)</h3>
  <div class="code-block">
<span class="comment">// Engagement mechanics to implement</span>

<span class="num">1.</span> <span class="type">Decision Ripple Effect</span>: When a simulation runs, a ripple emanates from the
   avatar outward, sweeping through all domain cards and updating them sequentially.

<span class="num">2.</span> <span class="type">Avatar Breathing</span>: Subtle idle animation — avatar's chest rises/falls, slight
   ambient sway. Changes rhythm based on stress level.

<span class="num">3.</span> <span class="type">Score Change Animations</span>: Domain scores don't just change; they count up/down
   with physics-based easing. Green particles burst on improvement.

<span class="num">4.</span> <span class="type">Insight Notifications</span>: Contextual AI insights pop up as floating cards near
   the avatar ("Your financial score would recover in 2.3 years").

<span class="num">5.</span> <span class="type">Life Milestones</span>: Animated milestone markers on the timeline
   ("First profitable month", "Health peak", "Relationship milestone").

<span class="num">6.</span> <span class="type">Ambient Sound Design</span>: Subtle procedural audio that shifts based on life state.
   Calm ambient when life is good, tension rise when stress increases.
  </div>

  <hr class="divider">

  <!-- 06 CHARACTER SKETCH -->
  <div id="character" class="section-header">
    <div class="section-num">06</div>
    <div class="section-title-block">
      <div class="section-tag">Avatar System</div>
      <div class="section-title">Character Sketch System</div>
    </div>
  </div>

  <h3>Recommended Approach: RPM + Custom Blend Shapes</h3>
  <p>The best free approach combines <strong>Ready Player Me</strong> (avatar generation), <strong>Mixamo</strong> (animations), and custom <strong>morph targets/blend shapes</strong> (for dynamic life state visualization).</p>

  <div class="char-step">
    <div class="char-step-num">1</div>
    <div class="char-step-content">
      <h4>Avatar Creation — Ready Player Me SDK</h4>
      <p>Embed the RPM avatar creator iframe in your onboarding flow. User creates their avatar (photo-based or manual). Get back a GLB file URL. The GLB includes ARKit-compatible 52 blendshapes for facial expressions, body mesh, and rigged skeleton. Free SDK — no cost for web apps.</p>
    </div>
  </div>

  <div class="char-step">
    <div class="char-step-num">2</div>
    <div class="char-step-content">
      <h4>Loading the Avatar in R3F</h4>
      <p>Use <code>useGLTF</code> from drei to load the GLB. Use <code>useAnimations</code> to access the animation clips. Store the avatar in Zustand so it's accessible from the simulation engine to trigger state changes.</p>
    </div>
  </div>

  <div class="char-step">
    <div class="char-step-num">3</div>
    <div class="char-step-content">
      <h4>Animation Library — Mixamo</h4>
      <p>Download free animations from Mixamo (create free Adobe account): Idle, Walking, Excited_Celebration, Defeated_Slumped, Thinking, Stressed_Fidgeting, Old_Walk (for aged avatar). Convert with gltfjsx. Blend between animations based on simulation output using R3F's crossFadeTo.</p>
    </div>
  </div>

  <div class="char-step">
    <div class="char-step-num">4</div>
    <div class="char-step-content">
      <h4>Dynamic Life State Visualization via Morph Targets</h4>
      <p>Use Blender (free) to add custom morph targets to the avatar mesh: Tired (drooped posture, dark undereyes), Stressed (hunched shoulders, furrowed brow), Healthy (upright, bright), Aged (wrinkles, greyed hair shader). Drive these with simulation output scores using three.js morphTargetInfluences.</p>
    </div>
  </div>

  <div class="char-step">
    <div class="char-step-num">5</div>
    <div class="char-step-content">
      <h4>Procedural Aging System</h4>
      <p>As the time scrubber advances, blend multiple age morph targets. Combine with a custom shader that adds surface noise (skin texture changes) using GLSL. Age progression: blend 0 (current age) → blend 1 (10 years) → blend 2 (20 years). Hair greying via a gradient shader material on the hair mesh.</p>
    </div>
  </div>

  <div class="char-step">
    <div class="char-step-num">6</div>
    <div class="char-step-content">
      <h4>Aura / Particle System</h4>
      <p>Surround the avatar with a particle system that reflects wellbeing. High health = golden floating particles. High stress = red crackling energy. Financial success = brief money-symbol particle burst. Implemented with R3F's Points geometry + custom vertex shader for performance.</p>
    </div>
  </div>

  <div class="code-label">Avatar State Controller — Code Pattern</div>
  <div class="code-block">
<span class="comment">// avatarStore.ts (Zustand)</span>
<span class="kw">interface</span> <span class="type">AvatarState</span> {
  <span class="key">stressLevel</span>: <span class="num">0</span> | <span class="num">1</span> | <span class="num">2</span> | <span class="num">3</span>  <span class="comment">// 0=calm, 3=crisis</span>
  <span class="key">healthScore</span>: <span class="type">number</span>           <span class="comment">// 0-100</span>
  <span class="key">ageOffset</span>: <span class="type">number</span>            <span class="comment">// years from current age</span>
  <span class="key">emotionalState</span>: <span class="str">'happy'</span> | <span class="str">'neutral'</span> | <span class="str">'stressed'</span> | <span class="str">'hopeful'</span>
  <span class="key">currentAnimation</span>: <span class="type">string</span>
}

<span class="comment">// Avatar.tsx — Apply simulation results to avatar</span>
<span class="kw">const</span> applySimulationToAvatar = (result: SimulationResult) => {
  <span class="kw">const</span> stressLevel = result.health.stress_index > <span class="num">70</span> ? <span class="num">3</span> :
                      result.health.stress_index > <span class="num">50</span> ? <span class="num">2</span> : <span class="num">1</span>

  <span class="comment">// Update morph targets</span>
  avatarRef.current.morphTargetInfluences[<span class="str">'stress'</span>] =
    THREE.MathUtils.lerp(current, stressLevel / <span class="num">3</span>, <span class="num">0.05</span>)

  <span class="comment">// Trigger animation</span>
  <span class="kw">const</span> anim = stressLevel > <span class="num">2</span> ? <span class="str">'Stressed'</span> : <span class="str">'Idle'</span>
  actions[anim].reset().fadeIn(<span class="num">0.5</span>).play()

  <span class="comment">// Update particle system color</span>
  particleColorRef.current = stressLevel > <span class="num">1</span> ?
    <span class="kw">new</span> THREE.Color(<span class="str">'#ff4444'</span>) : <span class="kw">new</span> THREE.Color(<span class="str">'#44ffaa'</span>)
}
  </div>

  <hr class="divider">

  <!-- 07 AI ENGINE -->
  <div id="ai" class="section-header">
    <div class="section-num">07</div>
    <div class="section-title-block">
      <div class="section-tag">Intelligence Layer</div>
      <div class="section-title">AI Decision Engine</div>
    </div>
  </div>

  <h3>Multi-Domain Simulation Model</h3>
  <p>The simulation is not a single prompt — it is a structured multi-step pipeline that combines quantitative modeling (scikit-learn) with qualitative reasoning (Gemini) to produce holistic life projections.</p>

  <div class="code-label">AI Simulation Pipeline</div>
  <div class="code-block">
<span class="comment"># life_simulator.py (FastAPI AI Service)</span>

<span class="kw">async def</span> <span class="type">simulate_decision</span>(user_profile: UserProfile, decision: Decision):

    <span class="comment"># STEP 1: Quantitative Pre-computation</span>
    financial_delta = financial_model.predict(
        income=user_profile.income,
        decision_type=decision.type,
        risk_tolerance=user_profile.risk_score
    )

    <span class="comment"># STEP 2: Build Structured Gemini Prompt</span>
    prompt = prompt_builder.build(
        persona=user_profile.to_persona_json(),
        decision=decision.to_json(),
        financial_context=financial_delta,
        instruction=<span class="str">"""
        You are a life simulation engine. Analyze how this decision affects
        all 8 life domains for this specific person. Return ONLY valid JSON
        matching the SimulationOutput schema. Be realistic, not optimistic.
        Account for: their age, income, location, family situation, risk profile.
        """</span>
    )

    <span class="comment"># STEP 3: Call Gemini 1.5 Pro</span>
    response = <span class="kw">await</span> gemini_client.generate(
        model=<span class="str">"gemini-1.5-pro"</span>,
        contents=prompt,
        response_schema=SimulationOutput  <span class="comment"># Structured output!</span>
    )

    <span class="comment"># STEP 4: Validate + Merge with quantitative data</span>
    result = SimulationOutput.parse(response)
    result.economics = merge_with_quantitative(result.economics, financial_delta)

    <span class="kw">return</span> result
  </div>

  <div class="info-box">
    <p><strong>Pro Tip:</strong> Use Gemini's <strong>structured output / response schema</strong> feature (available in Google AI Studio SDK) to guarantee valid JSON every time — no parsing errors, no hallucinated field names. Pass your Pydantic schema directly to the API call.</p>
  </div>

  <h3>The 8 Simulation Domains</h3>
  <div class="stack-grid">
    <div class="stack-card orange"><div class="stack-name">💰 Economics</div><div class="stack-desc">Income, savings, debt, investment portfolio, financial runway, wealth trajectory over time.</div></div>
    <div class="stack-card blue"><div class="stack-name">🏋️ Physical Health</div><div class="stack-desc">Exercise frequency, sleep quality, nutrition, medical risk factors, longevity projections.</div></div>
    <div class="stack-card green"><div class="stack-name">🧠 Mental Wellbeing</div><div class="stack-desc">Stress index, anxiety levels, happiness score, purpose/meaning metrics, burnout risk.</div></div>
    <div class="stack-card gold"><div class="stack-name">💑 Relationships</div><div class="stack-desc">Partner satisfaction, family bonds, friendship network, social isolation risk, romantic life.</div></div>
    <div class="stack-card purple"><div class="stack-name">🚀 Career</div><div class="stack-desc">Skills growth, reputation, leadership trajectory, industry position, opportunity pipeline.</div></div>
    <div class="stack-card pink"><div class="stack-name">🌍 Lifestyle</div><div class="stack-desc">Location quality, work-life balance, hobbies, travel, personal freedom, day-to-day joy.</div></div>
    <div class="stack-card orange"><div class="stack-name">📚 Personal Growth</div><div class="stack-desc">Learning rate, mindset evolution, resilience building, creative expression.</div></div>
    <div class="stack-card blue"><div class="stack-name">🏛️ Legacy</div><div class="stack-desc">Long-term impact, values alignment, contribution to community, generational effect.</div></div>
  </div>

  <hr class="divider">

  <!-- 08 SECURITY -->
  <div id="security" class="section-header">
    <div class="section-num">08</div>
    <div class="section-title-block">
      <div class="section-tag">Privacy & Safety</div>
      <div class="section-title">Security Architecture</div>
    </div>
  </div>

  <div class="warn-box">
    <p><strong>Non-negotiable:</strong> LifeTwin collects deeply personal data — health, finances, relationships. Every design decision must treat user privacy as a first-class requirement, not an afterthought.</p>
  </div>

  <div class="security-item">
    <div class="security-icon">🔐</div>
    <div class="security-text">
      <h4>JWT Authentication with Refresh Token Rotation</h4>
      <p>Short-lived access tokens (15min) + long-lived refresh tokens (7 days) with rotation. Store refresh tokens in httpOnly cookies (not localStorage). Use Django SimpleJWT. Implement token blacklisting on logout.</p>
    </div>
  </div>
  <div class="security-item">
    <div class="security-icon">🔒</div>
    <div class="security-text">
      <h4>Field-Level Encryption for Sensitive Data</h4>
      <p>Encrypt sensitive profile fields (income, health data, location) at rest using <strong>django-fernet-fields</strong> (free, open source). Keys managed via environment variables, never in code. Even database admins cannot read user data in plaintext.</p>
    </div>
  </div>
  <div class="security-item">
    <div class="security-icon">🛡️</div>
    <div class="security-text">
      <h4>HTTPS + HSTS + Security Headers</h4>
      <p>Enforce HTTPS everywhere. Set HSTS, X-Frame-Options, X-Content-Type-Options, Content-Security-Policy, and Referrer-Policy headers. Use Django's SecurityMiddleware + django-csp for CSP management.</p>
    </div>
  </div>
  <div class="security-item">
    <div class="security-icon">🚧</div>
    <div class="security-text">
      <h4>Rate Limiting + API Throttling</h4>
      <p>DRF throttling on all endpoints. Per-user simulation rate limits. Redis-backed to prevent bypass. Especially important for AI service endpoints — each Gemini call costs quota.</p>
    </div>
  </div>
  <div class="security-item">
    <div class="security-icon">🕵️</div>
    <div class="security-text">
      <h4>Zero Trust for AI Service</h4>
      <p>The FastAPI AI service is NEVER exposed to the public internet. It only accepts connections from the Django backend on the internal Docker network. Uses a shared internal secret key for service-to-service auth.</p>
    </div>
  </div>
  <div class="security-item">
    <div class="security-icon">📋</div>
    <div class="security-text">
      <h4>GDPR-Compliant Data Handling</h4>
      <p>Implement data export (download your data), data deletion (right to be forgotten), and consent management. Store consent records. Do not share data with third parties. User data is used solely for their own simulation — never for model training without explicit opt-in.</p>
    </div>
  </div>
  <div class="security-item">
    <div class="security-icon">🔍</div>
    <div class="security-text">
      <h4>Prompt Injection Defense</h4>
      <p>Sanitize all user inputs before sending to Gemini API. Use structured input schemas (Pydantic) so free-text is always bounded. Maintain a system prompt that is hardcoded and prepended to every API call, never user-modifiable.</p>
    </div>
  </div>

  <hr class="divider">

  <!-- 09 ROADMAP -->
  <div id="roadmap" class="section-header">
    <div class="section-num">09</div>
    <div class="section-title-block">
      <div class="section-tag">Development Plan</div>
      <div class="section-title">Build Roadmap</div>
    </div>
  </div>

  <div class="phase-badge"><span>Phase 1</span> Weeks 1–3: Core Infrastructure</div>
  <div class="phase-badge"><span>Phase 2</span> Weeks 4–6: AI Engine</div>
  <div class="phase-badge"><span>Phase 3</span> Weeks 7–9: 3D Avatar</div>
  <div class="phase-badge"><span>Phase 4</span> Weeks 10–12: UI Polish + Analytics</div>
  <div class="phase-badge"><span>Phase 5</span> Weeks 13–14: Security Hardening</div>
  <div class="phase-badge"><span>Phase 6</span> Weeks 15–16: Beta Launch</div>

  <h3>Phase 1 — Infrastructure (Weeks 1–3)</h3>
  <p>Set up Django backend with PostgreSQL, Redis, and Django Channels. Implement JWT auth, user profiles, and core API endpoints. Set up Next.js frontend with Tailwind. Configure Docker Compose for local dev. Establish CI/CD pipeline (GitHub Actions — free).</p>

  <h3>Phase 2 — AI Engine (Weeks 4–6)</h3>
  <p>Build the FastAPI AI service. Integrate Google AI Studio Gemini API. Design and test the 8-domain simulation prompt architecture. Implement structured output parsing with Pydantic. Build quantitative financial and health models with scikit-learn. Test simulation quality extensively.</p>

  <h3>Phase 3 — 3D Avatar (Weeks 7–9)</h3>
  <p>Integrate Ready Player Me SDK for avatar creation. Set up R3F scene with proper lighting and environment. Load Mixamo animations. Implement avatar state controller driven by simulation output. Build the orbital vitals ring system. Add particle effects.</p>

  <h3>Phase 4 — UI + Analytics (Weeks 10–12)</h3>
  <p>Build all UI components: decision console, simulation result panels, glassmorphic layout. Implement Recharts + D3 visualizations. Add Framer Motion animations and micro-interactions. Build the time scrubber and parallel universe split view.</p>

  <h3>Phase 5 — Security Hardening (Weeks 13–14)</h3>
  <p>Field-level encryption, security headers, rate limiting, pen testing, GDPR features (data export, deletion), CSP configuration, and comprehensive logging.</p>

  <hr class="divider">

  <!-- 10 FREE APIS -->
  <div id="apis" class="section-header">
    <div class="section-num">10</div>
    <div class="section-title-block">
      <div class="section-tag">Resources</div>
      <div class="section-title">Free APIs & Resources</div>
    </div>
  </div>

  <div class="stack-grid">
    <div class="stack-card orange">
      <div class="stack-name">Google AI Studio</div>
      <div class="stack-role">aistudio.google.com</div>
      <div class="stack-desc">Gemini 1.5 Pro: 1,500 req/day free. Flash: 15 RPM, 1,500 RPD. Get your API key in minutes. Python SDK: google-generativeai.</div>
      <span class="badge free">✓ Free tier</span>
    </div>
    <div class="stack-card blue">
      <div class="stack-name">Ready Player Me</div>
      <div class="stack-role">readyplayer.me/developers</div>
      <div class="stack-desc">Free SDK for web. 3D avatar creation with realistic meshes, 52 blendshapes, fully rigged. GLB output. 100% free for web deployments.</div>
      <span class="badge free">✓ Free</span>
    </div>
    <div class="stack-card green">
      <div class="stack-name">Mixamo</div>
      <div class="stack-role">mixamo.com</div>
      <div class="stack-desc">Adobe's free 3D animation library. 100+ character animations available. Free with Adobe account. Download FBX/GLB.</div>
      <span class="badge free">✓ Free</span>
    </div>
    <div class="stack-card gold">
      <div class="stack-name">Sketchfab / PMndrs</div>
      <div class="stack-role">sketchfab.com</div>
      <div class="stack-desc">Free 3D model library for environment assets, props. PMndrs GitHub has free R3F boilerplates and shaders.</div>
      <span class="badge free">✓ Free models available</span>
    </div>
    <div class="stack-card purple">
      <div class="stack-name">World Bank API</div>
      <div class="stack-role">data.worldbank.org/developer</div>
      <div class="stack-desc">Real economic data for calibrating financial simulations — GDP, inflation, employment by country. Completely free, no key required.</div>
      <span class="badge free">✓ Free, no key</span>
    </div>
    <div class="stack-card pink">
      <div class="stack-name">Open Disease Data</div>
      <div class="stack-role">disease.sh / WHO APIs</div>
      <div class="stack-desc">Health statistics for calibrating health simulations. Life expectancy, disease prevalence by age/region. Free with attribution.</div>
      <span class="badge free">✓ Free</span>
    </div>
  </div>

  <div class="highlight-box" style="margin-top:40px;">
    <p>
      <strong>Final Note — ANTIGRAVITY Principle:</strong><br><br>
      LifeTwin is not a productivity app. It's a mirror. The most important design principle is that every interaction should feel like <em>touching your own future</em>. Make the avatar feel real. Make the simulations feel honest (not optimistic). Make the UI feel like a piece of technology that respects the gravity of the decisions it's simulating.<br><br>
      Build it like it matters — because for the person staring at their digital twin at 2am wondering whether to quit their job, it will.
    </p>
  </div>

  <div style="text-align:center;padding:60px 0 40px;color:var(--muted);font-family:'DM Mono',monospace;font-size:12px;">
    LifeTwin AI 2.0 · Project Guide v1.0 · Codename: ANTIGRAVITY · 2026
  </div>

</div>
</body>
</html>
