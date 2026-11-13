import { loadTestDatabaseUrl } from './test-env';

// PrismaService reads DATABASE_URL from process.env when it is constructed,
// which happens when AppModule boots. Set it before any test instantiates the
// client.
process.env.DATABASE_URL = loadTestDatabaseUrl();
