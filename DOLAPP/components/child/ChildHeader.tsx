import { Ionicons } from "@expo/vector-icons";

import { router } from "expo-router";

import { Pressable, Text, View } from "react-native";

type Props = {
  name: string;
};

export default function ChildHeader({ name }: Props) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingTop: 60,
        paddingBottom: 20,
        backgroundColor: "#F5F5F5",
      }}
    >
      {/* BACK */}
      <Pressable onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </Pressable>

      {/* TITLE */}
      <Text
        style={{
          fontSize: 20,
          fontWeight: "700",
        }}
      >
        {name}
      </Text>

      {/* MENU */}
      <Pressable>
        <Ionicons name="ellipsis-horizontal" size={24} color="black" />
      </Pressable>
    </View>
  );
}
