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
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    OfferModule,
    MulterModule,
    ConfigModule.forRoot({isGlobal: true}),
    JobApplicationModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'czupa',
      password: 'razielInTheShell',
      database: 'MedOppDatabase',
      entities: [User, Offer, JobApplication],
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
