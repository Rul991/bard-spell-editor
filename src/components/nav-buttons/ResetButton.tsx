import { getDefaultSong } from '../../providers/Song'
import { useSong } from '../../utils/hooks'
import ClickButton from '../buttons/ClickButton'

const ResetButton = () => {
    const [_song, _setSongKey, setSong] = useSong()

    const onReset = () => {
        setSong(getDefaultSong())
    }

    return <ClickButton onClick={onReset}>Новая песня</ClickButton>
}

export default ResetButton