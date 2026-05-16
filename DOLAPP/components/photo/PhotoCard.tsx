import { Gallery } from "@/types/gallery.types";
import { Image, Text, View } from "react-native";

type Props = {
  photo: Gallery;
};

export default function PhotoCard({ photo }: Props) {
  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 20,
        borderRadius: 20,
        gap: 10,
      }}
    >
      <Image
        source={{ uri: photo.image }}
        style={{
          width: "100%",
          height: 200,
          borderRadius: 12,
        }}
        resizeMode="cover"
      />

      {photo.caption ? (
        <Text style={{ fontSize: 14 }}>{photo.caption}</Text>
      ) : null}
    </View>
  );
}
