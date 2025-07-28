import { useContext, useMemo } from 'react'
import { RecordValuesContext } from '../../../providers/RecordValues'
import { SEMITONES_IN_OCTAVE } from '../../../utils/consts'
import { useSong } from '../../../utils/hooks'
import SongUtils from '../../../utils/SongUtils'
import SongValidator from '../../../utils/SongValidator'
import ClickButton from '../../buttons/ClickButton'
import styles from './Piano.module.less'
import AudioPlayer from '../../../utils/AudioPlayer'

const Piano = () => {
    const [{notes}, setSong] = useSong()
    const [recordValues, setValues] = useContext(RecordValuesContext)

    const range = useMemo(() => {
        let arr: number[] = []

        let {min, max} = SongValidator.songBounds

        for (let i = min; i <= max; i++) {
            arr.push(i)
        }

        return arr
    }, [SongValidator.songBounds])

    const addNote = (note: number) => 
        setSong('notes', [...notes, note])

    const getNoteColor = (note: number) => {
        const positionInOctave = note % SEMITONES_IN_OCTAVE
        const blackKeyMask = 0b010101001010 //keys reversed: last bit is C, first is B

        if((blackKeyMask >> positionInOctave) & 1) {
            return 'black'
        }

        return 'white'
    }

    const pianoButtonClick = (note: number) => {
        if(recordValues.selectedNote == -1)
            addNote(note)
        else {
            notes.splice(recordValues.selectedNote, 1, note)
            setSong('notes', [...notes])
            setValues({...recordValues, selectedNote: -1})
        }
    }
    
    return (
        <div className={styles.piano} style={{gridTemplateColumns: `repeat(${SongValidator.songBounds.max + 1}, auto)`}}>
            {
                range.map((note, i) => {
                    const className = getNoteColor(note)

                    return <ClickButton 
                        onDown={() => {
                            AudioPlayer.playOn(note)
                        }}
                        onUp={() => {
                            AudioPlayer.playOff(note)
                        }}
                        onClick={() => pianoButtonClick(note)} 
                        key={i}
                        className={`${styles[`piano-${className}`]} ${styles['piano-key']}`}
                    >{SongUtils.getNoteNameFromNumber(note)}</ClickButton>
                })
            }
        </div>
    )
}

export default Piano