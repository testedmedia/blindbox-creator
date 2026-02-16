#!/bin/bash
set -e

VERSION="${1:?Usage: bash scripts/deploy.sh <version> <tag> [title]}"
TAG="${2:-UPDATE}"
TITLE="${3:-Update}"

echo "============================================"
echo "  BlindBox Creator Deploy v$VERSION [$TAG]"
echo "============================================"

# Step 1: Pre-deploy checks
echo ""
echo "Step 1: Running pre-deploy checks..."
node scripts/pre-deploy.js || { echo "Pre-deploy failed. Aborting."; exit 1; }

# Codex Code Review (Debug Trifecta Layer 2)
CODEX_SCRIPT="$HOME/.openclaw/scripts/codex-review.sh"
if [ -f "$CODEX_SCRIPT" ]; then
  echo ""
  echo "Running Codex code review..."
  bash "$CODEX_SCRIPT" "$(pwd)" || { echo "Codex review BLOCKED deploy. Fix issues first."; exit 1; }
fi


# Step 1.75: Changelog verification
echo ""
echo "Changelog verification..."
CHANGELOG_FILE="$(pwd)/CHANGELOG.md"
if [ ! -f "$CHANGELOG_FILE" ]; then
  echo "❌ CHANGELOG.md not found in project root. Create it before deploying."
  exit 1
fi
if ! grep -q "v${VERSION}" "$CHANGELOG_FILE"; then
  echo "❌ Version v${VERSION} not found in CHANGELOG.md. Update the changelog before deploying."
  exit 1
fi
echo "   ✅ CHANGELOG.md contains v${VERSION}"

# Step 2: Deploy to Vercel
echo ""
echo "Step 2: Deploying BlindBox Creator v$VERSION to Vercel..."
npx vercel deploy --prod --yes

# Step 3: Smoke tests
echo ""
echo "Step 3: Running smoke tests..."
sleep 5
node scripts/smoke-test.js || echo "WARNING: Smoke tests had issues"

# Step 4: QA Report
echo ""
echo "============================================"
echo "  QA Report — BlindBox Creator v$VERSION"
echo "============================================"
echo "  Tag:      $TAG"
echo "  Title:    $TITLE"
echo "  Date:     $(date '+%Y-%m-%d %H:%M:%S')"
echo "  Status:   Deployed"
echo "============================================"
echo ""
echo "Done: BlindBox Creator v$VERSION deployed successfully."
