import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

import ChildHeroCard from "@/components/home/ChildCard";
import HomeHeader from "@/components/home/HomeHeader";

import { childrenService } from "@/services/children.service";
import { scheduleService } from "@/services/schedule.service";

import TodayTimeline from "@/components/home/EventCard";
import { newsService } from "@/services/news.service";
import { Child } from "@/types/children.types";
import { News } from "@/types/news.types";
import { Event } from "@/types/schedule.types";

export default function HomeScreen() {
  const [children, setChildren] = useState<Child[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const childrenData = await childrenService.getChildren();
      setChildren(childrenData);

      const eventsData = await scheduleService.getEvents();
      setEvents(eventsData);

      const newsData = await newsService.getAllNews();
      setNews(newsData);
    } catch (e) {
      console.log(e);
    }
  };

  const child = children[0];

  const todayLabel = new Date().toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  });

  const notifications = [
    {
      id: 1,
      title: "посетил медпункт",
      time: "14:32",
    },
    {
      id: 2,
      title: "что-то сделал",
      time: "09:00",
    },
    {
      id: 3,
      title: "посетил мероприятие",
      time: "12:15",
    },
  ];

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
          Сегодня, {todayLabel}
        </Text>

        <TodayTimeline events={events.slice(0, 5)} />
      </View>

      {/* NEWS */}
      <View style={{ gap: 12 }}>
        <Text style={{ fontSize: 24, fontWeight: "700" }}>
          Последние новости
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 12, paddingRight: 16 }}
        >
          {news.map((item) => (
            <View
              key={item.id}
              style={{
                width: 260,
                backgroundColor: "white",
                borderRadius: 20,
                overflow: "hidden",
              }}
            >
              {item.image ? (
                <Image
                  source={{ uri: item.image }}
                  style={{ width: "100%", height: 150 }}
                />
              ) : (
                <View
                  style={{
                    width: "100%",
                    height: 150,
                    backgroundColor: "#E0E0E0",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>Нет фото</Text>
                </View>
              )}
              <View style={{ padding: 14 }}>
                <Text style={{ fontSize: 16, fontWeight: "700" }}>
                  {item.title}
                </Text>
                {item.body ? (
                  <Text
                    style={{ fontSize: 14, color: "#666", marginTop: 4 }}
                    numberOfLines={2}
                  >
                    {item.body}
                  </Text>
                ) : null}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* NOTIFICATIONS */}
      <View style={{ gap: 12 }}>
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
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          {notifications.map((item, index) => (
            <View key={item.id}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 18,
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    fontSize: 15,
                    fontWeight: "500",
                  }}
                >
                  {child?.first_name || "Ребенок"} {item.title}
                </Text>

                <Text
                  style={{
                    color: "#999",
                    marginLeft: 12,
                  }}
                >
                  {item.time}
                </Text>
              </View>

              {index !== notifications.length - 1 && (
                <View
                  style={{
                    height: 1,
                    backgroundColor: "#F0F0F0",
                    marginLeft: 18,
                  }}
                />
              )}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
