import '@babel/polyfill';
import path from 'path';
import { makeExecutableSchema, mergeSchemas } from 'apollo-server';

import { config } from './config';
import * as modules from './modules';
import { Server, loadGQLFiles, mergeResolvers } from './libs';

const typeDefs = loadGQLFiles(path.resolve(__dirname, './**/*.graphql'));
const resolvers = mergeResolvers(modules);

const server = new Server(config);

const initServer = () => {
  server
    .bootstrap()
    .setupApollo({
      schema: mergeSchemas({
        schemas: [makeExecutableSchema({ typeDefs, resolvers })],
      }),
    });

  server.setupRoutes();
}

initServer();

export default server;
