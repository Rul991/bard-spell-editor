import { createContext, useState, type PropsWithChildren } from 'react'

type Result = boolean

const value: Result = false

export const IsRecordingContext = createContext(
    [value, () => {}] as [Result, (value: Result) => void]
)

export const IsRecordingProvider = ({children}: PropsWithChildren)=> {
    const state = useState(value)

    return <IsRecordingContext.Provider value={state}>{children}</IsRecordingContext.Provider>
}