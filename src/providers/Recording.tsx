import { createContext, useState, type PropsWithChildren } from 'react'
import { PLAY_SPEED } from '../utils/consts'

type Result = {isRecording: boolean, isCanRecording: boolean, speed: number}

const value: Result = {isRecording: false, isCanRecording: true, speed: PLAY_SPEED}

export const RecordingContext = createContext(
    [value, () => {}] as [Result, (value: Result) => void]
)

export const RecordingProvider = ({children}: PropsWithChildren)=> {
    const state = useState(value)

    return <RecordingContext.Provider value={state}>{children}</RecordingContext.Provider>
}