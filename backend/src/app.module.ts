import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OfferModule } from './offer/offers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';
import { Offer } from './offer/offer.entity';
import { JobApplicationModule } from './jobApplication/jobApplication.module';
import JobApplication from './jobApplication/jobApplication.entity';
import { MulterModule } from '@nestjs/platform-express'; // Import MulterModule
// import { FileUploadModule } from './fileUploadModule';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    OfferModule,
    MulterModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    JobApplicationModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: Number(process.env.port),
      username: process.env. medOppUsername,
      password: process.env.medOpPass,
      database: process.env.MedOpDb,
      entities: [User, Offer, JobApplication],
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
