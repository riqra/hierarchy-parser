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
    parents = data.filter(item => item[parentKey] === null)
  } else {
    parents = data.filter(item => item[identifier] === initialParentId)
  }

  const recursive = parents => {
    parents.forEach(getChildrens)
  }

  const getChildrens = parent => {
    const children = data.filter(item => {
      return item[parentKey] === parent[identifier]
    })

    if (children.length > 0) {
      parent.children = children
      recursive(children)
    }
  }

  recursive(parents)

  return parents
}
