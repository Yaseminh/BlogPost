import { MongoClient as Mongo, Db } from "mongodb";

export const MongoClient = {
  client: undefined as unknown as Mongo,
  db: undefined as unknown as Db,

  async connect(): Promise<void> {
    const url = "mongodb://127.0.0.1:27017/React-CRUD-Ts-Clean'";
    const username = process.env.MONGODB_USERNAME;
    const password = process.env.MONGODB_PASSWORD;

    const client = new Mongo(url, { auth: { username, password } });
    const db = client.db("blogposts-db");

    this.client = client;
    this.db = db;

    console.log("connected to mongodb!");

  },
};
