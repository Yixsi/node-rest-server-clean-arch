import mongoose from "mongoose";

interface Options {
  dbName: string;
  mongoUrl: string;
}

export class MongoDatabase {
  static async connect(options: Options) {
    const { dbName, mongoUrl } = options;

    try {
      await mongoose.connect(mongoUrl, {
        dbName,
      });
      console.log("Connected to Mongo");
    } catch (error) {
      console.log("Error connecting to Mongo");
      throw error;
    }
  }
}
