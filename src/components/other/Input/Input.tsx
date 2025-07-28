import { useEffect, useState, type ChangeEvent, type KeyboardEvent } from 'react'
import styles from './Input.module.less'
import { useSong } from '../../../utils/hooks'
import type InputProps from '../../../props/InputProps'
import { MAX_SYMBOLS } from '../../../utils/consts'

const NumberInput = ({max, type, title, songKey = 'duration'}: InputProps) => {
    const [value, setValue] = useState(type == 'string' ? '' : 0)
    const [song, setSong] = useSong()

    const onNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        const minValue = 0
        const maxValue = max || Number.MAX_SAFE_INTEGER

        let value = e.target.valueAsNumber

        if(value < minValue) value = minValue
        else if(value > maxValue) value = maxValue

        setValue(value)
    }

    const onStringChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value
        setValue(value.substring(0, max || MAX_SYMBOLS))
    }

    const onBlur = () => {
        setSong(songKey, value)
    }

    const onKeyUp = (e: KeyboardEvent) => {
        if(e.code == 'Enter') onBlur()
    }

    useEffect(() => {
        setValue(song[songKey] as any)
    }, [song])

    return <div className={styles.component}>
        <div className={styles.title}>{title}:</div>
        <input 
            className={styles.input} 
            placeholder={songKey}
            onChange={type == 'number' ? onNumberChange : onStringChange} 
            onBlur={onBlur}
            onKeyUp={onKeyUp}
            type={type}
            value={value} 
        />
    </div>
}

export default NumberInput