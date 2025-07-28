import '@styles/index.less'
import Nav from '../components/other/Nav'
import { SongProvider } from '../providers/Song'
import MainPanel from '../components/panels/MainPanel'
import SidePanel from '../components/panels/SidePanel'
import { RecordingProvider } from '../providers/Recording'
import { RecordValuesProvider } from '../providers/RecordValues'

const App = () => {
    return (
        <SongProvider>
            <RecordingProvider>
                <RecordValuesProvider>
                    <Nav />
                    <main>
                        <MainPanel />
                        <SidePanel />
                    </main>
                </RecordValuesProvider>
            </RecordingProvider>
        </SongProvider>
    )
}

export default App