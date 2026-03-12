# Hookify Rule: Block Direct Git Push

**Type:** BLOCK
**Trigger:** Any attempt to run git push, vercel deploy, eas build, or direct deploy commands
**Action:** BLOCK - refuse to execute
**Message:** "BLOCKED: Use jarvis-deploy instead. Direct deploy commands are never allowed."
