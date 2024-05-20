import { View } from "react-native";

import BadmintonCourtCard from "../components/card";

const badmintonCourts = [
  {
    name: "Sân Cầu Lông Phú Thọ",
    location: "221 Lý Thường Kiệt, Phường 15, Quận 11, TP. Hồ Chí Minh",
    rating: 4.5,
    status: "ok",
    phone: "+84 28 3855 3030",
    price: 1000000,
  },
  {
    name: "Sân Cầu Lông Tân Bình",
    location: "18 Hoàng Hoa Thám, Phường 12, Quận Tân Bình, TP. Hồ Chí Minh",
    rating: 4.3,
    status: "Không ok",
    phone: "+84 28 3811 1111",
    price: 1000000,
  },
];
const Home = () => {
  return (
    <View className="flex-1">
      {badmintonCourts.map((court, index) => (
        <BadmintonCourtCard key={index} court={court} />
      ))}
    </View>
  );
};
export default Home;
