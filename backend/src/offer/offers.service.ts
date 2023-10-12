import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Offer } from './offer.entity';
import { CreateOfferDto } from './dto/createOffer.dto';
import { User } from 'src/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateOfferDto } from './dto/updateOfferDto';

export default interface FilterOptions {
  minPrice: string;
  maxPrice: string;
  location: string;
  typeOfEmployment: string;
  query: string;
  specialties: string;
}

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offersRepository: Repository<Offer>,
  ) {}

  async getAllOffers(): Promise<Offer[]> {
    return this.offersRepository.find();
  }

  async getFilteredOffers(filterOptions: FilterOptions): Promise<Offer[]> {
    const {
      typeOfEmployment,
      location,
      minPrice,
      maxPrice,
      query,
      specialties,
    } = filterOptions;

    const queryBuilder = this.offersRepository.createQueryBuilder('offer');

    if (typeOfEmployment) {
      queryBuilder.andWhere(
        'LOWER(offer.typeOfEmployment) LIKE LOWER(:typeOfEmployment)',
        {
          typeOfEmployment: `%${typeOfEmployment}%`,
        },
      );
    }

    if (location) {
      queryBuilder.andWhere('offer.location ILIKE :location', {
        location: `%${location}%`,
      });
    }

    if (minPrice && maxPrice) {
      queryBuilder.andWhere(
        'CAST(offer.salary AS INTEGER) BETWEEN :minPrice AND :maxPrice',
        { minPrice: parseInt(minPrice), maxPrice: parseInt(maxPrice) },
      );
    }

    if (specialties) {
      queryBuilder.andWhere(
        'LOWER(offer.specialties) LIKE LOWER(:specialties)',
        {
          specialties: `%${specialties}%`,
        },
      );
    }

    if (query) {
      queryBuilder.andWhere(
        '(offer.title ILIKE :query OR offer.description ILIKE :query OR offer.specialties ILIKE :query OR offer.typeOfEmployment ILIKE :query OR offer.location ILIKE :query OR offer.company ILIKE :query OR offer.salary ILIKE :query)',
        { query: `%${query}%` },
      );
    }

    return queryBuilder.getMany();
  }

  async getOfferById(id: string): Promise<Offer> {
    return this.offersRepository.findOne({ where: { id } });
  }

  async createOffer(
    createOfferDto: CreateOfferDto,
    user: User,
  ): Promise<Offer> {
    const newOffer = this.offersRepository.create({
      ...createOfferDto,
      user,
    });
    await this.offersRepository.save(newOffer);
    return newOffer;
  }

  async updateOffer(
    id: string,
    updateOfferDto: UpdateOfferDto,
    user: User,
  ): Promise<Offer> {
    // Retrieve the offer from the database
    const offer = await this.getOfferById(id);

    // Update the offer properties with the values from the DTO

    // Save the updated offer
    const updatedOffer = this.offersRepository.create({
      ...updateOfferDto,
      user,
    });
    await this.offersRepository.save(updatedOffer);
    return updatedOffer;
  }

  async deleteOffer(id: string, user: User): Promise<void> {
    // Check if the offer with the given ID exists
    const offer = await this.getOfferById(id);
    if (!offer) {
      throw new NotFoundException('Offer not found');
    }
    // If the user is authorized, delete the offer
    await this.offersRepository.remove(offer);
  }
}
