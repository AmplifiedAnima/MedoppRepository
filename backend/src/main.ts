import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import RoleGuard from './auth/role.guard';
import { Reflector } from '@nestjs/core'; // Import Reflector
import { findSourceMap } from 'module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const reflector = app.get(Reflector);

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
