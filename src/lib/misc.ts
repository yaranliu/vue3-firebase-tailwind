import {Person} from "@/models/PersonModel";

function FirstItemIdentifier<T>( data: Array<T>, field: string) : any {
    if (data && data.length > 0) {
        type ObjectKey = keyof T;
        return data[0][field as ObjectKey]
    }
    else { return undefined }
}

function LastItemIdentifier<T>( data: Array<T>, field: string) : any {
    if (data && data.length > 0) {
        type ObjectKey = keyof T;
        return data[data.length - 1][field as ObjectKey]
    }
    else { return undefined }
}

export { FirstItemIdentifier, LastItemIdentifier }

