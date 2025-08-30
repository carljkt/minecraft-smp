import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig([
	{
		ignores: ['**/node_modules/', '.git/', '**/dist/'],
	},
	{
		files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: 'module',
		},
		extends: [...tseslint.configs.recommended, prettierConfig],
		rules: {
			'no-console': 'warn',
			'no-debugger': 'error',
			eqeqeq: ['error', 'always'],
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
			'prefer-const': 'error',
		},
	},
	{
		files: ['examples/**/*.{js,mjs,cjs,ts,jsx,tsx}'],
		rules: {
			'no-console': 'off',
		},
	},
]);
