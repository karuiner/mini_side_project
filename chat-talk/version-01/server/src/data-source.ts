import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import "dotenv/config";
const TestDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_TEST_NAME,
  synchronize: true,
  logging: false,
  entities: ["./src/entity/*.ts"],
  migrations: [],
  subscribers: [],
});

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DEV_NAME,
  synchronize: true,
  logging: false,
  entities: ["./src/entity/*.ts"],
  migrations: [],
  subscribers: [],
});

export { TestDataSource, AppDataSource };
