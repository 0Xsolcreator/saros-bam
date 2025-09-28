import { TextStyle, View, ViewStyle } from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons"
import * as Clipboard from "expo-clipboard"

import { Text } from "../Text"
import { DlmmPoolsData } from "@/services/api/geckoTerminalApi"
import { useAppTheme } from "@/theme/context"
import { toast } from "sonner-native"
import { ThemedStyle } from "@/theme/types"
import { formatNumberToKMB } from "@/utils/numberOperations"

export default function InfoCard({ input }: { input: DlmmPoolsData }) {
  const { themed, theme } = useAppTheme()

  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text)
    toast.success("Address Copied")
  }

  return (
    <View style={themed($InfoCardStyle)}>
      <View style={themed($InfoCardHeaderStyle)}>
        <View style={themed($InfoCardHeaderLeftStyle)}>
          <Text style={themed($InfoCardHeaderLeftTextStyle)}>{input.Pair}</Text>
          <Ionicons
            name="copy"
            size={16}
            color={theme.colors.palette.neutral700}
            onPress={() => copyToClipboard(input.Pair)}
          />
        </View>
        <Text style={themed($InfoCardHeaderRightTextStyle)}>
          <Text style={themed($InfoCardHeaderRightTextHeadingStyle)}>24hr Vol </Text>
          <Text style={themed($InfoCardHeaderRightTextValueStyle)}>
            {formatNumberToKMB(input.TwentyFourHrVol)}
          </Text>
        </Text>
      </View>
      <View style={themed($InfoCardRowStyle)}>
        <Text style={themed($InfoCardRowTextStyle)}>MCap {formatNumberToKMB(input.Mcap)}</Text>
        <Text style={themed($InfoCardRowTextStyle)}>Age {formatNumberToKMB(input.Age)}</Text>
        <Text style={themed($InfoCardRowTextStyle)}>FDV {formatNumberToKMB(input.FDV)}</Text>
      </View>
      <View style={themed($InfoCardRowStyle)}>
        <Text style={themed($InfoCardRowTextStyle)}>TVL {formatNumberToKMB(input.TVL)}</Text>
        <Text style={themed($InfoCardRowTextStyle)}>Fee {formatNumberToKMB(input.Fee)}</Text>
        <Text style={themed($InfoCardRowTextStyle)}>
          BinStep {formatNumberToKMB(input.BinStep)}
        </Text>
      </View>
      <View style={themed($InfoCardHighlightedRowStyle)}>
        <Text style={themed($InfoCardHighlightedRowTextStyle)}>
          Org Score {formatNumberToKMB(input.OrganicScore)}
        </Text>
        <Text style={themed($InfoCardHighlightedRowTextStyle)}>
          Holders {formatNumberToKMB(input.Holders)}
        </Text>
        <Text style={themed($InfoCardHighlightedRowTextStyle)}>
          Volatility {formatNumberToKMB(input.VolatilityPercent)}
        </Text>
      </View>
      <View style={themed($InfoCardFooterStyle)}>
        <Text style={themed($InfoCardFooterTextStyle)}>
          % Liquidity Change {formatNumberToKMB(input.LiquidityChangePercent)}
        </Text>
        <Text style={themed($InfoCardFooterTextStyle)}>
          % Volume Change {formatNumberToKMB(input.VolumeChangePercent)}
        </Text>
      </View>
    </View>
  )
}

const $InfoCardStyle: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: "column",
  borderRadius: 8,
  padding: spacing.xs,
  backgroundColor: colors.palette.neutral500,
  width: "auto",
  marginBottom: spacing.sm,
})

const $InfoCardHeaderStyle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: spacing.sm,
})

const $InfoCardHeaderLeftStyle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xs,
})

const $InfoCardHeaderLeftTextStyle: ThemedStyle<TextStyle> = ({ spacing }) => ({
  fontFamily: "plusJakartaSansBold",
  fontSize: spacing.md,
})

const $InfoCardHeaderRightTextStyle: ThemedStyle<TextStyle> = ({ spacing }) => ({
  fontSize: spacing.md,
})

const $InfoCardHeaderRightTextHeadingStyle: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.palette.neutral700,
  fontSize: spacing.sm,
})

const $InfoCardHeaderRightTextValueStyle: ThemedStyle<TextStyle> = ({ colors }) => ({
  fontFamily: "plusJakartaSansSemiBold",
})

const $InfoCardRowStyle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
})

const $InfoCardRowTextStyle: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  fontSize: spacing.sm,
  color: colors.palette.neutral700,
})

const $InfoCardHighlightedRowStyle: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: colors.palette.neutral200,
  marginVertical: spacing.xs,
  padding: spacing.xs,
  borderRadius: spacing.xs,
})

const $InfoCardHighlightedRowTextStyle: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  fontSize: spacing.sm,
  fontFamily: "plusJakartaSansSemiBold",
  color: colors.palette.neutral700,
})

const $InfoCardFooterStyle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  paddingHorizontal: spacing.xs,
})

const $InfoCardFooterTextStyle: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  fontSize: spacing.sm,
  fontFamily: "plusJakartaSansSemiBold",
  color: colors.palette.neutral700,
})
