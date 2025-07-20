import styles from './Nav.module.less'
import SaveButton from '../../nav-buttons/SaveButton'
import LoadButton from '../../nav-buttons/LoadButton'
import RecordButton from '../../nav-buttons/RecordButton'
// import PlayButton from '../../nav-buttons/PlayButton'
import { useEffect } from 'react'
import { useSong } from '../../../utils/hooks'
import ResetButton from '../../nav-buttons/ResetButton'

const Nav = () => {
    const [song] = useSong()
    
    useEffect(() => {
        console.log(song)
    }, [song])

    return (
        <nav className={styles.nav}>
            <div className={styles['nav-title']}>Дневник барда</div>
            <div className={styles['nav-buttons']}>
                <ResetButton />
                <SaveButton />
                <LoadButton />
            </div>
            <div className={styles['nav-buttons-2']}>
                <RecordButton />
                {/* <PlayButton /> */}
            </div>
        </nav>
    )
}

export default Nav