# Code Review Instructions for Jules

## Project Context
- **Project:** Blind Box Creator (AI Product Generator)
- **Stack:** Next.js 16, React 19, TypeScript, Tailwind, Vercel
- **Focus Areas:** security, correctness, performance

## Review Priorities
1. Security vulnerabilities (OWASP top 10, injection, auth bypass, AI prompt injection)
2. Data integrity issues (missing validation, race conditions, generated content safety)
3. Breaking changes (API contracts, schema mismatches)
4. Performance regressions (N+1 queries, memory leaks, unnecessary re-renders, AI API timeouts)

## What NOT to Flag
- Style/formatting preferences (handled by linter)
- Missing TypeScript types on internal functions
- Console.log statements in development branches
- Comments or documentation quality

## Adversarial Self-Critique
After your initial review, take the opposite position:
- For each issue you flagged: Is this actually a problem? Could there be a valid reason?
- For each pass: What did you miss? Re-examine the riskiest changes.
- Report both your initial findings AND your self-critique.

## Creator App-Specific Checks
- Verify AI-generated content is properly sanitized before display
- Check for proper handling of AI API rate limits and timeouts
- Ensure user-uploaded images are validated and size-limited
- Verify proper error handling for AI generation failures
- Check for proper caching of generated assets
- Ensure product customization state is properly managed

## Context Files
- `CLAUDE.md` -- Project architecture and conventions
- `CHANGELOG.md` -- Recent version history
- `docs/PROJECT_STATUS.md` -- Current milestone and known issues
