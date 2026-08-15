import booleanPointInPolygon from '@turf/boolean-point-in-polygon'
import { point } from '@turf/helpers'

export const KIND_LABELS = {
  debris_flow: '土石流',
  steep_slope: '急傾斜地の崩壊',
  landslide: '地すべり',
}

export const CATEGORY_LABELS = {
  caution: '土砂災害警戒区域（イエローゾーン）',
  special: '土砂災害特別警戒区域（レッドゾーン）',
}

export const CATEGORY_COLORS = {
  caution: '#e8a838',
  special: '#d0402a',
}

// Returns all sample hazard-zone features that contain the given [lat, lng] point.
export function findZonesAtPoint(featureCollection, lat, lng) {
  if (!featureCollection?.features?.length) return []
  const pt = point([lng, lat])
  return featureCollection.features.filter((feature) => {
    try {
      return booleanPointInPolygon(pt, feature)
    } catch {
      return false
    }
  })
}
