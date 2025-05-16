# structure
npm run docs:build

# Navigate to the build output directory
cd docs/.vitepress/dist

git init
git add -A
git commit -m '更新文档'

# Push to the gh-page branch of your warehouse
# Replace<USERNAME>/<REPO>with your information
git push -f git@github.com:tommyrunner/tune-ui.git master:gh-pages