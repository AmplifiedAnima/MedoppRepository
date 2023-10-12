import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  Patch,
  Query,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
  Delete,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { Offer } from './offer.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateOfferDto } from './dto/createOffer.dto';
import { RequestWithUser } from 'src/user/user.interface';
import { UpdateOfferDto } from './dto/updateOfferDto';
import FilterOptions from './offers.service'; // Import the FilterOptions interface
import RoleGuard from 'src/auth/role.guard';
import Role from 'src/user/role.enum';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Get()
  async getAllOffers(@Query() queryParams: FilterOptions): Promise<Offer[]> {
    if (queryParams) {
      // Call your service method with the query parameters
      return this.offersService.getFilteredOffers(queryParams);
    } else {
      // Call your service method to fetch all offers
      return this.offersService.getAllOffers();
    }
  }

  @Get(':id')
  async getOfferById(@Param('id') id: string): Promise<Offer> {
    return this.offersService.getOfferById(id);
  }

  @UseGuards(RoleGuard(Role.Employer))
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createOffer(
    @Body() createOfferDto: CreateOfferDto,
    @Request() request: RequestWithUser,
  ): Promise<Offer> {
    if (
      !createOfferDto.title ||
      !createOfferDto.company ||
      !createOfferDto.salary ||
      !createOfferDto.typeOfEmployment ||
      !createOfferDto.location ||
      !createOfferDto.label ||
      !createOfferDto.specialties
    ) {
      throw new BadRequestException('All fields are required.');
    }
    return this.offersService.createOffer(createOfferDto, request.user);
  }

  @UseGuards(RoleGuard(Role.Employer))
  @Patch(':id')
  async updateOffer(
    @Param('id') id: string,
    @Body() updateOfferDto: UpdateOfferDto,
    @Request() request: RequestWithUser,
  ): Promise<Offer> {
    return this.offersService.updateOffer(id, updateOfferDto, request.user);
  }

  @UseGuards(RoleGuard(Role.Employer))
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id') // Define a new route for deleting an offer by its ID
  async deleteOffer(
    @Param('id') id: string,
    @Request() request: RequestWithUser,
  ): Promise<void> {
    const offer = await this.offersService.getOfferById(id);

    if (!offer) {
      throw new NotFoundException('Offer not found');
    }

    await this.offersService.deleteOffer(id, request.user);
  }
}
