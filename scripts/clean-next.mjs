import { rmSync } from 'node:fs';
import { resolve } from 'node:path';

const nextDir = resolve(process.cwd(), '.next');

try {
  rmSync(nextDir, { force: true, recursive: true });
  console.log(`Removed ${nextDir}`);
} catch (error) {
  console.warn(`Failed to remove ${nextDir}:`, error);
}
