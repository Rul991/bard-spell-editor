import { MAX_NOTE_LENGTH_MS, MAX_NOTE_LENGTH_SECONDS } from './consts'

type PlayCallback = (note: number) => void
type NoteIndexCallback = (note: number) => void

export default class AudioPlayer {
    private static _audio: HTMLAudioElement = new Audio('assets/audio/envell-bard.mp3')
    private static _timeoutId: number | null = null
    private static _pressedNumbers: number[] = []

    private static _rawPlayOn(number: number): void {
        this._audio.play()
        this._audio.currentTime = number * MAX_NOTE_LENGTH_SECONDS
    }

    static playOn(number: number, onPlay: PlayCallback = () => {}): void {
        if(this._timeoutId) {
            clearTimeout(this._timeoutId)
            this._timeoutId = null
        }

        this._rawPlayOn(number)
        onPlay(number)

        if(!this._pressedNumbers.includes(number)) {
            this._pressedNumbers.push(number)
        }
        
        this._timeoutId = +setTimeout(() => {
            this.playOff(number, onPlay, false)
        }, MAX_NOTE_LENGTH_MS)
    }

    static playOff(number: number, onPlay: PlayCallback = () => {}, continuePlay = true): void {
        const i = this._pressedNumbers.indexOf(number)
        
        if(i >= 0) {
            this._pressedNumbers.splice(i, 1)
        }

        this._audio.pause()
        
        if(this._pressedNumbers.length && continuePlay) {
            this.playOn(this._pressedNumbers[this._pressedNumbers.length - 1], onPlay)
        }
    }

    static startSequence(
        sequence: number[], 
        speed = MAX_NOTE_LENGTH_MS, 
        endCallback = () => {}, 
        noteIndexCallback: NoteIndexCallback = () => {}
    ): number {
        const clonedSequence = [...sequence]
        const usedSpeed = Math.max(0, Math.min(speed, MAX_NOTE_LENGTH_MS))
        
        let i = 0

        const play = (intervalId: number) => {
            if(i >= clonedSequence.length) {
                this.endSequence(intervalId)
                endCallback()
                return
            }

            noteIndexCallback(i)
            this._rawPlayOn(clonedSequence[i])
            i++
        }

        play(0)
        let intervalId = +setInterval(() => {
            play(intervalId)
        }, usedSpeed)

        return intervalId
    }

    static endSequence(sequenceId: number): void {
        clearInterval(sequenceId)
        this._audio.pause()
    }

    static clear(): void {
        this._audio.pause()
        this._timeoutId = null
        this._pressedNumbers = []
    }
}