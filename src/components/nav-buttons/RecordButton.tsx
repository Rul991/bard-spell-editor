import { useContext, useEffect, useRef } from 'react'
import { IsRecordingContext } from '../../providers/IsRecording'
import AudioPlayer from '../../audio/AudioPlayer'
import ClickButton from '../buttons/ClickButton'

const RecordButton = () => {
    const [_, setRecording] = useContext(IsRecordingContext)
    const divRef = useRef<HTMLDivElement>(document.createElement('div'))

    useEffect(() => {
        if(!divRef.current) return

        const blurListener = () => {
            setRecording(false)
        }

        const focusListener = () => {
            setRecording(true)
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
            <AudioPlayer ref={divRef} />
            <ClickButton onClick={onRecord}>Начать запись</ClickButton>
        </>
    )
}

export default RecordButton