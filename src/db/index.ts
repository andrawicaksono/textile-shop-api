import { Sequelize } from "sequelize-typescript";
import { dbConfig, dialect } from "../config/db.config";
import { User } from "../models/user.model";
import { FabricCategory } from "../models/fabricCategory.model";
import { Fabric } from "../models/fabric.model";
import { Product } from "../models/product.model";
import { Order } from "../models/order.model";
import { OrderProduct } from "../models/orderProduct.model";

class Database {
  public sequelize: Sequelize | undefined;

  constructor() {
    this.connectToDatabase();
    this.associateModels();
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
      models: [User, FabricCategory, Fabric, Product, Order, OrderProduct]
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

    private async associateModels() {
      Fabric.belongsTo(FabricCategory, {
        foreignKey: 'fabricCategoryId'
      });
      FabricCategory.hasMany(Fabric, {
        foreignKey: 'fabricCategoryId'
      });
  
      Product.belongsTo(Fabric, {
        foreignKey: 'fabricId'
      });
      Fabric.hasMany(Product, {
        foreignKey: 'fabricId'
      });
  
      Order.belongsTo(User, {
        foreignKey: 'userId'
      });
      User.hasMany(Order, {
        foreignKey: 'userId'
      });
  
      OrderProduct.belongsTo(Order, {
        foreignKey: 'orderId'
      });
      Order.hasMany(OrderProduct, {
        foreignKey: 'orderId'
      });
    }
}

export const db = new Database();