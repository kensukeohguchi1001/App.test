import { TRACK, BOOST_PADS, getStartPositions, getPointAtArc, trackDirectionAt } from './track'
import { createKart, updatePlayerKart, updateAiKart, lapOf } from './kart'

const TOTAL_LAPS = 3
const COUNTDOWN_SECONDS = 3
const KART_RADIUS = 20

const RACERS = [
  { id: 'player', name: 'あなた', color: '#3b82f6', isPlayer: true },
  { id: 'cpu1', name: 'キツネ号', color: '#f97316', isPlayer: false },
  { id: 'cpu2', name: 'カメ号', color: '#16a34a', isPlayer: false },
  { id: 'cpu3', name: 'ワシ号', color: '#a855f7', isPlayer: false },
]

export class RaceEngine {
  constructor(canvas, onStateChange) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.onStateChange = onStateChange
    this.input = { up: false, down: false, left: false, right: false }
    this.phase = 'countdown'
    this.countdown = COUNTDOWN_SECONDS
    this.elapsed = 0
    this.running = false
    this.lastState = null

    const starts = getStartPositions(RACERS.length)
    this.karts = RACERS.map((r, i) => createKart({ ...r, ...starts[i] }))

    this.frame = this.frame.bind(this)
    this.lastTime = performance.now()
    this.emitState(true)
  }

  start() {
    this.running = true
    this.lastTime = performance.now()
    requestAnimationFrame(this.frame)
  }

  stop() {
    this.running = false
  }

  setInput(key, value) {
    if (key in this.input) this.input[key] = value
  }

  frame(now) {
    if (!this.running) return
    const dt = Math.min(0.05, (now - this.lastTime) / 1000)
    this.lastTime = now
    this.update(dt)
    this.render()
    requestAnimationFrame(this.frame)
  }

  update(dt) {
    if (this.phase === 'countdown') {
      this.countdown -= dt
      if (this.countdown <= 0) {
        this.countdown = 0
        this.phase = 'racing'
      }
      this.emitState()
      return
    }

    if (this.phase === 'racing') {
      this.elapsed += dt
      for (const kart of this.karts) {
        if (kart.finished) continue
        if (kart.isPlayer) updatePlayerKart(kart, this.input, dt)
        else updateAiKart(kart, dt)
        kart.lap = Math.max(1, Math.min(lapOf(kart), TOTAL_LAPS))
        if (lapOf(kart) > TOTAL_LAPS && !kart.finished) {
          kart.finished = true
          kart.finishTime = this.elapsed
        }
      }
      this.resolveCollisions()

      if (this.karts.find((k) => k.isPlayer)?.finished) {
        this.phase = 'finished'
      }
      this.emitState()
    }
  }

  resolveCollisions() {
    const karts = this.karts
    for (let i = 0; i < karts.length; i++) {
      for (let j = i + 1; j < karts.length; j++) {
        const a = karts[i]
        const b = karts[j]
        const dx = b.x - a.x
        const dy = b.y - a.y
        const dist = Math.hypot(dx, dy) || 0.001
        const overlap = KART_RADIUS * 2 - dist
        if (overlap > 0) {
          const nx = dx / dist
          const ny = dy / dist
          a.x -= nx * overlap * 0.5
          a.y -= ny * overlap * 0.5
          b.x += nx * overlap * 0.5
          b.y += ny * overlap * 0.5
          a.speed *= 0.92
          b.speed *= 0.92
        }
      }
    }
  }

  standings() {
    return [...this.karts].sort((a, b) => b.unwrappedS - a.unwrappedS)
  }

  emitState(force) {
    const player = this.karts.find((k) => k.isPlayer)
    const rank = this.standings().findIndex((k) => k.id === player.id) + 1
    const state = {
      phase: this.phase,
      countdown: Math.ceil(this.countdown),
      lap: player.lap,
      totalLaps: TOTAL_LAPS,
      rank,
      total: this.karts.length,
      speed: Math.round(Math.abs(player.speed)),
      boosting: player.boostTimer > 0,
      results:
        this.phase === 'finished'
          ? this.standings().map((k, idx) => ({ id: k.id, name: k.name, place: idx + 1, isPlayer: k.isPlayer }))
          : null,
    }
    const changed =
      force ||
      !this.lastState ||
      this.lastState.phase !== state.phase ||
      this.lastState.countdown !== state.countdown ||
      this.lastState.lap !== state.lap ||
      this.lastState.rank !== state.rank ||
      Math.abs(this.lastState.speed - state.speed) >= 5 ||
      this.lastState.boosting !== state.boosting
    this.lastState = state
    if (changed) this.onStateChange(state)
  }

  render() {
    const { ctx, canvas } = this
    const player = this.karts.find((k) => k.isPlayer)
    const w = canvas.width
    const h = canvas.height
    const camX = player.x - w / 2
    const camY = player.y - h / 2

    ctx.save()
    ctx.fillStyle = '#4c9a4c'
    ctx.fillRect(0, 0, w, h)
    drawGrassTexture(ctx, camX, camY, w, h)

    ctx.translate(-camX, -camY)
    drawTrack(ctx)
    drawBoostPads(ctx)
    for (const kart of this.karts) drawKart(ctx, kart)
    ctx.restore()
  }
}

