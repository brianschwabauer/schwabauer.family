#!/usr/bin/env node
/**
 * Two related fixes for consuming delightstack packages without modifying
 * the submodule:
 *
 * 1. Each package's source tsconfig.json extends `./.svelte-kit/tsconfig.json`,
 *    a path only produced by `svelte-kit sync` in SvelteKit projects. The
 *    component/utility packages are Svelte libraries, not SvelteKit apps, so
 *    that file never exists. We write a minimal one with `target: ES2022`
 *    BEFORE `svelte-package` runs so the build keeps native `#privateField`
 *    syntax instead of downleveling it to WeakMap — Svelte's runes analyzer
 *    requires the native form.
 *
 * 2. After the build, Vite preprocesses the shipped `.svelte` files in our
 *    app and esbuild walks up looking for a tsconfig. We drop a self-contained
 *    one into each package's `dist/` so the walk stops there (the source
 *    tsconfig at the package root would point at the broken extends again).
 *
 * Drop this script as soon as delightstack publishes pre-built artifacts or
 * stops shipping .svelte source files with TS.
 */
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');

const buildTimeStub = {
	compilerOptions: {
		target: 'ES2022',
		module: 'ESNext',
		moduleResolution: 'Bundler',
		lib: ['DOM', 'DOM.Iterable', 'ES2022'],
		esModuleInterop: true,
		allowSyntheticDefaultImports: true,
		isolatedModules: true,
		resolveJsonModule: true,
		skipLibCheck: true,
		sourceMap: true,
		strict: false,
		preserveValueImports: false,
		verbatimModuleSyntax: false,
		useDefineForClassFields: false,
	},
};

const consumeTimeStub = {
	compilerOptions: {
		target: 'es2022',
		module: 'esnext',
		moduleResolution: 'bundler',
		esModuleInterop: true,
		strict: false,
		skipLibCheck: true,
	},
};

const packages = ['components', 'utilities', 'auth'];

for (const name of packages) {
	const pkgDir = resolve(repoRoot, 'delightstack', 'packages', name);
	if (!existsSync(pkgDir)) continue;

	// 1. .svelte-kit/tsconfig.json — for the package's own build (svelte-package)
	const skitDir = resolve(pkgDir, '.svelte-kit');
	mkdirSync(skitDir, { recursive: true });
	writeFileSync(
		resolve(skitDir, 'tsconfig.json'),
		JSON.stringify(buildTimeStub, null, '\t') + '\n',
	);

	// 2. dist/tsconfig.json — for esbuild's tsconfig discovery when our app
	// preprocesses the shipped .svelte files.
	const distDir = resolve(pkgDir, 'dist');
	if (existsSync(distDir)) {
		writeFileSync(
			resolve(distDir, 'tsconfig.json'),
			JSON.stringify(consumeTimeStub, null, '\t') + '\n',
		);
	}
}

console.log('[seed-dist-tsconfig] wrote .svelte-kit/tsconfig.json and dist/tsconfig.json stubs');
