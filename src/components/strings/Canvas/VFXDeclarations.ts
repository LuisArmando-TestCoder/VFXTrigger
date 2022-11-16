import opaque from "../../../VFX/clear/opaque"
import radar from "../../../VFX/show/radar"

type TriggerMap = {
  [index: string]: ((data: { [index: string]: any }) => () => void)[]
}

export const functionToTriggers: TriggerMap = {
  q: [radar],
}
export const functionToNonAvailableTriggers: TriggerMap = {
  w: [opaque],
}
