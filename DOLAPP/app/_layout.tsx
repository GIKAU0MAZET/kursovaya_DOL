import { useAuthStore } from "@/store/auth.store";
import { UserRole } from "@/types/user.types";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  const roleRoutes: Record<UserRole, any> = {
    parent: "/parent/tabs",
    educator: "/educator/tabs",
    medic: "/medic/tabs",
  };

  useEffect(() => {
    if (isLoading) return;

    const inAuth = segments[0] === "auth";

    if (!isAuthenticated && !inAuth) {
      router.replace("/auth/login");
      return;
    }

    if (isAuthenticated && user) {
      if (segments[0] === "auth") {
        router.replace(roleRoutes[user.role]);
      }
    }
  }, [isAuthenticated, user, segments]);

  return <Stack screenOptions={{ headerShown: false }} />;
}
