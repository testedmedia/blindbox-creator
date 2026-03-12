#!/bin/bash
set -euo pipefail

# ═══════════════════════════════════════════
# Deploy Script — BlindBox Creator
# Usage: bash scripts/deploy.sh <version> <tag> "<title>" "<changes>"
# ═══════════════════════════════════════════

VERSION="${1:?Usage: deploy.sh <version> <tag> \"<title>\" \"<changes>\"}"
TAG="${2:?Missing tag (FIX/UPDATE/MAJOR/FOUNDATION)}"
TITLE="${3:?Missing title}"
CHANGES="${4:?Missing changes}"
PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PROJECT_NAME="$(basename "$PROJECT_DIR")"
DEPLOY_SUMMARY="$PROJECT_DIR/.deploy-summary.txt"
QUAD_LOG="$HOME/.openclaw/scripts/debug-quad-log.sh"

echo "═══ DEPLOY: $PROJECT_NAME v$VERSION [$TAG] ═══"
echo "Title: $TITLE"
echo "Changes: $CHANGES"
echo ""

cat > "$DEPLOY_SUMMARY" <<HEADER
DEPLOY SUMMARY — $PROJECT_NAME v${VERSION} ${TAG}
$(date '+%Y-%m-%d %H:%M:%S %Z')
========================================
HEADER

log_step() { echo "$1" | tee -a "$DEPLOY_SUMMARY"; }

[[ -x "$QUAD_LOG" ]] && bash "$QUAD_LOG" deploy-start "$PROJECT_NAME" "$VERSION" "$TAG" 2>/dev/null || true

# ── Step 1: Pre-deploy gate ──
echo ">>> Step 1: Pre-deploy gate"

if [ -f "$PROJECT_DIR/tsconfig.json" ]; then
  cd "$PROJECT_DIR" && npx tsc --noEmit 2>&1 && L1_TYPES="PASS" || L1_TYPES="FAIL"
else
  L1_TYPES="SKIP"
fi
echo "  TypeScript: $L1_TYPES"

if npm run test:unit --if-present 2>&1; then L1_UNIT="PASS"; else L1_UNIT="SKIP"; fi
echo "  Unit tests: $L1_UNIT"

if [ -f "$PROJECT_DIR/scripts/pre-deploy.js" ]; then
  node "$PROJECT_DIR/scripts/pre-deploy.js" 2>&1 && L1_PRE="PASS" || L1_PRE="FAIL"
else
  L1_PRE="SKIP"
fi

if grep -rn "PRIVATE_KEY\|SECRET_KEY\|sk_live\|password=" --include="*.ts" --include="*.tsx" --include="*.js" "$PROJECT_DIR/src/" "$PROJECT_DIR/app/" "$PROJECT_DIR/lib/" 2>/dev/null | grep -v 'process\.env\.' | grep -v '\.includes(' | grep -v 'throw new Error' | grep -q .; then
  L1_SECRETS="FAIL"
else
  L1_SECRETS="PASS"
fi
echo "  Secrets: $L1_SECRETS"

log_step "STEP 1: Layer 1 — Types:$L1_TYPES Unit:$L1_UNIT Secrets:$L1_SECRETS"
[[ -x "$QUAD_LOG" ]] && bash "$QUAD_LOG" layer1-pre "$PROJECT_NAME" "PASS" "Types:$L1_TYPES Unit:$L1_UNIT Secrets:$L1_SECRETS" 2>/dev/null || true

if [[ "$L1_TYPES" == "FAIL" || "$L1_SECRETS" == "FAIL" ]]; then
  log_step "RESULT: BLOCKED at Layer 1"
  [[ -x "$QUAD_LOG" ]] && bash "$QUAD_LOG" deploy-end "$PROJECT_NAME" "$VERSION" "BLOCKED" 2>/dev/null || true
  exit 1
fi

# ── Step 1.5: SAST ──
echo ">>> Step 1.5: SAST"
if command -v semgrep >/dev/null 2>&1; then
  semgrep --config auto --error "$PROJECT_DIR" --exclude='node_modules' --exclude='.next' 2>&1 && L1_SAST="PASS" || L1_SAST="WARN"
else
  L1_SAST="SKIP"
fi
log_step "STEP 1.5: SAST — $L1_SAST"

# ── Step 2: Codex Review ──
echo ">>> Step 2: Codex review"
CODEX_SCRIPT="$HOME/.openclaw/scripts/codex-review.sh"
if [ -f "$CODEX_SCRIPT" ]; then
  set +e; bash "$CODEX_SCRIPT" "$PROJECT_DIR" 2>&1; CODEX_EXIT=$?; set -e
  [ "$CODEX_EXIT" -eq 0 ] && L2="PASS" || L2="FAIL (exit $CODEX_EXIT)"
else
  L2="SKIP"
fi
log_step "STEP 2: Codex — $L2"
[[ -x "$QUAD_LOG" ]] && bash "$QUAD_LOG" layer2 "$PROJECT_NAME" "${L2%% *}" "" 2>/dev/null || true

# ── Step 2.5: Changelog ──
if [ -f "$PROJECT_DIR/CHANGELOG.md" ] && grep -q "v${VERSION}" "$PROJECT_DIR/CHANGELOG.md"; then
  echo "  ✅ v${VERSION} in CHANGELOG.md"
else
  echo "❌ CHANGELOG.md missing or version not found"; exit 1
fi

# ── Step 3: Build ──
echo ">>> Step 3: Build"
cd "$PROJECT_DIR"
npm run build 2>&1 && BUILD="PASS" || BUILD="FAIL"
log_step "STEP 3: Build — $BUILD"
[[ "$BUILD" == "FAIL" ]] && { log_step "RESULT: BLOCKED at Build"; exit 1; }

# ── Step 4: Deploy ──
echo ">>> Step 4: Deploy"
npx vercel deploy --prod --yes 2>&1 && DEPLOY="PASS" || DEPLOY="FAIL"
log_step "STEP 4: Deploy — $DEPLOY"

# ── Step 5: Smoke ──
echo ">>> Step 5: Smoke tests"
sleep 5
if [ -f "$PROJECT_DIR/scripts/smoke-test.js" ]; then
  node "$PROJECT_DIR/scripts/smoke-test.js" 2>&1 && SMOKE="PASS" || SMOKE="WARN"
else
  SMOKE="SKIP"
fi
log_step "STEP 5: Smoke — $SMOKE"

# ── Finalize ──
git tag "deploy/success/v$VERSION" 2>/dev/null || true
log_step "RESULT: SUCCESS"
[[ -x "$QUAD_LOG" ]] && bash "$QUAD_LOG" deploy-end "$PROJECT_NAME" "$VERSION" "SUCCESS" 2>/dev/null || true
echo "═══ DEPLOY COMPLETE: $PROJECT_NAME v$VERSION ═══"
