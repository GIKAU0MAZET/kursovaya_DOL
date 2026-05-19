import { scheduleService } from "@/services/schedule.service";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Event = {
  id: number;
  title: string;
  date: string;
};

type AttendanceItem = {
  child_id: number;
  name: string;
  status: "attended" | "absent" | null;
};

export default function AttendanceScreen() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [attendance, setAttendance] = useState<AttendanceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 📥 load events
  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await scheduleService.getEvents();
      setEvents(data);
    } catch (e) {
      console.log("events error", e);
    } finally {
      setLoading(false);
    }
  };

  // 📥 open event → load attendance
  const openEvent = async (event: Event) => {
    try {
      setSelectedEvent(event);
      setSaving(true);

      const data = await scheduleService.getAttendance(event.id);
      setAttendance(data);
    } catch (e) {
      console.log("attendance error", e);
    } finally {
      setSaving(false);
    }
  };

  // 🔁 toggle attendance
  const toggleAttendance = async (
    childId: number,
    current: "attended" | "absent" | null,
  ) => {
    if (!selectedEvent) return;

    const newStatus = current === "attended" ? "absent" : "attended";

    try {
      setSaving(true);

      await scheduleService.updateAttendance(
        selectedEvent.id,
        childId,
        newStatus,
      );

      // UI update without refetch
      setAttendance((prev) =>
        prev.map((item) =>
          item.child_id === childId ? { ...item, status: newStatus } : item,
        ),
      );
    } catch (e) {
      console.log("update error", e);
    } finally {
      setSaving(false);
    }
  };

  // ⏳ loading
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // 📅 EVENTS LIST
  if (!selectedEvent) {
    return (
      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <Pressable style={styles.eventCard} onPress={() => openEvent(item)}>
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text style={styles.eventDate}>{item.date}</Text>
          </Pressable>
        )}
      />
    );
  }

  // 👶 ATTENDANCE LIST
  return (
    <View style={{ flex: 1 }}>
      {/* back */}
      <Pressable
        style={styles.back}
        onPress={() => {
          setSelectedEvent(null);
          setAttendance([]);
        }}
      >
        <Text style={styles.backText}>← Назад к мероприятиям</Text>
      </Pressable>

      <Text style={styles.header}>{selectedEvent.title}</Text>

      {saving && <Text style={styles.saving}>Сохранение...</Text>}

      <FlatList
        data={attendance}
        keyExtractor={(item) => item.child_id.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <Pressable
            style={[
              styles.childCard,
              item.status === "attended" && styles.attended,
              item.status === "absent" && styles.absent,
            ]}
            onPress={() => toggleAttendance(item.child_id, item.status)}
          >
            <Text style={styles.childName}>{item.name}</Text>

            <Text style={styles.statusText}>
              {item.status === "attended"
                ? "✅ Присутствовал"
                : item.status === "absent"
                  ? "❌ Отсутствовал"
                  : "➖ Не отмечен"}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  eventCard: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginBottom: 12,
    elevation: 2,
  },

  eventTitle: {
    fontSize: 18,
    fontWeight: "600",
  },

  eventDate: {
    marginTop: 4,
    color: "#666",
  },

  back: {
    padding: 16,
  },

  backText: {
    color: "green",
    fontSize: 16,
  },

  header: {
    fontSize: 22,
    fontWeight: "700",
    paddingHorizontal: 16,
    marginBottom: 10,
  },

  saving: {
    paddingHorizontal: 16,
    color: "#888",
    marginBottom: 10,
  },

  childCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: "#f5f5f5",
  },

  attended: {
    backgroundColor: "#d4edda",
  },

  absent: {
    backgroundColor: "#f8d7da",
  },

  childName: {
    fontSize: 16,
    fontWeight: "600",
  },

  statusText: {
    marginTop: 4,
    color: "#333",
  },
});
