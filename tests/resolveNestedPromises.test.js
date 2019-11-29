import { resolveNestedPromises } from '../src'

describe('resolves', () => {

  it('null values', () => {
    const PAYLOAD = null
    const EXPECTED_RESULT = null

    return resolveNestedPromises(PAYLOAD)
      .then((result) => {
        expect(result).toBe(EXPECTED_RESULT)
      })
  })

  it('primitive values', () => {
    const PAYLOAD = 'a'
    const EXPECTED_RESULT = 'a'

    return resolveNestedPromises(PAYLOAD)
      .then((result) => {
        expect(result).toBe(EXPECTED_RESULT)
      })
  })

  it('single normal promises', () => {
    const PAYLOAD = Promise.resolve('RESULT')
    const EXPECTED_RESULT = 'RESULT'

    return resolveNestedPromises(PAYLOAD)
      .then((result) => {
        expect(result).toBe(EXPECTED_RESULT)
      })
  })

  it('promises in object props, not nested', () => {
    const PAYLOAD = {
      a: Promise.resolve('a'),
      b: Promise.resolve('b'),
    }
    const EXPECTED_RESULT = {
      a: 'a',
      b: 'b',
    }

    return resolveNestedPromises(PAYLOAD)
      .then((result) => {
        expect(result).toEqual(EXPECTED_RESULT)
      })
  })

  it('promises in object props, nested', () => {
    const PAYLOAD = {
      a: Promise.resolve('a'),
      b: {
        c: Promise.resolve('c'),
      },
    }
    const EXPECTED_RESULT = {
      a: 'a',
      b: { c: 'c' },
    }

    return resolveNestedPromises(PAYLOAD)
      .then((result) => {
        expect(result).toEqual(EXPECTED_RESULT)
      })
  })

  it('promises in object props, nested, mixed with non promise values', () => {
    const PAYLOAD = {
      a: Promise.resolve('a'),
      b: {
        c: Promise.resolve('c'),
        d: 'd',
      },
      e: 'e',
      f: { g: null }
    }
    const EXPECTED_RESULT = {
      a: 'a',
      b: { c: 'c', d: 'd', },
      e: 'e',
      f: { g: null }
    }

    return resolveNestedPromises(PAYLOAD)
      .then((result) => {
        expect(result).toEqual(EXPECTED_RESULT)
      })
  })

  it('promises in object props, nested multiple times', () => {
    const PAYLOAD = {
      a: Promise.resolve('a'),
      b: {
        c: {
          d: {
            e: Promise.resolve('e'),
          },
        },
      },
    }
    const EXPECTED_RESULT = {
      a: 'a',
      b: { c: { d: { e: 'e' } } },
    }

    return resolveNestedPromises(PAYLOAD)
      .then((result) => {
        expect(result).toEqual(EXPECTED_RESULT)
      })
  })

  it('promises in arrays', () => {
    const PAYLOAD = [Promise.resolve('a'), Promise.resolve('b')]
    const EXPECTED_RESULT = ['a', 'b']

    return resolveNestedPromises(PAYLOAD)
      .then((result) => {
        expect(result).toEqual(EXPECTED_RESULT)
      })
  })

  it('promises in objects in arrays', () => {
    const PAYLOAD = [
      {
        a: Promise.resolve('a'),
        b: Promise.resolve('b'),
      },
      {
        a: Promise.resolve('a'),
        b: {
          c: {
            d: {
              e: Promise.resolve('e'),
            },
          },
        },
      }
    ]
    const EXPECTED_RESULT = [
      {
        a: 'a',
        b: 'b',
      },
      {
        a: 'a',
        b: { c: { d: { e: 'e' } } },
      }
    ]

    return resolveNestedPromises(PAYLOAD)
      .then((result) => {
        expect(result).toEqual(EXPECTED_RESULT)
      })
  })

})