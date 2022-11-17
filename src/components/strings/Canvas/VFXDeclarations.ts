import nightSky from "../../../VFX/nightSky"
import opaque from "../../../VFX/opaque"
import radar from "../../../VFX/radar"
import voids from "../../../VFX/voids"

type TriggerMap = {
  [index: string]: ((data: { [index: string]: any }) => () => void)[]
}

export const functionToTriggers: TriggerMap = {
  q: [radar],
  w: [voids],
  e: [nightSky],
}
export const functionToNonAvailableTriggers: TriggerMap = {
  z: [opaque],
}
