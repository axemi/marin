import { useEffect, useState } from "react"
import { main } from "../wailsjs/go/models"
import { GetTrackedAnimeAll } from "../wailsjs/go/main/App"
// import { getAnimeDataMultiple } from "./api/tracking"

export function TrackedAnimeList(/*{tracking}:props*/) {
    const [trackedAnime, setTrackedAnime] = useState(Array<main.TrackedAnimeTableRow>)
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

    useEffect(()=>{
        fetchTrackedAnime()
        // const q = getAnimeDataMultiple([1,2,3])
        // console.log(q)
    }, [])
    return (
        <div>
            <div className="tracking-anime-list">
                {/* {trackedAnime.length == 0 ? <div>Not tracking any anime</div>: trackedAnime.map(ta => <div key={ta.Anilist_id}>{ta.Anilist_id}</div>)} */}
                {trackedAnime.map(series => (
                    <div key={series.Anilist_id} className="series-container">
                        <img src={series.Cover_img} className="series-cover"/>
                        <div className="series-title">{series.Eng_title ? series.Eng_title : series.Romaji_title}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}


// type props = {
//     tracking: main.TrackedAnimeTableRow[]
// }