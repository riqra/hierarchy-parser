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
      children: [
        {
          id: 3,
          name: 'Decor',
          children: [
            {
              id: 6,
              name: 'Frames'
            }
          ]
        },
        {
          id: 4,
          name: 'Bath'
        }
      ]
    },
    {
      id: 2,
      name: 'Tech',
      children: [
        {
          id: 5,
          name: 'Games'
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
      children: [
        {
          id: 6,
          name: 'Frames'
        }
      ]
    }
  ]

  const hierarchy = hierarchyParser(data, 'parentId', 3)

  t.deepEqual(hierarchy, expected)
})
