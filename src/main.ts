import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 开启跨域
  app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
  }));

  // session
  app.use(
    session({
      secret: 'gonggong',
      cookie: {
        maxAge: 60000
      }
    })
  )
  await app.listen(3000);
}
bootstrap();

