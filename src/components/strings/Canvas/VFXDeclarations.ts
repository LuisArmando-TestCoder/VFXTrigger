import nightSky from "../../../VFX/nightSky"
import opaque from "../../../VFX/opaque"
import radar from "../../../VFX/radar"
import boids from "../../../VFX/boids"
import warp from "../../../VFX/warp"
import clockLines from "../../../VFX/clockLines"
import warpBoids from "../../../VFX/warpBoids"
import trappedBoids from "../../../VFX/trappedBoids"

type TriggerMap = {
  [index: string]: ((data: { [index: string]: any }) => () => void)[]
}

export const functionToTriggers: TriggerMap = {
  q: [boids],
  w: [warpBoids],
  e: [trappedBoids],
  r: [radar],
  t: [nightSky],
  y: [warp],
  u: [clockLines],
}
export const functionToNonAvailableTriggers: TriggerMap = {
  m: [opaque],
}
