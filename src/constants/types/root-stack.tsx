import { Court } from "./court";

export type RootStackParamList = {
  Home: undefined;
  CourtDetail: {
    court: Court;
  };
};
