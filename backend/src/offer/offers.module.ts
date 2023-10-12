import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './offer.entity';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Offer]), AuthModule],
  controllers: [OffersController],
  providers: [OffersService],
})
export class OfferModule {}
