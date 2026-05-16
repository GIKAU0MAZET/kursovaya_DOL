import { Text, View } from "react-native";

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

        gap: 6,

        shadowColor: "#000",

        shadowOpacity: 0.1,

        shadowRadius: 6,

        elevation: 3,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "700",
        }}
      >
        {event.title}
      </Text>

      <Text
        style={{
          color: "#666",
        }}
      >
        {event.start_time} - {event.end_time}
      </Text>

      <Text>{event.location}</Text>

      <Text>{event.description}</Text>
    </View>
  );
}
