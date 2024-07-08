export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  UserProfile: undefined;
  Splack: undefined;
  ConfirmSingleDayBooking: {
    fullName: string;
    phoneNumber: string;
    courtId: number;
    courtName: string;
    dayBooking: string;
    courtAddress: string;
    fromTime: string;
    toTime: string;
    totalHours: number;
    totalPrice: any;
  };
  ConfirmFixedBooking: {
    fullName: string;
    phoneNumber: string;
    courtId: number;
    courtName: string;
    courtAddress: string;
    month: number;
    year: number;
    weekdays: string[];
    fromTime: string;
    toTime: string;
    totalHours: number;
    totalPrice: any;
  };
  CourtDetail: {
    courtId: number;
    onSuccess: () => void;
  };
  FixedSchedule: {
    courtId: number;
  };
  SingleDayBooking: { courtId: number };
  FlexibleSchedule: { courtId: number };
  AddNewCourt: { onSuccess: () => void };
};
