import 'dotenv/config';
import * as http from 'http';
import logger from './utils/logger';

import studyLog from './app';
import { Express } from 'express';
import * as mongoose from 'mongoose';

export const stopServer = async (server: http.Server, db: typeof mongoose) => {
  server.close(); // 비동기이지 않나? 이렇게 두면 찝찝한데...
  await db.disconnect();
  process.exit();
};

export const runServer = async (app: Express) => {
  const port = process.env.PORT || '3000';
  const server = app.listen(port, () => {
    logger.info(`Node app is listening on port '${port}'`);
  }); // port 중복에 대한 에러 핸들링은 하지 않음

  try {
    await mongoose.connect('mongodb://localhost:27017/study_log', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('Connected to mongod server');
  } catch (e) {
    logger.error(e);
    stopServer(server, mongoose);
  }
};

runServer(studyLog);
