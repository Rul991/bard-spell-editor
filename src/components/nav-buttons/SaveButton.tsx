import FileUtils from '../../utils/FileUtils'
import { useSong, useTimeout } from '../../utils/hooks'
import StringUtils from '../../utils/StringUtils'
import ClickButton from '../buttons/ClickButton'

const SaveButton = () => {
    const [song, _] = useSong()
    const [text, setText] = useTimeout('Сохранить')

    const onSave = () => {
        FileUtils.save(
            `${StringUtils.russianToEnglishTranslit(
                song.name.toLowerCase().replaceAll(" ", "_"))
            }.json`,
            JSON.stringify(song)
        )
        setText('Сохранено!')
    }

    return <ClickButton onClick={onSave}>{text}</ClickButton>
}

export default SaveButton