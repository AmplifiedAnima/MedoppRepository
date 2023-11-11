import { OfferInterface } from "../../JobOffers/Offer.Interface";

export interface JobApplicationInterface {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    coverLetter: string;
    cvFilePath: string;
    offerId: string;
    offer?: OfferInterface;
  }