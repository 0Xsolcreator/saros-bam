import { Stack } from "expo-router"

export default function HomeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="advanced-filters"
        options={{
          presentation: "formSheet",
          sheetAllowedDetents: [0.8],
          sheetCornerRadius: 16,
          sheetGrabberVisible: true,
        }}
      />
    </Stack>
  )
}
