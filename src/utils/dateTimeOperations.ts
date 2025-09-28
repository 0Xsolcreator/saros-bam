export const formatDateTime = (dateString: string): number => {
  return Date.parse(dateString)
}

export const ageInHrs = (dateString: string): number => {
  const now = Date.now()
  const past = Date.parse(dateString)
  const diffInMs = now - past
  return Math.floor(diffInMs / (1000 * 60 * 60))
}
