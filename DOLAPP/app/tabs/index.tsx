import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

import ChildHeroCard from "@/components/home/ChildCard";
import HomeHeader from "@/components/home/HomeHeader";

import { childrenService } from "@/services/children.service";
import { scheduleService } from "@/services/schedule.service";

import TodayTimeline from "@/components/home/EventCard";
import { Child } from "@/types/children.types";
import { Event } from "@/types/schedule.types";

export default function HomeScreen() {
  const [children, setChildren] = useState<Child[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const childrenData = await childrenService.getChildren();

      const eventsData = await scheduleService.getEvents();

      setChildren(childrenData);

      setEvents(eventsData);
    } catch (e) {
      console.log(e);
    }
  };

  const child = children[0];

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#F5F5F5",
      }}
      contentContainerStyle={{
        padding: 16,
        paddingBottom: 40,
        gap: 20,
      }}
      showsVerticalScrollIndicator={false}
    >
      <HomeHeader />

      {child && <ChildHeroCard child={child} />}

      <View
        style={{
          gap: 12,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
          }}
        >
          Сегодня, 16 мая
        </Text>

        <TodayTimeline events={events.slice(0, 5)} />
      </View>

      {/* NEWS */}
      <View
        style={{
          gap: 12,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
          }}
        >
          Последние новости
        </Text>

        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              color: "#666",
            }}
          >
            Пока пусто
          </Text>
        </View>
      </View>

      {/* NOTIFICATIONS */}
      <View
        style={{
          gap: 12,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
          }}
        >
          Уведомления
        </Text>

        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              color: "#666",
            }}
          >
            Уведомлений нет
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
