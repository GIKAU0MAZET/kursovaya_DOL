import { useEffect, useState } from "react";

import { FlatList, Text, View } from "react-native";

import EventCard from "../../components/schedule/EventCard";

import { scheduleService } from "../../services/schedule.service";

import { SafeAreaView } from "react-native-safe-area-context";
import { Event } from "../../types/schedule.types";

export default function ScheduleScreen() {
  const [events, setEvents] = useState<Event[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await scheduleService.getEvents();

      setEvents(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          padding: 16,
          gap: 12,
        }}
        renderItem={({ item }) => <EventCard event={item} />}
      />
    </SafeAreaView>
  );
}
