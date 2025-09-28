import { createSlice } from "@reduxjs/toolkit"

interface DlmmPoolsData {
  Pair: string
  Address: string
  TwentyFourHrVol: number
  Mcap: number
  Age: number
  FDV: number
  TVL: number
  Fee: number
  BinStep: number
  Holders: number
  OrganicScore: number
  VolatilityPercent: number
  LiquidityChangePercent: number
  VolumeChangePercent: number
}

interface DlmmPoolsState {
  data: DlmmPoolsData[]
}

const initialState: DlmmPoolsState = {
  data: [],
}

export const dlmmPoolsSlice = createSlice({
  name: "dlmmPools",
  initialState,
  reducers: {
    setDlmmPools: (state, action) => {
      state.data = action.payload.data
    },
    updateDlmmPools: (state, action) => {
      state.data = [...state.data, ...action.payload.data]
    },
    clearDlmmPools: (state) => {
      state.data = []
    },
  },
})

export const { setDlmmPools, clearDlmmPools } = dlmmPoolsSlice.actions
export default dlmmPoolsSlice.reducer
