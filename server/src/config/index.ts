process.env.NODE_CONFIG_DIR = __dirname;

import * as config from 'config';

export default config;

export interface ISessionConfig {
  secret?: string;
  resave: boolean;
  saveUninitialized: boolean;
}

export interface IEvernoteConfig {
  consumerKey?: string;
  consumerSecret?: string;
  sandbox: boolean;
  callbackPath: string;
  notebookName: string;
  notesNum: number;
  specOption: {
    includeTitle: boolean;
    includeCreated: boolean;
    includeUpdated: boolean;
    includeTagGuids: boolean;
  };
}

export interface IMongodbConfig {
  url: string;
  options: {
    useNewUrlParser: boolean;
    useUnifiedTopology: boolean;
    dbName?: string;
    user?: string;
    pass?: string;
  };
}

export interface IRedisConfig {
  host?: string;
  port?: string;
  pass?: string;
}
