import { useState } from "react"
import { ScrollView, TextInput, TextStyle, View, ViewStyle } from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons"

import { RangeFilters, setRangeFilter, sortFieldNames } from "@/store/features/dlmmPoolFiltersSlice"
import { Text } from "../Text"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { useAppDispatch } from "@/store/store"

export default function FilterItems({
  localInputs,
  setLocalInputs,
}: {
  localInputs: RangeFilters
  setLocalInputs: (newInputs: RangeFilters) => void
}) {
  const { themed, theme } = useAppTheme()
  const dispatch = useAppDispatch()

  const [rawInputs, setRawInputs] = useState<Record<string, { min: string; max: string }>>({})

  return (
    <ScrollView>
      {sortFieldNames.map((item) => {
        const { min, max } = localInputs[item.field]
        const fieldRawInputs = rawInputs[item.field] || { min: "", max: "" }

        return (
          <View key={item.field} style={themed($FilterItemView)}>
            <View style={themed($FilterItemHeaderView)}>
              <Text style={themed($FilterItemTitleText)}>{item.label}</Text>
              {(min || max) && (
                <Ionicons
                  name="trash"
                  size={24}
                  color={theme.colors.palette.neutral700}
                  onPress={() => {
                    dispatch(setRangeFilter({ field: item.field, max: null, min: null }))
                    setRawInputs((prev) => ({
                      ...prev,
                      [item.field]: { min: "", max: "" },
                    }))
                    setLocalInputs({
                      ...localInputs,
                      [item.field]: { min: null, max: null },
                    })
                  }}
                />
              )}
            </View>
            <Text style={themed($FilterItemDescriptionText)}>{item.description}</Text>
            <View style={themed($FilterTextInputContainer)}>
              <View style={themed($FilterTextInputView)}>
                <TextInput
                  style={themed($FilterTextInput)}
                  placeholder="Min"
                  keyboardType="decimal-pad"
                  value={fieldRawInputs.min || (min !== null ? min.toString() : "")}
                  onChangeText={(text) => {
                    setRawInputs((prev) => ({
                      ...prev,
                      [item.field]: { ...prev[item.field], min: text },
                    }))
                    const value = text && !isNaN(parseFloat(text)) ? parseFloat(text) : null
                    setLocalInputs({
                      ...localInputs,
                      [item.field]: { ...localInputs[item.field], min: value },
                    })
                  }}
                  onBlur={() => {
                    const value = fieldRawInputs.min
                    if (!value || isNaN(parseFloat(value))) {
                      setRawInputs((prev) => ({
                        ...prev,
                        [item.field]: { ...prev[item.field], min: "" },
                      }))
                    }
                  }}
                />
              </View>
              <Text>to</Text>
              <View style={themed($FilterTextInputView)}>
                <TextInput
                  style={themed($FilterTextInput)}
                  placeholder="Max"
                  keyboardType="decimal-pad"
                  value={fieldRawInputs.max || (max !== null ? max.toString() : "")}
                  onChangeText={(text) => {
                    setRawInputs((prev) => ({
                      ...prev,
                      [item.field]: { ...prev[item.field], max: text },
                    }))
                    const value = text && !isNaN(parseFloat(text)) ? parseFloat(text) : null
                    setLocalInputs({
                      ...localInputs,
                      [item.field]: { ...localInputs[item.field], max: value },
                    })
                  }}
                  onBlur={() => {
                    const value = fieldRawInputs.max
                    if (!value || isNaN(parseFloat(value))) {
                      setRawInputs((prev) => ({
                        ...prev,
                        [item.field]: { ...prev[item.field], max: "" },
                      }))
                    }
                  }}
                />
              </View>
            </View>
          </View>
        )
      })}
    </ScrollView>
  )
}

const $FilterItemView: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.sm,
  borderBottomWidth: 1,
  borderBottomColor: colors.palette.neutral400,
})

const $FilterItemHeaderView: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
})

const $FilterItemTitleText: ThemedStyle<TextStyle> = ({ spacing }) => ({
  fontSize: spacing.lg,
  lineHeight: spacing.lg * 1.2,
  fontFamily: "plusJakartaSansMedium",
})

const $FilterItemDescriptionText: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  fontSize: spacing.sm,
  lineHeight: spacing.sm * 1.2,
  letterSpacing: 0.5,
  marginTop: spacing.xs,
  marginBottom: spacing.sm,
  color: colors.palette.neutral700,
  fontFamily: "plusJakartaSansRegular",
})

const $FilterTextInputContainer: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
})

const $FilterTextInputView: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  borderWidth: 1,
  backgroundColor: colors.palette.neutral600,
  borderRadius: spacing.sm,
  width: 100,
  height: spacing.xxl,
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.sm,
  fontSize: spacing.md,
  color: colors.text,
  fontFamily: "plusJakartaSansRegular",
})

const $FilterTextInput: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.palette.neutral100,
  fontFamily: "plusJakartaSansMedium",
  paddingHorizontal: spacing.xxs,
  paddingVertical: spacing.xxxs,
  fontSize: spacing.md,
  lineHeight: spacing.md * 1.2,
})
