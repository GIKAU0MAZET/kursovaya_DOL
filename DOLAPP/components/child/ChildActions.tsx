import { Ionicons } from "@expo/vector-icons";

import { Pressable, Text, View } from "react-native";

const actions = [
  {
    title: "Дневник",
    icon: "book-outline",
  },
  {
    title: "Достижения",
    icon: "trophy-outline",
  },
];

export default function ChildActions() {
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        marginTop: 20,
        gap: 12,
      }}
    >
      {actions.map((item) => (
        <Pressable
          key={item.title}
          style={{
            width: "48%",
            backgroundColor: "white",
            borderRadius: 20,
            paddingVertical: 24,
            alignItems: "center",
            gap: 10,

            shadowColor: "#000",
            shadowOpacity: 0.06,
            shadowRadius: 6,
            elevation: 3,
          }}
        >
          <Ionicons name={item.icon as any} size={28} color="#22C55E" />

          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            {item.title}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
