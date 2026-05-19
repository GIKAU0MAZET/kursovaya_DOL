import { useEffect, useState } from "react";
import { Alert, FlatList, Image, Pressable, Text, View } from "react-native";

import * as ImagePicker from "expo-image-picker";

import { SafeAreaView } from "react-native-safe-area-context";

import { galleryService } from "@/services/gallery.service";

export default function PhotosScreen() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    try {
      setLoading(true);

      const data = await galleryService.getPhoto();
      console.log(await galleryService.getPhoto()); // ok, но лучше rename
      setPhotos(data);
    } catch (e) {
      console.log("LOAD ERROR:", e);
    } finally {
      setLoading(false);
    }
  };

  // 📤 UPLOAD FIXED
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
      });

      if (result.canceled) return;

      const image = result.assets[0];

      const formData = new FormData();

      formData.append("image", {
        uri: image.uri,
        name: "photo.jpg",
        type: "image/jpeg",
      } as any);

      // 🔥 ВАЖНО: backend поля
      formData.append("type", "squad");

      setUploading(true);

      await galleryService.uploadPhoto(formData);

      await loadPhotos();
    } catch (e) {
      console.log("UPLOAD ERROR:", e);
      Alert.alert("Ошибка", "Не удалось загрузить фото");
    } finally {
      setUploading(false);
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
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      {/* UPLOAD BUTTON */}
      <Pressable
        onPress={pickImage}
        style={{
          backgroundColor: "green",
          padding: 12,
          borderRadius: 10,
          marginBottom: 12,
          alignItems: "center",
          opacity: uploading ? 0.6 : 1,
        }}
      >
        <Text style={{ color: "#fff" }}>
          {uploading ? "Загрузка..." : "+ Добавить фото отряда"}
        </Text>
      </Pressable>

      {/* GRID */}
      <FlatList
        data={photos}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.image }}
            style={{
              width: "48%",
              height: 150,
              margin: "1%",
              borderRadius: 10,
            }}
          />
        )}
      />
    </SafeAreaView>
  );
}
