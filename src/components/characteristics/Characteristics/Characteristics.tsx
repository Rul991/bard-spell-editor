import type CharacteristicsProps from '../../../props/CharacteristicsProps'
import { useSong } from '../../../utils/hooks'
import CharacteristicElement from '../CharacteristicElement'

const Characteristics = ({elements}: CharacteristicsProps) => {
    const [song] = useSong()

    const usedElements = elements ?? 
    [
        {
            title: 'Название',
            value: song.name
        },

        {
            title: 'ID',
            value: song.id
        },

        {
            title: 'Длительность песни',
            value: song.duration
        },

        {
            title: 'Количество нот',
            value: song.notes.length
        }
    ]

    return (
        <div>
            {
                usedElements.map(({title, value}, i) => 
                    <CharacteristicElement key={i} title={title} value={value} />
                )
            }
        </div>
    )
}

export default Characteristics