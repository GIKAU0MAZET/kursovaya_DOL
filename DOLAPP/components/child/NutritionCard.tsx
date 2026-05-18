import { Text, View } from "react-native";

export default function NutritionCard() {
  return (
    <View
      style={{
        backgroundColor: "white",
        marginHorizontal: 16,
        borderRadius: 24,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 3,
        gap: 10,
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "600" }}>
        Завтрак: каша, чай
      </Text>

      <Text style={{ fontSize: 16, fontWeight: "600" }}>
        Обед: суп, курица с гарниром
      </Text>

      <Text style={{ fontSize: 16, fontWeight: "600" }}>
        Ужин: макароны, салат
      </Text>
    </View>
  );
}
