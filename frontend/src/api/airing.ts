const GET_ANILIST_CURRENT_AIRING_QUERY = `
query Query($page: Int, $season: MediaSeason, $seasonYear: Int) {
  Page(perPage: 25, page: $page) {
    media(type: ANIME, status: RELEASING, countryOfOrigin: JP, season: $season, seasonYear: $seasonYear) {
      id
      title {
        english
        romaji
      }
      genres
      episodes
      coverImage {
        large
      }
    }
    pageInfo {
      currentPage
      hasNextPage
      lastPage
      perPage
      total
    }
  }
}
`
const GET_ANILIST_TOP_AIRING_QUERY =`
query Query($page: Int, $season: MediaSeason, $seasonYear: Int, $sort: [MediaSort]) {
  Page(perPage: 25, page: $page) {
    media(type: ANIME, status: RELEASING, countryOfOrigin: JP, season: $season, seasonYear: $seasonYear, sort: $sort) {
      id
      title {
        english
        romaji
      }
      genres
      episodes
      coverImage {
        large
      }
      popularity
    }
    pageInfo {
      currentPage
      hasNextPage
      lastPage
      perPage
      total
    }
  }
}
`
export interface AnilistMedia {
    id: number | undefined
    title: {
        english: string
        romaji: string
    }
    genres: string[]
    episodes: number
    coverImage: {
        large: string
    }
}
export interface AnilistPageMedia {
    media: AnilistMedia[]
    pageInfo: {
        currentPage: number
        hasNextPage: boolean
        lastPage: number
        perPage: number
        total: number
    }
}

export interface AnilistPageMediaData {
    data: {
        Page: AnilistPageMedia
    }
}
export async function fetchAiring(page: number): Promise<AnilistPageMediaData>{
    let season = getCurrentAnimeSeason()
    let response = await fetch(`https://graphql.anilist.co`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({query: GET_ANILIST_CURRENT_AIRING_QUERY, variables: {page: page, season: season.season, seasonYear: season.year}})
    })

    let results = await response.json()
    console.log(results)
    return results
}

export async function fetchTopAiring(page:number): Promise<AnilistPageMediaData> {
  let season = getCurrentAnimeSeason()
  let response = await fetch(`https://graphql.anilist.co`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({query: GET_ANILIST_TOP_AIRING_QUERY, variables: {page: page, season: season.season, seasonYear: season.year, sort: 'POPULARITY_DESC'}})
  })

  let results = await response.json()
  console.log(results)
  return results
}

type AnimeSeason = "WINTER" | "SPRING" | "SUMMER" | "FALL"

interface SeasonInfo {
    season: AnimeSeason,
    year: number
}

function getCurrentAnimeSeason(): SeasonInfo {
    const now = new Date()
    const month = now.getMonth() + 1 //months start at 0
    const year = now.getFullYear()

    let season: AnimeSeason
    if (month >= 1 && month <= 3) {
    season = "WINTER"
    } else if (month >= 4 && month <= 6) {
    season = "SPRING"
    } else if (month >= 7 && month <= 9) {
    season = "SUMMER"
    } else {
    season = "FALL"
    }
    
    return { season, year }
}