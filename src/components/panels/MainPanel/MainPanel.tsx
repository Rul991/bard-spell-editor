import Notes from '../../other/Notes'
import Piano from '../../other/Piano'
import styles from './MainPanel.module.less'

const MainPanel = () => {
    return <div className={styles.panel}>
        <Notes />
        <Piano />
    </div>
}

export default MainPanel