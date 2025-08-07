import './App.css'
import { type AnilistMedia } from './api/airing'

export function AiringAnimeList({airing, onAddTrackingBtnClick}:props) {
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

type props = {
    airing: AnilistMedia[]
    onAddTrackingBtnClick: (series: AnilistMedia) => void
}