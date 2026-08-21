export type LoopStage = {
  id: string;
  name: string;
  description: string;
  input: string;
  output: string;
};

export const repoUrl = "https://github.com/algonacci/kage";

export const links = {
  overview: "#overview",
  architecture: "#architecture",
  agents: "#agents",
  docs: "#docs",
  github: repoUrl,
  getKage: repoUrl,
  manifold: "#manifold",
};

// The loop as the README draws it and as `Phase` in src/state/run.rs names it:
// TASK -> PLAN -> EXECUTE -> TEST -> REVIEW -> DECISION -> DONE, with FIX returning to TEST.
export const stages: LoopStage[] = [
  { id: "task", name: "Task", description: "One run, one task, in one repository. Kage allocates a run id and, by default, an isolated git worktree for the agents to work in.", input: `kage run "<task>" — or --task-file for a long brief`, output: "REQUEST.md + a worktree on branch kage/<run_id>" },
  { id: "plan", name: "Plan", description: "The planner reads the repository and writes an executable plan. An oversized task is planned only as far as its first coherent piece; the rest is declared under a Deferred Tasks heading. Skippable with --skip-plan.", input: "REQUEST.md + the repository", output: "PLAN.md" },
  { id: "execute", name: "Execute", description: "The executor implements the plan with its own tools and accounts for what it changed. A phase that produces this account may not end without one.", input: "PLAN.md", output: "Edited files + EXECUTION.md" },
  { id: "test", name: "Test", description: "Your validation commands run in Kage's own process, not inside an agent. An agent reporting that tests pass is a claim; an exit code is evidence. A failing build never reaches the reviewer.", input: "The working tree", output: "TEST_RESULTS.md + an exit code" },
  { id: "review", name: "Review", description: "The reviewer judges the diff against the plan, and must emit a machine-readable verdict. A review with no verdict blocks the run rather than being guessed at.", input: "PLAN.md + EXECUTION.md + TEST_RESULTS.md + the diff", output: "REVIEW.md + VERDICT.json" },
  { id: "decision", name: "Decision", description: "The gate reads VERDICT.json. PASS completes the run, FAIL sends it to FIX, BLOCKED stops it for a human. No model is asked whether the work is done — a verdict and an exit code decide.", input: "VERDICT.json", output: "PASS / FAIL / BLOCKED" },
  { id: "fix", name: "Fix", description: "The executor addresses the recorded cause and the run returns to TEST. A broken build spends the repair budget; a review rejection spends the iteration budget. Both are capped, so a run cannot spin forever.", input: "The failing commands, or the reviewer's named findings", output: "A new attempt, back at TEST" },
];

export type RunEvent = { label: string; title: string; body: string[]; tone?: "fail" | "pass" | "active" };
export const runEvents: RunEvent[] = [
  { label: "01", title: "PLAN", body: ["claude-code · opus", "PLAN.md written — 6 steps."] },
  { label: "02", title: "EXECUTE", body: ["opencode", "3 files changed", "EXECUTION.md written."] },
  { label: "03", title: "TEST · FAILED", body: ["validation failed: cargo test", "The reviewer is not called on a build that does not pass."], tone: "fail" },
  { label: "04", title: "FIX · repair 1 of 3", body: ["Cause: validation. Charged to the repair budget, not the review budget."], tone: "active" },
  { label: "05", title: "TEST · PASSED", body: ["cargo test · cargo clippy --all-targets -- -D warnings"], tone: "pass" },
  { label: "06", title: "REVIEW · FAIL", body: ["codex", "VERDICT.json: FAIL", "REV-001 [high]: the counter is incremented non-atomically."], tone: "fail" },
  { label: "07", title: "FIX · iteration 1 of 3", body: ["Cause: review. The executor is given the named findings, not the whole review."], tone: "active" },
  { label: "08", title: "TEST · PASSED", body: ["validation passed"], tone: "pass" },
  { label: "09", title: "REVIEW · PASS", body: ["VERDICT.json: PASS"], tone: "pass" },
  { label: "✓", title: "COMPLETED", body: ["3 file(s) committed on branch kage/run_20260809_001", "Nothing is merged for you:  git merge kage/run_20260809_001"], tone: "pass" },
];

