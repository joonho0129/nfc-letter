export const RELATIONSHIP_START = new Date('2025-10-10T00:00:00+09:00')

export function daysSince(start, now = new Date()) {
  const msPerDay = 86400000
  return Math.floor((now.getTime() - start.getTime()) / msPerDay)
}
