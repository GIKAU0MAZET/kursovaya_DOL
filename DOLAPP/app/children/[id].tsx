import ActivityStatsCard from "@/components/child/ActivityStatsCard";
import ChildActions from "@/components/child/ChildActions";
import ChildHeader from "@/components/child/ChildHeader";
import ChildProfileCard from "@/components/child/ChildProfileCard";
import HealthCard from "@/components/child/HealthCard";
import NutritionCard from "@/components/child/NutritionCard";
import { childrenService } from "@/services/children.service";
import { eventsService } from "@/services/events.service";
import { Child } from "@/types/children.types";
import { EventStats } from "@/types/events.types";
import getAge from "@/utils/getAge";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function ChildScreen() {
  const { id } = useLocalSearchParams();
  const [child, setChild] = useState<Child | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<EventStats | null>(null);

  useEffect(() => {
    loadChild();
  }, [id]); // добавил id в зависимости

  const loadChild = async () => {
    if (!id) return;
    try {
      const childData = await childrenService.getChildById(id as string);
      setChild(childData);

      const statsData = await eventsService.getStats(id as string);
      setStats(statsData);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !child || !stats) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const formattedChild = {
    ...child,
    age: getAge(child.birth_date),
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#F5F5F5" }}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <ChildHeader name={child.first_name} />
      <ChildProfileCard child={formattedChild} />
      <ChildActions />

      <View style={{ gap: 12, marginTop: 24 }}>
        <Text
          style={{ fontSize: 24, fontWeight: "700", paddingHorizontal: 16 }}
        >
          Успеваемость и активность
        </Text>
        <ActivityStatsCard
          attended={stats?.attended}
          total={stats?.total}
          activity={stats?.activity}
        />
      </View>

      <View style={{ gap: 12, marginTop: 24 }}>
        <Text
          style={{ fontSize: 24, fontWeight: "700", paddingHorizontal: 16 }}
        >
          Здоровье
        </Text>
        <HealthCard
          temperature={36.6}
          condition="Хорошее самочувствие"
          clinicVisits={1}
        />
      </View>

      <View style={{ gap: 12, marginTop: 24 }}>
        <Text
          style={{ fontSize: 24, fontWeight: "700", paddingHorizontal: 16 }}
        >
          Питание
        </Text>
        <NutritionCard />
      </View>
    </ScrollView>
  );
}
