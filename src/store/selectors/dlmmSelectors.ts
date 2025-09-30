import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "../store"

const selectDlmmQueryResult = (state: RootState) =>
  state.geckoTerminalApi.queries['getAndUpdateDlmmPools({"dex":"saros-dlmm"})']?.data ?? []

const selectFilters = (state: RootState) => state.dlmmPoolFilters

export const selectFilteredDlmmData = createSelector(
  [selectDlmmQueryResult, selectFilters],
  (data, filters) => {
    let result = Array.isArray(data) ? [...data] : []

    const rangeFilters = filters.rangeFilters

    for (const [field, { min, max }] of Object.entries(rangeFilters)) {
      result = result.filter((item) => {
        if (min !== null && item[field] < min) return false
        if (max !== null && item[field] > max) return false
        return true
      })
    }

    if (filters.sortBy) {
      result.sort((a, b) => {
        const valA = a[filters.sortBy!]
        const valB = b[filters.sortBy!]

        if (typeof valA === "number" && typeof valB === "number") {
          return filters.sortOrder === "asc" ? valA - valB : valB - valA
        }

        return 0
      })
    }

    return result
  },
)
