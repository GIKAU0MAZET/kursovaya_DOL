import { Image, Pressable, Text, View } from "react-native";

import { COLORS, RADIUS, SHADOWS, SPACING } from "@/constants/theme";
import { router } from "expo-router";

type Props = {
  child: {
    id: number;
    first_name: string;
    last_name: string;
    group_name: string;
    photo?: string | null;
    status?: string;
  };
};

export default function ChildHeroCard({ child }: Props) {
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/children/[id]",
          params: { id: child.id.toString() },
        })
      }
      style={{
        backgroundColor: COLORS.primary,

        borderRadius: RADIUS.lg,

        padding: SPACING.lg,

        ...SHADOWS.card,
      }}
    >
      <View
        style={{
          flexDirection: "row",

          gap: SPACING.md,
        }}
      >
        {child.photo ? (
          <Image
            source={{
              uri: child.photo,
            }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
            }}
          />
        ) : (
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,

              backgroundColor: "rgba(255,255,255,0.25)",

              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 28,
                fontWeight: "700",
              }}
            >
              {child.first_name?.[0]}
            </Text>
          </View>
        )}

        <View
          style={{
            justifyContent: "center",

            gap: 6,
          }}
        >
          <Text
            style={{
              color: "white",

              fontSize: 22,

              fontWeight: "700",
            }}
          >
            {child.first_name} {child.last_name}
          </Text>

          <Text
            style={{
              color: "rgba(255,255,255,0.9)",

              fontSize: 16,
            }}
          >
            {child.group_name}
          </Text>

          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",

              paddingHorizontal: 10,

              paddingVertical: 6,

              borderRadius: 999,

              alignSelf: "flex-start",
            }}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              В лагере
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
