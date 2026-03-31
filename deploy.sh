#!/usr/bin/env bash
set -e

# 部署到 https://nocokit.github.io/noco-form/
# 目标仓库: https://github.com/nocokit/noco-form

DEPLOY_REPO="git@github.com:nocokit/noco-form.git"
DEPLOY_BRANCH="gh-pages"

echo ">>> 构建项目..."
VITE_BASE=/noco-form/ yarn build-only

echo ">>> 进入 dist 目录..."
cd dist

echo ">>> 初始化 git 并推送到 gh-pages..."
git init
git checkout -b "$DEPLOY_BRANCH"
git add -A
git commit -m "deploy: $(date '+%Y-%m-%d %H:%M:%S')"
git push -f "$DEPLOY_REPO" "$DEPLOY_BRANCH"

cd -
echo ">>> 部署完成: https://nocokit.github.io/noco-form/"
