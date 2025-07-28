import { useContext, type KeyboardEvent, type RefObject } from 'react'
import SongUtils from '../../utils/SongUtils'
import { useSong } from '../../utils/hooks'
import { RecordingContext } from '../../providers/Recording'
import { RecordValuesContext } from '../../providers/RecordValues'
import styles from './AudioRecorder.module.less'
import type { MusicKeys } from '../../utils/types'
import AudioPlayer from '../../utils/AudioPlayer'

const AudioRecorder = ({ref}: {ref?: RefObject<HTMLDivElement>}) => {
    const [song, _, setSong] = useSong()
    const [{isCanRecording}] = useContext(RecordingContext)
    
    const [recordValues, setRecordValues] = useContext(RecordValuesContext)
    const {isSharp, octave} = recordValues
    
    const getKey = (shiftKey: boolean): MusicKeys => {
        return shiftKey ? isSharp ? 1 : -1 : 0
    }

    const getNumber = (code: string, shiftKey: boolean) => {
        const note = SongUtils.getNoteFromKey(code)
        if(note == -1) return -1

        const key = getKey(shiftKey)
        return SongUtils.getNumberNote(note, octave, key)
    }

    const addNote = (note: number) => {
        setSong({
            ...song, 
            notes: [...song.notes, note], 
            duration: song.duration + 2
        })
    }

    const downCallback = (e: KeyboardEvent) => {
        const {code, shiftKey, repeat} = e

        if(repeat || !isCanRecording) return

        const number = getNumber(code, shiftKey)
        if(number === -1) return

        AudioPlayer.playOn(number, addNote)

        if(isCanRecording) {
            addNote(number)
        }
    }

    const upCallback = (e: KeyboardEvent) => {
        if(!isCanRecording) return

        const {code, shiftKey} = e
        let sharp = isSharp

        if(code == 'ControlLeft') {
            sharp = !sharp
        }

        let usedOctave = SongUtils.getOctaveFromKey(code)
        if(usedOctave === -1) usedOctave = octave
        setRecordValues({...recordValues, isSharp: sharp, octave: usedOctave})

        const note = SongUtils.getNoteFromKey(code)
        if(note == -1) return

        const key = getKey(shiftKey)

        const number = SongUtils.getNumberNote(note, usedOctave, key)

        AudioPlayer.playOff(number, addNote)
    }

    return <div className={styles.div} ref={ref} autoFocus onKeyDown={downCallback} onKeyUp={upCallback} tabIndex={-1}></div>
}

export default AudioRecorder