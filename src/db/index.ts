import { Sequelize } from "sequelize-typescript";
import { dbConfig, dialect } from "../config/db.config";
import { User } from "../models/user.model";

export class Database {
  public sequelize: Sequelize | undefined;

  constructor() {
    this.connectToDatabase();
  }

  private async connectToDatabase() {
    this.sequelize = new Sequelize({
      database: dbConfig.DB,
      username: dbConfig.USER,
      password: dbConfig.PASSWORD,
      host: dbConfig.HOST,
      dialect: dialect,
      pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
      },
      models: [User]
    });

    await this.sequelize
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
      })
      .catch((err) => {
        console.error("Unable to connect to the Database:", err);
      });
  }
}