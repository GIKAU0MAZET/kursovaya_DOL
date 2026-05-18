import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "../../store/auth.store";

export default function Profile() {
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "800",
          textAlign: "center",
          marginTop: 10,
          marginBottom: 12,
        }}
      >
        Профиль
      </Text>
      <Text>{user?.username}</Text>
      <Text>{user?.email}</Text>
      <Button title="Logout" onPress={logout} />
    </SafeAreaView>
  );
}
