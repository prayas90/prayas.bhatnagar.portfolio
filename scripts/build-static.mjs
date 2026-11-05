import { cpSync, mkdirSync } from 'node:fs';
// The frontend has no compilation step. Copy the same assets served by Spring Boot.
mkdirSync('dist', { recursive: true });
cpSync('src/main/resources/static', 'dist', { recursive: true });
console.log('Static website prepared in dist/');
