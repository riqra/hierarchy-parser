module.exports = (data, parentKey = 'parentId', initialParent = null) => {
  if (!parentKey) {
    throw new Error('you need specify a parent key')
  }

  let parents = []

  if (!initialParent) {
    parents = data.filter(item => item[parentKey] === null)
  } else {
    parents = data.filter(item => item.id === initialParent)
  }

  const recursive = parents => {
    parents.forEach(getChildrens)
  }

  const getChildrens = parent => {
    const children = data.filter(item => {
      return item[parentKey] === parent.id
    })

    delete parent.parentId

    if (children.length > 0) {
      parent.children = children
      recursive(children)
    }
  }

  recursive(parents)

  return parents
}
