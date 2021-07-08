 <p align="center">
  <img src="https://res.cloudinary.com/riqra/image/upload/v1513825837/github/hierarchy-parser.svg" />
</p>

<h1 align="center">
  Hierarchy Parser
</h1>

<p align="center">
  <a href="https://npmjs.org/package/@riqra/hierarchy-parser">
    <img alt="NPM version" src="https://img.shields.io/npm/v/@riqra/hierarchy-parser.svg?style=for-the-badge">
  </a>
  <a href="https://github.com/riqra/hierarchy-parser">
    <img alt="LICENSE" src="https://img.shields.io/github/license/riqra/hierarchy-parser?style=for-the-badge">
  </a>
  <a href="https://github.com/riqra/hierarchy-parser/actions/workflows/ci.yml">
    <img alt="CI" src="https://img.shields.io/github/workflow/status/riqra/hierarchy-parser/CI?label=CI&style=for-the-badge">
  </a>
  <a href="https://bundlephobia.com/package/@riqra/hierarchy-parser">
    <img alt="Size" src="https://img.shields.io/bundlephobia/minzip/@riqra/hierarchy-parser?style=for-the-badge">
  </a>
</p>

## What's it for?

Relational databases aren't very good at dealing with nested hierarchies.

Examples of hierarchies are:

- Nested folders where each folder has many subfolders, those subfolders themselves have subfolders, and so on
- Categories and sub-categories e.g. for a newspaper with sections for different sports, Sports category splits into Track Sports and Water Sports, Water Sports into Swimming and Diving, Diving into High Board, Middle Board and Low Board etc
- Tree structures

## How to use

| Name                      | Type     | Default      | Description                    |
| ------------------------- | -------- | ------------ | ------------------------------ |
| `data`                    | `Array`  |              | Data to be parsed              |
| `options`                 | `Object` |              | Parser options                 |
| `options.identifier`      | `String` | `"id"`       | Children identifier            |
| `options.parentKey`       | `String` | `"parentId"` | Parent identifier              |
| `options.initialParentId` | `String` |              | Initial level in the hierarchy |

## Example

```json
[
  {
    "id": 1,
    "name": "Home",
    "parentId": null
  },
  {
    "id": 2,
    "name": "Tech",
    "parentId": null
  },
  {
    "id": 3,
    "name": "Decor",
    "parentId": 1
  },
  {
    "id": 4,
    "name": "Bath",
    "parentId": 1
  },
  {
    "id": 5,
    "name": "Games",
    "parentId": 2
  },
  {
    "id": 6,
    "name": "Frames",
    "parentId": 3
  }
]
```

this data will become

```json
[
  {
    "id": 1,
    "name": "Home",
    "children": [
      {
        "id": 3,
        "name": "Decor",
        "children": [
          {
            "id": 6,
            "name": "Frames"
          }
        ]
      },
      {
        "id": 4,
        "name": "Bath"
      }
    ]
  },
  {
    "id": 2,
    "name": "Tech",
    "children": [
      {
        "id": 5,
        "name": "Games"
      }
    ]
  }
]
```

see [tests](https://github.com/riqra/hierarchy-parser/tree/master/__tests__) for more examples
