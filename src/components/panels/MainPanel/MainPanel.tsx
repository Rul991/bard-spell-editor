import SongMaker from '../../other/SongMaker'
import styles from './MainPanel.module.less'

const MainPanel = () => {
    return <div className={styles.panel}>
        <SongMaker />
    </div>
}

export default MainPanel