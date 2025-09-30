import TabNavigation from "@/components/Navigation/TabNavigation"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { Tabs } from "expo-router"
import { View, ViewStyle } from "react-native"

export default function TabLayout() {
  const { themed } = useAppTheme()
  return (
    <View style={themed($ContainerStyle)}>
      <Tabs screenOptions={{ headerShown: false, tabBarStyle: { display: "none" } }}>
        <Tabs.Screen name="index" />
      </Tabs>
      <TabNavigation />
    </View>
  )
}

const $ContainerStyle: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})
