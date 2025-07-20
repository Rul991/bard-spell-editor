import type Song from '../interfaces/JsonSong'

export default class SongValidator {
    static songBounds = {min: 0, max: 71}

    static isNoteRight(note: number): boolean {
        if(typeof note != 'number') return false
        else if(note > this.songBounds.max || note < this.songBounds.min) return false

        return true
    }

    static isNotesRight(notes: number[]): boolean {
        return Array.isArray(notes) &&
            notes.every(note => this.isNoteRight(note))
    }

    static isScriptRight(script: string): boolean {
        return typeof script == 'string' && script.endsWith('.lua')
    }

    static isDurationRight(duration: number): boolean {
        return typeof duration == 'number' && duration >= 0
    }

    static isNameRight(name: string): boolean {
        return typeof name == 'string'
    }

    static isSong(parsed: Song): boolean {
        return this.isNameRight(parsed.name) &&
                this.isDurationRight(parsed.duration) &&
                this.isNotesRight(parsed.notes) &&
                this.isScriptRight(parsed.script)
    }
}