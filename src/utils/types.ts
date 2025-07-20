import type Song from '../interfaces/JsonSong'

export type SongKeys = keyof Song
export type SongValues = Song[SongKeys]
export type MusicKeys = -1 | 0 | 1
export type CharacteristicObject = {
    title: string,
    value: number | string
}