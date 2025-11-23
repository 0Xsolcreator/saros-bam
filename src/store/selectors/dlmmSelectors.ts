import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "../store"

const selectDlmmQueryResult = (state: RootState) =>
  state.geckoTerminalApi.queries['getAndUpdateDlmmPools({"dexs":["saros-dlmm","meteora"]})']
    ?.data ?? []

const selectFilters = (state: RootState) => state.dlmmPoolFilters
const protocol = (state: RootState) => state.dlmmPoolFilters.protocol

export const selectFilteredDlmmData = createSelector(
  [selectDlmmQueryResult, selectFilters, protocol],
  (data, filters, protocol) => {
    let result = Array.isArray(data) ? [...data] : []

    switch (protocol) {
      case "saros-dlmm":
        result = result.filter((item) => item.dex === "saros-dlmm")
        break
      case "meteora":
        result = result.filter((item) => item.dex === "meteora")
        break
      case "all":
      default:
        break
    }

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
