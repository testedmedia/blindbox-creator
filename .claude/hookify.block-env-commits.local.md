---
name: block-env-commits
enabled: true
event: bash
pattern: git\s+add\s+.*\.env|git\s+add\s+.*\.secret
action: block
---

**BLOCKED: Environment File Commit Attempt**

Never commit `.env`, `.env.local`, `.env.production`, or files matching `*.secret*` to version control.

Environment files contain API keys, database credentials, and other secrets that must never be committed to version control. Use `.env.example` with placeholder values instead.
