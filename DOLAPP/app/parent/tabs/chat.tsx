import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const chats = [
  {
    id: 1,
    name: "Вожатый Алексей",
    lastMessage: "Максим отлично поучаствовал в эстафете",
    time: "14:32",
    unread: 2,
    online: true,
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 2,
    name: "Медпункт",
    lastMessage: "Осмотр прошел успешно",
    time: "12:10",
    unread: 0,
    online: false,
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: 3,
    name: "Администрация лагеря",
    lastMessage: "Завтра родительский день",
    time: "09:45",
    unread: 1,
    online: true,
    avatar: "https://i.pravatar.cc/150?img=15",
  },
];

export default function Chat() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#F5F5F5",
      }}
    >
      {/* HEADER */}
      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: 10,
          paddingBottom: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "800",
          }}
        >
          Чат
        </Text>

        <Pressable
          style={{
            position: "absolute",
            right: 16,
          }}
        >
          <Ionicons name="search-outline" size={24} />
        </Pressable>
      </View>

      {/* CHATS */}
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 120,
          gap: 12,
        }}
        showsVerticalScrollIndicator={false}
      >
        {chats.map((chat) => (
          <Pressable
            key={chat.id}
            style={{
              backgroundColor: "white",
              borderRadius: 24,
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
              gap: 14,

              shadowColor: "#000",
              shadowOpacity: 0.04,
              shadowRadius: 8,
              elevation: 2,
            }}
          >
            {/* AVATAR */}
            <View>
              <Image
                source={{ uri: chat.avatar }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 999,
                }}
              />

              {/* ONLINE */}
              {chat.online && (
                <View
                  style={{
                    position: "absolute",
                    right: 2,
                    bottom: 2,
                    width: 14,
                    height: 14,
                    borderRadius: 999,
                    backgroundColor: "#22C55E",
                    borderWidth: 2,
                    borderColor: "white",
                  }}
                />
              )}
            </View>

            {/* CONTENT */}
            <View
              style={{
                flex: 1,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "700",
                    flex: 1,
                  }}
                  numberOfLines={1}
                >
                  {chat.name}
                </Text>

                <Text
                  style={{
                    color: "#999",
                    marginLeft: 10,
                  }}
                >
                  {chat.time}
                </Text>
              </View>

              <Text
                numberOfLines={1}
                style={{
                  color: "#666",
                  marginTop: 6,
                  lineHeight: 20,
                }}
              >
                {chat.lastMessage}
              </Text>
            </View>

            {/* UNREAD */}
            {chat.unread > 0 && (
              <View
                style={{
                  minWidth: 24,
                  height: 24,
                  borderRadius: 999,
                  backgroundColor: "#22C55E",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingHorizontal: 6,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "700",
                    fontSize: 12,
                  }}
                >
                  {chat.unread}
                </Text>
              </View>
            )}
          </Pressable>
        ))}
      </ScrollView>

      {/* FAB */}
      <Pressable
        style={{
          position: "absolute",
          right: 20,
          bottom: 30,
          width: 64,
          height: 64,
          borderRadius: 999,
          backgroundColor: "#22C55E",
          justifyContent: "center",
          alignItems: "center",

          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowRadius: 10,
          elevation: 6,
        }}
      >
        <Ionicons name="create-outline" size={28} color="white" />
      </Pressable>
    </SafeAreaView>
  );
}
