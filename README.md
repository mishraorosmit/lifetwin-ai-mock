```markdown
<!-- LifeTwin AI 2.0 README -->
<!-- GitHub supports HTML inside Markdown, so the design is preserved -->

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

* { margin:0; padding:0; box-sizing:border-box; }

body{
  font-family:'Inter',sans-serif;
  background:var(--off-white);
  color:var(--black);
  font-size:15px;
  line-height:1.7;
}

/* COVER */
.cover{
  background:var(--black);
  color:white;
  padding:80px 60px 70px;
  position:relative;
  overflow:hidden;
}

.cover::before{
  content:'';
  position:absolute;
  top:-100px;
  right:-100px;
  width:600px;
  height:600px;
  background:radial-gradient(circle,#ff4d1c22 0%,transparent 70%);
}

.cover::after{
  content:'';
  position:absolute;
  bottom:-80px;
  left:-80px;
  width:400px;
  height:400px;
  background:radial-gradient(circle,#1c6bff22 0%,transparent 70%);
}

.cover-label{
  font-family:'DM Mono',monospace;
  font-size:11px;
  letter-spacing:3px;
  text-transform:uppercase;
  color:#888;
  margin-bottom:32px;
}

.cover-title{
  font-family:'Syne',sans-serif;
  font-size:72px;
  font-weight:800;
  line-height:1;
  letter-spacing:-2px;
  margin-bottom:8px;
}

.cover-title span{ color:var(--accent); }

.cover-sub{
  font-family:'Syne',sans-serif;
  font-size:28px;
  font-weight:400;
  color:#aaa;
  margin-bottom:48px;
}

.cover-tagline{
  font-size:16px;
  color:#ccc;
  max-width:600px;
  line-height:1.8;
  border-left:3px solid var(--accent);
  padding-left:20px;
  margin-bottom:60px;
}

.cover-meta{
  display:flex;
  gap:48px;
  font-family:'DM Mono',monospace;
  font-size:12px;
  color:#666;
}

.cover-meta strong{
  color:#fff;
  display:block;
  font-size:13px;
  margin-bottom:4px;
}

/* CONTENT */
.content{
  max-width:900px;
  margin:0 auto;
  padding:60px 40px;
}

/* SECTION */
.section-header{
  display:flex;
  align-items:flex-start;
  gap:20px;
  margin-bottom:40px;
  padding-top:60px;
}

.section-num{
  font-family:'Syne',sans-serif;
  font-size:64px;
  font-weight:800;
  color:var(--cream);
  line-height:1;
  min-width:80px;
  margin-top:-8px;
}

.section-title{
  font-family:'Syne',sans-serif;
  font-size:32px;
  font-weight:700;
  line-height:1.1;
}

h3{
  font-family:'Syne',sans-serif;
  font-size:18px;
  font-weight:700;
  margin:32px 0 12px;
}

p{ margin-bottom:16px; }

/* HIGHLIGHT */
.highlight-box{
  background:var(--black);
  color:white;
  border-radius:12px;
  padding:28px 32px;
  margin:28px 0;
}

.highlight-box p{
  margin:0;
  font-size:15px;
  line-height:1.8;
  color:#ddd;
}

/* CODE */
.code-block{
  background:var(--code-bg);
  border-radius:10px;
  padding:24px;
  margin:20px 0;
  overflow-x:auto;
  font-family:'DM Mono',monospace;
  font-size:12px;
  line-height:1.8;
  color:#e0e0e0;
}

/* STACK GRID */
.stack-grid{
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(260px,1fr));
  gap:16px;
  margin:24px 0;
}

.stack-card{
  background:var(--card-bg);
  border:1px solid var(--border);
  border-radius:12px;
  padding:20px;
}

.stack-name{
  font-family:'Syne',sans-serif;
  font-size:16px;
  font-weight:700;
  margin-bottom:4px;
}

.stack-role{
  font-family:'DM Mono',monospace;
  font-size:10px;
  text-transform:uppercase;
  letter-spacing:2px;
  color:var(--muted);
  margin-bottom:10px;
}

.stack-desc{
  font-size:13px;
  color:#444;
  line-height:1.6;
}

</style>
</head>

<body>

<div class="cover">
  <div class="cover-label">Project Blueprint · Version 1.0 · 2026</div>
  <div class="cover-title">LifeTwin<br><span>AI 2.0</span></div>
  <div class="cover-sub">Virtual Life Simulation Platform</div>

  <div class="cover-tagline">
    A web platform where users build a digital twin of themselves — a living, breathing,
    AI-powered simulation that mirrors real-life decisions and forecasts their ripple effects
    across economics, health, relationships, and beyond.
  </div>

  <div class="cover-meta">
    <div><strong>Codename</strong> ANTIGRAVITY</div>
    <div><strong>Stack</strong> Next.js · Django · Three.js · Gemini API</div>
    <div><strong>Priority</strong> UI/UX · Security · AI Accuracy</div>
    <div><strong>License</strong> All Free / Open Source</div>
  </div>
</div>

<div class="content">

<div class="section-header">
<div class="section-num">01</div>
<div>
<div class="section-title">Project Abstract</div>
</div>
</div>

<div class="highlight-box">
<p>
<strong>LifeTwin AI 2.0</strong> is an interactive web platform that creates
a personalized digital twin of the user — a fully simulated virtual life avatar
that reflects their real-world identity, habits, goals, and circumstances.
</p>
</div>

<h3>Core Value Proposition</h3>

<p>
LifeTwin gives people a sandbox to test life decisions — career change,
investment, relocation — and observe how those decisions propagate
across economics, health, relationships, and wellbeing.
</p>

</div>

</body>
</html>
```
