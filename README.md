[![Build Status](https://travis-ci.org/riqra/hierarchy-parser.svg?branch=master)](https://travis-ci.org/riqra/hierarchy-parser)

> Dependencies free

## Hierarchy Parser

![](https://res.cloudinary.com/riqra/image/upload/v1513825837/github/hierarchy-parser.svg)

## What's it for?

Relational databases aren't very good at dealing with nested hierarchies.

Examples of hierarchies are:

* Nested folders where each folder has many subfolders, those subfolders themselves have subfolders, and so on
* Categories and sub-categories e.g. for a newspaper with sections for different sports, Sports category splits into Track Sports and Water Sports, Water Sports into Swimming and Diving, Diving into High Board, Middle Board and Low Board etc
* Tree structures

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
