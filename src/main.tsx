import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Check, CircleAlert, Network, ShieldCheck } from "lucide-react";
import "./styles.css";
import { AdapterRegistry, Architecture, ArrowRight, Checkpoint, CopyPanel, Footer, HeroLoop, Inspector, InteractiveLoop, Navbar, RunDemo, SectionHead, Trace } from "./components/Kage";
import { cliText, configText, links } from "./data/kage";

function Flow({ items, accentLast = false }: { items: string[]; accentLast?: boolean }) {
  return <div className="flow">{items.map((item, i) => <div className={accentLast && i === items.length - 1 ? "flow-item success" : "flow-item"} key={item + i}><span>{item}</span>{i < items.length - 1 && <ArrowRight />}</div>)}</div>;
}

function App() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a><Navbar />
    <main id="main">
      <section className="hero shell" id="top"><div className="hero-copy"><p className="eyebrow">AUTONOMOUS ENGINEERING SYSTEM</p><h1>Engineering<br />is a <em>loop.</em></h1><p className="hero-lede">Plan. Build. Review. Test. Iterate. Kage coordinates AI agents through the entire engineering cycle.</p><div className="button-row"><a className="button" href="#run-demo">Explore Kage <ArrowRight /></a><a className="button secondary" href={links.github}>GitHub</a></div><p className="principle"><span>↳</span> Generation is not engineering. <strong>Iteration is.</strong></p></div><HeroLoop /></section>
      <div id="run-demo"><RunDemo /></div>

      <section className="editorial shell" id="overview"><p className="eyebrow">THE PREMISE</p><h2>Writing code is one step.<br /><span>Engineering is everything around it.</span></h2><div className="editorial-copy"><p>Software development requires understanding requirements, planning changes, implementing them, observing results, reviewing failures, and trying again.</p><p>Kage turns that process into an explicit agent loop.</p></div></section>

      <section className="section shell"><SectionHead eyebrow="THE KAGE LOOP" title="Keep going until it works." copy="Each stage transforms evidence into the context required by the next. Select a stage to inspect its contract." /><InteractiveLoop /></section>

      <section className="section shell comparison"><SectionHead eyebrow="WHY LOOPS MATTER" title="One-shot generation stops too early." /><div className="compare-grid"><article><span className="panel-label">CODE GENERATION</span><Flow items={["Prompt", "Code", "Done?"]} /><div className="result unknown">RESULT <strong>UNKNOWN</strong></div></article><article className="kage-compare"><span className="panel-label">KAGE / VERIFIED PROCESS</span><Flow items={["Objective", "Plan", "Implementation", "Test", "Failure", "Review", "Fix", "Test", "Success"]} accentLast /><div className="result verified">RESULT <strong>VERIFIED</strong></div></article></div><p className="callout">Kage doesn’t treat generated code as proof that the task is complete.</p></section>

      <section className="section shell" id="architecture"><SectionHead eyebrow="MULTI-AGENT ARCHITECTURE" title="Different jobs. Different agents." copy="Explicit roles make responsibilities, handoffs, and completion criteria observable." /><div id="agents"><Architecture /></div></section>

      <section className="section shell"><SectionHead eyebrow="MODULAR INTELLIGENCE" title="Use the right intelligence for the right job." copy="Kage separates the engineering workflow from the underlying model, coding agent, or executor." /></section>
      <section className="section shell compact-top"><SectionHead eyebrow="BACKEND ADAPTER REGISTRY" title="Bring your own agents." copy="Statuses below describe architectural intent—not provider integration claims." /><AdapterRegistry /></section>

      <section className="section state-section"><div className="shell"><SectionHead eyebrow="ENGINEERING STATE" title="Every run has state." copy="A run is more than output. Plans, changes, validation, findings, and iterations remain connected." /><Inspector /></div></section>

      <section className="section shell"><SectionHead eyebrow="OBSERVABLE EXECUTION" title="Autonomous doesn’t mean invisible." copy="Every important decision and action should be observable. Filter this illustrative execution trace." /><Trace /></section>

      <section className="section shell checkpoint-section"><SectionHead eyebrow="HUMAN IN THE LOOP" title="Autonomy with checkpoints." copy="Consequential actions can be designed to pause for explicit human judgment. This panel demonstrates the principle; it does not control a live process." /><Checkpoint /></section>

      <section className="section failure-section"><div className="shell"><SectionHead eyebrow="FAILURE IS CONTEXT" title="Failure isn’t the end of a run." /><div className="failure-flow"><Flow items={["BUILD FAILED", "OBSERVE", "UNDERSTAND FAILURE", "UPDATE PLAN", "EXECUTE", "VERIFY"]} accentLast /><div className="feedback-line">FAILED WORK BECOMES INPUT FOR THE NEXT ITERATION ↺</div></div><p className="big-statement">Failures become context for the next iteration.</p></div></section>

      <section className="section shell objective-section"><SectionHead eyebrow="OBJECTIVE-DRIVEN ENGINEERING" title="Optimize for the objective, not the first answer." copy="Explanatory example: adding middleware is not enough. Completion requires evidence across the system." /><div className="objective-card"><div className="objective-prompt"><span>EXAMPLE OBJECTIVE</span><blockquote>“Add authentication to the API.”</blockquote><p>A weak one-shot agent may stop after creating middleware. Kage conceptually evaluates the outcome.</p></div><ul className="checklist">{["Does it compile?", "Do tests pass?", "Are protected routes protected?", "Are public routes accessible?", "Is configuration valid?", "Did existing behavior regress?"].map(x => <li key={x}><Check />{x}</li>)}</ul></div></section>

      <section className="section shell"><SectionHead eyebrow="REPOSITORY AWARENESS" title="Work with the system, not just the prompt." copy="Repository context flows into every engineering decision." /><div className="repo-map"><div className="repo-context">{["Repository tree", "Configuration", "Dependencies", "Git diff", "Tests", "Build scripts", "Documentation", "Existing patterns", "Architecture"].map((x, i) => <span key={x}><b>0{i + 1}</b>{x}</span>)}</div><div className="context-arrow"><ArrowRight /></div><div className="loop-core"><Network /><strong>KAGE LOOP</strong><span>CONTEXT-AWARE EXECUTION</span></div></div></section>

      <section className="section shell"><SectionHead eyebrow="CONCEPTUAL GIT WORKFLOW" title="From repository to reviewed change." copy="Branch, commit, and PR automation are shown as a planned/conceptual workflow—not as available GitHub integration." /><span className="status planned standalone-status">CONCEPTUAL / PLANNED</span><Flow items={["Repository", "Kage Run", "Branch", "Changes", "Tests", "Review", "Commit / PR"]} accentLast /></section>

      <section className="section parallel"><div className="shell"><span className="research-label">RESEARCH / FUTURE DIRECTION</span><SectionHead eyebrow="PARALLEL APPROACHES" title="Some problems can be explored in parallel." /><div className="parallel-diagram"><div>OBJECTIVE</div><ArrowRight /><div>PLANNER</div><ArrowRight /><div className="approaches"><span>APPROACH A<small>Conservative</small></span><span>APPROACH B<small>Incremental</small></span><span>APPROACH C<small>Alternative</small></span></div><ArrowRight /><div>EVALUATOR</div><ArrowRight /><div className="best">BEST CANDIDATE</div></div></div></section>

      <section className="section shell" id="docs"><SectionHead eyebrow="INTERFACE SKETCHES" title="Configuration should stay replaceable." copy="Both examples are illustrative. Actual commands and syntax may differ as Kage evolves." /><div className="code-grid"><CopyPanel label="ILLUSTRATIVE CONFIGURATION · TOML" text={configText} /><CopyPanel label="CONCEPTUAL CLI · REPLACEABLE SYNTAX" text={cliText} /></div></section>

      <section className="section shell open-source" id="open-source"><div><p className="eyebrow">OPEN SOURCE</p><h2>Inspect the loop.</h2></div><div><p>Kage is presented as an open-source project under Manifold Systems. Agent orchestration should be inspectable, extensible, and adaptable to different models and engineering environments.</p><p className="link-note"><CircleAlert /> No verified external repository or documentation URL was supplied for this build. These controls lead to this project information rather than an invented destination.</p><div className="button-row"><a className="button" href="#open-source">GitHub information <ArrowRight /></a><a className="button secondary" href="#docs">Read the docs overview</a></div></div></section>

      <section className="section manifold" id="manifold"><div className="shell"><SectionHead eyebrow="A MANIFOLD SYSTEMS PROJECT" title="Systems around intelligent agents." copy="Independent explorations of different relationships—not mandatory integrations." /><div className="ecosystem"><article><span>01</span><h3>Kamui</h3><strong>Agent ↔ Computer</strong><p>An exploration of an AI agent living in the terminal.</p></article><article><span>02</span><h3>Kumo</h3><strong>Human ↔ Agent</strong><p>An exploration of communication infrastructure for agents.</p></article><article className="active"><span>03</span><h3>Kage</h3><strong>Agent ↔ Engineering</strong><p>Autonomous engineering loops from objective to verified outcome.</p></article></div></div></section>

      <section className="final-cta shell"><div className="completion-log"><span>ITERATION 01 <b>FAILED</b></span><span>ITERATION 02 <b>FAILED</b></span><span>ITERATION 03 <strong>PASSED</strong></span><div><ShieldCheck /> OBJECTIVE COMPLETE</div></div><div><p className="eyebrow">THE NEXT ITERATION</p><h2>Don’t stop at generated.</h2><p>Build systems that plan, execute, observe, and keep going until the work is done.</p><div className="button-row"><a className="button" href={links.getKage}>Get Kage <ArrowRight /></a><a className="button secondary" href={links.github}>GitHub information</a></div></div></section>
    </main><Footer />
  </>;
}

createRoot(document.getElementById("root") as HTMLElement).render(<StrictMode><App /></StrictMode>);
