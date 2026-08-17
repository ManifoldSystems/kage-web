import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight, Check, CircleStop, Clipboard, GitBranch, Menu, Pause, Play, RotateCcw, X } from "lucide-react";
import { adapters, agents, links, runEvents, stages, traceEvents, type TraceCategory } from "../data/kage";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function SectionHead({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return <div className="section-head"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{copy && <p className="lede">{copy}</p>}</div>;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  const nav = [["Overview", links.overview], ["Architecture", links.architecture], ["Agents", links.agents], ["Docs", links.docs], ["GitHub", links.github]];
  return <header className="nav-wrap"><nav className="nav shell" aria-label="Main navigation">
    <a className="brand" href="#top"><strong>KAGE</strong><span>by Manifold Systems</span></a>
    <button className="menu-button" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}<span className="sr-only">Menu</span></button>
    <div id="mobile-nav" className={`nav-links ${open ? "open" : ""}`}>{nav.map(([name, href]) => <a key={name} href={href} onClick={() => setOpen(false)}>{name}</a>)}<a href={links.getKage} onClick={() => setOpen(false)} className="button small">Get Kage <ArrowRight /></a></div>
  </nav></header>;
}

const heroPath = ["PLAN", "EXECUTE", "REVIEW", "TEST", "EVALUATE", "ITERATE"];
export function HeroLoop() {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(reduced ? 15 : 0);
  const states = [...heroPath, "FAILED", "EVALUATE", "ITERATE", "PLAN", "EXECUTE", "REVIEW", "TEST", "PASSED", "COMPLETE"];
  useEffect(() => {
    if (reduced) { setStep(states.length - 1); return; }
    const timer = window.setInterval(() => setStep(v => (v + 1) % states.length), 900);
    return () => window.clearInterval(timer);
  }, [reduced, states.length]);
  const current = states[step];
  return <div className="hero-loop" aria-label="Engineering loop: an initial test fails and feeds through evaluation and iteration before a later test passes and the objective completes">
    <div className="loop-center"><span>ITERATION</span><strong>{step < 9 ? "01" : "02"}</strong><em className={current === "FAILED" ? "fail" : current === "PASSED" || current === "COMPLETE" ? "pass" : ""}>{current}</em></div>
    <div className="orbit-line" />
    {heroPath.map((name, i) => <div key={name} className={`orbit-node n${i} ${current === name ? "active" : ""}`}><span>0{i + 1}</span>{name}</div>)}
    <div className={`token t${Math.min(step, 5)}`} />
    <div className={`outcome fail-outcome ${current === "FAILED" ? "show" : ""}`}>TEST FAILED ↺</div>
    <div className={`outcome pass-outcome ${current === "COMPLETE" ? "show" : ""}`}><Check /> COMPLETE</div>
  </div>;
}

export function RunDemo() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(reduced ? runEvents.length : 1);
  const [playing, setPlaying] = useState(!reduced);
  useEffect(() => {
    if (reduced) { setVisible(runEvents.length); setPlaying(false); return; }
    if (!playing || visible >= runEvents.length) return;
    const t = window.setTimeout(() => setVisible(v => v + 1), 1100);
    return () => window.clearTimeout(t);
  }, [playing, visible, reduced]);
  useEffect(() => { if (visible >= runEvents.length) setPlaying(false); }, [visible]);
  const replay = () => { setVisible(1); setPlaying(!reduced); };
  return <section className="run-section shell" aria-labelledby="run-title"><div className="terminal run-terminal">
    <div className="terminal-bar"><div><span className="live-dot" /> KAGE RUN #0042</div><div className="controls"><button onClick={() => setPlaying(!playing)} disabled={visible >= runEvents.length} aria-label={playing ? "Pause run demo" : "Resume run demo"}>{playing ? <Pause /> : <Play />}{playing ? "Pause" : "Resume"}</button><button onClick={replay}><RotateCcw /> Replay</button></div></div>
    <div className="run-objective"><span>OBJECTIVE</span><h2 id="run-title">Add configurable API rate limiting.</h2></div>
    <ol className="run-events">{runEvents.slice(0, visible).map(event => <li key={event.label + event.title} className={event.tone || ""}><span className="event-index">[{event.label}]</span><div><strong>{event.title}</strong>{event.body.map(line => <p key={line}>{line}</p>)}</div></li>)}</ol>
    <p className="sr-only" aria-live="polite">{runEvents[Math.max(0, visible - 1)].title}. {visible === runEvents.length ? "Demo complete." : ""}</p>
  </div></section>;
}

