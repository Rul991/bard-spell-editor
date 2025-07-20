import { createContext, useState, type PropsWithChildren } from 'react'

type Result = {isSharp: boolean, octave: number, selectedNote: number}

const value: Result = {
    isSharp: false, 
    octave: 0,
    selectedNote: -1
}

export const RecordValuesContext = createContext(
    [value, () => {}] as [Result, (value: Result) => void]
)

export const RecordValuesProvider = ({children}: PropsWithChildren)=> {
    const state = useState(value)

    return <RecordValuesContext.Provider value={state}>{children}</RecordValuesContext.Provider>
}