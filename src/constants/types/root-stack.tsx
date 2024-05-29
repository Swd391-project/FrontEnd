import { Court } from "./court";

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  UserProfile: undefined;
  CourtDetail: {
    court: Court;
  };
  UserBooking: { court: Court };
};
