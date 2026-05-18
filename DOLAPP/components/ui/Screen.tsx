import { ReactNode } from "react";

import { SafeAreaView, ScrollView } from "react-native";

import { COLORS, SPACING } from "@/constants/theme";

type Props = {
  children: ReactNode;
};

export default function Screen({ children }: Props) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          padding: SPACING.md,
          gap: SPACING.lg,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}
