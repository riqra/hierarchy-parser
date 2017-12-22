[![Build Status](https://travis-ci.org/riqra/hierarchy-parser.svg?branch=master)](https://travis-ci.org/riqra/hierarchy-parser)

## Hierarchy Parser

![](https://res.cloudinary.com/riqra/image/upload/v1513825837/github/hierarchy-parser.svg)

## How to use

|            Name             |  Type  |  Default   | Description                    |
| :-------------------------: | :----: | :--------: | :----------------------------- |
|          **data**           | Array  |            | Data to be parsed              |
|         **options**         | Object |            | Parser options                 |
|   **options.identifier**    | String |    `id`    | Children identifier            |
|    **options.parentKey**    | String | `parentId` | Parent identifier              |
| **options.initialParentId** | String |            | Initial level in the hierarchy |

## Example

```js
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
```

this data will become

```js
;[
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
```

see [tests](https://github.com/riqra/hierarchy-parser/tree/master/__tests__) for more examples
