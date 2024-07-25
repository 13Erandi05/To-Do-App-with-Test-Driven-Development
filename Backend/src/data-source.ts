import { DataSource } from "typeorm";
import { Todo } from "./entity/ToDo";
import * as dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file
console.log(process.env.DB_USERNAME);

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT!, 10) || 5432,
  username: process.env.DB_USERNAME || "Erandi",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "database",
  entities: [Todo],
  synchronize: true,
});
