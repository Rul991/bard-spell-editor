import { useContext, useState } from 'react'
import type Song from '../interfaces/JsonSong'
import { SongContext } from '../providers/Song'
import type { SongKeys, SongValues } from './types'
import { DEFAULT_TIMEOUT_TIME, MAX_SYMBOLS } from './consts'

export const useToggle = (start = false) => {
    const [toggled, setToggle] = useState(start)

    return [
        toggled,
        () => setToggle(!toggled)
    ] as [boolean, VoidFunction]
}

export const useSong = () => {
    const [song, setRawSong] = useContext(SongContext)

    const validateValue = (value: SongValues): SongValues => {
        if(typeof value == 'number') {
            value = value as number
            if(value < 0 || isNaN(value)) value = 0
        }
        else if(typeof value == 'string') {
            value = value.trim().substring(0, MAX_SYMBOLS)
        }

        return value
    }

    const setSong = (song: Song) => {
        for (const key in song) {
            //@ts-ignore
            song[key] = validateValue(song[key])
        }

        localStorage.setItem('song', JSON.stringify(song))

        setRawSong(song)
    }

    return [
        song,
        (key, value) => {
            value = validateValue(value)

            setSong({
                ...song,
                [key]: value
            })
        },
        setSong
    ] as [Song, (key: SongKeys, value: SongValues) => void, (value: Song) => void]
}

export const useTimeout = <T>(defaultValue: T, time: number = DEFAULT_TIMEOUT_TIME) => {
    const [state, setState] = useState(defaultValue)

    return [
        state,
        value => {
            setState(value)

            setTimeout(() => {
                setState(defaultValue)
            }, time)
        }
    ] as [T, (value: T) => void]
}