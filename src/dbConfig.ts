import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

interface CustomConnectionOptions extends PostgresConnectionOptions {
  readonly seeds?: Array<Function | string>;
  readonly factories?: Array<Function | string>;
}

const devDbConfig: CustomConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '',
  database: 'bookstore',
  synchronize: true,
  logging: false,
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/db/migration/**/*.ts'],
  seeds: ['src/db/seeds/**/*.seed.ts'],
  factories: ['src/db/factories/**/*.factory.ts'],
};

const testDbConfig: CustomConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '',
  database: 'test_bookstore',
  synchronize: true,
  logging: false,
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/db/migration/**/*.ts'],
  // seeds: ['src/db/seeds/**/*.seed.ts'],
  // factories: ['src/db/factories/**/*.factory.ts'],
};

const prodDbConfig: CustomConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '',
  database: 'bookstore',
  synchronize: true,
  logging: false,
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/db/migration/**/*.ts'],
};

const dbMap: any = {
  test: testDbConfig,
  development: devDbConfig,
  production: prodDbConfig,
};

const env: string = process.env.NODE_ENV;

export const dbConfig = dbMap[env];
