import { main } from "../wailsjs/go/models"

export function TrackedAnimeList({tracking}:props) {
    return (
        <div>
            <div>Tracked Anime List WIP</div>
            <div>
                {tracking.length == 0 ? <div>Not tracking any anime</div>: tracking.map(ta => <div key={ta.Anilist_id}>{ta.Anilist_id}</div>)}
            </div>
        </div>
    )
}


type props = {
    tracking: main.TrackedAnimeTableRow[]
}