install:
		npm ci

publish:
		npm publish --dry-run

lint:
		npx eslint .

link:
		npm link
test:
		npm test
test-coverage:
		npm test -- --coverage --coverage-provider=v8