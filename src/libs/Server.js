import bodyParser from 'body-parser';
import compress from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import Express from 'express';
import helmet from 'helmet';
import { ApolloServer } from 'apollo-server-express';

import { errorHandlerRoute, notFoundRoute } from './routes';
import { badBody, corsNoResponse, invalidContentType, invalidGraphqlMethod } from '../middlewares';
// import {  } from '../services';
import { formatError } from '../utils/Helpers';

class Server {
  constructor(config) {
    this.config = config;
    this.app = new Express();
    this.run = this.run.bind(this);
  }

  get application() {
    return this.app;
  }

  /**
   * To enable all the setting on our express app
   * @returns -Instance of Current Object
   */
  bootstrap() {
    this.initHelmet();
    this.initSecurity();
    this.initCompress();
    this.initCookieParser();
    this.initCors();
    this.initJsonParser();

    return this;
  }

  /**
   * This will run the server at specified port after opening up of Database
   *
   * @returns -Instance of Current Object
   */
  run() {
    const { port, env } = this.config;

    const svr = this.app.listen(port || 9000, () => {
      // eslint-disable-next-line no-console
      console.info(`server started on port ${port} (${env})`);
    });

    this.server.installSubscriptionHandlers(svr);

    return this;
  }

  async setupApollo(data) {
    const { playground, introspection, debug } = this.config;

    this.app.use(invalidGraphqlMethod);
    // const auth = new Authenticate(authContextConfig);

    // const context = async (req, res) => {
    //   const date = new Date();
    //   const correlationId = date.getTime();
    //   logger.debug("In Context", correlationId);
    //   const authContext = await auth.authenticate(req, res);
    //   return { ...authContext, correlationId };
    // };

    this.server = new ApolloServer({
      ...data,
      playground,
      introspection,
      debug,
      formatError,
      // dataSources: () => ({}),
      // context,
    });

    this.server.applyMiddleware({ app: this.app, cors: false });
    this.run();

    return this;
  }

  /**
   * This will Setup all the routes in the system
   *
   * @returns -Instance of Current Object
   * @memberof Server
   */
  setupRoutes() {
    this.app.use('/health-check', (req, res) => {
      res.send('I am OK');
    });

    // catch 404 and forward to error handler
    this.app.use(notFoundRoute);

    // error handler, send stacktrace only during development
    this.app.use(errorHandlerRoute(['dev', 'test'].includes(this.config.env)));
  }

  /**
   * Compression of the output
   */
  initCompress() {
    this.app.use(compress());
  }

  initSecurity() {
    this.app.use((req, res, next) => {
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Cache-Control', 'no-store, no-cache');
      next();
    })
  }

  /**
   * Parse Cookie header and populate req.cookies with an object keyed by the cookie names
   */
  initCookieParser() {
    this.app.use(cookieParser());
  }

  /**
   *
   * Lets you to enable cors
   */
  initCors() {
    // const corsOptions = {
    //   methods: 'GET,POST,OPTIONS',
    //   origin: (origin, callback) => {
    //     if (this.config.corsOrigin.indexOf(origin) !== -1) {
    //       callback(null, origin);
    //     } else {
    //       callback(new Error('Not allowed by CORS'))
    //     }
    //   },
    //   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    // }

    // this.app.use(cors(corsOptions));
    // this.app.use(corsNoResponse)
  }

  /**
   *
   * Helmet helps you secure your Express apps by setting various HTTP headers.
   */
  initHelmet() {
    this.app.use(helmet());
  }

  /**
   *  - Parses urlencoded bodies & JSON
   */
  initJsonParser() {
    // Handle invalid content type. Allows only application/json
    this.app.use(invalidContentType);

    // Body Parser
    this.app.use(bodyParser.json({
      limit: '50mb',
    }));

    this.app.use(bodyParser.urlencoded({
      extended: true,
      limit: '50mb',
      parameterLimit: 100000,
    }));

    // Handle invalid JSON body
    this.app.use(badBody);
  }
}

export default Server;
