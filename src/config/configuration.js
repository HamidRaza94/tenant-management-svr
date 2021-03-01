import { config } from 'dotenv';

config();

const envVars = process.env;

const configuration = Object.freeze({
  corsOrigin: (envVars.CORS_ORIGIN === undefined || envVars.CORS_ORIGIN === '')
    ? []
    : envVars.CORS_ORIGIN.split(',').map(cors => cors.trim()),
  env: envVars.NODE_ENV,
  port: envVars.PORT || 9000,
});

console.log('configuration =>', configuration);

export default configuration;
