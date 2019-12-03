import * as path from 'path';
import * as winston from 'winston';
import { Format } from 'logform';
import * as Transport from 'winston-transport';

const level: string = 'info';

let format: Format;
if (process.env.NODE_ENV === 'production') {
  format = winston.format.json(); // 배포환경에서의 로그 포맷을 필요에 맞게 커스텀 해야 할 듯
} else {
  format = winston.format.simple();
}

let transports: Transport[];
if (process.env.NODE_ENV === 'production') {
  transports = [
    new winston.transports.File({
      filename: path.join(`${__dirname}/..`, 'file.log'),
    }), // 로그의 양이 많아지면 rotation log 방식으로 바꿔야 함.
  ];
} else {
  transports = [
    new winston.transports.Console(),
  ];
}

const logger = winston.createLogger({
  level,
  format,
  transports,
});

export default logger;
