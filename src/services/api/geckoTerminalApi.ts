import { ageInHrs, formatDateTime } from "@/utils/dateTimeOperations"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

type TimePeriod = "m5" | "m15" | "m30" | "h1" | "h6" | "h24"

interface TokenStatsPeriod {
  priceChange: number
  liquidityChange: number
  volumeChange: number
  buyVolume: number
  sellVolume: number
  buyOrganicVolume: number
  sellOrganicVolume: number
  numBuys: number
  numSells: number
  numTraders: number
  numOrganicBuyers: number
  numNetBuyers: number
}

interface FirstPool {
  id: string
  createdAt: string
}

interface TokenAudit {
  mintAuthorityDisabled: boolean
  freezeAuthorityDisabled: boolean
  topHoldersPercentage: number
}

interface TokenInfo {
  id: string
  name: string
  symbol: string
  icon: string
  decimals: number
  circSupply: number
  totalSupply: number
  tokenProgram: string
  firstPool: FirstPool
  holderCount: number
  audit: TokenAudit
  organicScore: number
  organicScoreLabel: string
  isVerified: boolean
  cexes: string[]
  tags: string[]
  fdv: number
  mcap: number
  usdPrice: number
  priceBlockId: number
  liquidity: number
  stats5m: TokenStatsPeriod
  stats1h: TokenStatsPeriod
  stats6h: TokenStatsPeriod
  stats24h: TokenStatsPeriod
  ctLikes: number
  smartCtLikes: number
  updatedAt: string
}

type TokenInfoResponse = TokenInfo[]

interface PriceChangePercentage {
  m5: string
  m15: string
  m30: string
  h1: string
  h6: string
  h24: string
}

interface TransactionPeriodData {
  buys: number
  sells: number
  buyers: number
  sellers: number
}

interface Transactions {
  m5: TransactionPeriodData
  m15: TransactionPeriodData
  m30: TransactionPeriodData
  h1: TransactionPeriodData
  h6: TransactionPeriodData
  h24: TransactionPeriodData
}

interface VolumeUsd {
  m5: string
  m15: string
  m30: string
  h1: string
  h6: string
  h24: string
}

interface PoolAttributes {
  base_token_price_usd: string
  base_token_price_native_currency: string
  quote_token_price_usd: string
  quote_token_price_native_currency: string
  base_token_price_quote_token: string
  quote_token_price_base_token: string
  address: string
  name: string
  pool_created_at: string
  fdv_usd: string
  market_cap_usd: string
  price_change_percentage: PriceChangePercentage
  transactions: Transactions
  volume_usd: VolumeUsd
  reserve_in_usd: string
}

interface TokenReference {
  id: string
  type: "token"
}

interface DexReference {
  id: string
  type: "dex"
}

interface PoolRelationships {
  base_token: {
    data: TokenReference
  }
  quote_token: {
    data: TokenReference
  }
  dex: {
    data: DexReference
  }
}

interface Pool {
  id: string
  type: "pool"
  attributes: PoolAttributes
  relationships: PoolRelationships
}

interface DlmmPoolsState {
  data: Pool[]
}

export interface DlmmPoolsData {
  dex: string
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

const baseQuery = fetchBaseQuery({
  baseUrl: "https://api.geckoterminal.com/api/v2/",
})

export const geckoTerminalApi = createApi({
  reducerPath: "geckoTerminalApi",
  baseQuery,
  endpoints: (build) => ({
    getAndUpdateDlmmPools: build.query<DlmmPoolsData[], { dexs: string[] }>({
      async queryFn({ dexs }, _api, _extraOptions, fetchWithBQ) {
        let dlmmPools: DlmmPoolsState = { data: [] }

        for (const dex of dexs) {
          for (let i = 1; i <= 10; i++) {
            const pageResponse = await fetchWithBQ({
              url: `networks/solana/dexes/${dex}/pools?page=${i}`,
              method: "GET",
            })

            if (pageResponse.error || !pageResponse.data) {
              break
            }

            dlmmPools.data = [...dlmmPools.data, ...(pageResponse.data as DlmmPoolsState).data]
          }
        }

        let filteredUSDCANDSOLPools = dlmmPools.data.filter((pool) => {
          const isNameEndingWithUSDCOrSOL =
            pool.attributes.name.endsWith("USDC") || pool.attributes.name.endsWith("SOL")

          return isNameEndingWithUSDCOrSOL
        })

        let constructedMintQuery: string[] = []
        for (let i = 0; i < filteredUSDCANDSOLPools.length / 100; i++) {
          let mintQuery = filteredUSDCANDSOLPools.slice(i * 100, (i + 1) * 100).map((pool) => {
            const identifier = pool.relationships.base_token.data.id
            const mint = identifier.substring(7)
            return `${mint}`
          })
          constructedMintQuery.push(mintQuery.join(","))
        }

        const tokenInfoDatas: TokenInfoResponse = []
        await Promise.all(
          constructedMintQuery.map(async (mintQuery) => {
            const tokenInfoResponse = await fetch(
              "https://lite-api.jup.ag/tokens/v2/search?query=" + mintQuery,
            )
            const tokenInfoData = (await tokenInfoResponse.json()) as TokenInfoResponse
            tokenInfoDatas.push(...tokenInfoData)
          }),
        )

        let formatedDlmmPools: DlmmPoolsData[] = []

        filteredUSDCANDSOLPools.map((pool) => {
          const baseTokenMint = pool.relationships.base_token.data.id.substring(7)
          const tokenInfo = tokenInfoDatas.find((token) => token.id === baseTokenMint)

          formatedDlmmPools.push({
            dex: pool.relationships.dex.data.id,
            Pair: pool.attributes.name,
            Address: pool.attributes.address,
            TwentyFourHrVol: pool.attributes.volume_usd.h24
              ? parseFloat(pool.attributes.volume_usd.h24)
              : 0,
            Mcap: pool.attributes.market_cap_usd ? parseFloat(pool.attributes.market_cap_usd) : 0,
            Age: ageInHrs(pool.attributes.pool_created_at),
            FDV: pool.attributes.fdv_usd ? parseFloat(pool.attributes.fdv_usd) : 0,
            TVL: pool.attributes.reserve_in_usd ? parseFloat(pool.attributes.reserve_in_usd) : 0,
            Fee: 0,
            BinStep: 0,
            Holders: tokenInfo?.holderCount || 0,
            OrganicScore: tokenInfo?.organicScore || 0,
            VolatilityPercent: tokenInfo?.stats24h?.priceChange || 0,
            LiquidityChangePercent: tokenInfo?.stats24h?.liquidityChange || 0,
            VolumeChangePercent: tokenInfo?.stats24h?.volumeChange || 0,
          })
        })

        return { data: formatedDlmmPools }
      },
    }),
  }),
})

export const { useGetAndUpdateDlmmPoolsQuery } = geckoTerminalApi
