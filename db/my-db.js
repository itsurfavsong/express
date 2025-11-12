import mysql from 'mysql2/promise'; // 비동기 처리, 프로미스 형태로 반환하는게 약속되어 있음.
import 'dotenv/config';

export default mysql.createPool(
  {
    host: process.env.DB_MYSQL_HOST,
    port: parseInt(process.env.DB_MYSQL_PORT),
    user: process.env.DB_MYSQL_USER,
    password: process.env.DB_MYSQL_PASSWORD,
    database: process.env.DB_MYSQL_DB_NAME,
    waitForConnections: (process.env.DB_MYSQL_WAIT_FOR_CONNECTIONS === 'true'),
    connectionLimit: parseInt(process.env.DB_MYSQL_CONNECTION_LIMIT),
    queueLimit: parseInt(process.env.DB_MYSQL_QUEUE_LIMIT)
  }
);
