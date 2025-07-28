import type { PropsWithChildren } from 'react'

export default interface ClickButtonProps extends PropsWithChildren {
    onClick?: VoidFunction
    onDown?: VoidFunction
    onUp?: VoidFunction
    click?: boolean
    className?: string
}