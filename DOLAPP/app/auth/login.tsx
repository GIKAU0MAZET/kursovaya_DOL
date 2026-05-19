import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useAuthStore } from "../../store/auth.store";

export default function Login() {
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState("firstparent@mail.com");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Ошибка", "Введи email и пароль");
      return;
    }
    try {
      await login(email.trim(), password);
    } catch (e: any) {
      console.log("LOGIN ERROR:", e.response?.data);
      console.log("STATUS:", e.response?.status);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Вход для родителей</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Пароль"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Войти" onPress={handleLogin} />

      {/* Быстрые кнопки для теста */}
      <View style={{ marginTop: 30 }}>
        <Button
          title="firstparent@mail.com"
          onPress={() => login("firstparent@mail.com", "m5G7@@4mER3fVYq")}
          color="gray"
        />
        <View style={{ height: 8 }} />
        <Button
          title="secondparent@mail.com"
          onPress={() => login("secondparent@mail.com", "9jVqnsgBDMGpFt5")}
          color="gray"
        />
        <View style={{ height: 8 }} />
        <Button
          title="Вожатый"
          onPress={() => login("educator@mail.ru", "nQPxXR86@5f@nF8")}
          color="gray"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
});
