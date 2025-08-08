import { useEffect, useState } from 'react'
import './App.css'
import { fetchTopAiring, type AnilistMedia } from './api/airing'
import { InsertTrackedAnime } from '../wailsjs/go/main/App'

export function AiringAnimeList() {
    const [airing, setAiring] = useState(Array<AnilistMedia>)
    const [currentPageNumber, setCurrentPageNumber] = useState(1)
    const onAddTrackingBtnClick = async (series:AnilistMedia) => {
        try {
          console.log(series.id)
          if (series && series.id != undefined) await InsertTrackedAnime(series.id, series.coverImage.large, series.title.english, series.title.romaji)
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
  }, [])
  
    return (
        <div>
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

// type props = {
//     airing: AnilistMedia[]
//     onAddTrackingBtnClick: (series: AnilistMedia) => void
// }