import { createContext, useState, type PropsWithChildren } from 'react'
import type Song from '../interfaces/Song'
import SongValidator from '../utils/SongValidator'

export const getDefaultSong = () => {
    return {
        duration: 0,
        notes: [],
        name: 'New Song',
        script: 'script.lua'
    } as Song
}

const getSavedSong = () => {
    let defaultValue = getDefaultSong()

    try {
        const savedValue = JSON.parse(localStorage.getItem('song')!)
        
        if(SongValidator.isSong(savedValue))
            defaultValue = savedValue
    }
    catch(e) {}

    return defaultValue
}

const defaultValue = getSavedSong()

export const SongContext = createContext(
    [defaultValue, () => {}] as [Song, (value: Song) => void]
)

export const SongProvider = ({children}: PropsWithChildren)=> {
    const state = useState(defaultValue)

    return <SongContext.Provider value={state}>{children}</SongContext.Provider>
}