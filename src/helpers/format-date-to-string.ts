export const formatDateToString = (date: Date) => {
  return date.toISOString().split("T")[0];
};