function drawGrassTexture(ctx, camX, camY, w, h) {
  ctx.fillStyle = 'rgba(0,0,0,0.05)'
  const spacing = 60
  const offsetX = -((camX % spacing) + spacing) % spacing
  const offsetY = -((camY % spacing) + spacing) % spacing
  for (let x = offsetX; x < w; x += spacing) {
    for (let y = offsetY; y < h; y += spacing) {
      ctx.beginPath()
      ctx.arc(x, y, 3, 0, Math.PI * 2)
      ctx.fill()
    }
  }
}

function drawTrack(ctx) {
  const pts = TRACK.points
  const rw = TRACK.roadHalfWidth

  ctx.beginPath()
  pts.forEach((p, i) => (i === 0 ? ctx.moveTo(p[0], p[1]) : ctx.lineTo(p[0], p[1])))
  ctx.closePath()
  ctx.lineWidth = rw * 2
  ctx.strokeStyle = '#5b6472'
  ctx.lineJoin = 'round'
  ctx.stroke()

  ctx.lineWidth = rw * 2 + 14
  ctx.strokeStyle = 'transparent'

  // curb stripes (red/white) along both edges
  ctx.save()
  ctx.setLineDash([26, 26])
  ctx.lineWidth = 14
  ctx.strokeStyle = '#e11d48'
  ctx.lineJoin = 'round'
  strokeOffsetPath(ctx, pts, rw + 6)
  strokeOffsetPath(ctx, pts, -(rw + 6))
  ctx.restore()

  // dashed centerline
  ctx.save()
  ctx.setLineDash([20, 24])
  ctx.lineWidth = 4
  ctx.strokeStyle = 'rgba(255,255,255,0.6)'
  ctx.beginPath()
  pts.forEach((p, i) => (i === 0 ? ctx.moveTo(p[0], p[1]) : ctx.lineTo(p[0], p[1])))
  ctx.closePath()
  ctx.stroke()
  ctx.restore()

  drawStartLine(ctx)
}

function strokeOffsetPath(ctx, pts, offset) {
  ctx.beginPath()
  const n = pts.length
  for (let i = 0; i <= n; i++) {
    const cur = pts[i % n]
    const next = pts[(i + 1) % n]
    const dx = next[0] - cur[0]
    const dy = next[1] - cur[1]
    const len = Math.hypot(dx, dy) || 1
    const px = (-dy / len) * offset
    const py = (dx / len) * offset
    const x = cur[0] + px
    const y = cur[1] + py
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.stroke()
}

function drawStartLine(ctx) {
  const p0 = getPointAtArc(0)
  const dir = trackDirectionAt(0)
  const perp = [-dir[1], dir[0]]
  const rw = TRACK.roadHalfWidth
  const squares = 8
  const squareLen = (rw * 2) / squares
  ctx.save()
  for (let i = 0; i < squares; i++) {
    const t = -rw + i * squareLen
    const cx = p0.x + perp[0] * t
    const cy = p0.y + perp[1] * t
    ctx.fillStyle = i % 2 === 0 ? '#111827' : '#f9fafb'
    ctx.save()
    ctx.translate(cx, cy)
    ctx.rotate(Math.atan2(dir[1], dir[0]))
    ctx.fillRect(-4, 0, 8, squareLen)
    ctx.restore()
  }
  ctx.restore()
}

function drawBoostPads(ctx) {
  ctx.save()
  ctx.fillStyle = 'rgba(250, 204, 21, 0.85)'
  for (const [s, e] of BOOST_PADS) {
    const steps = 6
    for (let i = 0; i <= steps; i++) {
      const arc = s + ((e - s) * i) / steps
      const p = getPointAtArc(arc)
      const dir = trackDirectionAt(arc)
      const angle = Math.atan2(dir[1], dir[0])
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(angle)
      ctx.beginPath()
      ctx.moveTo(-10, -14)
      ctx.lineTo(10, 0)
      ctx.lineTo(-10, 14)
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }
  }
  ctx.restore()
}

function drawKart(ctx, kart) {
  ctx.save()
  ctx.translate(kart.x, kart.y)
  ctx.rotate(kart.angle)

  ctx.fillStyle = 'rgba(0,0,0,0.25)'
  ctx.beginPath()
  ctx.ellipse(0, 3, 17, 11, 0, 0, Math.PI * 2)
  ctx.fill()

  if (kart.boostTimer > 0) {
    ctx.fillStyle = 'rgba(251, 146, 60, 0.55)'
    ctx.beginPath()
    ctx.moveTo(-16, -8)
    ctx.lineTo(-32, 0)
    ctx.lineTo(-16, 8)
    ctx.closePath()
    ctx.fill()
  }

  ctx.fillStyle = '#1f2937'
  ctx.fillRect(-13, -11, 8, 6)
  ctx.fillRect(-13, 5, 8, 6)
  ctx.fillRect(9, -11, 8, 6)
  ctx.fillRect(9, 5, 8, 6)

  ctx.fillStyle = kart.color
  roundedRect(ctx, -16, -10, 32, 20, 7)
  ctx.fill()

  ctx.fillStyle = 'rgba(255,255,255,0.85)'
  roundedRect(ctx, 2, -6, 10, 12, 3)
  ctx.fill()

  ctx.restore()
}

function roundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}
