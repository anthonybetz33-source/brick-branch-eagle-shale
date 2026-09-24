#!/usr/bin/env node
import fs from "node:fs";

const data = JSON.parse(fs.readFileSync("/tmp/c955-data.json", "utf8"));

const css = `
:root{
  --bg:#07090f; --elev:#0e121b; --surf:#141a26; --surf2:#1b2333;
  --fg:#e8eaef; --muted:#8b93a7; --subtle:#5c6578; --border:#252d3d;
  --accent:#5eead4; --accent-fg:#042f2e; --ok:#34d399; --bad:#fb7185; --warn:#f8d48a;
  --radius:18px;
}
*{box-sizing:border-box}
html,body{margin:0;min-height:100%;background:var(--bg);color:var(--fg);
  font-family:"Segoe UI","Helvetica Neue",system-ui,sans-serif;
  -webkit-font-smoothing:antialiased}
button,a,[role=button]{cursor:pointer}
button{font:inherit;color:inherit}
h1,h2,h3{font-weight:650;letter-spacing:-.03em;text-wrap:balance;margin:0}
p{text-wrap:pretty}
.shell{display:flex;min-height:100dvh}
.side{width:240px;border-right:1px solid var(--border);background:color-mix(in oklab,var(--elev) 92%, transparent);padding:20px 12px;position:sticky;top:0;height:100dvh;display:flex;flex-direction:column}
.brand{display:flex;gap:10px;align-items:center;padding:4px 8px;text-decoration:none;color:inherit}
.logo{width:36px;height:36px;border:1px solid color-mix(in oklab,var(--accent) 40%, transparent);border-radius:8px;display:grid;place-items:center;color:var(--accent);background:color-mix(in oklab,var(--accent) 10%, transparent);font-weight:700}
.nav a{display:flex;align-items:center;gap:10px;min-height:44px;padding:0 12px;border-radius:8px;color:var(--muted);text-decoration:none;font-size:14px}
.nav a.active,.nav a:hover{background:color-mix(in oklab,var(--accent) 10%, transparent);color:var(--accent)}
.main{flex:1;padding:28px 32px 80px;max-width:920px}
.top{display:none}
.cards{display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));margin-top:20px}
.card{background:var(--surf);border:1px solid var(--border);border-radius:var(--radius);padding:16px}
.stat-l{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
.stat-v{font-size:26px;font-weight:650;margin-top:6px;font-variant-numeric:tabular-nums}
.row{display:flex;flex-wrap:wrap;gap:10px;margin-top:20px}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:44px;padding:0 16px;border-radius:10px;border:1px solid transparent;background:var(--accent);color:var(--accent-fg);text-decoration:none;font-weight:600;font-size:14px}
.btn.sec{background:var(--surf);color:var(--fg);border-color:var(--border)}
.btn.ghost{background:transparent;color:var(--muted);border-color:transparent}
.btn.danger{background:var(--bad);color:#4c0519}
.muted{color:var(--muted)} .subtle{color:var(--subtle);font-size:12px}
.list{display:grid;gap:10px;margin-top:20px}
.item{display:block;background:var(--surf);border:1px solid var(--border);border-radius:var(--radius);padding:18px;text-decoration:none;color:inherit}
.item:hover{border-color:color-mix(in oklab,var(--accent) 40%, var(--border))}
.badge{display:inline-flex;align-items:center;border-radius:999px;padding:2px 10px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;border:1px solid var(--border);color:var(--muted)}
.badge.acc{border-color:color-mix(in oklab,var(--accent) 30%, transparent);color:var(--accent);background:color-mix(in oklab,var(--accent) 10%, transparent)}
.pro{height:8px;background:var(--surf2);border-radius:99px;overflow:hidden;margin-top:10px}
.pro>i{display:block;height:100%;background:var(--accent);width:0}
.qbtn{display:flex;gap:12px;width:100%;text-align:left;border:1px solid var(--border);background:var(--elev);border-radius:10px;padding:12px;min-height:48px;color:var(--fg)}
.qbtn:hover{border-color:color-mix(in oklab,var(--accent) 40%, var(--border))}
.qbtn.ok{border-color:color-mix(in oklab,var(--ok) 50%, transparent);background:color-mix(in oklab,var(--ok) 10%, transparent)}
.qbtn.bad{border-color:color-mix(in oklab,var(--bad) 50%, transparent);background:color-mix(in oklab,var(--bad) 10%, transparent)}
.letter{width:28px;height:28px;border:1px solid var(--border);border-radius:6px;display:grid;place-items:center;font-size:12px;color:var(--muted);flex:none}
.call{border-radius:12px;padding:14px;margin:10px 0;border:1px solid}
.call.s{border-color:color-mix(in oklab,var(--accent) 30%, transparent);background:color-mix(in oklab,var(--accent) 8%, transparent)}
.call.t{border-color:color-mix(in oklab,var(--bad) 30%, transparent);background:color-mix(in oklab,var(--bad) 8%, transparent)}
.call.w{border-color:color-mix(in oklab,var(--warn) 25%, transparent);background:color-mix(in oklab,var(--warn) 8%, transparent)}
.call h4{font-size:11px;letter-spacing:.12em;text-transform:uppercase;margin:0 0 6px}
.flip{min-height:240px;width:100%;border:1px solid var(--border);background:var(--surf);border-radius:var(--radius);padding:28px;text-align:center}
.field{display:flex;flex-direction:column;gap:6px}
.field label{font-size:13px;color:var(--muted)}
.field input{height:44px;border-radius:8px;border:1px solid var(--border);background:var(--elev);color:var(--fg);padding:0 12px}
.bot{display:none}
.ex{border:1px solid var(--border);background:var(--elev);border-radius:12px;padding:14px;margin:12px 0}
.ans{margin-top:10px;background:color-mix(in oklab,var(--accent) 10%, transparent);color:var(--accent);padding:8px 10px;border-radius:8px;font-family:ui-monospace,Consolas,monospace;font-size:13px}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
@media (max-width:900px){
  .side{display:none}
  .top{display:flex;position:sticky;top:0;z-index:20;align-items:center;justify-content:space-between;padding:8px 12px;border-bottom:1px solid var(--border);background:color-mix(in oklab,var(--bg) 80%, transparent);backdrop-filter:blur(10px)}
  .main{padding:16px 16px 96px}
  .bot{display:grid;grid-template-columns:repeat(5,1fr);position:fixed;left:0;right:0;bottom:0;border-top:1px solid var(--border);background:color-mix(in oklab,var(--elev) 95%, transparent);padding-bottom:env(safe-area-inset-bottom)}
  .bot a{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:56px;font-size:11px;color:var(--muted);text-decoration:none;gap:2px}
  .bot a.active{color:var(--accent)}
  .drawer{position:fixed;inset:0;background:#0009;z-index:40;display:none}
  .drawer.open{display:block}
  .drawer .panel{width:min(80vw,300px);height:100%;background:var(--elev);padding:20px;border-right:1px solid var(--border)}
}
`;

