export class EndPoint {
    Url: string
    IsPublic: boolean
    constructor(Url: string, IsPublic: boolean) {
        this.Url = Url;
        this.IsPublic = IsPublic;
    }
}
