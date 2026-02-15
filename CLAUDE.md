# Blind Box Creator - CLAUDE.md

## Project
Blind box product creator app. Generate and customize blind box collectible products with AI.

## Version
3.4.0

## Stack
| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| AI | OpenAI |
| Backend | Supabase |
| Payments | Stripe |
| Rendering | Puppeteer |
| Hosting | Vercel |

## Deployment
Deploy protocol defined in `~/CLAUDE.md`. Use: `bash scripts/deploy.sh <version> <tag>`

## Test Commands
```bash
npm test                    # Run test suite
npm run test:smoke          # Post-deploy smoke tests
npm run test:types          # TypeScript compilation check
```