// Kage v0.1 is one planner, one executor, one reviewer. There is no fourth agent, and no model
// is asked whether the run is done — see `decision` below.
export const agents = [
  { name: "Planner", index: "01", role: "Reads the repository and writes PLAN.md: the executable contract the executor follows and the reviewer judges against. May be filled by a CLI harness or an HTTP endpoint.", input: "REQUEST.md + the repository", output: "PLAN.md" },
  { name: "Executor", index: "02", role: "Edits files, runs commands, and writes EXECUTION.md. Must be a real coding agent — it has to read, edit, compile and re-run tests, so an API endpoint is rejected outright.", input: "PLAN.md", output: "Changed files + EXECUTION.md" },
  { name: "Reviewer", index: "03", role: "Judges the diff against the plan and must emit a machine-readable verdict. May be filled by a CLI harness or an HTTP endpoint.", input: "The diff + every artifact before it", output: "REVIEW.md + VERDICT.json" },
];

export const decision = "There is no fourth agent. Whether a run continues is decided by evidence: your validation commands run in Kage's own process and their exit codes gate the review, and the reviewer's VERDICT.json — PASS, FAIL or BLOCKED — gates the run. A review that returns no verdict blocks rather than being guessed at.";

// Driving already-installed coding agents is the premise, not a plan: src/adapters/cli.rs carries a
// verified argv preset per harness, and `kage doctor` reports which of them are on PATH.
export const adapters = [
  { name: "Coding agent CLIs", detail: "claude-code · codex · opencode · kamui — spawned with argv presets read from each tool's own --help", status: "Supported", kind: "supported" },
  { name: "Any command", detail: "adapter: command — any binary that takes a prompt, with {prompt} / {prompt_file} placeholders", status: "Supported", kind: "extensible" },
  { name: "HTTP endpoint", detail: "adapter: api — an OpenAI-compatible endpoint, for the planner and reviewer only", status: "Supported", kind: "supported" },
  { name: "Executor over an API", detail: "Rejected by Config::validate — an executor must read, edit and re-run tests, and Kage will not grow its own tool loop", status: "Not supported", kind: "rejected" },
];

export type TraceCategory = "Planning" | "Executing" | "Testing" | "Reviewing" | "Fixing" | "Completed";
// Each row is a real phase transition: the phase entered, and the message recorded with it.
export const traceEvents: { time: string; event: string; category: TraceCategory }[] = [
  { time: "10:42:01", event: "starting", category: "Planning" },
  { time: "10:47:26", event: "plan written", category: "Executing" },
  { time: "11:09:52", event: "implementation finished", category: "Testing" },
  { time: "11:12:30", event: "validation failed: cargo test", category: "Fixing" },
  { time: "11:19:04", event: "fix applied", category: "Testing" },
  { time: "11:21:38", event: "validation passed", category: "Reviewing" },
  { time: "11:24:10", event: "review failed", category: "Fixing" },
  { time: "11:31:22", event: "fix applied", category: "Testing" },
  { time: "11:33:57", event: "validation passed", category: "Reviewing" },
  { time: "11:36:44", event: "review passed", category: "Completed" },
];

// Real `.kage/config.yaml`. Every key here is in src/config/schema.rs, which rejects unknown ones.
export const configText = `# .kage/config.yaml
version: 1

roles:
  planner:
    adapter: claude-code
    model: opus

  executor:
    adapter: opencode
    timeout_secs: 3600

  reviewer:
    adapter: codex

loop:
  # How many times the reviewer may reject the work.
  max_iterations: 3
  # Attempts to make validation pass before each review.
  max_repairs: 3

git:
  isolate: true

validation:
  commands:
    - cargo test
    - cargo clippy --all-targets -- -D warnings`;

export const cliText = `$ kage init
Initialized Kage in ./.kage

Edit ./.kage/config.yaml to bind roles to the tools you have.
Then check your setup:  kage doctor

$ kage doctor
Kage v0.1.0

Roles
✓ planner   claude-code · opus
✓ executor  opencode
✓ reviewer  codex

Ready to run.

$ kage run "Add rate limiting to the API"
Task: Add rate limiting to the API
  isolated in .kage/worktrees/run_20260809_001 (kage/run_20260809_001)

[run_20260809_001] PLAN
  claude-code`;

// From the README's Scope section. Stating a limit is not a weakness; a limit you discover
// mid-run is.
export const scope = [
  "No DAGs",
  "No parallel agents",
  "No dynamic delegation",
  "One run, one repository",
  "One planner, one executor, one reviewer",
  "Not a general assistant",
];

// The artifact tree a run leaves behind. Context moves between agents through these files;
// they share no chat history.
export const artifacts = [
  "REQUEST.md",
  "PLAN.md",
  "EXECUTION.md",
  "TEST_RESULTS.md",
  "REVIEW.md",
  "VERDICT.json",
  "state.json",
  "prompts/",
  "logs/",
];
