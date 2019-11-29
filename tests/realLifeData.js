const findOptions = () => Promise.resolve([
  { _id: 'xxx', name: 'Option 1' },
  { _id: 'yyy', name: 'Option 2' },
  { _id: 'zzz', name: 'Option 3' },
])

export const payload = {
  type: 'object',
  required: [
    'name',
    'lessons'
  ],
  properties: {
    name: {
      type: 'string',
      uniforms: {
        component: 'LongTextField'
      }
    },
    collection: {
      type: 'string'
    },
    privileges: {
      type: 'array',
      items: {
        type: 'string'
      },
      options: findOptions(),
      uniforms: {
        component: 'ListFieldReorder'
      }
    },
    order: {
      type: 'number',
      uniforms: {
        fullWidth: 'true'
      }
    },
    price: {
      type: 'number',
      uniforms: {
        fullWidth: 'true'
      }
    },
    lessons: {
      type: 'array',
      uniforms: {
        component: 'ListFieldReorder'
      },
      items: {
        type: 'object',
        required: [
          'name',
          'id'
        ],
        properties: {
          name: {
            type: 'string'
          },
          id: {
            type: 'string'
          }
        }
      }
    }
  }
}

export const result = {
  type: 'object',
  required: [
    'name',
    'lessons'
  ],
  properties: {
    name: {
      type: 'string',
      uniforms: {
        component: 'LongTextField'
      }
    },
    collection: {
      type: 'string'
    },
    privileges: {
      type: 'array',
      items: {
        type: 'string'
      },
      options: [
        { _id: 'xxx', name: 'Option 1' },
        { _id: 'yyy', name: 'Option 2' },
        { _id: 'zzz', name: 'Option 3' },
      ],
      uniforms: {
        component: 'ListFieldReorder'
      }
    },
    order: {
      type: 'number',
      uniforms: {
        fullWidth: 'true'
      }
    },
    price: {
      type: 'number',
      uniforms: {
        fullWidth: 'true'
      }
    },
    lessons: {
      type: 'array',
      uniforms: {
        component: 'ListFieldReorder'
      },
      items: {
        type: 'object',
        required: [
          'name',
          'id'
        ],
        properties: {
          name: {
            type: 'string'
          },
          id: {
            type: 'string'
          }
        }
      }
    }
  }
}

export default { payload, result }