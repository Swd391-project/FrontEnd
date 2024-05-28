import { Court } from "./court";

export type RootStackParamList = {
  Home: undefined;
  Account: undefined;
  UserProfile: undefined;
  CourtDetail: {
    court: Court;
  };
  UserBooking: { court: Court };
};
