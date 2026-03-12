# Hookify Rule: Block Env Commits

**Type:** BLOCK
**Trigger:** Any attempt to git add .env, .env.local, .env.production, or files matching *.secret*
**Action:** BLOCK - refuse to stage
**Message:** "BLOCKED: Never commit .env or secret files. Use .env.example for templates."
