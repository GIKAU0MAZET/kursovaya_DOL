import { Button, View } from "react-native";
import { useAuthStore } from "../../store/auth.store";

export default function Register() {
  const register = useAuthStore((s) => s.register);

  return (
    <View>
      <Button
        title="Register"
        onPress={() => register("test@test.com", "12345678", "maksick")}
      />
    </View>
  );
}
