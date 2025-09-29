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
        <View
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <FlashList
            data={filteredData}
            keyExtractor={(item) => item.Address}
            renderItem={({ item }) => {
              return <InfoCard input={item} />
            }}
            contentContainerStyle={{
              paddingBottom: 150,
            }}
          />
        </View>
      )}
    </View>
  )
}

const $ListViewStyle: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: "column",
  borderRadius: 8,
  padding: spacing.md,
  backgroundColor: colors.palette.neutral100,
})
