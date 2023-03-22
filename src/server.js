import './config';
import Database from './database';
import environment from './config/environment';
import dbCofig from './config/database';

(async () => {
  try {
    const db = new Database(environment.nodeEnv, dbCofig);
    db.connect();
  } catch (err) {
    console.error('Smth went wrong when initializing the server:\n', err.stack);
  }
})();
