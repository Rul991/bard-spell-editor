import { useContext, useState } from 'react'
import { RecordingContext } from '../../providers/Recording'
import ToggleTitleButton from '../buttons/ToggleTitleButton'
import AudioPlayer from '../../utils/AudioPlayer'
import { useSong } from '../../utils/hooks'
import { PLAY_SPEED } from '../../utils/consts'
import { RecordValuesContext } from '../../providers/RecordValues'

const PlayButton = () => {
    const [recording, setRecording] = useContext(RecordingContext)
    const [recordValues, setValues] = useContext(RecordValuesContext)
    const [sequenceId, setId] = useState(-1)
    const [{notes}] = useSong()

    const setSelectedNote = (selectedNote: number) => {
        setValues({...recordValues, selectedNote})
    }

    const onPlay = (value: boolean) => {
        setRecording({...recording, isCanRecording: !value})

        if(value) {
            const id = AudioPlayer.startSequence(
                notes, 
                PLAY_SPEED, 
                () => {
                    setRecording({...recording, isCanRecording: true})
                    setSelectedNote(-1)
                },
                v => {
                    setSelectedNote(v)
                }
            )
            setId(id)
        }
        else {
            AudioPlayer.endSequence(sequenceId)
        }
    }

    return <ToggleTitleButton toggleStatus={!recording.isCanRecording} onToggle={onPlay} titles={['Играть', 'Стоп']} />
}

export default PlayButton