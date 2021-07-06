module.exports = (data, options = {}) => {
  if (!options.parentKey) {
    options.parentKey = 'parentId'
  }

  if (!options.identifier) {
    options.identifier = 'id'
  }

  const { parentKey, identifier, initialParentId } = options

  let parents = []

  if (!initialParentId) {
    parents = data.filter((item) => item[parentKey] === null)
  } else {
    parents = data.filter((item) => item[identifier] === initialParentId)
  }

  const getChildrens = (parent) => {
    const children = data.filter(
      (item) => item[parentKey] === parent[identifier]
    )

    return children.length > 0 ? children : null
  }

  const recursive = (parents) => {
    return parents.map((parent) => {
      const children = getChildrens(parent)

      if (children) {
        return {
          ...parent,
          children: recursive(children),
        }
      }

      return parent
    })
  }

  return recursive(parents)
}
