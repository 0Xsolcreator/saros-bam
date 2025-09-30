import { createSlice } from "@reduxjs/toolkit"

export type SortField =
  | "Mcap"
  | "TwentyFourHrVol"
  | "Fees"
  | "FDV"
  | "TVL"
  | "Age"
  | "OrganicScore"
  | "Holders"
  | "VolatilityPercent"
  | null

type SortOrder = "asc" | "desc"

interface DlmmPoolFiltersState {
  sortBy: SortField
  sortOrder: SortOrder
}

const initialState: DlmmPoolFiltersState = {
  sortBy: "Mcap",
  sortOrder: "desc",
}

export const dlmmPoolFiltersSlice = createSlice({
  name: "dlmmPoolFilters",
  initialState,
  reducers: {
    setSortBy(state, action) {
      state.sortBy = action.payload
    },
    clearAll(state) {
      state.sortBy = null
      state.sortOrder = "desc"
    },
    setSortOrder(state, action) {
      state.sortOrder = action.payload
    },
    toggleSortOrder(state) {
      state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc"
    },
  },
})

export const { setSortBy, setSortOrder, toggleSortOrder, clearAll } = dlmmPoolFiltersSlice.actions
