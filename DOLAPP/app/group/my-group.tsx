import { educatorService } from "@/services/educator.service";
import { Child } from "@/types/children.types";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// type Child = {
//   id: number;
//   first_name: string;
//   last_name: string;
// };

export default function MyGroupScreen() {
  const [children, setChildren] = useState<Child[]>([]);

  useEffect(() => {
    loadGroup();
  }, []);

  const loadGroup = async () => {
    try {
      const data = await educatorService.getMyGroup();
      setChildren(data);
    } catch (e) {
      console.log("MY GROUP ERROR:", e);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
      {/* HEADER */}
      <Text
        style={{
          fontSize: 22,
          fontWeight: "700",
          padding: 16,
        }}
      >
        Мой отряд
      </Text>

      {/* LIST */}
      <FlatList
        data={children}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "white",
              padding: 14,
              borderRadius: 16,
              marginBottom: 12,
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
            }}
          >
            <Image
              source={{ uri: item.photo || "https://i.pravatar.cc/150" }}
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
              }}
            />

            <View>
              <Text style={{ fontSize: 16, fontWeight: "600" }}>
                {item.first_name} {item.last_name}
              </Text>

              <Text style={{ color: "#777", marginTop: 2 }}>
                Участник отряда
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
