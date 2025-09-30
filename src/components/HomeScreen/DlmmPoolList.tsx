import { useGetAndUpdateDlmmPoolsQuery } from "@/services/api/geckoTerminalApi"
import { View, ViewStyle } from "react-native"
import { FlashList } from "@shopify/flash-list"
import { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import InfoCard from "./InfoCard"
import { useSelector } from "react-redux"
import { selectFilteredDlmmData } from "@/store/selectors/dlmmSelectors"

export default function DlmmPoolList() {
  const { themed } = useAppTheme()

  const { isError, isLoading } = useGetAndUpdateDlmmPoolsQuery(
    { dex: "saros-dlmm" },
    { pollingInterval: 5 * 60 * 1000 },
  )

  const filteredData = useSelector(selectFilteredDlmmData)

  return (
    <View style={themed($ListViewStyle)}>
      {!isLoading && !isError && filteredData && (
        <FlashList
          data={filteredData}
          keyExtractor={(item) => item.Address}
          renderItem={({ item }) => {
            return <InfoCard input={item} />
          }}
        />
      )}
    </View>
  )
}

const $ListViewStyle: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flex: 1,
  borderRadius: 8,
  padding: spacing.md,
  backgroundColor: colors.palette.neutral100,
})
