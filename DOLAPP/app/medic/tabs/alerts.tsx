import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalAlerts } from "./index";

export default function AlertsScreen() {
  const [alerts, setAlerts] = useState(globalAlerts);

  useEffect(() => {
    const interval = setInterval(() => {
      setAlerts([...globalAlerts]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F5F5", padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "800", marginBottom: 16 }}>
        🚨 Тревоги ({">"}37.5°C)
      </Text>
      {alerts.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 50, color: "#666" }}>
          Нет тревог
        </Text>
      ) : (
        <FlatList
          data={alerts}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: "#FFE5E5",
                borderRadius: 12,
                padding: 12,
                marginBottom: 10,
                borderLeftWidth: 5,
                borderLeftColor: "red",
              }}
            >
              <Text style={{ fontWeight: "700" }}>{item.childName}</Text>
              <Text style={{ color: "red", marginTop: 4 }}>
                🌡️ {item.temp}°C
              </Text>
              <Text style={{ color: "#666", fontSize: 12, marginTop: 4 }}>
                🕒 {item.time}
              </Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}
