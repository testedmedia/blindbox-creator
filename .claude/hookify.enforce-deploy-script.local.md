---
name: enforce-deploy-script
enabled: true
event: bash
pattern: vercel\s+deploy|vercel\s+--prod|git\s+push
action: block
---

**DEPLOYMENT PROTOCOL VIOLATION**

Never deploy directly with `vercel deploy` or `git push`. ALL deployments MUST go through:

```
bash scripts/deploy.sh <version> <tag>
```

Deploy protocol defined in ~/CLAUDE.md.
