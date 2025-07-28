import { RecordValuesContext } from '../../../providers/RecordValues'
import { useSong } from '../../../utils/hooks'
import SongUtils from '../../../utils/SongUtils'
import styles from './Notes.module.less'
import { useContext, useRef, type MouseEvent } from 'react'

const Notes = () => {
    const [{notes}, setSong] = useSong()
    const [recordValues, setValues] = useContext(RecordValuesContext)
    const divRef = useRef(document.createElement('div'))

    const clearNoteSelect = (e: MouseEvent<HTMLDivElement>) => {
        if(e.target !== divRef.current) return
        setValues({...recordValues, selectedNote: -1})
    }

    return (
        <div ref={divRef} onClick={clearNoteSelect} className={styles.notes}>
                {
                    notes.map((note, i) => {
                        const deleteNote = (e: MouseEvent<HTMLDivElement>) => {
                            e.preventDefault()
                            notes.splice(i, 1)
                            setSong('notes', [...notes])
                            setValues({...recordValues, selectedNote: -1})
                        }

                        const setId = () => {
                            setValues({...recordValues, selectedNote: i})
                        }

                        return (
                            <div 
                                onContextMenu={deleteNote} 
                                onDoubleClick={deleteNote} 
                                onClick={setId}
                                key={i}
                                className={recordValues.selectedNote == i ? styles['note-pressed'] : ''}
                                >
                                    {SongUtils.getNoteNameFromNumber(note)}
                            </div>
                        )
                    })
                }
            </div>
    )
}

export default Notes