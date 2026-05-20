import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function EducatorTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "green",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Главная",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="attendance"
        options={{
          title: "Посещаемость",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="clipboard-check" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="photos"
        options={{
          title: "Фото",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="camera" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Профиль",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
