import { HomeHeader } from "@/components/Header/HomeHeader"
import DlmmPoolList from "@/components/HomeScreen/DlmmPoolList"
import Title from "@/components/HomeScreen/Title"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { ViewStyle } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function HomeScreen() {
  const { themed } = useAppTheme()
  return (
    <SafeAreaView style={themed($HomeScreenStyle)}>
      <HomeHeader />
      <Title />
      <DlmmPoolList />
    </SafeAreaView>
  )
}

const $HomeScreenStyle: ThemedStyle<ViewStyle> = (theme) => ({
  flex: 1,
  backgroundColor: theme.colors.palette.neutral400,
  padding: 16,
})
