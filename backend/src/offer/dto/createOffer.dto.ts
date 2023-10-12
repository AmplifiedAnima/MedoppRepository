import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { v4 as uuid } from 'uuid';

export class CreateOfferDto {
  id: string;

  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  company: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  salary: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  typeOfEmployment: string;

  @IsString()
  @IsNotEmpty()
  specialties: string;

  @IsNumber()
  latitude: number;

  @IsString()
  longitude: number;

  constructor(partial: Partial<CreateOfferDto>) {
    Object.assign(this, partial);
    this.id = uuid();
  }
}
