import { useMemo } from "react";
import { Text, View } from "react-native";

import { Event } from "@/types/schedule.types";
import { formatTime } from "@/utils/formatTime";

type Props = {
  events: Event[];
};

export default function TodayTimeline({ events }: Props) {
  const todayDate = new Date().toISOString().split("T")[0];

  // события на сегодня
  const todayEvents = useMemo(() => {
    return events.filter((e) => {
      const eventDate = e.date?.split("T")[0];
      return eventDate === todayDate;
    });
  }, [events]);

  // ближайшее событие (после сегодня)
  const nextEvent = useMemo(() => {
    const future = events
      .filter((e) => {
        const eventDate = e.date?.split("T")[0];
        return eventDate > todayDate;
      })
      .sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });

    return future[0];
  }, [events]);

  return (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 24,
        padding: 20,
      }}
    >
      {/* CASE: TODAY EVENTS */}
      {todayEvents.length > 0 ? (
        <View style={{ gap: 18 }}>
          {todayEvents.map((event, index) => (
            <View key={event.id}>
              <View style={{ flexDirection: "row", gap: 14 }}>
                {/* LEFT */}
                <View style={{ alignItems: "center" }}>
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 999,
                      backgroundColor: "#9CA3AF",
                      marginTop: 6,
                    }}
                  />

                  {index !== todayEvents.length - 1 && (
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
                <View style={{ flex: 1, paddingBottom: 20 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "700",
                    }}
                  >
                    {event.title}
                  </Text>

                  <Text style={{ color: "#666", marginTop: 4 }}>
                    {formatTime(event.start_time)} —{" "}
                    {formatTime(event.end_time)}
                  </Text>

                  <Text style={{ color: "#999", marginTop: 2 }}>
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
              {index !== todayEvents.length - 1 && (
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
      ) : (
        /* CASE: EMPTY TODAY */
        <View style={{ gap: 12 }}>
          <Text
            style={{
              fontSize: 16,
              color: "#666",
              textAlign: "center",
              marginTop: 10,
            }}
          >
            Сегодня нет мероприятий
          </Text>

          {/* NEXT EVENT */}
          {nextEvent && (
            <View
              style={{
                marginTop: 10,
                backgroundColor: "#F9FAFB",
                padding: 16,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: "#E5E7EB",
              }}
            >
              <Text style={{ fontWeight: "700", fontSize: 16 }}>
                Ближайшее мероприятие
              </Text>

              <Text style={{ marginTop: 6 }}>{nextEvent.title}</Text>

              <Text style={{ color: "#666", marginTop: 4 }}>
                {nextEvent.start_time} — {nextEvent.end_time}
              </Text>

              <Text style={{ color: "#999", marginTop: 4 }}>
                {new Date(nextEvent.date).toLocaleDateString("ru-RU", {
                  day: "numeric",
                  month: "long",
                })}
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}
