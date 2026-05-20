import AsyncStorage from "@react-native-async-storage/async-storage";
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

type TempAlert = {
  id: string;
  childId: number;
  childName: string;
  temp: number;
  timestamp: string;
  read: boolean;
};

export default function HomeScreen() {
  const [children, setChildren] = useState<Child[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [alerts, setAlerts] = useState<TempAlert[]>([]);

  // Загрузка данных (дети, события, новости)
  useEffect(() => {
    loadData();
  }, []);

  // Загрузка уведомлений о температуре
  const loadAlerts = async () => {
    try {
      const stored = await AsyncStorage.getItem("parent_alerts");
      if (stored) {
        let allAlerts: TempAlert[] = JSON.parse(stored);
        // Фильтруем только для детей текущего родителя
        const childIds = children.map((c) => c.id);
        const filtered = allAlerts.filter((a) => childIds.includes(a.childId));
        // Сортируем от новых к старым
        filtered.sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
        );
        setAlerts(filtered);
      } else {
        setAlerts([]);
      }
    } catch (error) {
      console.error("Ошибка загрузки уведомлений:", error);
    }
  };

  // Периодическое обновление уведомлений (каждые 3 секунды)
  useEffect(() => {
    if (children.length === 0) return;
    loadAlerts();
    const interval = setInterval(loadAlerts, 3000);
    return () => clearInterval(interval);
  }, [children]);

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

  // Преобразуем алерты в формат для отображения
  const notifications = alerts.map((alert) => ({
    id: alert.id,
    title: `🌡️ Температура ${alert.temp}°C`,
    time: new Date(alert.timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    childName: alert.childName,
    isHigh: alert.temp > 37.5,
  }));

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#F5F5F5" }}
      contentContainerStyle={{ padding: 16, paddingBottom: 40, gap: 20 }}
      showsVerticalScrollIndicator={false}
    >
      <HomeHeader />

      {child && <ChildHeroCard child={child} />}

      <View style={{ gap: 12 }}>
        <Text style={{ fontSize: 24, fontWeight: "700" }}>
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

      {/* УВЕДОМЛЕНИЯ О ТЕМПЕРАТУРЕ */}
      <View style={{ gap: 12 }}>
        <Text style={{ fontSize: 24, fontWeight: "700" }}>
          Уведомления о здоровье
        </Text>
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          {notifications.length === 0 ? (
            <View style={{ padding: 18 }}>
              <Text style={{ color: "#999", textAlign: "center" }}>
                Нет новых уведомлений
              </Text>
            </View>
          ) : (
            notifications.map((item, index) => (
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
                      color: item.isHigh ? "#DC2626" : "#333",
                    }}
                  >
                    {item.childName} {item.title}
                  </Text>
                  <Text style={{ color: "#999", marginLeft: 12 }}>
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
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
}
