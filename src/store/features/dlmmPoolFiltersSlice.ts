import { createSlice, PayloadAction } from "@reduxjs/toolkit"

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

export type RangeField = Exclude<SortField, null>

interface RangeFilter {
  min: number | null
  max: number | null
}

export type RangeFilters = Record<RangeField, RangeFilter>

type SortOrder = "asc" | "desc"

interface DlmmPoolFiltersState {
  sortBy: SortField
  sortOrder: SortOrder
  rangeFilters: RangeFilters
}

const initialState: DlmmPoolFiltersState = {
  sortBy: "Mcap",
  sortOrder: "desc",
  rangeFilters: {
    Mcap: { min: null, max: null },
    TwentyFourHrVol: { min: null, max: null },
    Fees: { min: null, max: null },
    FDV: { min: null, max: null },
    TVL: { min: null, max: null },
    Age: { min: null, max: null },
    OrganicScore: { min: null, max: null },
    Holders: { min: null, max: null },
    VolatilityPercent: { min: null, max: null },
  },
}
export const sortFieldNames: {
  field: Exclude<SortField, null>
  label: string
  description: string
}[] = [
  {
    field: "Mcap",
    label: "Market Cap",
    description: "Filter pools by market capitalization (in millions).",
  },
  {
    field: "TwentyFourHrVol",
    label: "24h Volume",
    description: "Filter pools by total trading volume in the last 24 hours.",
  },
  {
    field: "Fees",
    label: "Fees",
    description: "Filter pools by trading fees collected.",
  },
  {
    field: "FDV",
    label: "FDV",
    description: "Filter pools by Fully Diluted Valuation.",
  },
  {
    field: "TVL",
    label: "TVL",
    description: "Filter pools by Total Value Locked.",
  },
  {
    field: "Age",
    label: "Age",
    description: "Filter pools by age since launch (in hours).",
  },
  {
    field: "OrganicScore",
    label: "Organic Score",
    description: "Filter pools by Jupiter Organic Score.",
  },
  {
    field: "Holders",
    label: "Holders",
    description: "Filter pools by the number of token holders.",
  },
  {
    field: "VolatilityPercent",
    label: "Volatility",
    description: "Filter pools by price volatility (0-100%).",
  },
]

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
      state.rangeFilters = initialState.rangeFilters
    },
    setSortOrder(state, action) {
      state.sortOrder = action.payload
    },
    toggleSortOrder(state) {
      state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc"
    },
    setRangeFilter(
      state,
      action: PayloadAction<{ field: RangeField; min?: number | null; max?: number | null }>,
    ) {
      const { field, min, max } = action.payload
      if (min !== undefined) state.rangeFilters[field].min = min
      if (max !== undefined) state.rangeFilters[field].max = max
    },
    setMultipleRangeFilters(
      state,
      action: PayloadAction<{ field: RangeField; min: number | null; max: number | null }[]>,
    ) {
      action.payload.forEach(({ field, min, max }) => {
        state.rangeFilters[field] = { min, max }
      })
    },
  },
})

export const {
  setSortBy,
  setSortOrder,
  toggleSortOrder,
  clearAll,
  setRangeFilter,
  setMultipleRangeFilters,
} = dlmmPoolFiltersSlice.actions
