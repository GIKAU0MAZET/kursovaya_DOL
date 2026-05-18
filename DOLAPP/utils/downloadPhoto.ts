import * as FileSystem from "expo-file-system/legacy";
import * as MediaLibrary from "expo-media-library";

import { Alert } from "react-native";

export const downloadPhoto = async (image: string) => {
  try {
    const permission = await MediaLibrary.requestPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Нет доступа");
      return;
    }

    const fileUri = FileSystem.cacheDirectory + `photo-${Date.now()}.jpg`;

    const downloaded = await FileSystem.downloadAsync(image, fileUri);

    await MediaLibrary.saveToLibraryAsync(downloaded.uri);

    Alert.alert("Успешно", "Фото сохранено");
  } catch {
    Alert.alert("Ошибка", "Не удалось скачать фото");
  }
};
