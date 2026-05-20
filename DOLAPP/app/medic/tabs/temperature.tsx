import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    ScrollView,
    Text,
    View,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";

type TempRecord = {
  id: string;
  childId: number;
  value: number;
  timestamp: string;
  note?: string;
};

const STORAGE_TEMPS = "medic_temperatures";

export default function TemperatureScreen() {
  const { childId, name } = useLocalSearchParams<{
    childId: string;
    name: string;
  }>();
  const [temperatures, setTemperatures] = useState<TempRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTemps = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_TEMPS);
      const allTemps: TempRecord[] = stored ? JSON.parse(stored) : [];
      const filtered = allTemps.filter((t) => t.childId === parseInt(childId));
      // сортируем по времени (старые -> новые для графика)
      filtered.sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
      );
      setTemperatures(filtered);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadTemps();
    }, [childId]),
  );

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  const screenWidth = Dimensions.get("window").width - 32;

  // Подготовка данных для графика
  const labels = temperatures.map((t) => {
    const date = new Date(t.timestamp);
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;
  });
  const data = temperatures.map((t) => t.value);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#F5F5F5", padding: 16 }}>
      <SafeAreaView>
        <Text style={{ fontSize: 22, fontWeight: "800", marginBottom: 8 }}>
          Температурный лист: {name}
        </Text>
        {temperatures.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 40, color: "#666" }}>
            Нет записей температуры. Добавьте через главный экран.
          </Text>
        ) : (
          <>
            {/* ГРАФИК */}
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 16,
                padding: 12,
                marginBottom: 20,
              }}
            >
              <LineChart
                data={{ labels, datasets: [{ data, color: () => "red" }] }}
                width={screenWidth}
                height={220}
                chartConfig={{
                  backgroundColor: "white",
                  backgroundGradientFrom: "white",
                  backgroundGradientTo: "white",
                  decimalPlaces: 1,
                  color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                  labelColor: () => "#333",
                  style: { borderRadius: 16 },
                  propsForDots: { r: "5", strokeWidth: "2", stroke: "red" },
                }}
                bezier
                style={{ borderRadius: 16 }}
              />
            </View>

            {/* ТАБЛИЦА */}
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 16,
                padding: 12,
              }}
            >
              <Text
                style={{ fontSize: 18, fontWeight: "700", marginBottom: 12 }}
              >
                📋 История измерений
              </Text>
              {temperatures.map((item, idx) => (
                <View
                  key={item.id}
                  style={{
                    marginBottom: 12,
                    borderBottomWidth:
                      idx !== temperatures.length - 1 ? 0.5 : 0,
                    borderBottomColor: "#ddd",
                    paddingBottom: 8,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ fontWeight: "500" }}>
                      {new Date(item.timestamp).toLocaleString()}
                    </Text>
                    <Text
                      style={{
                        color: item.value > 37.5 ? "red" : "black",
                        fontWeight: "bold",
                      }}
                    >
                      {item.value} °C
                    </Text>
                  </View>
                  {item.note && (
                    <Text style={{ marginTop: 4, color: "#555", fontSize: 12 }}>
                      📝 {item.note}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          </>
        )}
      </SafeAreaView>
    </ScrollView>
  );
}
