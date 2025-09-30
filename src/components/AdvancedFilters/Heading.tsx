import { TextStyle, View, ViewStyle } from "react-native"

import { Text } from "../Text"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { useRouter } from "expo-router"

export default function Heading({ applyFilters }: { applyFilters: () => void }) {
  const { themed } = useAppTheme()
  const router = useRouter()
  return (
    <View style={themed($HeaderView)}>
      <Text onPress={() => (router.canGoBack() ? router.back() : null)}>Close</Text>
      <Text style={themed($HeaderTitleText)}>Filters</Text>
      <Text onPress={applyFilters}>Apply</Text>
    </View>
  )
}

const $HeaderView: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: "row",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.md,
  borderBottomColor: colors.palette.neutral500,
  borderBottomWidth: 1,
})

const $HeaderTitleText: ThemedStyle<TextStyle> = ({ typography, spacing }) => ({
  fontFamily: "plusJakartaSansBold",
  fontSize: spacing.lg,
})
