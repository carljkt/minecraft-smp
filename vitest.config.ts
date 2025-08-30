import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		exclude: ['**/node_modules', '**/dist', '.git'],
		passWithNoTests: true,
		typecheck: {
			enabled: true,
		},
		coverage: {
			enabled: true,
			all: true,
			reporter: ['text', 'lcov', 'cobertura'],
			provider: 'v8',
			include: ['src', 'src/client/index.ts'],
			exclude: [
				// All ts files that only contain types, due to ALL
				'**/*.{interface,type,d}.ts',
				'**/{interfaces,types}/*.ts',
				// All index files that *should* only contain exports from other files
				'**/index.{js,ts}',
				'**/example.{js,ts}',
				// All exports files that make subpackages available as submodules
				'**/exports/*.{js,ts}',
			],
		},
	},
});
