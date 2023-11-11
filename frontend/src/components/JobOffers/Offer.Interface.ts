export interface OfferInterface {
  id: string;
  label: string;
  title: string;
  company: string;
  location: string;
  salary: string | number;
  description: string;
  specialties: string;
  latitude: number;
  longitude: number;
  typeOfEmployment: string;
}
