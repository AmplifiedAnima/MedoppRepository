import { IsString, IsNotEmpty } from 'class-validator';
import { Buffer } from 'buffer';

export class CreateJobApplicationDto {
  id: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  coverLetter: string;

  cvFileBuffer: Buffer; // Store the file data as Buffer

  cvFileName: string
  
  cvFilePath: string; // Add the cvFilePath property here

  userId: string;
  
  offerId: string;
}
