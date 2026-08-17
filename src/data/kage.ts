export type LoopStage = {
  id: string;
  name: string;
  description: string;
  input: string;
  output: string;
};

export const links = {
  overview: "#overview",
  architecture: "#architecture",
  agents: "#agents",
  docs: "#docs",
  github: "#open-source",
  getKage: "#open-source",
  manifold: "#manifold",
};

export const stages: LoopStage[] = [
  { id: "understand", name: "Understand", description: "Interpret the objective and inspect the environment.", input: "Objective + repository", output: "Constraints + context" },
  { id: "plan", name: "Plan", description: "Break the objective into executable engineering steps.", input: "Context + objective", output: "Ordered plan" },
  { id: "execute", name: "Execute", description: "Modify the codebase and use available tools.", input: "Plan + tools", output: "Implementation" },
  { id: "review", name: "Review", description: "Inspect quality, requirements, and hidden problems.", input: "Implementation + objective", output: "Findings" },
  { id: "test", name: "Test", description: "Run builds, tests, linters, and other validation.", input: "Implementation", output: "Evidence" },
  { id: "evaluate", name: "Evaluate", description: "Determine whether the objective is actually satisfied.", input: "Evidence + findings", output: "Continue or complete" },
  { id: "iterate", name: "Iterate", description: "Turn observations into a better next attempt.", input: "Failures + review", output: "Updated context" },
];

export type RunEvent = { label: string; title: string; body: string[]; tone?: "fail" | "pass" | "active" };
export const runEvents: RunEvent[] = [
  { label: "01", title: "UNDERSTAND", body: ["Inspecting repository…", "Detected: Bun · Elysia · Redis · Vitest"] },
  { label: "02", title: "PLAN", body: ["Inspect middleware → design config → implement limiter", "Add middleware → add tests → run suite", "Plan accepted."] },
  { label: "03", title: "EXECUTE", body: ["Modified  src/middleware/rate-limit.ts", "Modified  src/config.ts", "Created   tests/rate-limit.test.ts"] },
  { label: "04", title: "TEST · FAILED", body: ["41 passed  ·  2 failed"], tone: "fail" },
  { label: "05", title: "REVIEW", body: ["Concurrent requests can increment the counter non-atomically.", "Recommendation: use an atomic Redis operation."] },
  { label: "06", title: "ITERATE", body: ["Updating implementation with review context…"], tone: "active" },
  { label: "07", title: "TEST · PASSED", body: ["43 passed  ·  0 failed"], tone: "pass" },
  { label: "✓", title: "OBJECTIVE COMPLETE", body: ["Configurable API rate limiting verified."], tone: "pass" },
];

export const agents = [
  { name: "Planner", index: "01", role: "Understands objectives, decomposes tasks, identifies dependencies, and creates execution plans.", input: "Objective + environment", output: "Plan" },
  { name: "Executor", index: "02", role: "Edits files, implements changes, runs commands, and uses development tools.", input: "Plan", output: "Implementation" },
  { name: "Reviewer", index: "03", role: "Inspects changes, finds problems, checks requirements, and suggests improvements.", input: "Implementation + objective", output: "Review" },
  { name: "Evaluator", index: "04", role: "Answers the decisive question: are we actually done?", input: "Objective + tests + review", output: "Continue / complete" },
];

export const adapters = [
  { name: "API models", detail: "Generic model/API boundary", status: "Architecture supported", kind: "supported" },
  { name: "Coding agents", detail: "External coding-agent CLI", status: "Experimental / planned", kind: "experimental" },
  { name: "Local models", detail: "Local inference endpoints", status: "Planned", kind: "planned" },
  { name: "Custom executor", detail: "Implement an execution adapter", status: "Extensible", kind: "extensible" },
];

export type TraceCategory = "Planning" | "Execution" | "Validation" | "Review";
export const traceEvents: { time: string; event: string; category: TraceCategory }[] = [
  { time: "10:42:01", event: "run.started", category: "Planning" },
  { time: "10:42:02", event: "repository.inspected", category: "Planning" },
  { time: "10:42:05", event: "plan.created", category: "Planning" },
  { time: "10:42:07", event: "executor.started", category: "Execution" },
  { time: "10:42:31", event: "files.modified", category: "Execution" },
  { time: "10:42:33", event: "tests.started", category: "Validation" },
  { time: "10:42:41", event: "tests.failed", category: "Validation" },
  { time: "10:42:43", event: "reviewer.started", category: "Review" },
  { time: "10:42:51", event: "issue.detected", category: "Review" },
  { time: "10:42:54", event: "iteration.started", category: "Planning" },
  { time: "10:43:18", event: "tests.passed", category: "Validation" },
  { time: "10:43:20", event: "objective.completed", category: "Validation" },
];

export const configText = `[planner]\nbackend = "provider-a"\n\n[executor]\nbackend = "coding-agent"\n\n[reviewer]\nbackend = "provider-b"\n\n[loop]\nmax_iterations = 8\n\n[validation]\nrun_tests = true\nrun_linter = true\n\n[permissions]\nrequire_approval_for_destructive_actions = true`;

export const cliText = `$ kage run "add rate limiting to the API"\n\nKAGE\nObjective loaded.\n\nInspecting repository...\nCreating engineering plan...\n6 steps identified.\n\nStart run? [Y/n]`;
