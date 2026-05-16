import { Text, View } from "react-native";

import { Child } from "../../types/children.types";

type Props = {
  child: Child;
};

export default function ChildCard({ child }: Props) {
  return (
    <View
      style={{
        backgroundColor: "white",

        padding: 20,

        borderRadius: 20,

        gap: 6,

        shadowColor: "#000",

        shadowOpacity: 0.1,

        shadowRadius: 6,

        elevation: 3,
      }}
    >
      <View
        style={{
          width: 60,
          height: 60,

          borderRadius: 30,

          backgroundColor: "#4F46E5",

          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 24,
            fontWeight: "700",
          }}
        >
          {child.first_name[0]}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "700",
        }}
      >
        {child.first_name} {child.last_name}
      </Text>

      <Text
        style={{
          color: "#666",
          fontSize: 16,
        }}
      >
        {child.group_name}
      </Text>
    </View>
  );
}
