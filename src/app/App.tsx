import '@styles/index.less'
import Nav from '../components/other/Nav'
import { SongProvider } from '../providers/Song'
import MainPanel from '../components/panels/MainPanel'
import SidePanel from '../components/panels/SidePanel'
import { IsRecordingProvider } from '../providers/IsRecording'
import { RecordValuesProvider } from '../providers/RecordValues'

const App = () => {
    return (
        <SongProvider>
            <IsRecordingProvider>
                <RecordValuesProvider>
                    <Nav />
                    <main>
                        <MainPanel />
                        <SidePanel />
                    </main>
                </RecordValuesProvider>
            </IsRecordingProvider>
        </SongProvider>
    )
}

export default App