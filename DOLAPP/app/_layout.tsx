import { setLogoutHandler } from "@/services/api";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { useAuthStore } from "../store/auth.store";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const hydrateAuth = useAuthStore((state) => state.hydrateAuth);
  const logout = useAuthStore((s) => s.logout);

  // 🔄 при старте приложения
  useEffect(() => {
    hydrateAuth();
  }, []);

  // 🚪 логика редиректа
  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "auth";

    // если НЕ авторизован → отправляем в login
    if (!isAuthenticated && !inAuthGroup) {
      router.replace("/auth/login");
      return;
    }

    // если авторизован → отправляем в tabs
    if (isAuthenticated && inAuthGroup) {
      router.replace("/tabs");
      return;
    }
  }, [isAuthenticated, isLoading, segments, router]);

  useEffect(() => {
    setLogoutHandler(logout);
  }, []);

  // ⏳ загрузка приложения
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
