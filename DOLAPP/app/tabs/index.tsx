import { useEffect, useState } from "react";

import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ChildCard from "../../components/home/ChildCard";
import EventCard from "../../components/home/EventCard";

import { childrenService } from "../../services/children.service";
import { scheduleService } from "../../services/schedule.service";

import { COLORS } from "@/constants/colors";
import { Child } from "../../types/children.types";
import { Event } from "../../types/schedule.types";

export default function Home() {
  const [children, setChildren] = useState<Child[]>([]);

  const [events, setEvents] = useState<Event[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const childrenData = await childrenService.getChildren();

      const eventsData = await scheduleService.getEvents();

      setChildren(childrenData);

      setEvents(eventsData);
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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.card,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          gap: 20,
        }}
      >
        {/* HEADER */}
        <View>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "700",
            }}
          >
            Главная
          </Text>

          <Text
            style={{
              color: "#666",
              marginTop: 4,
            }}
          >
            Добро пожаловать 👋
          </Text>
        </View>

        {/* CHILDREN */}
        <View
          style={{
            gap: 12,
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "700",
            }}
          >
            Дети
          </Text>

          {children.map((child) => (
            <ChildCard key={child.id} child={child} />
          ))}
        </View>

        {/* EVENTS */}
        <View
          style={{
            gap: 12,
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "700",
            }}
          >
            Ближайшие события
          </Text>

          {events.slice(0, 3).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
