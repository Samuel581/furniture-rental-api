import { execSync } from 'child_process';
import { loadTestDatabaseUrl } from './test-env';

/**
 * Runs once before the e2e suite: applies pending migrations to the test
 * database so the suite always runs against a current schema.
 */
export default async function globalSetup(): Promise<void> {
  const databaseUrl = loadTestDatabaseUrl();

  execSync('yarn prisma migrate deploy', {
    env: { ...process.env, DATABASE_URL: databaseUrl },
    stdio: 'inherit',
  });
}
