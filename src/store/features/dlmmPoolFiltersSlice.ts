import { createSlice } from "@reduxjs/toolkit"

type SortField =
  | "mcap"
  | "volume"
  | "fees"
  | "fdv"
  | "tvl"
  | "age"
  | "orgScore"
  | "holders"
  | "volatility"
  | null

type SortOrder = "asc" | "desc"

interface DlmmPoolFiltersState {
  sortBy: SortField
  sortOrder: SortOrder
}

const initialState: DlmmPoolFiltersState = {
  sortBy: null,
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
