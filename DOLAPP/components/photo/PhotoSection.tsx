import { Gallery } from "@/types/gallery.types";
import { FlatList, Text, View } from "react-native";
import PhotoCard from "./PhotoCard";

type Props = {
  title: string;
  data: Gallery[];
  onPressPhoto: (photo: Gallery) => void;
};

export default function PhotoSection({ title, data, onPressPhoto }: Props) {
  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 12 }}>
        {title}
      </Text>

      <FlatList
        data={data}
        numColumns={3}
        scrollEnabled={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PhotoCard photo={item} onPress={() => onPressPhoto(item)} />
        )}
      />
    </View>
  );
}
