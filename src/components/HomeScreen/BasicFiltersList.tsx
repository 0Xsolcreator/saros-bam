import { setSortBy, SortField, sortFieldNames, toggleSortOrder } from "@/store/features/dlmmPoolFiltersSlice"
import { TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { Text } from "../Text"
import { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import { useAppDispatch, useAppSelector } from "@/store/store"
import Ionicons from "@expo/vector-icons/Ionicons"

export default function BasicFiltersList() {
  const { themed } = useAppTheme()
  const selectedFilter = useAppSelector((state) => state.dlmmPoolFilters.sortBy)
  const sortOrder = useAppSelector((state) => state.dlmmPoolFilters.sortOrder)

  const dispatch = useAppDispatch()

  const onPressFilterItem = (field: Exclude<SortField, null>) => {
    if (selectedFilter === field) {
      dispatch(toggleSortOrder())
      return
    }

    dispatch(setSortBy(field))
  }

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={themed($FilterViewStyle)}
    >
      {sortFieldNames.map((item) => {
        return (
          <TouchableOpacity
            key={item.field}
            style={[
              themed($FilterItemStyle),
              selectedFilter === item.field && themed($SelectedFilterItemStyle),
            ]}
            onPress={() => onPressFilterItem(item.field)}
          >
            <Text style={themed($FilterTextStyle)}>{item.label}</Text>
            {selectedFilter === item.field && sortOrder === "asc" ? (
              <Ionicons
                name="arrow-up"
                size={16}
                color={themed(({ colors }) => colors.palette.neutral100)}
              />
            ) : selectedFilter === item.field && sortOrder === "desc" ? (
              <Ionicons
                name="arrow-down"
                size={16}
                color={themed(({ colors }) => colors.palette.neutral700)}
              />
            ) : null}
          </TouchableOpacity>
        )
      })}
    </ScrollView>
  )
}

const $FilterViewStyle: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  zIndex: 1,
  marginBottom: spacing.md,
})

const $FilterItemStyle: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  paddingHorizontal: spacing.sm,
  paddingVertical: spacing.sm,
  marginRight: spacing.sm,
  backgroundColor: colors.palette.neutral100,
  borderRadius: spacing.sm,
  height: spacing.xxl,
  minWidth: 92,
  justifyContent: "center",
  alignItems: "center",
})

const $FilterTextStyle: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.palette.neutral700,
  fontFamily: "plusJakartaSansLight",
  fontSize: spacing.md,
})

const $SelectedFilterItemStyle: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  gap: spacing.xs,
  backgroundColor: colors.palette.neutral500,
})
