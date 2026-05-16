import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

import { galleryService } from "@/services/gallery.service";
import { Gallery } from "@/types/gallery.types";
import { groupGalleryByDate } from "@/utils/groupGalleryByDate";

import PhotoSection from "@/components/photo/PhotoSection";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PhotoScreen() {
  const [photos, setPhotos] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);

  const TABS = [
    { label: "Все", value: "all" },
    { label: "Мероприятия", value: "event" },
    { label: "Отряд", value: "squad" },
    { label: "Личные", value: "personal" },
  ];

  const [tab, setTab] = useState("all");

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    try {
      const data = await galleryService.getPhoto();
      setPhotos(data);
    } finally {
      setLoading(false);
    }
  };

  const filteredPhotos = photos.filter((p) => {
    if (tab === "all") return true;
    return p.type === tab;
  });

  const sections = groupGalleryByDate(filteredPhotos);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      {/* HEADER */}
      <Text
        style={{
          fontSize: 24,
          fontWeight: "800",
          textAlign: "center",
          marginTop: 8,
          marginBottom: 12,
        }}
      >
        Фотогалерея
      </Text>

      {/* TABS (упрощённо) */}
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          paddingHorizontal: 16,
          marginBottom: 12,
        }}
      >
        {TABS.map((t) => (
          <Text
            key={t.value}
            onPress={() => setTab(t.value)}
            style={{
              padding: 8,
              borderRadius: 10,
              backgroundColor: tab === t.value ? "green" : "#eee",
              color: tab === t.value ? "white" : "black",
            }}
          >
            {t.label}
          </Text>
        ))}
      </View>

      {/* BODY */}
      <FlatList
        data={sections}
        keyExtractor={(item) => item.title}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        renderItem={({ item }) => (
          <PhotoSection title={item.title} data={item.data} />
        )}
      />
    </SafeAreaView>
  );
}
