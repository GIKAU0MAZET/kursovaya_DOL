import { Gallery } from "@/types/gallery.types";
import { Image, View } from "react-native";

type Props = {
  photo: Gallery;
};

export default function PhotoCard({ photo }: Props) {
  return (
    <View style={{ flex: 1, aspectRatio: 1, margin: 4 }}>
      <Image
        source={{ uri: photo.image }}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 12,
        }}
        resizeMode="cover"
      />
    </View>
  );
}
