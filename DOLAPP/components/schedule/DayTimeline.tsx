import { View } from "react-native";
import EventCard from "./EventCard";

export default function DayTimeline({
  event,
  isLast,
}: {
  event: any;
  isLast: boolean;
}) {
  const color = event.color || "#22C55E";

  return (
    <View style={{ flexDirection: "row" }}>
      {/* LEFT TIMELINE */}
      <View style={{ alignItems: "center", width: 40 }}>
        {/* DOT */}
        <View
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: color,
          }}
        />

        {/* LINE */}
        {!isLast && (
          <View
            style={{
              width: 2,
              flex: 1,
              backgroundColor: "#E5E7EB",
              marginTop: 4,
            }}
          />
        )}
      </View>

      {/* RIGHT SIDE = YOUR EXISTING CARD */}
      <View style={{ flex: 1, marginBottom: 12 }}>
        <EventCard event={event} />
      </View>
    </View>
  );
}
