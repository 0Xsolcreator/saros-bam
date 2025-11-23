import { ThemedStyle } from "@/theme/types"
import { ViewStyle, View, TextStyle } from "react-native"
import { useAppTheme } from "@/theme/context"
import { Text } from "../Text"
import ProtocolToggler from "./ProtocolToggler"

export default function Title() {
  const { themed } = useAppTheme()
  const titleStyle = themed($TitleStyle)

  return (
    <View style={themed($SectionStyle)}>
      <View style={titleStyle}>
        <Text style={themed($TitleTextStyle)}>DLMM POOLS</Text>
      </View>
      <ProtocolToggler />
    </View>
  )
}

const $SectionStyle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: spacing.lg,
})

const $TitleStyle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.xl,
})

const $TitleTextStyle: ThemedStyle<TextStyle> = ({ typography, spacing }) => ({
  fontSize: spacing.xl,
  lineHeight: spacing.xl * 1.2,
  fontFamily: "plusJakartaSansBold",
})
