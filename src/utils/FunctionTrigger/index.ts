type Triggers = {[index: string]: Function[]}

export default class FunctionTrigger {
  triggers: Triggers = {}
  nonAvailableTriggers: Triggers = {}
  availableTriggersKeys: string[] = []

  subscribeFunctionToTrigger(functionValue, triggerKey) {
    if (!this.triggers[triggerKey]) this.triggers[triggerKey] = []
    this.triggers[triggerKey].push(functionValue)
  }

  subscribeFunctionToNonAvailableTrigger(functionValue, triggerKey) {
    if (!this.nonAvailableTriggers[triggerKey])
      this.nonAvailableTriggers[triggerKey] = []
    this.nonAvailableTriggers[triggerKey].push(functionValue)
  }

  executeAvailableTriggers() {
    this.availableTriggersKeys.forEach(availableTriggersKey => {
      this.triggers[availableTriggersKey]?.forEach(trigger => trigger())
    })
  }

  executeNonAvailableTriggers() {
    const triggerEntries = Object.entries(this.nonAvailableTriggers)

    triggerEntries.forEach(([triggerKey, functionList]) => {
      const isTriggerNotAvailable = this.getTriggerIndex(triggerKey) === -1

      if (isTriggerNotAvailable) {
        functionList.forEach(functionValue => functionValue())
      }
    })
  }

  getTriggerIndex(key) {
    return this.availableTriggersKeys.indexOf(key.toLowerCase())
  }

  listenToTriggerKeysAvailability() {
    const triggerKeys = Object.keys(this.triggers)

    triggerKeys.forEach(triggerKey => {
      window.addEventListener("keydown", ({ key }) => {
        const triggerIndex = this.getTriggerIndex(key)
        const isTriggerNotFound = triggerIndex === -1
        const doesTriggerExist = this.triggers[key.toLowerCase()]

        if (isTriggerNotFound && doesTriggerExist) {
          this.availableTriggersKeys.push(key.toLowerCase())
        }
      })

      window.addEventListener("keyup", ({ key }) => {
        const triggerIndex = this.getTriggerIndex(key)

        if (triggerIndex > -1) {
          this.availableTriggersKeys.splice(triggerIndex, 1)
        }
      })
    })
  }
}

// const functionTrigger = new FunctionTrigger()

// functionTrigger.subscribeFunctionToTrigger(() => {
//   console.log('Hola qué hace?')
// }, 'k')
// functionTrigger.subscribeFunctionToNonAvailableTrigger(() => {
//   console.log('Nada')
// }, 'k')
// functionTrigger.subscribeFunctionToTrigger(() => {
//   console.log('Esto')
// }, 'j')

// functionTrigger.listenToTriggerKeysAvailability()

// ;(function animate() {
//   functionTrigger.executeAvailableTriggers()
//   functionTrigger.executeNonAvailableTriggers()

//   requestAnimationFrame(animate)
// })()
