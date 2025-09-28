import { ThemedStyle } from "@/theme/types"
import { ViewStyle, View, TextStyle } from "react-native"
import { useAppTheme } from "@/theme/context"
import GradientText from "../GradientText"
import { Text } from "../Text"

export default function Title() {
  const { themed } = useAppTheme()
  const titleStyle = themed($TitleStyle)

  return (
    <View style={titleStyle}>
      <Text style={themed($TitleTextStyle)}>DLMM POOLS</Text>
    </View>
  )
}

const $TitleStyle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.xl,
})

const $TitleTextStyle: ThemedStyle<TextStyle> = ({ typography, spacing }) => ({
  fontSize: spacing.xl,
  lineHeight: spacing.xl * 1.2,
  fontFamily: "plusJakartaSansBold",
})
