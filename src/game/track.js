// Original track shape (not based on any existing game). Control points for a
// closed loop; a Catmull-Rom spline through them gives a smooth centerline.
const CONTROL_POINTS = [
  [320, 220],
  [900, 140],
  [1420, 260],
  [1680, 520],
  [1520, 780],
  [1640, 990],
  [1300, 1140],
  [780, 1080],
  [460, 920],
  [220, 700],
  [140, 460],
]

const ROAD_HALF_WIDTH = 100
const POINTS_PER_SEGMENT = 18

function catmullRom(p0, p1, p2, p3, t) {
  const t2 = t * t
  const t3 = t2 * t
  const x =
    0.5 *
    (2 * p1[0] +
      (-p0[0] + p2[0]) * t +
      (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 +
      (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3)
  const y =
    0.5 *
    (2 * p1[1] +
      (-p0[1] + p2[1]) * t +
      (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 +
      (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3)
  return [x, y]
}

function buildCenterline(controlPoints) {
  const n = controlPoints.length
  const pts = []
  for (let i = 0; i < n; i++) {
    const p0 = controlPoints[(i - 1 + n) % n]
    const p1 = controlPoints[i]
    const p2 = controlPoints[(i + 1) % n]
    const p3 = controlPoints[(i + 2) % n]
    for (let j = 0; j < POINTS_PER_SEGMENT; j++) {
      const t = j / POINTS_PER_SEGMENT
      pts.push(catmullRom(p0, p1, p2, p3, t))
    }
  }
  return pts
}

function buildTrack() {
  const points = buildCenterline(CONTROL_POINTS)
  const n = points.length
  const cumulative = new Array(n)
  let total = 0
  for (let i = 0; i < n; i++) {
    cumulative[i] = total
    const next = points[(i + 1) % n]
    total += Math.hypot(next[0] - points[i][0], next[1] - points[i][1])
  }
  return { points, cumulative, length: total, roadHalfWidth: ROAD_HALF_WIDTH }
}

export const TRACK = buildTrack()

// Boost pad zones, given as [startFraction, endFraction] of total track length.
export const BOOST_PADS = [
  [0.28, 0.33],
  [0.68, 0.73],
].map(([a, b]) => [a * TRACK.length, b * TRACK.length])

export function getStartPositions(count) {
  // Grid just behind the start/finish line, staggered two-by-two, all facing forward.
  const dir = trackDirectionAt(0)
  const perp = [-dir[1], dir[0]]
  const start = TRACK.points[0]
  const positions = []
  for (let i = 0; i < count; i++) {
    const row = Math.floor(i / 2)
    const side = i % 2 === 0 ? -1 : 1
    const back = 60 + row * 70
    const lateral = side * 32
    positions.push({
      x: start[0] - dir[0] * back + perp[0] * lateral,
      y: start[1] - dir[1] * back + perp[1] * lateral,
      angle: Math.atan2(dir[1], dir[0]),
    })
  }
  return positions
}

function wrapIndex(i) {
  const n = TRACK.points.length
  return ((i % n) + n) % n
}

export function trackDirectionAt(arc) {
  const idx = arcToIndex(arc)
  const a = TRACK.points[idx]
  const b = TRACK.points[wrapIndex(idx + 1)]
  const dx = b[0] - a[0]
  const dy = b[1] - a[1]
  const len = Math.hypot(dx, dy) || 1
  return [dx / len, dy / len]
}

function arcToIndex(arc) {
  const L = TRACK.length
  let a = ((arc % L) + L) % L
  // binary search cumulative array
  const cum = TRACK.cumulative
  let lo = 0
  let hi = cum.length - 1
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1
    if (cum[mid] <= a) lo = mid
    else hi = mid - 1
  }
  return lo
}

export function getPointAtArc(arc) {
  const idx = arcToIndex(arc)
  const L = TRACK.length
  const a = ((arc % L) + L) % L
  const segStart = TRACK.cumulative[idx]
  const next = TRACK.points[wrapIndex(idx + 1)]
  const cur = TRACK.points[idx]
  const segLen = Math.hypot(next[0] - cur[0], next[1] - cur[1]) || 1
  const t = (a - segStart) / segLen
  return {
    x: cur[0] + (next[0] - cur[0]) * t,
    y: cur[1] + (next[1] - cur[1]) * t,
  }
}

// Projects a world point onto the track centerline: returns arc-length position
// and signed lateral offset (perpendicular distance; sign indicates side).
export function projectToTrack(x, y) {
  const pts = TRACK.points
  const n = pts.length
  let best = { distSq: Infinity, arc: 0, lateral: 0 }
  for (let i = 0; i < n; i++) {
    const a = pts[i]
    const b = pts[wrapIndex(i + 1)]
    const abx = b[0] - a[0]
    const aby = b[1] - a[1]
    const segLenSq = abx * abx + aby * aby || 1
    let t = ((x - a[0]) * abx + (y - a[1]) * aby) / segLenSq
    t = Math.max(0, Math.min(1, t))
    const px = a[0] + abx * t
    const py = a[1] + aby * t
    const dx = x - px
    const dy = y - py
    const distSq = dx * dx + dy * dy
    if (distSq < best.distSq) {
      const segLen = Math.sqrt(segLenSq)
      const cross = abx * dy - aby * dx // sign of lateral offset
      best = {
        distSq,
        arc: TRACK.cumulative[i] + t * segLen,
        lateral: Math.sign(cross) * Math.sqrt(distSq),
      }
    }
  }
  return best
}

export function isOnBoostPad(arc) {
  const L = TRACK.length
  const a = ((arc % L) + L) % L
  return BOOST_PADS.some(([s, e]) => a >= s && a <= e)
}
