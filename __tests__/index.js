const { test } = require('ava')

const hierarchyParser = require('../index')

test('check if data is correctly being parsed', t => {
  const data = [
    {
      id: 1,
      name: 'Home',
      parentId: null
    },
    {
      id: 2,
      name: 'Tech',
      parentId: null
    },
    {
      id: 3,
      name: 'Decor',
      parentId: 1
    },
    {
      id: 4,
      name: 'Bath',
      parentId: 1
    },
    {
      id: 5,
      name: 'Games',
      parentId: 2
    },
    {
      id: 6,
      name: 'Frames',
      parentId: 3
    }
  ]

  const expected = [
    {
      id: 1,
      name: 'Home',
      parentId: null,
      children: [
        {
          id: 3,
          name: 'Decor',
          parentId: 1,
          children: [
            {
              id: 6,
              name: 'Frames',
              parentId: 3
            }
          ]
        },
        {
          id: 4,
          name: 'Bath',
          parentId: 1
        }
      ]
    },
    {
      id: 2,
      name: 'Tech',
      parentId: null,
      children: [
        {
          id: 5,
          name: 'Games',
          parentId: 2
        }
      ]
    }
  ]

  const hierarchy = hierarchyParser(data)

  t.deepEqual(hierarchy, expected)
})

test('it gets children from an specific parent id', t => {
  const data = [
    {
      id: 3,
      name: 'Decor',
      parentId: 1
    },
    {
      id: 6,
      name: 'Frames',
      parentId: 3
    }
  ]

  const expected = [
    {
      id: 3,
      name: 'Decor',
      parentId: 1,
      children: [
        {
          id: 6,
          name: 'Frames',
          parentId: 3
        }
      ]
    }
  ]

  const hierarchy = hierarchyParser(data, { initialParentId: 3 })

  t.deepEqual(hierarchy, expected)
})

test('it can handle different parentKey and identifier', t => {
  const data = [
    {
      sku: 'KD910',
      name: 'Decor',
      ancestor: null
    },
    {
      sku: 'M921LJ',
      name: 'Frames',
      ancestor: 'KD910'
    }
  ]

  const expected = [
    {
      sku: 'KD910',
      name: 'Decor',
      ancestor: null,
      children: [
        {
          sku: 'M921LJ',
          name: 'Frames',
          ancestor: 'KD910'
        }
      ]
    }
  ]

  const hierarchy = hierarchyParser(data, {
    identifier: 'sku',
    parentKey: 'ancestor'
  })

  t.deepEqual(hierarchy, expected)
})

test('check if hierarchyParser is ephemeral', t => {
  const data = [
    {
      id: 1,
      name: 'Werner Heisenberg',
      parentId: null
    },
    {
      id: 2,
      name: 'Sommerfeld',
      parentId: 1
    }
  ]

  const expected = [
    {
      id: 1,
      name: 'Werner Heisenberg',
      parentId: null,
      children: [
        {
          id: 2,
          name: 'Sommerfeld',
          parentId: 1
        }
      ]
    }
  ]

  const hierarchyOne = hierarchyParser(data)
  const hierarchyTwo = hierarchyParser(data)

  t.deepEqual(hierarchyOne, expected)
  t.deepEqual(hierarchyTwo, expected)
})
