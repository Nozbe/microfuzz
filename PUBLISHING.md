# Publishing

```bash
yarn ci:check
yarn build
# update changelog&readme
npm version 1.1.1-1

# publish as prerelease
npm publish --tag next
git push && git push --tags

# publish normally
npm publish
git push && git push --tags

# update docs
git checkout gh-pages
git merge main
cd demo && yarn gh-pages
# commit result and push
```
