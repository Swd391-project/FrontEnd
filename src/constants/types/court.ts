import { WeekdayActivity } from "./weekday-activity";

export type Court = {
  id: number;
  name: string;
  address: string;
  status: string;
  price: number;
  rate: number;
  ["profile-image"]: string;
  ["cover-image"]: string;
  ["start-time"]: string;
  ["end-time"]: string;
  ["weekday-activities"]: WeekdayActivity[];
};
