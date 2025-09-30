import { View, ViewStyle } from "react-native"
import { useState } from "react"
import { toast } from "sonner-native"
import { useRouter } from "expo-router"

import Heading from "@/components/AdvancedFilters/Heading"
import { ThemedStyle } from "@/theme/types"
import { useAppTheme } from "@/theme/context"
import FilterItems from "@/components/AdvancedFilters/FilterItems"
import { RangeFilters, setMultipleRangeFilters } from "@/store/features/dlmmPoolFiltersSlice"
import { useAppDispatch, useAppSelector } from "@/store/store"

export default function AdvancedFiltersScreen() {
  const { themed } = useAppTheme()
  const router = useRouter()

  const rangeFilters = useAppSelector((state) => state.dlmmPoolFilters.rangeFilters)
  const dispatch = useAppDispatch()

  const [localInputs, setLocalInputs] = useState<RangeFilters>(rangeFilters)

  const updateLocalInputs = (newInputs: RangeFilters) => {
    setLocalInputs(newInputs)
  }

  const applyFilters = () => {
    for (const [_field, { min, max }] of Object.entries(localInputs)) {
      if (min !== null && max !== null && min > max) {
        toast.error(`Invalid Range`)
        return
      }
    }
    dispatch(
      setMultipleRangeFilters(
        Object.entries(localInputs).map(([field, { min, max }]) => ({
          field: field as keyof RangeFilters,
          min,
          max,
        })),
      ),
    )
    toast.success("Filters applied")
    router.canGoBack() ? router.back() : null
  }

  return (
    <View style={themed($AdvancedFiltersScreenView)}>
      <Heading applyFilters={applyFilters} />
      <FilterItems localInputs={localInputs} setLocalInputs={updateLocalInputs} />
    </View>
  )
}

const $AdvancedFiltersScreenView: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  backgroundColor: colors.palette.neutral100,
})
