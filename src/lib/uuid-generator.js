const uniqueGen = (parent, type) => {
    let r = crypto.randomUUID()
    let id = (parent === null || parent.getAttribute('id') === null) ? `${r}-${type}` : `${parent.getAttribute('id')}-${type}`
    let name = (parent === null || parent.getAttribute('name') === null) ? `${r}-${type}` : `${parent.getAttribute('name')}-${type}`
    return { id, name }
}

export { uniqueGen }
