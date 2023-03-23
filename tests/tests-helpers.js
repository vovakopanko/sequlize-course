import '../src/config';
import DataBase from '../src/database';
import dbConfig from '../src/config/database';

let db;

export default class TestsHelpers {
  static async startDb() {
    db = new DataBase('test', dbConfig);
    await db.connect();
    return db;
  }
  static async stopDb() {
    await db.disconnect();
  }
  static async syncDb() {
    //reser DB, every connection to server, we clear all table on DB
    await db.sync();
  }
}
