import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Alert,
    Button,
    FlatList,
    Modal,
    Pressable,
    RefreshControl,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Child = {
  id: number;
  first_name: string;
  last_name: string;
  notes?: string; // заметки медика
};

type TempRecord = {
  id: string;
  childId: number;
  value: number;
  timestamp: string; // ISO
  note?: string;
};

// Глобальный массив тревог
export const globalAlerts: { childName: string; temp: number; time: string }[] =
  [];

// Мок детей (можно заменить на api.get)
const mockChildren: Child[] = [
  { id: 1, first_name: "Анна", last_name: "Смирнова", notes: "" },
  {
    id: 2,
    first_name: "Иван",
    last_name: "Петров",
    notes: "Аллергия на пенициллин",
  },
  { id: 3, first_name: "Мария", last_name: "Козлова", notes: "" },
  { id: 4, first_name: "Дмитрий", last_name: "Иванов", notes: "Близорукость" },
  { id: 5, first_name: "Елена", last_name: "Соколова", notes: "" },
];

// Ключи для AsyncStorage
const STORAGE_TEMPS = "medic_temperatures";
const STORAGE_NOTES = "medic_notes";

export default function MedicHome() {
  const [children, setChildren] = useState<Child[]>(mockChildren);
  const [temperatures, setTemperatures] = useState<TempRecord[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [tempValue, setTempValue] = useState("");
  const [tempNote, setTempNote] = useState("");
  const router = useRouter();

  // Загрузка сохранённых температур и заметок
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const storedTemps = await AsyncStorage.getItem(STORAGE_TEMPS);
      if (storedTemps) setTemperatures(JSON.parse(storedTemps));
      const storedNotes = await AsyncStorage.getItem(STORAGE_NOTES);
      if (storedNotes) {
        const notesMap = JSON.parse(storedNotes);
        setChildren((prev) =>
          prev.map((c) => ({ ...c, notes: notesMap[c.id] || "" })),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveTemperatures = async (newTemps: TempRecord[]) => {
    await AsyncStorage.setItem(STORAGE_TEMPS, JSON.stringify(newTemps));
  };

  const saveNotes = async (childId: number, note: string) => {
    const storedNotes = await AsyncStorage.getItem(STORAGE_NOTES);
    const notesMap = storedNotes ? JSON.parse(storedNotes) : {};
    notesMap[childId] = note;
    await AsyncStorage.setItem(STORAGE_NOTES, JSON.stringify(notesMap));
  };

  const addTemperature = () => {
    if (!selectedChild) return;
    const temp = parseFloat(tempValue);
    if (isNaN(temp)) {
      Alert.alert("Ошибка", "Введите числовое значение температуры");
      return;
    }
    const newRecord: TempRecord = {
      id: Date.now().toString(),
      childId: selectedChild.id,
      value: temp,
      timestamp: new Date().toISOString(),
      note: tempNote.trim() || undefined,
    };
    const updated = [newRecord, ...temperatures];
    setTemperatures(updated);
    saveTemperatures(updated);

    // Проверка на высокую температуру
    if (temp > 37.5) {
      Alert.alert(
        "Высокая температура",
        `У ${selectedChild.first_name} ${selectedChild.last_name} температура ${temp}°C!`,
      );
      globalAlerts.unshift({
        childName: `${selectedChild.first_name} ${selectedChild.last_name}`,
        temp: temp,
        time: new Date().toLocaleString(),
      });
    }

    setModalVisible(false);
    setTempValue("");
    setTempNote("");
    setSelectedChild(null);
  };

  const updateNote = async (child: Child, note: string) => {
    const updatedChildren = children.map((c) =>
      c.id === child.id ? { ...c, notes: note } : c,
    );
    setChildren(updatedChildren);
    await saveNotes(child.id, note);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const getLastTemp = (childId: number): string => {
    const childTemps = temperatures.filter((t) => t.childId === childId);
    if (childTemps.length === 0) return "—";
    const last = childTemps.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    )[0];
    return `${last.value}°C`;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
      <Text style={{ fontSize: 24, fontWeight: "800", padding: 16 }}>
        Медицинский пост (ручной ввод)
      </Text>

      <FlatList
        data={children}
        keyExtractor={(i) => i.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 16,
              padding: 14,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontWeight: "700", fontSize: 16 }}>
              {item.first_name} {item.last_name}
            </Text>

            {/* Заметки */}
            <TextInput
              style={{
                marginTop: 8,
                padding: 8,
                backgroundColor: "#F0F0F0",
                borderRadius: 8,
              }}
              placeholder="Заметки медика..."
              value={item.notes}
              onChangeText={(text) => updateNote(item, text)}
              multiline
            />

            <Text style={{ marginTop: 8, color: "#666" }}>
              Последняя температура: {getLastTemp(item.id)}
            </Text>

            <View style={{ flexDirection: "row", gap: 8, marginTop: 10 }}>
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: "/medic/tabs/temperature",
                    params: {
                      childId: item.id,
                      name: `${item.first_name} ${item.last_name}`,
                    },
                  })
                }
                style={{
                  flex: 1,
                  backgroundColor: "#3B82F6",
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  График
                </Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  setSelectedChild(item);
                  setModalVisible(true);
                }}
                style={{
                  flex: 1,
                  backgroundColor: "#10B981",
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  + Температура
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      />

      {/* Модальное окно добавления температуры */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
            padding: 20,
          }}
        >
          <View
            style={{ backgroundColor: "white", borderRadius: 20, padding: 20 }}
          >
            <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 12 }}>
              Добавить температуру: {selectedChild?.first_name}{" "}
              {selectedChild?.last_name}
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                padding: 10,
                marginBottom: 12,
              }}
              placeholder="Температура (°C)"
              keyboardType="numeric"
              value={tempValue}
              onChangeText={setTempValue}
            />
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                padding: 10,
                marginBottom: 20,
              }}
              placeholder="Заметка (необязательно)"
              value={tempNote}
              onChangeText={setTempNote}
            />
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Button
                title="Отмена"
                onPress={() => setModalVisible(false)}
                color="#666"
              />
              <Button
                title="Сохранить"
                onPress={addTemperature}
                color="#10B981"
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
