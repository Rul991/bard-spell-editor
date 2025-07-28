import { useContext, useEffect, useRef } from 'react'
import { RecordingContext } from '../../providers/Recording'
import AudioRecorder from '../../audio/AudioRecorder'
import ClickButton from '../buttons/ClickButton'

const RecordButton = () => {
    const [recording, setRecording] = useContext(RecordingContext)
    const divRef = useRef<HTMLDivElement>(document.createElement('div'))

    useEffect(() => {
        const blurListener = () => {
            setRecording({...recording, isRecording: false})
        }

        const focusListener = () => {
            if(!recording.isCanRecording) return
            setRecording({...recording, isRecording: true})
        }

        divRef.current.addEventListener('blur', blurListener)
        divRef.current.addEventListener('focus', focusListener)

        return () => {
            if(!divRef.current) return

            divRef.current.removeEventListener('blur', blurListener)
            divRef.current.removeEventListener('focus', focusListener)
        }
    }, [divRef])

    const onRecord = () => {
        divRef.current.focus()
    }

    return (
        <>
            <AudioRecorder ref={divRef} />
            <ClickButton onClick={onRecord}>Начать запись</ClickButton>
        </>
    )
}

export default RecordButton