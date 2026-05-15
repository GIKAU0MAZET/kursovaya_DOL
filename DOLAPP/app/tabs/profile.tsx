import { Button, Text, View } from "react-native";
import { useAuthStore } from "../../store/auth.store";

export default function Profile() {
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);

  return (
    <View>
      <Text>{user?.username}</Text>
      {/* <Text>{user?.email}</Text> */}
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
