export const sleep = (ms: number, callback = () => {}) => {
    return new Promise<number>((resolve) => {
        const id = setTimeout(() => {
            callback()
            resolve(id as any as number)
        }, ms)
    })
}