import { TextStyle, TouchableOpacity, ViewStyle } from "react-native"

import { Text } from "../Text"
import { ThemedStyle } from "@/theme/types"
import { useAppDispatch, useAppSelector } from "@/store/store"
import { useAppTheme } from "@/theme/context"
import { Protocol, setProtocol } from "@/store/features/dlmmPoolFiltersSlice"

export default function ProtocolToggler() {
  const { themed } = useAppTheme()
  const protocol = useAppSelector((state) => state.dlmmPoolFilters.protocol)
  const dispatch = useAppDispatch()

  const onPressProtocolToggle = () => {
    let nextProtocol: Protocol
    switch (protocol) {
      case "all":
        nextProtocol = "saros-dlmm"
        break
      case "saros-dlmm":
        nextProtocol = "meteora"
        break
      case "meteora":
      default:
        nextProtocol = "all"
        break
    }
    dispatch(setProtocol(nextProtocol))
  }

  return (
    <TouchableOpacity style={themed($ToggleBackgroundStyle)} onPress={onPressProtocolToggle}>
      <Text style={themed($ToggleTextStyle)}> {protocol.toUpperCase()} </Text>
    </TouchableOpacity>
  )
}

const $ToggleBackgroundStyle: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  backgroundColor: colors.palette.neutral300,
  paddingVertical: spacing.xs,
  paddingHorizontal: spacing.lg,
  borderRadius: spacing.sm,
  shadowColor: colors.palette.neutral500,
  shadowOffset: { width: spacing.xxs, height: spacing.xs },
  shadowOpacity: 1,
  shadowRadius: spacing.sm,
  elevation: 24,
})

const $ToggleTextStyle: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  fontSize: spacing.sm,
  color: colors.palette.neutral700,
  fontWeight: "bold",
})
