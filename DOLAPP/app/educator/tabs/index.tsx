// app/(educator)/tabs/index.tsx

import { useAuthStore } from "@/store/auth.store";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EducatorHome() {
  const logout = useAuthStore((s) => s.logout);

  return (
    <SafeAreaView>
      <Text>EDUCATOR SCREEN</Text>
      {/* LOGOUT */}
      <Pressable
        onPress={logout}
        style={{
          marginTop: 20,
          marginHorizontal: 16,
          backgroundColor: "white",
          borderRadius: 24,
          padding: 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <Ionicons name="log-out-outline" size={22} color="#EF4444" />

        <Text style={{ color: "#EF4444", fontWeight: "600" }}>Выйти</Text>
      </Pressable>
    </SafeAreaView>
  );
}
