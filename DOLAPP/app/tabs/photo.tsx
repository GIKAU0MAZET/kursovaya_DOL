import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

import { galleryService } from "../../services/gallery.service";

import PhotoCard from "@/components/photo/PhotoCard";
import { Gallery } from "../../types/gallery.types";

export default function Photo() {
  const [photos, setPhotos] = useState<Gallery[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    try {
      const data = await galleryService.getPhoto();

      setPhotos(data);
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
    <FlatList
      data={photos}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 16, gap: 12 }}
      renderItem={({ item }) => <PhotoCard photo={item} />}
    />
  );
}
