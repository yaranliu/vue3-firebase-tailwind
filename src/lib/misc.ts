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

import { ref, customRef } from 'vue'

const debounce = (fn: Function, delay: number = 0, immediate: boolean = false) => {
    let timeout: any
    return (...args: any) => {
        if (immediate && !timeout) fn(...args)
        clearTimeout(timeout)

        timeout = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}

// const useDebouncedRef = (initialValue, delay, immediate) => {
//     const state = ref(initialValue)
//     const debouncedRef = customRef((track, trigger) => ({
//         get() {
//             track()
//             return state.value
//         },
//         set: debounce(
//             value => {
//                 state.value = value
//                 trigger()
//             },
//             delay,
//             immediate
//         ),
//     }))
//     return debouncedRef
// }


export { FirstItemIdentifier, LastItemIdentifier, debounce }

