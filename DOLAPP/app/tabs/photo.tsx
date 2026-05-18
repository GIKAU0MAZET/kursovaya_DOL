import { useEffect, useState } from "react";
import { Alert, FlatList, Text, View } from "react-native";

import * as FileSystem from "expo-file-system/legacy";
import * as MediaLibrary from "expo-media-library";

import { galleryService } from "@/services/gallery.service";
import { Gallery } from "@/types/gallery.types";
import { groupGalleryByDate } from "@/utils/groupGalleryByDate";

import PhotoSection from "@/components/photo/PhotoSection";
import PhotoViewer from "@/components/photo/PhotoViewer";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PhotoScreen() {
  const [photos, setPhotos] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);

  const [tab, setTab] = useState("all");

  // 🖼️ viewer state
  const [viewerIndex, setViewerIndex] = useState(0);
  const [viewerVisible, setViewerVisible] = useState(false);

  const TABS = [
    { label: "Все", value: "all" },
    { label: "Мероприятия", value: "event" },
    { label: "Отряд", value: "squad" },
    { label: "Личные", value: "personal" },
  ];

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

  // 📥 download + save
  const downloadPhoto = async (image: string) => {
    try {
      const permission = await MediaLibrary.requestPermissionsAsync();
      if (!permission.granted) {
        Alert.alert("Нет доступа к галерее");
        return;
      }

      const fileUri = FileSystem.documentDirectory + "photo.jpg";

      const downloaded = await FileSystem.downloadAsync(image, fileUri);

      await MediaLibrary.saveToLibraryAsync(downloaded.uri);

      Alert.alert("Готово", "Фото сохранено в галерею");
    } catch (e) {
      Alert.alert("Ошибка", "Не удалось скачать фото");
    }
  };

  const openPhoto = (photo: Gallery) => {
    const index = filteredPhotos.findIndex((p) => p.id === photo.id);
    setViewerIndex(index);
    setViewerVisible(true);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* HEADER */}
      <Text
        style={{
          fontSize: 24,
          fontWeight: "800",
          textAlign: "center",
          marginTop: 10,
          marginBottom: 12,
        }}
      >
        Фотогалерея
      </Text>

      {/* TABS */}
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
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        renderItem={({ item }) => (
          <PhotoSection
            title={item.title}
            data={item.data}
            onPressPhoto={openPhoto}
          />
        )}
      />

      <PhotoViewer
        visible={viewerVisible}
        photos={filteredPhotos}
        index={viewerIndex}
        setIndex={setViewerIndex}
        onClose={() => setViewerVisible(false)}
      />
    </SafeAreaView>
  );
}
