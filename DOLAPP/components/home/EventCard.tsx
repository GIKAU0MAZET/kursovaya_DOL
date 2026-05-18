import { Text, View } from "react-native";

import { Event } from "@/types/schedule.types";

type Props = {
  events: Event[];
};

export default function TodayTimeline({ events }: Props) {
  const today = new Date().toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  });

  return (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 24,
        padding: 20,
      }}
    >
      {/* EVENTS */}
      <View
        style={{
          gap: 18,
        }}
      >
        {events.map((event, index) => (
          <View key={event.id}>
            <View
              style={{
                flexDirection: "row",
                gap: 14,
              }}
            >
              {/* LEFT */}
              <View
                style={{
                  alignItems: "center",
                }}
              >
                {/* DOT */}
                <View
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 999,
                    backgroundColor: "#9CA3AF",
                    marginTop: 6,
                  }}
                />

                {/* LINE */}
                {index !== events.length - 1 && (
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

              {/* CONTENT */}
              <View
                style={{
                  flex: 1,
                  paddingBottom: 20,
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
                    marginTop: 4,
                  }}
                >
                  {event.start_time} — {event.end_time}
                </Text>

                <Text
                  style={{
                    color: "#999",
                    marginTop: 2,
                  }}
                >
                  {event.location}
                </Text>

                {event.description ? (
                  <Text
                    style={{
                      marginTop: 8,
                      lineHeight: 20,
                      color: "#444",
                    }}
                  >
                    {event.description}
                  </Text>
                ) : null}
              </View>
            </View>

            {/* DIVIDER */}
            {index !== events.length - 1 && (
              <View
                style={{
                  height: 1,
                  backgroundColor: "#F0F0F0",
                  marginLeft: 26,
                }}
              />
            )}
          </View>
        ))}
      </View>
    </View>
  );
}
