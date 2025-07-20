import type Song from '../interfaces/JsonSong'

export default interface InputProps {
    title: string
    songKey?: keyof Song
    type: 'number' | 'string'
    max?: number
}