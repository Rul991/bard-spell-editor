import type Song from '../interfaces/Song'

export default interface InputProps {
    title: string
    songKey?: keyof Song
    type: 'number' | 'string'
    max?: number
}