import './App.css'
import LatestTrackingSection from './latestTracking'
import { TrackedAnimeList } from './tracking'
import { Tab, Tabs } from './tabs'
import { AiringAnimeList } from './airing'


function App() {

  const tabs: Tab[] = [
    {name: "latest-tracking", displayName: "Latest Tracking", content: <LatestTrackingSection/>},
    {name: "tracking", displayName: "Your Anime", content: <TrackedAnimeList/>},
    {name: "top-airing", displayName: "Top Airing", content: <AiringAnimeList/>}
  ]
  return (
    <div>
      <Tabs defaultTab='tracking' items={tabs}/>
    </div>
  )
}
export default App
