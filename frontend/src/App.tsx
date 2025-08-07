import { useEffect, useState } from 'react'
import './App.css'
import { fetchTopAiring, type AnilistMedia} from './api/airing'
import { GetTrackedAnimeAll, InsertTrackedAnime} from "../wailsjs/go/main/App"
import { main } from "../wailsjs/go/models"
import LatestTrackingSection from './latestTracking'
import { TrackedAnimeList } from './tracking'
import { Tab, Tabs } from './tabs'
import { AiringAnimeList } from './airing'


function App() {
  const [trackedAnime, setTrackedAnime] = useState(Array<main.TrackedAnimeTableRow>)
  const [latestTracking, setLatestTracking] = useState(Array<AnilistMedia>)
  const [airing, setAiring] = useState(Array<AnilistMedia>)
  const [currentPageNumber, setCurrentPageNumber] = useState(1)

  const onAddTrackingBtnClick = async (series:AnilistMedia) => {
    try {
      console.log(series.id)
      if (series && series.id != undefined) await InsertTrackedAnime(series.id)
      // setLatestTracking([...latestTracking, series])
      fetchTrackedAnime()
    } catch (error) {
      console.log(error)
    }
  }

  const fetchTrackedAnime = async () => {
    try {
      const tracked_anime_rows = await GetTrackedAnimeAll()
      console.log(tracked_anime_rows)
      const tracked_anime_results = tracked_anime_rows.map(row => main.TrackedAnimeTableRow.createFrom(row)) //the model is a class, createFrom is generated to help with instantiating
      setTrackedAnime(tracked_anime_results)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
      const fetchData = async () => {
        try {
          let results = await fetchTopAiring(currentPageNumber)
          if (results) {
            setCurrentPageNumber(results.data.Page.pageInfo.currentPage)
          }
          if (results && results.data.Page.media.length > 0) {
            setAiring([...airing, ...results.data.Page.media])
          }
        } catch (error) {
          console.log(error)
        }
      }
      fetchData()
      fetchTrackedAnime()
  }, [])

  const tabs: Tab[] = [
    {name: "latest-tracking", displayName: "Latest Tracking", content: <LatestTrackingSection tracking={latestTracking}/>},
    {name: "tracking", displayName: "Your Anime", content: <TrackedAnimeList tracking={trackedAnime}/>},
    {name: "top-airing", displayName: "Top Airing", content: <AiringAnimeList airing={airing} onAddTrackingBtnClick={onAddTrackingBtnClick}/>}
  ]
  return (
    <div>
      <Tabs defaultTab='tracking' items={tabs}/>
    </div>
  )
}
export default App
