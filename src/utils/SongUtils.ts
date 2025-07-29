import type Song from '../interfaces/Song'
import { getDefaultSong } from '../providers/Song'
import { MAX_OCTAVES, SEMITONES_IN_OCTAVE } from './consts'
import SongValidator from './SongValidator'
import type { MusicKeys } from './types'

type ValueFromKeyArgs = {key: string, defaultValue: number, keys: string[], values: number[]}

export default class SongUtils {
    private static _notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

    private static _getValueFromKey({key, defaultValue, keys, values}: ValueFromKeyArgs): number {
        for (let i = 0; i < keys.length; i++) {
            if(keys[i] == key) return values[i]
        }

        return defaultValue
    }

    private static _getKeysFromString(keys: string): string[] {
        return keys
            .split('')
            .map(val => 'Key' + val)
    }

    static getNoteNameFromNumber(note: number): string {
        if(!SongValidator.isNoteRight(note)) return ''

        const octave = Math.floor(note / SEMITONES_IN_OCTAVE) + 1
        const numberOfNote = note % SEMITONES_IN_OCTAVE

        const noteSymb = this._notes[numberOfNote]

        let octaveString: string
        if(octave == MAX_OCTAVES - 1)
            octaveString = 'Maj'
        else if(octave == MAX_OCTAVES)
            octaveString = 'Min'
        else
            octaveString = octave.toString()

        return `${noteSymb}${octaveString}`
    }

    static getNoteFromKey(key: string): number {
        return this._getValueFromKey({
            key,
            defaultValue: -1,
            keys: this._getKeysFromString('QWERTYU'),
            values: [0, 2, 4, 5, 7, 9, 11]
        })
    }

    static getOctaveFromKey(key: string): number {
        return this._getValueFromKey({
            key,
            defaultValue: -1,
            keys: this._getKeysFromString('HJKLBNM'),
            values: [0, 1, 2, 3, 4, 5, 6]
        })
    }

    static getNumberNote(note: number, octave: number, key: MusicKeys): number {
        return (note % SEMITONES_IN_OCTAVE) + (octave * SEMITONES_IN_OCTAVE) + key
    }

    static makeRight(parsed: Song): Song {
        const newSong: Song = getDefaultSong()

        console.group('validation errors:')
        console.log('start parsing', parsed)

        if(SongValidator.isNotesRight(parsed.notes)) {
            newSong.notes = parsed.notes
        }
        else console.warn('wrong notes', parsed.notes)

        if(SongValidator.isDurationRight(parsed.duration)) {
            newSong.duration = parsed.duration
        }
        else console.warn('wrong duration', parsed.duration)

        if(SongValidator.isNameRight(parsed.name)) {
            newSong.name = parsed.name
        }
        else console.warn('wrong name', parsed.name)

        if(SongValidator.isIdRight(parsed.id)) {
            newSong.id = parsed.id
        }
        else console.warn('wrong id', parsed.id)

        console.groupEnd()

        return newSong
    }
}