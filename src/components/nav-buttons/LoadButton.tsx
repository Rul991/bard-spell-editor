import type Song from '../../interfaces/Song'
import FileUtils from '../../utils/FileUtils'
import ClickButton from '../buttons/ClickButton'
import { useSong, useTimeout } from '../../utils/hooks'
import SongUtils from '../../utils/SongUtils'

const LoadButton = () => {
    const defaultLoadText = 'Загрузить'
    
    const [_song, _, setSong] = useSong()
    const [loadText, setLoadText] = useTimeout(defaultLoadText)

    const onLoad = () => {
        FileUtils.load()
        .then(text => {
            try {
                const parsed: Song = JSON.parse(text)
                
                setSong(SongUtils.makeRight(parsed))
                setLoadText('Загружено!')
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