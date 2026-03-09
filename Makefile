.phony: drizzle

drizzle:
	npx drizzle-kit generate --config drizzle.config.ts
	npx drizzle-kit push
