import { useEffect, useState } from 'react'
import './App.css'
import { fetchTopAiring, type AnilistMedia} from './api/airing'
import { GetTrackedAnimeAll, InsertTrackedAnime} from "../wailsjs/go/main/App"
import { main } from "../wailsjs/go/models"
import LatestTrackingSection from './latestTracking'
import { TrackedAnimeList } from './tracking'


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

  return (
    <div>
      <TrackedAnimeList tracking={trackedAnime}/>
      <LatestTrackingSection tracking={latestTracking}/>
      <div>Top Airing This Season</div>
      <div className='airing-this-season'>
        {airing.map(series => (
          <div key={series.id} className='series-container'>
            <img src={series.coverImage.large} className='series-cover'/>
            <button onClick={()=>onAddTrackingBtnClick(series)}>Add To Tracking</button>
            <div className='series-title'>{series.title.english ? series.title.english : series.title.romaji}</div>
          </div>
        )
        )}
      </div>
    </div>
  )
}
export default App
