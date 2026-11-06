import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

/**
 * Resolve the test database URL from TEST_DATABASE_URL, falling back to a
 * `.env.test` file at the repo root. Throws with setup instructions when
 * neither is present.
 */
export function loadTestDatabaseUrl(): string {
  if (process.env.TEST_DATABASE_URL) {
    return process.env.TEST_DATABASE_URL;
  }

  const envPath = resolve(process.cwd(), '.env.test');
  if (!existsSync(envPath)) {
    throw new Error(
      [
        'Missing test database config. Create `.env.test` in the repo root with:',
        '  DATABASE_URL="postgresql://postgres:password@localhost:5432/furniture_rental_test"',
        'pointing at a dedicated test database (not your dev database).',
      ].join('\n'),
    );
  }

  const contents = readFileSync(envPath, 'utf8');
  const match = contents.match(/^\s*DATABASE_URL\s*=\s*["']?([^"'\n]+)["']?\s*$/m);
  if (!match) {
    throw new Error('`.env.test` must contain a `DATABASE_URL=...` line');
  }

  return match[1].trim();
}
