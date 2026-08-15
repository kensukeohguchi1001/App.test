import { TRACK, getPointAtArc, projectToTrack, isOnBoostPad } from './track'

const MAX_SPEED = 420
const ACCEL = 340
const BRAKE = 480
const NATURAL_DECEL = 160
const OFFTRACK_MAX_SPEED = 160
const TURN_RATE = 2.6 // rad/sec at full speed fraction
const BOOST_SPEED_MULT = 1.55
const BOOST_DURATION = 1.1

export function createKart({ id, name, color, isPlayer, x, y, angle }) {
  return {
    id,
    name,
    color,
    isPlayer,
    x,
    y,
    angle,
    speed: 0,
    rawArc: projectToTrack(x, y).arc,
    prevRawArc: projectToTrack(x, y).arc,
    unwrappedS: 0,
    lap: 1,
    finished: false,
    finishTime: null,
    boostTimer: 0,
    aiWobble: Math.random() * Math.PI * 2,
    aiSkill: 0.85 + Math.random() * 0.3,
  }
}

function updateArcProgress(kart) {
  const { arc, lateral } = projectToTrack(kart.x, kart.y)
  kart.rawArc = arc
  kart.lateralOffset = lateral
  let delta = kart.rawArc - kart.prevRawArc
  const L = TRACK.length
  if (delta > L / 2) delta -= L
  if (delta < -L / 2) delta += L
  kart.unwrappedS += delta
  kart.prevRawArc = kart.rawArc
}

function applyMotion(kart, dt, throttle, steer) {
  const onTrack = Math.abs(kart.lateralOffset ?? 0) <= TRACK.roadHalfWidth
  const cap = kart.boostTimer > 0 ? MAX_SPEED * BOOST_SPEED_MULT : onTrack ? MAX_SPEED : OFFTRACK_MAX_SPEED

  if (throttle > 0) {
    kart.speed += ACCEL * dt * throttle
  } else if (throttle < 0) {
    kart.speed += BRAKE * dt * throttle
  } else {
    kart.speed -= Math.sign(kart.speed) * NATURAL_DECEL * dt
  }
  kart.speed = Math.max(-MAX_SPEED * 0.5, Math.min(cap, kart.speed))
  if (!onTrack) kart.speed = Math.min(kart.speed, OFFTRACK_MAX_SPEED)

  const speedFraction = Math.abs(kart.speed) / MAX_SPEED
  kart.angle += steer * TURN_RATE * dt * (0.4 + 0.6 * Math.min(1, speedFraction * 1.6))

  kart.x += Math.cos(kart.angle) * kart.speed * dt
  kart.y += Math.sin(kart.angle) * kart.speed * dt

  if (kart.boostTimer > 0) kart.boostTimer = Math.max(0, kart.boostTimer - dt)

  updateArcProgress(kart)
  if (isOnBoostPad(kart.rawArc) && kart.boostTimer <= 0.05) {
    kart.boostTimer = BOOST_DURATION
  }
}

export function updatePlayerKart(kart, input, dt) {
  const throttle = input.up ? 1 : input.down ? -1 : 0
  const steer = (input.left ? -1 : 0) + (input.right ? 1 : 0)
  applyMotion(kart, dt, throttle, steer)
}

export function updateAiKart(kart, dt) {
  const lookahead = 190 + kart.aiSkill * 40
  const target = getPointAtArc(kart.rawArc + lookahead)
  const toTargetAngle = Math.atan2(target.y - kart.y, target.x - kart.x)
  let diff = toTargetAngle - kart.angle
  diff = Math.atan2(Math.sin(diff), Math.cos(diff))
  const steer = Math.max(-1, Math.min(1, diff * 2.2))
  const throttle = Math.abs(diff) > 1.1 ? 0.4 : kart.aiSkill
  applyMotion(kart, dt, throttle, steer)
}

export function lapOf(kart) {
  return Math.floor(kart.unwrappedS / TRACK.length) + 1
}
