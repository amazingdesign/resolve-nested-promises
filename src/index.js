const isLikelyAPromise = (obj) => (
  typeof obj.then === 'function'
  &&
  Object.getPrototypeOf(obj).constructor !== Object
)

export const resolveNestedPromises = (payload) => {
  if (
    typeof payload !== 'object' ||
    payload === null ||
    payload instanceof Promise ||
    isLikelyAPromise(payload)
  ) {
    return Promise.resolve(payload)
  }

  if (Array.isArray(payload)) return Promise.all(payload.map(resolveNestedPromises))

  const promisesAccumulator = []
  const keysAccumulator = []

  Object.entries(payload)
    .map(([key, value]) => {
      const promise = resolveNestedPromises(value)
      promisesAccumulator.push(promise)
      keysAccumulator.push(key)
    })

  return Promise.all(promisesAccumulator)
    .then((results) => {
      return results.reduce(
        (r, result, i) => ({ ...r, [keysAccumulator[i]]: result }),
        {}
      )
    })
}

export default resolveNestedPromises