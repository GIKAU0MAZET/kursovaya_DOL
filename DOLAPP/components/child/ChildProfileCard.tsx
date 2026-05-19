import { Image, Text, View } from "react-native";

type Props = {
  child: {
    first_name: string;
    last_name: string;
    group_name: string;
    age?: number;
    birth_date?: string;
    photo?: string | null;
  };
};

export default function ChildProfileCard({ child }: Props) {
  return (
    <View
      style={{
        backgroundColor: "#22C55E",
        marginHorizontal: 16,
        borderRadius: 24,
        padding: 20,
      }}
    >
      {/* Один горизонтальный контейнер */}
      <View style={{ flexDirection: "row", gap: 16 }}>
        {/* Аватар */}
        {child.photo ? (
          <Image
            source={{ uri: child.photo }}
            style={{ width: 80, height: 80, borderRadius: 40 }}
          />
        ) : (
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: "rgba(255,255,255,0.25)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 28, fontWeight: "700" }}>
              {child.first_name?.[0]}
            </Text>
          </View>
        )}

        {/* Текстовая часть */}
        <View style={{ justifyContent: "center", gap: 6 }}>
          <Text style={{ color: "white", fontSize: 22, fontWeight: "700" }}>
            {child.first_name} {child.last_name}
          </Text>
          <Text style={{ color: "rgba(255,255,255,0.9)" }}>
            {child.group_name}
          </Text>
          <Text style={{ color: "white" }}>{child.age} лет</Text>
          <Text style={{ color: "rgba(255,255,255,0.9)" }}>
            {child.birth_date}
          </Text>
        </View>
      </View>
    </View>
  );
}
