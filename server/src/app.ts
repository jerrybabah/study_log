import * as path from 'path';
import logger from './utils/logger';
import config from './config';

// express와 미들웨어 임포트
import * as express from 'express';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as cookieParser from 'cookie-parser';
// import * as session from 'express-session';

// 테스트에 유용하게 하기 위해 함수로 만들어 두고 export 시킴
export const createApp = () => {
  logger.info(config.get('test'));

  const app = express();

  app.use(cors()); // 개발환경에 따라 설정 다르게 하기
  app.use(morgan('dev')); // 개밯환경에 따라 설정 다르게 하기
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  // 세션 설정 추가 레디스? 몽고디비?

  app.get('/', (req, res) => {
    res.send('hello world');
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  }); // vue로 개발할 때 사용하던 connect-history-api-fallback 필요 없나?

  return app;
};

export default createApp();
