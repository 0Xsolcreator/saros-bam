import { usePathname, useRouter } from "expo-router"
import { TouchableOpacity, View, ViewStyle } from "react-native"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import Octicons from "@expo/vector-icons/Octicons"

import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { toast } from "sonner-native"

export default function TabNavigation() {
  const router = useRouter()
  const pathname = usePathname()
  const { themed, theme } = useAppTheme()

  return (
    <View style={themed($NavigationContainerViewStyle)}>
      <TouchableOpacity
        onPress={() => router.push("/")}
        style={pathname === "/" ? themed($ActiveTabButtonStyle) : themed($TabButtonStyle)}
      >
        <MaterialIcons
          name="dashboard"
          size={theme.spacing.xl}
          color={
            pathname === "/" ? theme.colors.palette.neutral100 : theme.colors.palette.neutral700
          }
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => toast.info("Automations coming soon!")}
        style={
          pathname === "/automations" ? themed($ActiveTabButtonStyle) : themed($TabButtonStyle)
        }
      >
        <Octicons
          name="sparkles-fill"
          size={theme.spacing.xl}
          color={
            pathname === "/automations"
              ? theme.colors.palette.neutral100
              : theme.colors.palette.neutral700
          }
        />
      </TouchableOpacity>
    </View>
  )
}

const $NavigationContainerViewStyle: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  position: "absolute",
  bottom: spacing.lg,
  left: "50%",
  transform: [{ translateX: "-50%" }],
  marginBottom: spacing.xs,
  paddingVertical: spacing.sm,
  paddingHorizontal: spacing.sm,
  backgroundColor: colors.palette.neutral100,
  borderRadius: spacing.sm,
  flexDirection: "row",
  gap: spacing.md,
})

const $TabButtonStyle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.xxs,
})

const $ActiveTabButtonStyle: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  padding: spacing.xxs,
  backgroundColor: colors.palette.neutral700,
  borderRadius: spacing.xs,
})
