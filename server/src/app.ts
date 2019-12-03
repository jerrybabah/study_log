import * as path from 'path';
import * as http from 'http';
import logger from './utils/logger';

// express와 미들웨어 임포트
import * as express from 'express';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as cookieParser from 'cookie-parser';
// import * as session from 'express-session';

import * as mongoose from 'mongoose';

const createApp = () => {
  const app = express();

  app.use(cors()); // 개밯환경에 따라 설정 다르게 하기
  app.use(morgan('dev')); // 개밯환경에 따라 설정 다르게 하기
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  // 세션 설정 추가

  app.get('/', (req, res) => {
    res.send('hello world');
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  }); // vue로 개발할 때 사용하던 connect-history-api-fallback 필요 없나?

  return app;
};

const stopServer = async (server: http.Server, db: typeof mongoose) => {
  server.close(); // 비동기이지 않나? 이렇게 두면 찝찝한데...
  await db.disconnect();
  process.exit();
};

const runServer = async (app: express.Express) => {
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

const studyLog = createApp();
runServer(studyLog);