export function InteractiveLoop() {
  const [selected, setSelected] = useState(0);
  const stage = stages[selected];
  return <div className="interactive-loop"><div className="stage-row" role="list" aria-label="Kage loop stages">{stages.map((item, i) => <div role="listitem" className="stage-wrap" key={item.id}><button onMouseEnter={() => setSelected(i)} onFocus={() => setSelected(i)} onClick={() => setSelected(i)} className={selected === i ? "selected" : ""} aria-pressed={selected === i}><span>0{i + 1}</span>{item.name}</button>{i < stages.length - 1 && <ArrowRight className="stage-arrow" />}</div>)}</div>
    <div className="stage-detail"><div><span className="eyebrow">ACTIVE STAGE / 0{selected + 1}</span><h3>{stage.name}</h3><p>{stage.description}</p></div><dl><div><dt>INPUT</dt><dd>{stage.input}</dd></div><div><dt>OUTPUT</dt><dd>{stage.output}</dd></div></dl></div>
  </div>;
}

export function Architecture() {
  return <><div className="agent-grid">{agents.map(agent => <article className="agent-card" key={agent.name}><span className="card-index">{agent.index}</span><h3>{agent.name}</h3><p>{agent.role}</p><dl><div><dt>INPUT</dt><dd>{agent.input}</dd></div><div><dt>OUTPUT</dt><dd>{agent.output}</dd></div></dl></article>)}</div>
  <div className="orchestrator"><div className="kage-core"><span>KAGE</span><strong>ENGINEERING<br />ORCHESTRATOR</strong></div><ArrowDown /><div className="backend-row">{["PLANNER", "EXECUTOR", "REVIEWER"].map((x, i) => <div key={x}><strong>{x}</strong><ArrowDown /><span>{i === 1 ? "Coding agent / executor" : "Model / API"}<small>REPLACEABLE</small></span></div>)}</div><p>The workflow belongs to Kage. <b>The intelligence is replaceable.</b></p></div></>;
}

export function AdapterRegistry() {
  return <div className="registry">{adapters.map(a => <article key={a.name}><div className="adapter-icon">{a.name.slice(0, 2).toUpperCase()}</div><div><h3>{a.name}</h3><p>{a.detail}</p></div><span className={`status ${a.kind}`}>{a.status}</span></article>)}</div>;
}

const iterations = [
  { iteration: "01", status: "REVIEWING", plan: "6 / 6", modified: "3 files", validation: "41 passed · 2 failed", current: "Atomicity issue identified", finding: "Redis increment is non-atomic" },
  { iteration: "02", status: "COMPLETE", plan: "6 / 6", modified: "3 files", validation: "43 passed · 0 failed", current: "Objective verified", finding: "Review finding resolved" },
];
export function Inspector() {
  const [iteration, setIteration] = useState(1); const data = iterations[iteration];
  return <div className="inspector"><div className="inspector-top"><div><span className="live-dot" /> RUN kage_0042</div><div className="segmented">{iterations.map((_, i) => <button className={iteration === i ? "active" : ""} onClick={() => setIteration(i)} key={i}>Iteration {i + 1}</button>)}</div></div>
    <div className="objective-cell"><span>OBJECTIVE</span><strong>Add configurable rate limiting</strong></div><div className="metric-grid"><div><span>ITERATION</span><strong>{data.iteration}</strong></div><div><span>STATUS</span><strong className={iteration ? "text-pass" : "text-accent"}>{data.status}</strong></div><div><span>PLAN</span><strong>{data.plan} steps</strong></div><div><span>MODIFIED</span><strong>{data.modified}</strong></div><div><span>VALIDATION</span><strong>{data.validation}</strong></div><div><span>CURRENT</span><strong>{data.current}</strong></div></div><div className="activity"><span>REVIEW FINDING</span><p>{data.finding}</p><div className="progress"><i style={{ width: iteration ? "100%" : "72%" }} /></div></div>
  </div>;
}

