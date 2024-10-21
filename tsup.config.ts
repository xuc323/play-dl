import { defineConfig } from 'tsup';

export default defineConfig({
    clean: true,
    dts: true,
    entryPoints: ['play-dl/index.ts'],
    format: ['esm', 'cjs'],
    skipNodeModulesBundle: true,
    target: 'esnext'
});
