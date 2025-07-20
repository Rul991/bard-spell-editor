import ToggleTitleButton from '../buttons/ToggleTitleButton'

const PlayButton = () => {
    const onPlay = (_: boolean) => {

    }

    return <ToggleTitleButton onToggle={onPlay} titles={['Играть', 'Стоп']} />
}

export default PlayButton