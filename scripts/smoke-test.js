#!/usr/bin/env node
const BASE = process.env.SMOKE_URL || 'https://blindbox-creator.vercel.app';

async function smoke() {
  console.log(`Smoke testing: ${BASE}`);
  console.log('-------------------------------');

  const routes = ['/'];
  let passed = 0;
  let failed = 0;

  for (const r of routes) {
    try {
      const res = await fetch(`${BASE}${r}`);
      if (res.ok || res.status === 307) {
        passed++;
        console.log(`PASS: ${r} (${res.status})`);
      } else {
        failed++;
        console.log(`FAIL: ${r} (${res.status})`);
      }
    } catch (e) {
      failed++;
      console.log(`FAIL: ${r} (${e.message})`);
    }
  }

  console.log(`\n${passed} passed, ${failed} failed`);
  if (failed) process.exit(1);
}

smoke();
