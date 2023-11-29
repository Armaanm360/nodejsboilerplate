import config from './../config/config';
import knex from 'knex';
import { Pool } from 'pg';

const createDbCon = () => {
  console.log(
    config.DB_HOST,
    config.DB_NAME,
    config.DB_PASS,
    config.DB_PORT,
    config.DB_USER
  );
  const connection = knex({
    client: 'pg',
    connection: {
      host: config.DB_HOST,
      port: parseInt(config.DB_PORT),
      user: config.DB_USER,
      password: config.DB_PASS,
      database: config.DB_NAME,
      // ssl: {
      //   rejectUnauthorized: false,
      // },
    },
    pool: {
      min: 0,
      max: 100,
    },
  });

  console.log('WE Database Connected');
  return connection;
};

export const db = createDbCon();

//create pool

const createPool = () => {
  const poolCon = new Pool({
    host: config.DB_HOST,
    port: parseInt(config.DB_PORT),
    user: config.DB_USER,
    password: config.DB_PASS,
    database: config.DB_NAME,
    max: 10,
    // ssl: {
    //   rejectUnauthorized: false,
    // },
  });

  console.log('Pool Created');
  return poolCon;
};
export const pool = createPool();
