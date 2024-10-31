import eslint from '@eslint/js';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';

export default tseslint.config({
	files: ['**/*.ts'],
	ignores: ['dist/**/*', 'node_modules/**/*'],
	extends: [
		eslint.configs.recommended,
		...tseslint.configs.recommended,
		prettierRecommended,
	],
	plugins: {},
	languageOptions: {
		parserOptions: {
			projectService: true,
		},
	},
	rules: {
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'auto',
			},
		],
		'@typescript-eslint/consistent-type-exports': 'error',
		'@typescript-eslint/consistent-type-imports': 'error',
		'@typescript-eslint/naming-convention': [
			'error',
			{
				selector: 'memberLike',
				modifiers: ['private'],
				format: ['camelCase'],
				leadingUnderscore: 'require',
			},
		],
		'@typescript-eslint/no-unused-vars': 'warn',
		'lines-between-class-members': [
			'error',
			{
				enforce: [{ blankLine: 'always', prev: 'method', next: 'method' }],
			},
		],
	},
});
