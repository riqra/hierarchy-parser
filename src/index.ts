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

  let initialParents: InputItem[]

  if (!initialParentId) {
    initialParents = dataSource.filter(item => item[parentKey] === null)
  } else {
    initialParents = dataSource.filter(item => item[identifier] === initialParentId)
  }

  function getChildren(parent: InputItem) {
    return dataSource.filter(item => item[parentKey] === parent[identifier])
  }

  function toHierarchyItem(parent: InputItem): HierarchyItem<InputItem> {
    const children = getChildren(parent)

    if (children.length === 0) {
      return parent
    }

    return {
      ...parent,
      children: children.map(toHierarchyItem),
    }
  }

  return initialParents.map(toHierarchyItem)
}
