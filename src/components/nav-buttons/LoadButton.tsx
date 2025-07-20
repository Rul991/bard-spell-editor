import type Song from '../../interfaces/JsonSong'
import FileUtils from '../../utils/FileUtils'
import SongValidator from '../../utils/SongValidator'
import ClickButton from '../buttons/ClickButton'
import { useSong, useTimeout } from '../../utils/hooks'

const LoadButton = () => {
    const defaultLoadText = 'Загрузить'
    
    const [_song, _, setSong] = useSong()
    const [loadText, setLoadText] = useTimeout(defaultLoadText)

    const onLoad = () => {
        FileUtils.load()
        .then(text => {
            try {
                const parsed: Song = JSON.parse(text)
                if(SongValidator.isSong(parsed)) {
                    setSong(parsed)
                    setLoadText('Загружено!')
                }
                else {
                    throw new Error('Wrong json file')
                }
            }
            catch(e) {
                throw e
            }
        })
        .catch(e => {
            console.warn('Load error: ',e)
            
            setLoadText(e.toString())
        })
    }

    return <ClickButton onClick={onLoad}>{loadText}</ClickButton>
}

export default LoadButton