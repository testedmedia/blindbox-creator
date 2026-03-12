# Hookify Rule: Require Jarvis Deploy

**Type:** BLOCK
**Trigger:** Running bash scripts/deploy.sh directly (without jarvis-deploy wrapper)
**Action:** BLOCK - refuse to execute
**Message:** "BLOCKED: Use jarvis-deploy instead of bash scripts/deploy.sh. The wrapper enforces the full Debug Quad."
