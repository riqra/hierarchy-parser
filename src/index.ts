export interface HierarchyParserOptions {
  identifier?: string
  parentKey?: string
  initialParentId?: string | number | null
}

export type HierarchyItem<T> = { [K in keyof T]: T[K] } & { children?: HierarchyItem<T>[] }

const defaultOptions: HierarchyParserOptions = {
  parentKey: 'parentId',
  identifier: 'id',
  initialParentId: null,
}

export default function hierarchyParser<InputItem extends { [k: string]: unknown }>(
  dataSource: Readonly<InputItem[]>,
  options: Readonly<HierarchyParserOptions> = {}
) {
  const { parentKey, identifier, initialParentId } = {
    ...defaultOptions,
    ...options,
  } as Required<HierarchyParserOptions>

  const pendingChildren: { [key: string]: HierarchyItem<InputItem>[] } = {}

  const itemsIndex: { [key: string]: HierarchyItem<InputItem> } = {}

  const result = []

  for (let i = 0; i < dataSource.length; i++) {
    // copy item
    const currFolder: HierarchyItem<InputItem> = { ...dataSource[i] }

    const currId = currFolder[identifier]

    // verify ID type
    if (typeof currId !== 'string' && typeof currId !== 'number') {
      throw new Error('item identifier must be string or number')
    }

    const currParentId = currFolder[parentKey]

    // if there are items that have not been previously assigned, it assigns them
    if (pendingChildren[currId]) {
      currFolder.children = pendingChildren[currId]

      delete pendingChildren[currId]
    }

    // push to root only items that have no parent or those assigned to initialParentId
    if (
      (initialParentId && currId === initialParentId) ||
      (!initialParentId && currParentId === null)
    ) {
      result.push(currFolder)

      itemsIndex[currId] = currFolder

      continue
    } else if (!currParentId) {
      // if there is an id assigned to initialParentId and it finds one that is null, then ignores it.
      continue
    }

    // index folder
    itemsIndex[currId] = currFolder


    // verify parentId type
    if (typeof currParentId !== 'string' && typeof currParentId !== 'number') {
      throw new Error('item identifier must be string or number')
    }

    // check if the indexed parent exists, if so, we add the folder as a child
    if (itemsIndex[currParentId]) {
      const parentFolder = itemsIndex[currParentId]

      if (!parentFolder.children) {
        parentFolder.children = []
      }

      parentFolder.children.push(currFolder)
    } else {
      if (!pendingChildren[currParentId]) {
        pendingChildren[currParentId] = []
      }

      // if the indexed parent not exist, push as pending
      pendingChildren[currParentId].push(currFolder)
    }
  }

  return result
}
