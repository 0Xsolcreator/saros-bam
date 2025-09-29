import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "../store"

const selectDlmmQueryResult = (state: RootState) =>
  state.geckoTerminalApi.queries['getAndUpdateDlmmPools({"dex":"saros-dlmm"})']?.data ?? []

const selectFilters = (state: RootState) => state.dlmmPoolFilters

export const selectFilteredDlmmData = createSelector(
  [selectDlmmQueryResult, selectFilters],
  (data, filters) => {
    let result = Array.isArray(data) ? [...data] : []

    if (filters.sortBy !== undefined && filters.sortBy !== null) {
      result.sort((a, b) => {
        const fieldA = a[filters.sortBy as keyof typeof a]
        const fieldB = b[filters.sortBy as keyof typeof b]

        if (filters.sortOrder === "asc") return fieldA - fieldB
        return fieldB - fieldA
      })
    }

    return result
  },
)
