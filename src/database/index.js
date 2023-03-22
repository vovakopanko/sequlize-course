import cls from 'cls-hooked';
import { Sequelize } from 'sequelize';
import { registerModels } from '../models';

export default class DataBase {
  constructor(enviroment, dbConfig) {
    this.enviroment = enviroment;
    this.dbConfig = dbConfig;
    this.isTestEnviroment = this.enviroment === 'test';
  }
  async connect() {
    const namespace = cls.createNamespace('transactions-namespace');
    Sequelize.useCLS(namespace);

    const { username, password, host, port, database, dialect } =
      this.dbConfig[this.enviroment];
    this.connection = new Sequelize({
      username,
      password,
      host,
      port,
      database,
      dialect,
      logging: this.isTestEnviroment ? false : console.log,
    });
    await this.connection.authenticate({ logging: false });

    if (!this.isTestEnviroment) {
      console.log(
        'Connection to the database has been established successfuly'
      );
    }
registerModels(this.connection)

    await this.sync();
  }
  async disconnect() {
    await this.connection.close();
  }
  async sync() {
    await this.connection.sync({
      logging: false, // Explain this position
      force: this.isTestEnviroment,
    });

    if (!this.isTestEnviroment) {
      console.log('Connection synced successful');
    }
  }
}