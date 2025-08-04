import type { AnilistMedia } from "./api/airing"
import './App.css'

export default function LatestTrackingSection({tracking}: props) {
    return (
        <div>
            <div>Latest Tracking</div>
            <div className="latest-tracking">
            {tracking.map(series => (
                <div key={series.id} className='series-container'>
                    <img src={series.coverImage.large} className='series-cover'/>
                    <div className='series-title'>{series.title.english ? series.title.english : series.title.romaji}</div>
                </div>
                )
            )}
            </div>
        </div>
    )
}

type props = {
    tracking: AnilistMedia[]
}
