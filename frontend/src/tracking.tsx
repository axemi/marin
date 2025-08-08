import { useEffect, useState } from "react"
import { main } from "../wailsjs/go/models"
import { GetTrackedAnimeAll } from "../wailsjs/go/main/App"

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
    }, [])
    return (
        <div>
            <div>Tracked Anime List WIP</div>
            <div>
                {trackedAnime.length == 0 ? <div>Not tracking any anime</div>: trackedAnime.map(ta => <div key={ta.Anilist_id}>{ta.Anilist_id}</div>)}
            </div>
        </div>
    )
}


// type props = {
//     tracking: main.TrackedAnimeTableRow[]
// }