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
  const percent = total > 0 ? Math.round((attended / total) * 100) : 0;

  const getActivityText = () => {
    if (percent >= 70) {
      return "Высокая активность";
    }

    if (percent >= 30) {
      return "Средняя активность";
    }

    return "Низкая активность";
  };

  const getActivityColor = () => {
    if (percent >= 70) {
      return "#22C55E"; // green
    }

    if (percent >= 30) {
      return "#F59E0B"; // orange
    }

    return "#EF4444"; // red
  };

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
            Посещено мероприятий
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
                backgroundColor: getActivityColor(),
              }}
            />
          </View>

          <Text
            style={{
              marginTop: 10,
              color: "#999",
            }}
          >
            {percent}%
          </Text>
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
              color: getActivityColor(),
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
            {getActivityText()}
          </Text>
        </View>
      </View>
    </View>
  );
}
