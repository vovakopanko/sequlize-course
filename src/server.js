import './config';
import Database from './database';
import environment from './config/evironment';
import dbCofig from './config/database';
(async () => {
  try {
    const db = new Database(environment.nodeEnv, dbCofig);
    db.connect();
  } catch (err) {
    console.log('Smth went wrong when initializing the server:\n', err.stack);
  }
})();
