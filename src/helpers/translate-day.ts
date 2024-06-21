export function getVietnameseDay(day: string): string {
  switch (day) {
    case "Monday":
      return "Thứ Hai";
    case "Tuesday":
      return "Thứ Ba";
    case "Wednesday":
      return "Thứ Tư";
    case "Thursday":
      return "Thứ Năm";
    case "Friday":
      return "Thứ Sáu";
    case "Saturday":
      return "Thứ Bảy";
    case "Sunday":
      return "Chủ Nhật";
    default:
      return day;
  }
}
