import { useContext, useEffect, useState, type KeyboardEvent, type RefObject } from 'react'
import SongUtils from '../../utils/SongUtils'
import { useSong } from '../../utils/hooks'
// import type { MusicKeys } from '../../utils/types'
import { IsRecordingContext } from '../../providers/IsRecording'
import { RecordValuesContext } from '../../providers/RecordValues'
import styles from './AudioPlayer.module.less'
import type { MusicKeys } from '../../utils/types'
// import { MAX_NOTE_LENGTH } from '../../utils/consts'

// const audio = new Audio('assets/audio/envell-bard.ogg')
// let timeoutId: null | number = null

// const playOn = (number: number) => {
//     if(timeoutId) {
//         clearTimeout(timeoutId)
//         timeoutId = null
//     }

//     audio.currentTime = number * MAX_NOTE_LENGTH
//     // audio.play()

//     timeoutId = setTimeout(() => {
//         audio.pause()
//     }, MAX_NOTE_LENGTH) as any as number
// }

const AudioPlayer = ({ref}: {ref?: RefObject<HTMLDivElement>}) => {
    const [song, _, setSong] = useSong()
    const [isRecording] = useContext(IsRecordingContext)
    
    const [recordValues, setRecordValues] = useContext(RecordValuesContext)
    const {isSharp, octave} = recordValues
    const [lastPressTime, setPressTime] = useState(0)

    const downCallback = ({}: KeyboardEvent) => {
        if(lastPressTime != 0) return
        setPressTime(Date.now())
    }

    const upCallback = (e: KeyboardEvent) => {
        const {code, shiftKey} = e
        let sharp = isSharp

        if(code == 'ControlLeft') {
            sharp = !sharp
        }
        
        let usedOctave = SongUtils.getOctaveFromKey(code)
        if(usedOctave === -1) usedOctave = octave
        setRecordValues({...recordValues, isSharp: sharp, octave: usedOctave})

        const key: MusicKeys = shiftKey ? isSharp ? 1 : -1 : 0
        const note = SongUtils.getNoteFromKey(code)
        if(note == -1) return

        const number = SongUtils.getNumberNote(note, usedOctave, key)

        if(isRecording) {
            const timeDiff = lastPressTime ? Math.ceil((Date.now() - lastPressTime) / 1000) : 0

            setSong({
                ...song, 
                notes: [...song.notes, number], 
                duration: song.duration + timeDiff
            })
            setPressTime(0)
        }
        // playOn(number)
    }

    useEffect(() => {
        console.log(recordValues)
    }, [recordValues])

    return <div className={styles.div} ref={ref} autoFocus onKeyDown={downCallback} onKeyUp={upCallback} tabIndex={-1}></div>
}

export default AudioPlayer