import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src'],
	splitting: false,
	target: ['es2020'],
	sourcemap: false,
	format: 'esm',
	minify: false,
	clean: true
});
