import { useAuthStore } from "@/store/auth.store";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

export default function MedicProfile() {
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "800" }}>Профиль медика</Text>
      {user && (
        <Text style={{ marginTop: 8, fontSize: 16, color: "#555" }}>
          {user.email || "medic@example.com"}
        </Text>
      )}
      <Pressable
        onPress={logout}
        style={{
          marginTop: 20,
          backgroundColor: "#DC2626",
          padding: 14,
          borderRadius: 14,
          flexDirection: "row",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <Ionicons name="log-out" size={20} color="white" />
        <Text style={{ color: "white", fontWeight: "700" }}>Выйти</Text>
      </Pressable>
    </View>
  );
}
