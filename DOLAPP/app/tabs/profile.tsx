import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "../../store/auth.store";

export default function Profile() {
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);

  const menuItems = [
    { title: "Мои дети", icon: "people-outline" },
    { title: "Уведомления", icon: "notifications-outline" },
    { title: "Поддержка", icon: "help-circle-outline" },
    { title: "О приложении", icon: "information-circle-outline" },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
      <ScrollView style={{ flex: 1 }}>
        {/* HEADER */}
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 16,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "700" }}>Профиль</Text>

          <Pressable style={{ position: "absolute", right: 16 }}>
            <Ionicons
              name="settings-outline"
              size={24}
              color={COLORS.primary}
            />
          </Pressable>
        </View>

        {/* USER CARD */}
        <View
          style={{
            backgroundColor: "white",
            marginHorizontal: 16,
            borderRadius: 24,
            padding: 20,
            alignItems: "center",
            gap: 8,
          }}
        >
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=12" }}
            style={{ width: 90, height: 90, borderRadius: 999 }}
          />

          <Text style={{ fontSize: 20, fontWeight: "700" }}>
            {user?.username}
          </Text>

          <Text style={{ color: "#666" }}>{user?.email}</Text>

          <Text style={{ color: "#999" }}>Родитель</Text>
        </View>

        {/* MENU */}
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 16,
            backgroundColor: "white",
            borderRadius: 24,
            overflow: "hidden",
          }}
        >
          {menuItems.map((item, index) => (
            <Pressable
              key={item.title}
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 16,
                gap: 12,
                borderBottomWidth: index === menuItems.length - 1 ? 0 : 1,
                borderBottomColor: "#F1F5F9",
              }}
            >
              {/* LEFT ICON */}
              <Ionicons name={item.icon as any} size={22} color="#64748B" />

              {/* TITLE */}
              <Text style={{ fontSize: 16, fontWeight: "500", flex: 1 }}>
                {item.title}
              </Text>

              {/* RIGHT ARROW */}
              <Ionicons
                name="chevron-forward-outline"
                size={18}
                color="#CBD5E1"
              />
            </Pressable>
          ))}
        </View>

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
      </ScrollView>
    </SafeAreaView>
  );
}
