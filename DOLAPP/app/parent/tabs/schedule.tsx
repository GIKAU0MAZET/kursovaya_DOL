import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import { FlatList, Modal, Pressable, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";

import { getLocalDate, normalizeDate } from "@/utils/getLocalDateString";
import DayTimeline from "../../../components/schedule/DayTimeline";
import { scheduleService } from "../../../services/schedule.service";
import { Event } from "../../../types/schedule.types";
import { getWeekDays } from "../../../utils/getWeekDays";

export default function ScheduleScreen() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [calendarVisible, setCalendarVisible] = useState(false);

  const weekDays = useMemo(() => getWeekDays(), []);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await scheduleService.getEvents();
      setEvents(data);

      const today = getLocalDate();
      setSelectedDate(today);
    } catch (e) {
      console.log("schedule error:", e);
    } finally {
      setLoading(false);
    }
  };

  const grouped = useMemo(() => {
    const map: Record<string, Event[]> = {};

    for (const ev of events) {
      const date = normalizeDate(ev.date);

      if (!map[date]) map[date] = [];
      map[date].push(ev);
    }

    return map;
  }, [events]);

  const dayEvents = grouped[selectedDate] || [];

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
      {/* HEADER */}
      <View
        style={{
          paddingTop: 10,
          paddingBottom: 12,
          paddingHorizontal: 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "800" }}>Расписание</Text>

        <Pressable
          style={{ position: "absolute", right: 16 }}
          onPress={() => setCalendarVisible(true)}
        >
          <Ionicons name="calendar-outline" size={24} />
        </Pressable>
      </View>

      {/* WEEK BAR */}
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 12,
          justifyContent: "space-between",
        }}
      >
        {weekDays.map((d) => (
          <Pressable
            key={d.date}
            onPress={() => setSelectedDate(d.date)}
            style={{
              flex: 1,
              padding: 10,
              borderRadius: 12,
              backgroundColor: selectedDate === d.date ? "#22C55E" : "white",
              marginHorizontal: 4,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 12 }}>{d.label}</Text>
            <Text style={{ fontWeight: "700" }}>{d.day}</Text>
            <Text style={{ fontSize: 10, color: "#666" }}>{d.month}</Text>
          </Pressable>
        ))}
      </View>

      {/* CONTENT */}
      {dayEvents.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 40,
          }}
        >
          <Text style={{ fontSize: 16, color: "#666" }}>
            Мероприятий на этот день нет
          </Text>
        </View>
      ) : (
        <FlatList
          data={dayEvents}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 16, gap: 12 }}
          renderItem={({ item, index }) => (
            <DayTimeline event={item} isLast={index === dayEvents.length - 1} />
          )}
        />
      )}

      {/* CALENDAR MODAL */}
      <Modal visible={calendarVisible} animationType="slide">
        <SafeAreaView style={{ flex: 1 }}>
          <Calendar
            onDayPress={(day: any) => {
              setSelectedDate(day.dateString);
              setCalendarVisible(false);
            }}
            markedDates={{
              [selectedDate]: {
                selected: true,
                selectedColor: "#22C55E",
              },
            }}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
