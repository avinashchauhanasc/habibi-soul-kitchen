import { cp, mkdir, readFile, rm, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const required = ['index.html', 'styles.css', 'script.js', 'config.js', 'public/images/brand/habibi-soul-kitchen.png'];
for (const file of required) {
  const info = await stat(resolve(root, file));
  if (!info.isFile() || info.size === 0) throw new Error(`Missing or empty required asset: ${file}`);
}
const html = await readFile(resolve(root, 'index.html'), 'utf8');
if (!html.includes('/images/brand/habibi-soul-kitchen.png')) throw new Error('Logo path is missing from the page.');
const dist = resolve(root, 'dist');
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
for (const file of ['index.html', 'styles.css', 'script.js', 'config.js']) await cp(resolve(root, file), resolve(dist, file));
// The app is served from its deployment root, so publish the public assets at root too.
await cp(resolve(root, 'public/images'), resolve(dist, 'images'), { recursive: true });
console.log(`Built ${required.length} validated source assets into ${dist}`);

