# Hookify Rule: Require openclaw-deploy

**Type:** BLOCK
**Trigger:** Running `bash scripts/deploy.sh` directly (without openclaw-deploy wrapper)
**Action:** BLOCK — refuse to execute
**Message:** "BLOCKED: Use `openclaw-deploy` instead of `bash scripts/deploy.sh`. The wrapper enforces the full Debug Quad (secrets + tests + SAST + codex review). Run: openclaw-deploy <version> <tag> '<title>' '<changes>'"

## Details
The `openclaw-deploy` wrapper at `~/ClaudeCode/scripts/openclaw-deploy.sh` is the ONLY sanctioned way to deploy any project. It enforces secrets scanning, type checking, unit tests, SAST scanning, and GPT-4.1 code review BEFORE delegating to the project's deploy.sh.

Running `bash scripts/deploy.sh` directly bypasses all Debug Quad layers except whatever the project script itself implements (which varies — some have zero code review).

### What This Blocks
- `bash scripts/deploy.sh` — direct deploy script invocation
- `sh scripts/deploy.sh` — same via sh
- `./scripts/deploy.sh` — direct execution

### What This Allows
- `openclaw-deploy <version> <tag> "<title>" "<changes>"` — the universal wrapper
- `openclaw-deploy ... --skip-tests` — skip tests for hotfixes (still runs codex review)
- `openclaw-deploy ... --force-degraded` — bypass only when ALL LLM APIs are down
