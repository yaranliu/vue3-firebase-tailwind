import {Serializable} from "../base/Serializable";

export class SongModel implements Serializable<SongModel> {
    Name: string
    Artist: string
    Year: string
    deserialize(input: Object): SongModel {
        this.Name = input['name']
        this.Artist = input['artist']
        this.Year = input['year']
        return this
    }
}
