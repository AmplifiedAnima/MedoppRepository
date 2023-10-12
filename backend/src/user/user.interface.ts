import { Request } from 'express';
import { Offer } from 'src/offer/offer.entity';
import Role from './role.enum';

export interface User {
  id: string;
  username: string;
  password: string;
  roles: Role[];
  offers: Offer[];
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  city: string;
  cv: string | null;
}

export interface RequestWithUser extends Request {
  user: User;
}
