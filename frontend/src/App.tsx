import { useEffect, useState } from 'react'
import './App.css'
import { fetchTopAiring, type AnilistMedia} from './api/airing'
import LatestTrackingSection from './latestTracking'

function App() {
  const [tracking, setTracking] = useState(Array<AnilistMedia>)
  const [airing, setAiring] = useState(Array<AnilistMedia>)
  const [currentPageNumber, setCurrentPageNumber] = useState(1)
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
  }, [])

  const onAddTrackingBtnClick = (series:AnilistMedia) => {
    console.log(series.id)
    setTracking([...tracking, series])
  }
  return (
    <div>
      <LatestTrackingSection tracking={tracking}/>
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
