import { ScrollView, Text, View } from "react-native";

import ActivityStatsCard from "@/components/child/ActivityStatsCard";
import ChildActions from "@/components/child/ChildActions";
import ChildHeader from "@/components/child/ChildHeader";
import ChildProfileCard from "@/components/child/ChildProfileCard";
import HealthCard from "@/components/child/HealthCard";
import NutritionCard from "@/components/child/NutritionCard";

export default function ChildScreen() {
  const child = {
    first_name: "Максим",
    last_name: "Иванов",
    group_name: "Отряд №1",
    age: 12,
    birth_date: "14 мая 2013",
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#F5F5F5" }}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <ChildHeader name={`${child.first_name}`} />

      <ChildProfileCard child={child} />

      <ChildActions />

      {/* УСПЕВАЕМОСТЬ */}
      <View style={{ gap: 12, marginTop: 24 }}>
        <Text
          style={{ fontSize: 24, fontWeight: "700", paddingHorizontal: 16 }}
        >
          Успеваемость и активность
        </Text>

        <ActivityStatsCard attended={19} total={20} activity={9} />
      </View>

      {/* ЗДОРОВЬЕ */}
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

      {/* ПИТАНИЕ */}
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
