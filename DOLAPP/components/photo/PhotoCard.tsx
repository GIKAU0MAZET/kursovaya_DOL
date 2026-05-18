import { Gallery } from "@/types/gallery.types";
import { Image, TouchableOpacity } from "react-native";

type Props = {
  photo: Gallery;
  onPress: () => void;
};

export default function PhotoCard({ photo, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ flex: 1, aspectRatio: 1, margin: 4 }}
    >
      <Image
        source={{ uri: photo.image }}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 12,
        }}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
}
