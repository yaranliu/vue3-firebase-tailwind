class UniqueNameAndId {
    Id: string
    Name: string

    constructor(Id: string, Name: string) {
        this.Name = Name;
        this.Id = Id
    }
}

const uniqueNameAndIdGenerator = (parent: HTMLElement , type: string): UniqueNameAndId => {
    let r = crypto.randomUUID()
    let id = (parent === null || parent.getAttribute('id') === null) ? `${r}-${type}` : `${parent.getAttribute('id')}-${type}`
    let name = (parent === null || parent.getAttribute('name') === null) ? `${r}-${type}` : `${parent.getAttribute('name')}-${type}`
    return new UniqueNameAndId(id, name)
}

export { uniqueNameAndIdGenerator, UniqueNameAndId }
