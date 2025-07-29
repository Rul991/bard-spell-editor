import type Song from '../interfaces/Song'
import { MAX_OCTAVES, SEMITONES_IN_OCTAVE } from './consts'

export default class SongValidator {
    static songBounds = {min: 0, max: MAX_OCTAVES * SEMITONES_IN_OCTAVE - 1}

    static isNoteRight(note: number): boolean {
        if(typeof note != 'number') return false
        else if(note > this.songBounds.max || note < this.songBounds.min) return false

        return true
    }

    static isNotesRight(notes: number[]): boolean {
        return Array.isArray(notes) &&
            notes.every(note => this.isNoteRight(note))
    }

    static isDurationRight(duration: number): boolean {
        return typeof duration == 'number' && duration >= 0
    }

    static isNameRight(name: string): boolean {
        return typeof name == 'string'
    }

    static isIdRight(id: string) {
        return typeof id == 'string'
    }

    static isSong(parsed: Song): boolean {
        return this.isNameRight(parsed.name) &&
                this.isDurationRight(parsed.duration) &&
                this.isNotesRight(parsed.notes) &&
                this.isIdRight(parsed.id)
    }
}