import { useEffect, useState } from 'react'
import styles from './ClickButton.module.less'
import type ClickButtonProps from '../../../props/ClickButtonProps'
import { ANIMATION_TIME } from '../../../utils/consts'

const ClickButton = ({
    children, 
    onClick = () => {}, 
    onDown = () => {}, 
    onUp = () => {}, 
    click = false, 
    className = ''
}: ClickButtonProps) => {
    const [isPressed, setPressed] = useState(false)

    const buttonClick = (isClick = true) => {
        setPressed(true)

        setTimeout(() => {
            if(isClick) onClick()
            setPressed(false)
        }, ANIMATION_TIME)
    }

    useEffect(() => {
        buttonClick(false)
    }, [click])

    return (
        <button 
            onPointerDown={onDown} 
            onPointerUp={onUp} 
            onClick={() => buttonClick()}
            className={`${className} ${styles[`click-button`]} ${isPressed ? styles['click-button-pressed'] : ''}`}
        >
            {children}
        </button>
    )
}

export default ClickButton