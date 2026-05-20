import { galleryService } from "@/services/gallery.service";
import { groupService } from "@/services/group.service";
import { scheduleService } from "@/services/schedule.service";
import { useAuthStore } from "@/store/auth.store";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Event = {
  id: number;
  title: string;
  date: string;
};

export default function EducatorHome() {
  const user = useAuthStore((s) => s.user);

  const [events, setEvents] = useState<Event[]>([]);
  const [photos, setPhotos] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [group, setGroup] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const eventsData = await scheduleService.getEvents();
      setEvents(eventsData);

      const photosData = await galleryService.getPhoto();
      setPhotos(photosData);

      const groupData = await groupService.getMyGroup();
      setGroup(groupData);
    } catch (e) {
      console.log("HOME ERROR:", e);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Intl.DateTimeFormat("ru-RU", {
      day: "numeric",
      month: "long",
    }).format(new Date(dateStr));
  };

  // 📅 today event
  const today = new Date().toISOString().split("T")[0];

  const todayEvent = events.find((event) => event.date === today);

  // 📅 nearest event
  const nextEvent = events.find((event) => event.date >= today);

  // 📸 latest photo
  const latestPhoto = photos[0];

  // 📤 upload photo
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

      formData.append("type", "squad");

      setUploading(true);

      await galleryService.uploadPhoto(formData);

      await loadData();
    } catch (e) {
      console.log("UPLOAD ERROR:", e);
    } finally {
      setUploading(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#F5F5F5",
      }}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 40,
          gap: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "800",
            }}
          >
            Добро пожаловать, {user?.username}
          </Text>
        </View>

        {/* GROUP CARD */}
        <View
          style={{
            backgroundColor: "#22C55E",
            borderRadius: 28,
            padding: 24,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 26,
              fontWeight: "800",
            }}
          >
            {group?.name || "Ваш отряд"}
          </Text>

          <Text
            style={{
              color: "rgba(255,255,255,0.8)",
              marginTop: 6,
              fontSize: 15,
            }}
          >
            {group?.description}
          </Text>

          <Pressable
            onPress={() => router.push("/group/my-group")}
            style={{
              marginTop: 18,
              backgroundColor: "white",
              alignSelf: "flex-start",
              paddingHorizontal: 18,
              paddingVertical: 10,
              borderRadius: 14,
            }}
          >
            <Text
              style={{
                color: "#22C55E",
                fontWeight: "700",
              }}
            >
              Открыть отряд
            </Text>
          </Pressable>
        </View>

        {/* QUICK ACTIONS */}
        <View>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "700",
              marginBottom: 12,
            }}
          >
            Быстрые действия
          </Text>

          <View
            style={{
              flexDirection: "row",
              gap: 12,
            }}
          >
            {/* ATTENDANCE */}
            <Pressable
              onPress={() => router.push("/educator/tabs/attendance")}
              style={{
                flex: 1,
                backgroundColor: "#22C55E",
                borderRadius: 22,
                padding: 20,
              }}
            >
              <Ionicons name="checkmark-circle" size={32} color="white" />

              <Text
                style={{
                  color: "white",
                  fontSize: 17,
                  fontWeight: "700",
                  marginTop: 14,
                }}
              >
                Посещаемость
              </Text>

              <Text
                style={{
                  color: "rgba(255,255,255,0.8)",
                  marginTop: 4,
                }}
              >
                Отметить детей
              </Text>
            </Pressable>

            {/* PHOTO */}
            <Pressable
              onPress={pickImage}
              style={{
                flex: 1,
                backgroundColor: "#3B82F6",
                borderRadius: 22,
                padding: 20,
                opacity: uploading ? 0.7 : 1,
              }}
            >
              <Ionicons name="camera" size={32} color="white" />

              <Text
                style={{
                  color: "white",
                  fontSize: 17,
                  fontWeight: "700",
                  marginTop: 14,
                }}
              >
                Фото
              </Text>

              <Text
                style={{
                  color: "rgba(255,255,255,0.8)",
                  marginTop: 4,
                }}
              >
                {uploading ? "Загрузка..." : "Добавить фото"}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* TODAY */}
        <View>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "700",
              marginBottom: 12,
            }}
          >
            Сегодня, {formatDate(today)}
          </Text>

          <View
            style={{
              backgroundColor: "white",
              borderRadius: 24,
              padding: 20,
            }}
          >
            {todayEvent ? (
              <>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "700",
                  }}
                >
                  {todayEvent.title}
                </Text>

                <Text
                  style={{
                    marginTop: 6,
                    color: "#666",
                    fontSize: 15,
                  }}
                >
                  Мероприятие сегодня
                </Text>
              </>
            ) : (
              <>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "700",
                  }}
                >
                  Сегодня мероприятий нет
                </Text>

                {nextEvent && (
                  <View style={{ marginTop: 12 }}>
                    <Text
                      style={{
                        color: "#999",
                      }}
                    >
                      Ближайшее событие
                    </Text>

                    <Text
                      style={{
                        marginTop: 4,
                        fontSize: 16,
                        fontWeight: "600",
                      }}
                    >
                      {nextEvent.title}
                    </Text>

                    <Text
                      style={{
                        marginTop: 2,
                        color: "#666",
                      }}
                    >
                      {nextEvent.date}
                    </Text>
                  </View>
                )}
              </>
            )}
          </View>
        </View>

        {/* LAST PHOTO */}
        {latestPhoto && (
          <View>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "700",
                marginBottom: 12,
              }}
            >
              Последнее фото
            </Text>

            <View
              style={{
                backgroundColor: "white",
                borderRadius: 24,
                overflow: "hidden",
              }}
            >
              <Image
                source={{ uri: latestPhoto.image }}
                style={{
                  width: "100%",
                  height: 240,
                }}
              />

              <View
                style={{
                  padding: 16,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "700",
                  }}
                >
                  Фото отряда
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
