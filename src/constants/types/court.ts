import { Yard } from "./yard";

export type Court = {
  name: string;
  location: string;
  status: string;
  price: number;
  rating: number;
  phone: string;
  numberOfYard: Yard[];
};
