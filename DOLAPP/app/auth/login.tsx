import { Button, View } from "react-native";
import { useAuthStore } from "../../store/auth.store";

export default function Login() {
  const login = useAuthStore((s) => s.login);

  return (
    <View>
      <Button
        title="Login"
        onPress={() => login("test@test.com", "12345678")}
      />
    </View>
  );
}
