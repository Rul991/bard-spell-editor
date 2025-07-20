export default class Timeout {
    private _lastId: number | null
    private _delay: number
    private _callback: () => void

    constructor(callback: () => void, delay: number) {
        this._lastId = null
        this._delay = delay
        this._callback = () => {
            callback()
            console.log('end timeout')
        }
    }

    clear(): void {
        if(this._lastId) clearTimeout(this._lastId)

        this._lastId = null
        console.log('clear timeout')
    }

    set(): void {
        const id = setTimeout(this._callback, this._delay)
        if(typeof id == 'number') {
            this._lastId = id
        }
        
        console.log('set timeout')
    }

    reset(): void {
        this.clear()
        this.set()
    }
}