const js = `
const DATA = ${JSON.stringify(data)};
const KEY = "c955-mastery-v1";
const CONCEPTS = Object.keys(DATA.CONCEPT_META);
function emptyC(){const d={attempted:0,correct:0,byDifficulty:{EASY:{attempted:0,correct:0},MEDIUM:{attempted:0,correct:0},HARD:{attempted:0,correct:0},BOSS:{attempted:0,correct:0}}}; const by={}; CONCEPTS.forEach(c=>by[c]={...d,byDifficulty:{EASY:{...d.byDifficulty.EASY},MEDIUM:{...d.byDifficulty.MEDIUM},HARD:{...d.byDifficulty.HARD},BOSS:{...d.byDifficulty.BOSS}}}); return by;}
function defP(){return {version:1,attempted:0,correct:0,streak:0,bestStreak:0,studySeconds:0,sessions:0,lastSessionAt:null,byConcept:emptyC(),missed:[],seenIds:[],quizHistory:[],bestExamPct:null,badges:[]};}
function loadP(){try{const r=JSON.parse(localStorage.getItem(KEY)); if(!r||r.version!==1) return defP(); return Object.assign(defP(), r, {byConcept:Object.assign(emptyC(), r.byConcept||{})});}catch{return defP();}}
let P = loadP();
function saveP(){localStorage.setItem(KEY, JSON.stringify(P));}
function acc(c,a){return a? Math.round(1000*c/a)/10 : null;}
function shuffle(a){const x=a.slice(); for(let i=x.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [x[i],x[j]]=[x[j],x[i]];} return x;}
function weak(){return CONCEPTS.map(id=>{const c=P.byConcept[id]; return {id, attempted:c.attempted, correct:c.correct, acc:acc(c.correct,c.attempted)};}).filter(x=>x.attempted>=3 && x.acc!=null).sort((a,b)=>a.acc-b.acc);}
function record(q, ok, chosen){
  const c = P.byConcept[q.concept]; c.attempted++; if(ok) c.correct++;
  const dd=c.byDifficulty[q.difficulty]; dd.attempted++; if(ok) dd.correct++;
  P.attempted++; if(ok) P.correct++; P.streak = ok? P.streak+1 : 0; P.bestStreak=Math.max(P.bestStreak,P.streak);
  if(!ok) P.missed = [{questionId:q.id, at:Date.now(), chosen}, ...P.missed.filter(m=>m.questionId!==q.id)].slice(0,80);
  else P.missed = P.missed.filter(m=>m.questionId!==q.id);
  if(!P.seenIds.includes(q.id)) P.seenIds=[...P.seenIds,q.id].slice(-500);
  saveP();
}
function hash(){return location.hash.replace(/^#/, '') || '/';}
function go(path){location.hash = path; render();}
function esc(s){return String(s??'').replace(/[&<>"']/g, m=>({"&":"&","<":"<",">":">","\\"":""","'":"&#39;"}[m]));}
function fmtTime(s){s=Math.max(0,s|0); const m=Math.floor(s/60); return m+':'+String(s%60).padStart(2,'0');}
function fmtDur(s){s=Math.max(0,s|0); const h=Math.floor(s/3600), m=Math.floor((s%3600)/60); if(h) return h+'h '+m+'m'; if(m) return m+'m'; return s+'s';}

const NAV=[["/" ,"Home"],["/learn","Learn"],["/quiz","Quiz"],["/flashcards","Cards"],["/tricks","Tricks"],["/cheatsheet","Sheet"],["/calculators","Calc"],["/progress","Progress"]];
function nav(path){
  return NAV.map(([p,l])=>\`<a href="#\${p}" class="\${path===p || (p!=='/' && path.startsWith(p)) ? 'active':''}">\${l}</a>\`).join('');
}

let quiz=null;

function pick(mode){
  const spec = DATA.QUIZ_MODES[mode];
  let pool = DATA.QUESTIONS.slice();
  if(spec.concepts) pool = pool.filter(q=>spec.concepts.includes(q.concept));
  if(spec.difficulties) pool = pool.filter(q=>spec.difficulties.includes(q.difficulty));
  if(mode==='weak'){ const w=weak().slice(0,4).map(x=>x.id); if(w.length){ const f=DATA.QUESTIONS.filter(q=>w.includes(q.concept)); if(f.length>=6) pool=f; } }
  const missed=new Set(P.missed.map(m=>m.questionId));
  const retry=shuffle(pool.filter(q=>missed.has(q.id)));
  const unseen=shuffle(pool.filter(q=>!P.seenIds.includes(q.id)));
  const rest=shuffle(pool);
  const out=[]; const used=new Set();
  const push=q=>{ if(!used.has(q.id)){ used.add(q.id); out.push({...q, choices:shuffle(q.choices)}); } };
  retry.forEach(q=>{ if(out.length<Math.ceil(spec.count*0.35)) push(q); });
  (unseen.length?unseen:rest).forEach(q=>{ if(out.length<spec.count) push(q); });
  rest.forEach(q=>{ if(out.length<spec.count) push(q); });
  return { spec, mode, qs: shuffle(out).slice(0, spec.count), i:0, chosen:null, phase:'ask', log:[], left: spec.seconds||0, t0:Date.now() };
}
function drill(concept){
  const pool=DATA.QUESTIONS.filter(q=>q.concept===concept);
  return { spec:{title: DATA.CONCEPT_META[concept].title+' drill', immediate:true, timed:false, exam:false, count:12}, mode:'drill', qs:shuffle(pool).slice(0,12).map(q=>({...q, choices:shuffle(q.choices)})), i:0, chosen:null, phase:'ask', log:[], left:0, t0:Date.now() };
}

function visual(v){
  if(!v) return '';
  if(v.kind==='table'){
    return \`<div class="card" style="overflow:auto"><table style="width:100%;font-size:13px;text-align:left">
      <tr><th></th>\${v.columns.map(c=>'<th>'+esc(c)+'</th>').join('')}</tr>
      \${v.rows.map(r=>'<tr><td><b>'+esc(r.label)+'</b></td>'+r.values.map(x=>'<td>'+esc(x)+'</td>').join('')+'</tr>').join('')}
      \${v.totals?'<tr><td><b>Total</b></td>'+v.totals.map(x=>'<td>'+esc(x)+'</td>').join('')+'</tr>':''}
    </table></div>\`;
  }
  if(v.kind==='venn'){
    return \`<svg viewBox="0 0 360 180" style="width:100%;max-width:420px;display:block;margin:8px auto">
      <circle cx="140" cy="90" r="62" fill="rgba(94,234,212,.15)" stroke="#5eead4"/>
      <circle cx="220" cy="90" r="62" fill="rgba(52,211,153,.1)" stroke="#34d399"/>
      <text x="115" y="88" text-anchor="middle" fill="#e8eaef" font-size="16">\${v.onlyA}</text>
      <text x="180" y="88" text-anchor="middle" fill="#5eead4" font-size="16">\${v.both}</text>
      <text x="245" y="88" text-anchor="middle" fill="#e8eaef" font-size="16">\${v.onlyB}</text>
      <text x="110" y="28" text-anchor="middle" fill="#8b93a7" font-size="11">\${esc(v.aLabel)}</text>
      <text x="250" y="28" text-anchor="middle" fill="#8b93a7" font-size="11">\${esc(v.bLabel)}</text>
    </svg>\`;
  }
  if(v.kind==='hierarchy'){
    return ['Real numbers ℝ','Rational + Irrational','Integers ℤ','Whole numbers','Natural numbers ℕ'].map((l,i)=>\`<div class="card" style="margin-left:\${i*12}px;padding:10px">\${l}</div>\`).join('');
  }
  if(v.kind==='number-line'){
    const X=x=>24+((x-v.min)/(v.max-v.min))*312;
    let ticks=''; for(let t=v.min;t<=v.max;t++) ticks+=\`<line x1="\${X(t)}" y1="40" x2="\${X(t)}" y2="48" stroke="#8b93a7"/><text x="\${X(t)}" y="68" text-anchor="middle" font-size="11" fill="#8b93a7">\${t}</text>\`;
    return \`<svg viewBox="0 0 360 90" style="width:100%;max-width:420px;display:block;margin:8px auto">
      <line x1="24" y1="40" x2="336" y2="40" stroke="#8b93a7" stroke-width="2"/>
      <rect x="\${X(v.from)}" y="34" width="\${Math.max(2,X(v.to)-X(v.from))}" height="12" fill="rgba(94,234,212,.35)"/>
      <circle cx="\${X(v.from)}" cy="40" r="6" \${v.closedLeft?'fill="#5eead4"':'fill="#0e121b" stroke="#5eead4"'} />
      <circle cx="\${X(v.to)}" cy="40" r="6" \${v.closedRight?'fill="#5eead4"':'fill="#0e121b" stroke="#5eead4"'} />
      \${ticks}</svg>\`;
  }
  if(v.kind==='bell'){
    const mu=v.mean,s=v.sd||1,min=mu-4*s,max=mu+4*s,N=70,xs=[],pdf=x=>Math.exp(-0.5*((x-mu)/s)**2);
    for(let i=0;i<=N;i++) xs.push(min+(i/N)*(max-min));
    const ys=xs.map(pdf), maxY=Math.max(...ys);
    const X=x=>20+((x-min)/(max-min))*320, Y=y=>152-(y/maxY)*120;
    const line=xs.map((x,i)=>(i?'L':'M')+X(x)+','+Y(ys[i])).join(' ');
    const k=v.shadeSd??1, a=mu-k*s,b=mu+k*s, sh=xs.filter(x=>x>=a&&x<=b);
    const shade=sh.length?('M'+X(sh[0])+',152 '+sh.map(x=>'L'+X(x)+','+Y(pdf(x))).join(' ')+' L'+X(sh.at(-1))+',152 Z'):'';
    return \`<svg viewBox="0 0 360 180" style="width:100%;max-width:420px;display:block;margin:8px auto"><path d="\${shade}" fill="rgba(94,234,212,.25)"/><path d="\${line}" fill="none" stroke="#5eead4" stroke-width="2"/></svg>\`;
  }
  if(v.kind==='scatter'){
    let seed=(v.seed+17)>>>0; const rng=()=>{seed=(1664525*seed+1013904223)>>>0; return seed/4294967296;};
    const gauss=()=>Math.sqrt(-2*Math.log(Math.max(1e-12,rng())))*Math.cos(2*Math.PI*rng());
    const rr=Math.max(-1,Math.min(1,v.r)); let pts='';
    for(let i=0;i<40;i++){ const x=gauss(), y=rr*x+Math.sqrt(Math.max(0,1-rr*rr))*gauss();
      const px=22+Math.max(.04,Math.min(.96,(x+3)/6))*276, py=12+(1-Math.max(.04,Math.min(.96,(y+3)/6)))*150;
      pts+=\`<circle cx="\${px}" cy="\${py}" r="3.2" fill="#5eead4"/>\`; }
    return \`<svg viewBox="0 0 320 200" style="width:100%;max-width:420px;display:block;margin:8px auto"><rect x="22" y="12" width="276" height="150" fill="none" stroke="#252d3d"/>\${pts}<text x="160" y="190" text-anchor="middle" fill="#8b93a7" font-size="11">r ≈ \${v.r}</text></svg>\`;
  }
  return '';
}

function section(s){
  if(s.type==='intro') return \`<p>\${esc(s.body)}</p>\`;
  if(s.type==='bullets') return \`<h2>\${esc(s.title)}</h2><ul>\${s.items.map(i=>'<li>'+esc(i)+'</li>').join('')}</ul>\`;
  if(s.type==='formula') return \`<div class="card"><div class="stat-l">\${esc(s.title)}</div><div style="color:var(--accent);font-family:ui-monospace,Consolas,monospace;margin-top:8px">\${esc(s.formula)}</div>\${s.note?'<p class="muted" style="font-size:13px">'+esc(s.note)+'</p>':''}</div>\`;
  if(s.type==='example') return \`<div class="ex"><div class="stat-l">\${esc(s.title)}</div><p>\${esc(s.setup)}</p><ol>\${s.steps.map(t=>'<li>'+esc(t)+'</li>').join('')}</ol><div class="ans">Answer: \${esc(s.answer)}</div></div>\`;
  if(s.type==='shortcut') return \`<aside class="call s"><h4>\${esc(s.title||'C955 Shortcut')}</h4>\${esc(s.body)}</aside>\`;
  if(s.type==='trap') return \`<aside class="call t"><h4>\${esc(s.title||'Common Trap')}</h4>\${esc(s.body)}</aside>\`;
  if(s.type==='watch') return \`<aside class="call w"><h4>Watch for this wording</h4>\${(s.words||[]).map(w=>'<span class="badge">'+esc(w)+'</span> ').join('')}<p>\${esc(s.body)}</p></aside>\`;
  if(s.type==='visual') return visual(s.visual)+(s.caption?'<p class="subtle" style="text-align:center">'+esc(s.caption)+'</p>':'');
  if(s.type==='callout') return \`<p class="call \${s.tone==='warn'?'w':s.tone==='tip'?'s':''}">\${esc(s.body)}</p>\`;
  return '';
}

function dashboard(){
  const a=acc(P.correct,P.attempted); const w=weak(); const last=P.quizHistory[0];
  const weakest=w[0]; const strong=[...w].sort((a,b)=>b.acc-a.acc)[0];
  return \`<p class="stat-l">WGU C955 tutor</p>
    <h1>C955 Progress</h1>
    <p class="muted">Learn the idea in plain English, see worked examples, then practice until the wording stops tricking you.</p>
    <div class="cards">
      <div class="card"><div class="stat-l">Questions answered</div><div class="stat-v">\${P.attempted}</div></div>
      <div class="card"><div class="stat-l">Accuracy</div><div class="stat-v">\${a==null?'—':a+'%'}</div></div>
      <div class="card"><div class="stat-l">Current streak</div><div class="stat-v">\${P.streak}</div><div class="subtle">Best \${P.bestStreak}</div></div>
      <div class="card"><div class="stat-l">Study time</div><div class="stat-v">\${fmtDur(P.studySeconds)}</div></div>
    </div>
    <div class="cards" style="margin-top:12px">
      <div class="card"><div class="stat-l">Weakest concept</div><div class="stat-v" style="font-size:18px">\${weakest?DATA.CONCEPT_META[weakest.id].title:'Not enough data yet'}</div><div class="subtle">\${weakest?weakest.acc+'%':'Answer a few items first'}</div></div>
      <div class="card"><div class="stat-l">Strongest concept</div><div class="stat-v" style="font-size:18px">\${strong?DATA.CONCEPT_META[strong.id].title:'Not enough data yet'}</div></div>
    </div>
    \${last?'<p class="muted">Recent quiz: '+last.correct+'/'+last.total+' ('+Math.round(100*last.correct/last.total)+'%)</p>':''}
    <div class="row">
      <a class="btn" href="#/learn">Continue learning</a>
      <a class="btn sec" href="#/quiz/quick-10">Take Quick 10</a>
      <a class="btn sec" href="#/quiz/weak">Drill weak areas</a>
    </div>
    \${w.length? '<h2 style="margin-top:32px">Your weak areas</h2><div class="list">'+w.slice(0,5).map(x=>\`<div class="item"><div style="display:flex;justify-content:space-between;gap:8px;align-items:center"><div><b>\${esc(DATA.CONCEPT_META[x.id].title)}</b><div class="subtle">\${x.correct}/\${x.attempted}</div></div><a class="btn" href="#/drill/\${x.id}">Drill</a></div><div class="pro"><i style="width:\${x.acc}%"></i></div></div>\`).join('')+'</div>'
      : '<div class="card" style="margin-top:28px"><h2>How this tutor works</h2><p class="muted">LEARN → EXAMPLES → PRACTICE → REVIEW MISTAKES → DRILL WEAK AREAS → MIXED QUIZ</p></div>'}\`;
}

function learnIndex(){
  return \`<h1>Learn</h1><p class="muted">Each lesson is a sit-down with a tutor: plain English, worked examples, a shortcut, and the trap the exam loves.</p>
    <div class="list">\${DATA.LESSONS.map(l=>\`<a class="item" href="#/learn/\${l.slug}"><div class="subtle">Lesson \${l.order} · \${l.minutes} min</div><h2 style="font-size:18px;margin-top:6px">\${esc(l.title)}</h2><p class="muted">\${esc(l.subtitle)}</p></a>\`).join('')}</div>\`;
}
function lesson(slug){
  const l=DATA.LESSONS.find(x=>x.slug===slug); if(!l) return '<p>Lesson not found.</p>';
  const idx=DATA.LESSONS.findIndex(x=>x.slug===slug); const prev=DATA.LESSONS[idx-1], next=DATA.LESSONS[idx+1];
  return \`<a class="btn ghost" href="#/learn">All lessons</a>
    <p class="stat-l">Lesson \${l.order} · \${l.minutes} min</p>
    <h1>\${esc(l.title)}</h1><p class="muted">\${esc(l.subtitle)}</p>
    <div style="display:grid;gap:16px;margin-top:24px">\${l.sections.map(section).join('')}</div>
    <div class="card" style="margin-top:28px;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:center">
      <div><b>Practice this idea</b><p class="muted">A short drill with explanations after each answer.</p></div>
      <a class="btn" href="#/drill/\${l.concept}">Drill</a>
    </div>
    <div class="row" style="justify-content:space-between">
      \${prev?'<a class="btn sec" href="#/learn/'+prev.slug+'">← '+esc(prev.title)+'</a>':'<span></span>'}
      \${next?'<a class="btn sec" href="#/learn/'+next.slug+'">'+esc(next.title)+' →</a>':''}
    </div>\`;
}

function quizIndex(){
  const order=["quick-10","quick-20","probability","conditional","independent","normal","scatter","regression","mixed","weak","boss","exam"];
  return \`<h1>Quiz</h1><p class="muted">\${DATA.QUESTIONS.length} questions. Choices shuffle every time. Wrong answers get a full walkthrough.</p>
    <div class="list">\${order.map(id=>{const m=DATA.QUIZ_MODES[id]; return \`<a class="item" href="#/quiz/\${id}"><h2 style="font-size:18px">\${esc(m.title)}</h2><p class="muted">\${esc(m.blurb)}</p><div class="subtle">\${m.count} questions\${m.timed?' · 60 minutes · answers at the end':' · instant explanations'}</div></a>\`;}).join('')}</div>\`;
}

function renderQuiz(){
  if(!quiz) return '<p>No quiz.</p>';
  if(quiz.phase==='done'){
    const right=quiz.log.filter(x=>x.ok).length, total=quiz.log.length, pct=total?Math.round(100*right/total):0;
    return \`\${quiz.spec.exam?'<p class="stat-l">C955 Practice Simulation — Not an Official WGU Exam</p>':''}
      <h1>Results</h1>
      <div class="cards"><div class="card"><div class="stat-l">Score</div><div class="stat-v">\${right} / \${total}</div></div>
      <div class="card"><div class="stat-l">Percent</div><div class="stat-v">\${pct}%</div></div></div>
      <div class="row"><a class="btn" href="#/quiz">Another quiz</a><a class="btn sec" href="#/learn">Review lessons</a></div>
      <h2 style="margin-top:28px">Question review</h2>
      <div class="list">\${quiz.log.map((item,i)=>\`<div class="item"><p><span class="muted">\${i+1}.</span> \${esc(item.q.stem)}</p>
        <p>Your answer: <span style="color:\${item.ok?'var(--ok)':'var(--bad)'}">\${esc(item.chosen)}</span></p>
        \${item.ok?'':'<p>Correct: <b style="color:var(--accent)">'+esc(item.q.correct)+'</b></p>'}
        <ol>\${item.q.steps.map(s=>'<li class="muted">'+esc(s)+'</li>').join('')}</ol></div>\`).join('')}</div>\`;
  }
  const q=quiz.qs[quiz.i]; if(!q) return '<p>Empty set.</p>';
  const letters=['A','B','C','D'];
  const show=quiz.phase==='feedback';
  return \`<div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap">
      <div><p class="stat-l">\${esc(quiz.spec.title)}</p>\${quiz.spec.exam?'<p class="subtle">C955 Practice Simulation — Not an Official WGU Exam</p>':''}</div>
      <div class="muted">\${quiz.spec.timed?fmtTime(quiz.left)+' · ':''}\${quiz.i+1} / \${quiz.qs.length}</div>
    </div>
    <div class="pro"><i style="width:\${((quiz.i+(show?1:0))/quiz.qs.length)*100}%"></i></div>
    <div class="card" style="margin-top:16px">
      <span class="badge">\${esc(DATA.CONCEPT_META[q.concept].title)}</span>
      <span class="badge">\${q.difficulty}</span>
      <h2 style="margin-top:12px;font-size:22px">\${esc(q.stem)}</h2>
      \${visual(q.visual)}
      <div style="display:grid;gap:8px;margin-top:16px">
        \${q.choices.map((c,i)=>\`<button class="qbtn \${show&&c===q.correct?'ok':''} \${show&&c===quiz.chosen&&c!==q.correct?'bad':''}" data-choice="\${encodeURIComponent(c)}"><span class="letter">\${letters[i]}</span><span>\${esc(c)}</span></button>\`).join('')}
      </div>
      \${show? \`<div style="margin-top:16px">
          <p style="color:\${quiz.chosen===q.correct?'var(--ok)':'var(--bad)'};font-weight:600">\${quiz.chosen===q.correct?'Correct.':'Not quite.'}</p>
          \${quiz.chosen===q.correct?'':'<p>Correct answer: <b style="color:var(--accent)">'+esc(q.correct)+'</b></p>'}
          <p class="stat-l">Why</p>
          <ol>\${q.steps.map(s=>'<li>'+esc(s)+'</li>').join('')}</ol>
          <aside class="call s"><h4>C955 Shortcut</h4>\${esc(q.shortcut)}</aside>
          <aside class="call t"><h4>Common Trap</h4>\${esc(q.trap)}</aside>
          <button class="btn" id="nextQ">\${quiz.i+1>=quiz.qs.length?'See results':'Next'}</button>
        </div>\`:''}
    </div>
    <div class="row" style="justify-content:flex-end"><a class="btn ghost" href="#/quiz">Exit</a></div>\`;
}

function finishQuiz(){
  quiz.phase='done';
  const right=quiz.log.filter(x=>x.ok).length;
  const seconds=quiz.spec.timed? (quiz.spec.seconds||0)-quiz.left : Math.round((Date.now()-quiz.t0)/1000);
  if(quiz.mode!=='drill'){
    P.quizHistory=[{mode:quiz.mode,at:Date.now(),total:quiz.qs.length,correct:right,seconds,missedIds:quiz.log.filter(x=>!x.ok).map(x=>x.q.id)}, ...P.quizHistory].slice(0,30);
    if(quiz.mode==='exam') P.bestExamPct=Math.max(P.bestExamPct||0, quiz.qs.length? 100*right/quiz.qs.length:0);
    saveP();
  }
}

function onChoice(c){
  if(!quiz || quiz.chosen) return;
  const q=quiz.qs[quiz.i]; const ok=c===q.correct;
  quiz.chosen=c; record(q, ok, c); quiz.log.push({q, chosen:c, ok});
  if(quiz.spec.immediate){ quiz.phase='feedback'; render(); }
  else { nextQ(); }
}
function nextQ(){
  if(quiz.i+1>=quiz.qs.length){ finishQuiz(); render(); return; }
  quiz.i++; quiz.chosen=null; quiz.phase='ask'; render();
}

let fcI=0, fcFlip=false, fcOrder=DATA.FLASHCARDS.map((_,i)=>i);
function cards(){
  const card=DATA.FLASHCARDS[fcOrder[fcI]];
  return \`<h1>Flashcards</h1><p class="muted">Tap the card to flip.</p>
    <p class="subtle">\${fcI+1} / \${DATA.FLASHCARDS.length}</p>
    <button class="flip" id="flipBtn"><div class="stat-l">\${fcFlip?'Back':'Front'} · tap to flip</div>
      <h2 style="margin-top:16px">\${esc(fcFlip?card.back:card.front)}</h2>
      \${fcFlip&&card.hint?'<p class="muted">'+esc(card.hint)+'</p>':''}</button>
    <div class="row" style="display:grid;grid-template-columns:1fr 1fr 1fr">
      <button class="btn sec" id="prevC">Previous</button>
      <button class="btn sec" id="shC">Shuffle</button>
      <button class="btn sec" id="nextC">Next</button>
    </div>\`;
}

function tricks(){
  return \`<h1>Memory tricks</h1><p class="muted">Most missed C955 items are wording, not arithmetic.</p>
    \${DATA.TRICKS.map(t=>\`<aside class="call s"><h4>\${esc(t.title)}</h4>\${esc(t.body)}</aside>\${t.watch?'<aside class="call w"><h4>Watch for this wording</h4>'+t.watch.split('·').map(w=>'<span class="badge">'+esc(w.trim())+'</span> ').join('')+'</aside>':''}\`).join('')}\`;
}

function sheet(){
  return \`<h1>Cheat sheet</h1>
    <div class="card"><div class="stat-l">Basic</div><div style="color:var(--accent);font-family:ui-monospace">P = favorable / total</div></div>
    <div class="card"><div class="stat-l">Complement</div><div style="color:var(--accent);font-family:ui-monospace">P(not A) = 1 − P(A)</div></div>
    <div class="card"><div class="stat-l">OR</div><div style="color:var(--accent);font-family:ui-monospace">P(A OR B) = P(A)+P(B)−P(A AND B)</div></div>
    <div class="card"><div class="stat-l">AND</div><div style="color:var(--accent);font-family:ui-monospace">P(A AND B) = P(A)×P(B|A)</div></div>
    <div class="card"><div class="stat-l">Conditional</div><div style="color:var(--accent);font-family:ui-monospace">P(A|B) = P(A AND B)/P(B) · GIVEN = denominator</div></div>
    <div class="card"><div class="stat-l">Independence</div><div style="color:var(--accent);font-family:ui-monospace">Independent ⇔ P(B)=P(B|A)</div></div>
    <div class="card"><div class="stat-l">Empirical rule</div><div style="color:var(--accent);font-family:ui-monospace">68% within 1 SD · 95% within 2 · 99.7% within 3</div></div>
    <div class="card"><div class="stat-l">Regression</div><div style="color:var(--accent);font-family:ui-monospace">ŷ = a + bx</div></div>
    <div class="card"><div class="stat-l">r</div><div style="color:var(--accent);font-family:ui-monospace">−1 ≤ r ≤ 1 · sign = direction · |r| = strength</div></div>
    <h2>Primes 1–25</h2><p>2, 3, 5, 7, 11, 13, 17, 19, 23. 1 is neither. 2 is the only even prime.</p>
    <h2>Placebo wording</h2><p class="muted">“Percentage of placebo participants who passed” → 28/41, never 28/grand total.</p>\`;
}

function calcs(){
  return \`<h1>Calculators</h1>
    \${panel('Basic probability', [['fav','Favorable','8'],['tot','Total','12']], 'bp')}
    \${panel('Percentage of a group', [['part','Part','28'],['whole','Group size','41']], 'pct')}
    \${panel('Conditional', [['both','Both / joint','20'],['given','Given group','45']], 'cd')}
    \${panel('Z-score', [['x','x','64'],['m','Mean','70'],['s','SD','3']], 'z')}
    \${panel('Regression ŷ = a + bx', [['a','Intercept a','5.2'],['b','Slope b','1.15'],['x2','x','50']], 'rg')}
    <div class="card"><h2>Mean & SD</h2><div class="field"><label>Numbers</label><input id="nums" value="4, 6, 8, 10, 12"></div>
    <p id="msOut" class="muted"></p></div>\`;
}
function panel(title, fields, id){
  return \`<div class="card"><h2>\${title}</h2><div class="cards">\${fields.map(f=>\`<div class="field"><label>\${f[1]}</label><input data-calc="\${id}" data-k="\${f[0]}" value="\${f[2]}"></div>\`).join('')}</div><p class="ans" id="out-\${id}"></p></div>\`;
}
function updateCalcs(){
  const val=(id,k)=>{const el=document.querySelector('[data-calc="'+id+'"][data-k="'+k+'"]'); return el? Number(el.value):NaN;};
  const set=(id,t)=>{const el=document.getElementById('out-'+id); if(el) el.textContent=t;};
  const f=val('bp','fav'), t=val('bp','tot'); if(t>0) set('bp', f+'/'+t+' = '+(f/t).toFixed(4)+' = '+((100*f)/t).toFixed(1)+'%');
  const p=val('pct','part'), w=val('pct','whole'); if(w) set('pct', p+'/'+w+' × 100 = '+((100*p)/w).toFixed(1)+'%');
  const b=val('cd','both'), g=val('cd','given'); if(g) set('cd', b+'/'+g+' = '+(b/g).toFixed(4)+' = '+((100*b)/g).toFixed(1)+'%');
  const x=val('z','x'), m=val('z','m'), s=val('z','s'); if(s) set('z', 'z = ('+x+' − '+m+') / '+s+' = '+((x-m)/s).toFixed(4));
  const a=val('rg','a'), bb=val('rg','b'), x2=val('rg','x2'); if(Number.isFinite(a)) set('rg', 'ŷ = '+a+' + '+bb+'('+x2+') = '+(a+bb*x2));
  const numsEl=document.getElementById('nums'); if(numsEl){ const nums=numsEl.value.split(/[,\\s]+/).map(Number).filter(Number.isFinite); const n=nums.length; const mean=n? nums.reduce((x,y)=>x+y,0)/n:0;
    const sd=n>1? Math.sqrt(nums.reduce((x,y)=>x+(y-mean)**2,0)/(n-1)):null;
    const o=document.getElementById('msOut'); if(o) o.textContent = n? ('mean = '+mean.toFixed(4)+(sd!=null?', sample SD = '+sd.toFixed(4):'')) : ''; }
}

function progressPage(){
  const a=acc(P.correct,P.attempted);
  return \`<h1>Progress</h1><p class="muted">Stored in this browser only.</p>
    <div class="cards">
      <div class="card"><div class="stat-l">Attempted</div><div class="stat-v">\${P.attempted}</div></div>
      <div class="card"><div class="stat-l">Correct</div><div class="stat-v">\${P.correct}</div></div>
      <div class="card"><div class="stat-l">Accuracy</div><div class="stat-v">\${a==null?'—':a+'%'}</div></div>
      <div class="card"><div class="stat-l">Streak</div><div class="stat-v">\${P.streak}</div></div>
    </div>
    <h2 style="margin-top:28px">By concept</h2>
    <div class="list">\${CONCEPTS.map(id=>{const c=P.byConcept[id]; const x=acc(c.correct,c.attempted);
      return \`<div class="item"><div style="display:flex;justify-content:space-between;gap:8px;align-items:center"><div><b>\${esc(DATA.CONCEPT_META[id].title)}</b><div class="subtle">\${c.attempted?c.correct+'/'+c.attempted:'No attempts yet'}</div></div><a class="btn" href="#/drill/\${id}">Drill</a></div><div class="pro"><i style="width:\${x||0}%"></i></div></div>\`;}).join('')}</div>
    <div class="row"><button class="btn danger" id="resetBtn">Reset progress</button></div>\`;
}

function page(){
  const path=hash();
  if(path==='/' || path==='') return dashboard();
  if(path==='/learn') return learnIndex();
  if(path.startsWith('/learn/')) return lesson(path.slice(7));
  if(path==='/quiz') return quizIndex();
  if(path.startsWith('/quiz/')) {
    const mode=path.slice(6);
    if(!quiz || quiz.mode!==mode || quiz._path!==path){ if(DATA.QUIZ_MODES[mode]) { quiz=pick(mode); quiz._path=path; } }
    return DATA.QUIZ_MODES[mode]? renderQuiz() : '<p>Unknown quiz.</p>';
  }
  if(path.startsWith('/drill/')) {
    const c=path.slice(7);
    if(!quiz || quiz._path!==path){ quiz=drill(c); quiz._path=path; }
    return renderQuiz();
  }
  if(path==='/flashcards') return cards();
  if(path==='/tricks') return tricks();
  if(path==='/cheatsheet') return sheet();
  if(path==='/calculators') return calcs();
  if(path==='/progress') return progressPage();
  return '<h1>Not found</h1><a class="btn" href="#/">Home</a>';
}

function bind(){
  const path=hash();
  document.querySelectorAll('.qbtn').forEach(b=>b.addEventListener('click',()=>onChoice(decodeURIComponent(b.dataset.choice))));
  const n=document.getElementById('nextQ'); if(n) n.onclick=nextQ;
  const f=document.getElementById('flipBtn'); if(f) f.onclick=()=>{fcFlip=!fcFlip; render();};
  const pc=document.getElementById('prevC'); if(pc) pc.onclick=()=>{fcI=(fcI-1+DATA.FLASHCARDS.length)%DATA.FLASHCARDS.length; fcFlip=false; render();};
  const nc=document.getElementById('nextC'); if(nc) nc.onclick=()=>{fcI=(fcI+1)%DATA.FLASHCARDS.length; fcFlip=false; render();};
  const sc=document.getElementById('shC'); if(sc) sc.onclick=()=>{fcOrder=shuffle(fcOrder); fcI=0; fcFlip=false; render();};
  const rb=document.getElementById('resetBtn'); if(rb) rb.onclick=()=>{ if(confirm('Reset all progress on this device?')){ P=defP(); saveP(); render(); } };
  if(path==='/calculators'){ document.querySelectorAll('[data-calc], #nums').forEach(el=>el.addEventListener('input', updateCalcs)); updateCalcs(); }
  const menu=document.getElementById('menuBtn'); const dr=document.getElementById('drawer');
  if(menu&&dr){ menu.onclick=()=>dr.classList.add('open'); dr.onclick=e=>{ if(e.target===dr) dr.classList.remove('open'); }; }
}

let timer=null;
function render(){
  const path=hash();
  document.getElementById('content').innerHTML = page();
  document.querySelectorAll('.side .nav a, .bot a').forEach(a=>{
    const href=a.getAttribute('href').slice(1);
    a.classList.toggle('active', path===href || (href!=='/' && path.startsWith(href)));
  });
  bind();
  if(quiz && quiz.spec && quiz.spec.timed && quiz.phase!=='done'){
    if(timer) clearInterval(timer);
    timer=setInterval(()=>{ if(!quiz||quiz.phase==='done'){clearInterval(timer);return;} quiz.left--; if(quiz.left<=0){ finishQuiz(); render(); } else {
      const el=document.querySelector('.main .muted'); if(el && quiz.spec.timed) render();
    }},1000);
  }
}
window.addEventListener('hashchange', ()=>{ quiz=null; if(hash().startsWith('/quiz/')||hash().startsWith('/drill/')) {} render(); });
setInterval(()=>{ P.studySeconds+=15; saveP(); }, 15000);
P.sessions += 1; P.lastSessionAt=Date.now(); saveP();
render();
`;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<meta name="theme-color" content="#07090f"/>
<title>C955 Mastery — Applied Probability & Statistics</title>
<style>${css}</style>
</head>
<body>
<div class="shell">
  <aside class="side">
    <a class="brand" href="#/"><span class="logo">Σ</span><span><b>C955 Mastery</b><div class="subtle">Applied Probability & Statistics</div></span></a>
    <nav class="nav" style="margin-top:24px;display:flex;flex-direction:column;gap:4px">${["/" ,"Home","/learn","Learn","/quiz","Quiz","/flashcards","Cards","/tricks","Tricks","/cheatsheet","Sheet","/calculators","Calc","/progress","Progress"].reduce((a,x,i,arr)=> i%2? a: a+`<a href="#${arr[i]}">${arr[i+1]}</a>`,'')}</nav>
  </aside>
  <div style="flex:1">
    <header class="top">
      <button class="btn ghost" id="menuBtn" aria-label="Menu">Menu</button>
      <a class="brand" href="#/"><span class="logo">Σ</span><b>C955 Mastery</b></a>
      <span style="width:44px"></span>
    </header>
    <main class="main" id="content"></main>
  </div>
</div>
<nav class="bot">
  <a href="#/">Home</a><a href="#/learn">Learn</a><a href="#/quiz">Quiz</a><a href="#/flashcards">Cards</a><a href="#/progress">Progress</a>
</nav>
<div class="drawer" id="drawer"><div class="panel">
  <a class="brand" href="#/"><span class="logo">Σ</span><b>C955 Mastery</b></a>
  <nav class="nav" style="margin-top:20px;display:flex;flex-direction:column">${["/" ,"Home","/learn","Learn","/quiz","Quiz","/flashcards","Cards","/tricks","Tricks","/cheatsheet","Sheet","/calculators","Calc","/progress","Progress"].reduce((a,x,i,arr)=> i%2? a: a+`<a href="#${arr[i]}">${arr[i+1]}</a>`,'')}</nav>
</div></div>
<script>${js.replace(/<\/script/g, "<\\\\/script")}</script>
</body>
</html>
`;

fs.writeFileSync("/workspace/public/C955_Probability_Statistics_Mastery.html", html);
console.log("Wrote standalone HTML", html.length, "bytes");
