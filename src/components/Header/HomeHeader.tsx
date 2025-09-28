import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { View, ViewStyle } from "react-native"
import IconSVG from "../../../assets/icons/logo/icon.svg"
import FontAwesome6 from "@expo/vector-icons/FontAwesome6"

export function HomeHeader() {
  const { themed, theme } = useAppTheme()
  return (
    <View style={themed($HomeHeaderStyle)}>
      <IconSVG width={40} height={40} />
      <View style={themed($AdvancedFilterButton)}>
        <FontAwesome6
          name="filter-circle-dollar"
          size={24}
          color={theme.colors.palette.neutral900}
        />
      </View>
    </View>
  )
}

const $HomeHeaderStyle: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  height: spacing.xxxl,
  backgroundColor: colors.palette.neutral100,
  borderRadius: spacing.sm,
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.xs,
})

const $AdvancedFilterButton: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  backgroundColor: colors.palette.neutral400,
  borderRadius: spacing.sm,
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.xs,
  justifyContent: "center",
})
