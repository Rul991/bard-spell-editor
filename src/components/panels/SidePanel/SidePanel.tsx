import { useContext } from 'react'
import Characteristics from '../../characteristics/Characteristics'
import Input from '../../other/Input'
import styles from './SidePanel.module.less'
import { RecordValuesContext } from '../../../providers/RecordValues'
import { RecordingContext } from '../../../providers/Recording'

const SidePanel = () => {
    const [recordValues] = useContext(RecordValuesContext)
    const [{isRecording}] = useContext(RecordingContext)

    return <div className={styles.panel}>
        <h2>Текущие данные песни</h2>
        <Characteristics />
        
        <h2>Состояние записи</h2>
        <Characteristics elements={
            [
                {
                    title: 'Ключ',
                    value: recordValues.isSharp ? 'диез' : 'бемоль'
                },

                {
                    title: 'Октава',
                    value: recordValues.octave + 1
                },

                {
                    title: 'Состояние записи',
                    value: isRecording ? 'активна': 'безактивна'
                },

                {
                    title: 'ID выбранной ноты',
                    value: recordValues.selectedNote == -1 ? '(empty)' : recordValues.selectedNote + 1
                }
            ]
        } />

        <h2>Редактор</h2>
        <div className="inputs">
            <Input songKey='name' title='Название' type='string' />
            <Input songKey='id' title='ID' type='string' />
            <Input songKey='duration' title='Длина песни' type='number' />
        </div>
    </div>
}

export default SidePanel