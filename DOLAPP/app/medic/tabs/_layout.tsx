import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function MedicTabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: "red" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Главная",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="medical" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="alerts"
        options={{
          title: "Тревоги",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="warning" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="temperature"
        options={{
          title: "Температура",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="thermometer" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Профиль",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-nurse" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
