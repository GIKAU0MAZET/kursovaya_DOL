import { Text, TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "@/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeHeader() {
  return (
    <SafeAreaView
      style={{
        flexDirection: "row",

        justifyContent: "space-between",

        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 28,

          fontWeight: "700",

          color: COLORS.text,
        }}
      >
        Главная
      </Text>

      <TouchableOpacity>
        <Ionicons
          name="notifications-outline"
          size={28}
          color={COLORS.primary}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
