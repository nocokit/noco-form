#!/bin/bash

# 发布到 GitHub Pages 脚本
# 使用方法: ./deploy.sh

set -e

echo "🚀 开始构建项目..."

# 构建项目
VITE_BASE=/noco-form/ npm run build-only

echo "✅ 构建完成"

# 进入构建产物目录
cd dist

# 初始化 git（如果还没有）
if [ ! -d .git ]; then
  git init
  git remote add origin git@github.com:nocokit/noco-form.git
fi

echo "📦 准备发布..."

# 添加所有文件
git add -A

# 提交
git commit -m "Deploy to GitHub Pages - $(date '+%Y-%m-%d %H:%M:%S')"

# 切换到 gh-pages 分支
git branch -M gh-pages

# 推送到远程
echo "🚢 推送到 gh-pages 分支..."
git push -f origin gh-pages

cd ..

echo "✨ 发布成功！"
echo "🌐 访问地址: https://nocokit.github.io/noco-form/"
