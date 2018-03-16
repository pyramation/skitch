import * as testing from 'skitch-testing';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

export const getConnection = async () => {
  var options = {
    template: process.env.PGTEMPLATE_DATABASE,
    prefix: 'app-db',
  };
  return await testing.getConnection(options);
};

export const closeConnection = async db => {
  await testing.closeConnection(db);
};
