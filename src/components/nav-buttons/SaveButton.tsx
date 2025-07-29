import FileUtils from '../../utils/FileUtils'
import { useSong, useTimeout } from '../../utils/hooks'
import ClickButton from '../buttons/ClickButton'

const SaveButton = () => {
    const [song, _] = useSong()
    const [text, setText] = useTimeout('Сохранить')

    const onSave = () => {
        FileUtils.save(
            `${song.id}.json`,
            JSON.stringify(song)
        )
        setText('Сохранено!')
    }

    return <ClickButton onClick={onSave}>{text}</ClickButton>
}

export default SaveButton