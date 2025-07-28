import { useEffect } from 'react'
import type ToggleTittleButtonProps from '../../../props/ToggleTitleButtonProps'
import { useToggle } from '../../../utils/hooks'
import ClickButton from '../ClickButton'
import _ from './ToggleTitleButton.module.less'

const ToggleTitleButton = ({
    onToggle: onClick = () => {}, 
    titles,
    toggleStatus
}: ToggleTittleButtonProps) => {
    const [isActive, toggleActive] = useToggle(false)

    const buttonClick = () => {
        onClick(!isActive)
        toggleActive()
    }

    useEffect(() => {
        if(toggleStatus === undefined) return

        if(isActive != toggleStatus) {
            toggleActive()
        }
    }, [toggleStatus])

    return <ClickButton onClick={buttonClick}>{titles[+isActive]}</ClickButton>
}

export default ToggleTitleButton