import { Text, View } from "react-native";

import { formatTime } from "@/utils/formatTime";
import { Event } from "../../types/schedule.types";

type Props = {
  event: Event;
};

export default function EventCard({ event }: Props) {
  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 16,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        gap: 6,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
        }}
      >
        {event.title}
      </Text>

      <Text
        style={{
          fontWeight: "500",
        }}
      >
        {formatTime(event.start_time)} - {formatTime(event.end_time)}
      </Text>

      <Text
        style={{
          color: "#666",
        }}
      >
        {event.location}
      </Text>

      <Text
        style={{
          color: "#444",
        }}
      >
        {event.description}
      </Text>
    </View>
  );
}
