export function clearArr(oldArr) {
    let array = [...oldArr]
    if (array.length > 4) {
        while (array.length > 4) {
            array.shift()
        }
    }
    return [...array]
}

