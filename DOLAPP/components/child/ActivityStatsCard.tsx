import { Text, View } from "react-native";

type Props = {
  attended: number;
  total: number;
  activity: number;
};

export default function ActivityStatsCard({
  attended,
  total,
  activity,
}: Props) {
  const percent = Math.round((attended / total) * 100);

  return (
    <View
      style={{
        backgroundColor: "white",
        marginHorizontal: 16,
        borderRadius: 24,
        padding: 20,

        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 3,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {/* LEFT */}
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: "700",
            }}
          >
            {attended}/{total}
          </Text>

          <Text
            style={{
              color: "#666",
              marginTop: 6,
            }}
          >
            Мероприятий
          </Text>

          {/* PROGRESS */}
          <View
            style={{
              width: "100%",
              height: 8,
              backgroundColor: "#E5E7EB",
              borderRadius: 999,
              marginTop: 14,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                width: `${percent}%`,
                height: "100%",
                backgroundColor: "#22C55E",
              }}
            />
          </View>
        </View>

        {/* DIVIDER */}
        <View
          style={{
            width: 1,
            height: 100,
            backgroundColor: "#E5E7EB",
            marginHorizontal: 20,
          }}
        />

        {/* RIGHT */}
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 40,
              fontWeight: "700",
              color: "#22C55E",
            }}
          >
            {activity}
          </Text>

          <Text
            style={{
              color: "#666",
              marginTop: 6,
            }}
          >
            Активность
          </Text>

          <Text
            style={{
              marginTop: 10,
              color: "#999",
              textAlign: "center",
            }}
          >
            Участвует во всех активностях
          </Text>
        </View>
      </View>
    </View>
  );
}
