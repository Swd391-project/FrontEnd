export const formatTime = (date: Date | undefined): string => {
  if (!date) return "";

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};

export const parseTimeStringToDate = (timeString: string): Date => {
  const [hours, minutes] = timeString.split(":").map(Number);
  const dateObject = new Date();
  dateObject.setHours(hours);
  dateObject.setMinutes(minutes);
  return dateObject;
};
