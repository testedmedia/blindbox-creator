# Hookify Rule: Require Docs Sync

**Type:** WARN
**Trigger:** Any of these changes WITHOUT a corresponding CLAUDE.md update:
  - New/deleted file in app/api/, app/brain/, or pages/ (route/page change)
  - New file in lib/ or utils/ (new utility)
  - New/modified .env.example or env var reference
  - New database table or migration
  - New entry in package.json scripts
  - New cron job or scheduled task
  - File deletion in app/ (removed feature)

**Action:** WARN — remind to update CLAUDE.md
**Message:** "WARNING: You changed project structure but CLAUDE.md was not updated. New routes, env vars, DB tables, or removed features must be reflected in CLAUDE.md immediately."

## Details

CLAUDE.md is the project brain. If it is stale, the next terminal session starts blind. Any structural change (new routes, env vars, DB tables, scripts, removed features) MUST be reflected in CLAUDE.md in the same commit.

### Triggers CLAUDE.md update:
- New API route/page → Architecture section
- New env var → Environment Variables section  
- New DB table → Database Schema section
- New npm script → Test Commands section
- New CSS convention/design rule → add to relevant section or docs/
- Deleted feature → remove from Architecture
- Version bump → Current Version section

### Does NOT trigger:
- Bug fixes (same architecture)
- Styling tweaks (unless new convention)
- Content/copy changes
- Test-only changes
