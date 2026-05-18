import React from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { Gallery } from "@/types/gallery.types";
import { downloadPhoto } from "@/utils/downloadPhoto";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

type Props = {
  visible: boolean;
  photos: Gallery[];
  index: number;
  setIndex: (i: number) => void;
  onClose: () => void;
};

export default function PhotoViewer({
  visible,
  photos,
  index,
  setIndex,
  onClose,
}: Props) {
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const current = photos[index];

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;
    })
    .onEnd((e) => {
      if (e.translationY > 120) runOnJS(onClose)();

      if (e.translationX < -80 && index < photos.length - 1) {
        runOnJS(setIndex)(index + 1);
      }

      if (e.translationX > 80 && index > 0) {
        runOnJS(setIndex)(index - 1);
      }

      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    });

  const pinch = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = Math.max(1, e.scale);
    })
    .onEnd(() => {
      scale.value = withSpring(1);
    });

  const gesture = Gesture.Simultaneous(pan, pinch);

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  if (!current) return null;

  return (
    <Modal visible={visible} transparent statusBarTranslucent>
      <View style={{ flex: 1, backgroundColor: "black" }}>
        {/* GESTURE IMAGE */}
        <GestureDetector gesture={gesture}>
          <Animated.Image
            source={{ uri: current.image }}
            style={[{ width, height, resizeMode: "contain" }, style]}
          />
        </GestureDetector>

        {/* ❌ CLOSE */}
        <Pressable
          onPress={onClose}
          style={{ position: "absolute", top: 50, right: 20 }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>✕</Text>
        </Pressable>

        {/* 📥 DOWNLOAD BUTTON */}
        <TouchableOpacity
          onPress={() => downloadPhoto(current.image)}
          style={{
            position: "absolute",
            bottom: 50,
            alignSelf: "center",
            backgroundColor: "green",
            paddingHorizontal: 20,
            paddingVertical: 12,
            borderRadius: 12,
          }}
        >
          <Text style={{ color: "white", fontWeight: "600" }}>Скачать</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
