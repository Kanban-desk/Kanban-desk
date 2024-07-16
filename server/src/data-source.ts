import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: process.env.AZURE_SQL_SERVER,
  port: Number(process.env.AZURE_SQL_PORT),
  username: process.env.AZURE_SQL_USERNAME,
  password: process.env.AZURE_SQL_PASSWORD,
  database: process.env.AZURE_SQL_DATABASE,
  options: {
    encrypt: process.env.NODE_ENV !== "development",
  },
  entities: ['dist/**/entities/*.entity.js'],
  migrations: ['dist/**/migrations/*.js'],
  synchronize: false,
});
