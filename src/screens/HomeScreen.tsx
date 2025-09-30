import { View, ViewStyle } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { HomeHeader } from "@/components/Header/HomeHeader"
import BasicFiltersList from "@/components/HomeScreen/BasicFiltersList"
import DlmmPoolList from "@/components/HomeScreen/DlmmPoolList"
import Title from "@/components/HomeScreen/Title"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"

export default function HomeScreen() {
  const { themed } = useAppTheme()
  return (
    <SafeAreaView style={themed($HomeScreenStyle)}>
      <View style={themed($HeaderSectionStyle)}>
        <HomeHeader />
        <Title />
        <BasicFiltersList />
      </View>
      <DlmmPoolList />
    </SafeAreaView>
  )
}

const $HomeScreenStyle: ThemedStyle<ViewStyle> = (theme) => ({
  flex: 1,
  backgroundColor: theme.colors.palette.neutral400,
  padding: 16,
})

const $HeaderSectionStyle: ThemedStyle<ViewStyle> = (theme) => ({
  flexShrink: 0,
})