export function Trace() {
  const [filter, setFilter] = useState<"All" | TraceCategory>("All");
  const filters: ("All" | TraceCategory)[] = ["All", "Planning", "Execution", "Validation", "Review"];
  const shown = traceEvents.filter(e => filter === "All" || e.category === filter);
  return <div className="trace"><div className="trace-filters" aria-label="Filter execution events">{filters.map(f => <button aria-pressed={filter === f} className={filter === f ? "active" : ""} onClick={() => setFilter(f)} key={f}>{f}</button>)}</div><p className="result-count" aria-live="polite">{shown.length} events</p><ol>{shown.map((e, i) => <li key={e.time + e.event}><time>{e.time}</time><span className="trace-line"><i /></span><code>{e.event}</code><span>{e.category}</span>{i === shown.length - 1 && e.event === "objective.completed" && <Check />}</li>)}</ol>{shown.length === 0 && <p>No events in this category.</p>}</div>;
}

export function Checkpoint() {
  const [state, setState] = useState<"waiting" | "approved" | "stopped">("waiting"); const [inspect, setInspect] = useState(false);
  return <div className={`checkpoint ${state}`}><div className="checkpoint-head"><span>DESIGN PRINCIPLE · ILLUSTRATIVE</span><strong>{state === "waiting" ? "CHECKPOINT REQUIRED" : state === "approved" ? "EXECUTION APPROVED" : "RUN STOPPED"}</strong></div><div className="checkpoint-body"><p>The current plan requires:</p><ul><li>Database schema migration</li><li>Modification of authentication middleware</li><li>14 files changed</li></ul>{inspect && <div className="plan-detail"><strong>Plan inspection</strong><p>Validate migration safety → update middleware → run route and regression tests → request review.</p></div>}<div className="button-row"><button className="button" onClick={() => setState("approved")} disabled={state !== "waiting"}><Check /> Approve</button><button className="button secondary" onClick={() => setInspect(!inspect)} aria-expanded={inspect}>Inspect Plan</button><button className="button ghost" onClick={() => setState("stopped")} disabled={state !== "waiting"}><CircleStop /> Stop Run</button>{state !== "waiting" && <button className="text-button" onClick={() => {setState("waiting"); setInspect(false)}}><RotateCcw /> Reset demo</button>}</div></div></div>;
}

export function CopyPanel({ label, text }: { label: string; text: string }) {
  const [status, setStatus] = useState("Copy");
  const copy = async () => { try { await navigator.clipboard.writeText(text); setStatus("Copied"); } catch { setStatus("Select to copy"); } window.setTimeout(() => setStatus("Copy"), 1800); };
  return <div className="code-panel"><div className="code-head"><span>{label}</span><button onClick={copy}><Clipboard /> {status}</button></div><pre><code>{text}</code></pre></div>;
}

export function Footer() {
  return <footer><div className="shell footer-grid"><div><strong className="footer-logo">KAGE</strong><p>Autonomous engineering through iteration.</p></div><nav aria-label="Footer navigation"><a href={links.docs}>Docs</a><a href={links.architecture}>Architecture</a><a href={links.github}>GitHub</a><a href={links.manifold}>Manifold Systems</a></nav></div><div className="shell footer-bottom"><span>An open-source project by Manifold Systems.</span><span>OBJECTIVE → VERIFIED OUTCOME</span></div></footer>;
}

export { ArrowRight, GitBranch };
