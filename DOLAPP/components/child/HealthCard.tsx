import { Text, View } from "react-native";

type Props = {
  temperature: number;
  condition: string;
  clinicVisits: number;
};

export default function HealthCard({
  temperature,
  condition,
  clinicVisits,
}: Props) {
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
        gap: 14,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 16, color: "#666" }}>Температура</Text>
        <Text style={{ fontSize: 16, fontWeight: "700" }}>{temperature}°C</Text>
      </View>

      <View style={{ height: 1, backgroundColor: "#E5E7EB" }} />

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 16, color: "#666" }}>Самочувствие</Text>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>{condition}</Text>
      </View>

      <View style={{ height: 1, backgroundColor: "#E5E7EB" }} />

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 16, color: "#666" }}>Посещение медпункта</Text>
        <Text style={{ fontSize: 16, fontWeight: "700", color: "#22C55E" }}>
          {clinicVisits}
        </Text>
      </View>
    </View>
  );
}
