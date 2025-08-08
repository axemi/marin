const generic_query = `
query Query($mediaId: Int) {
  Media(id: $mediaId) {
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
}
`

export function getAnimeDataMultiple(anilistIds: number[]): string  {
    const queries = anilistIds.map((id, index) => {
        return `
        a${index}: Media(id: ${id}, type: ANIME) {
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
        `
    })
    const final = `
    query {
    ${queries.map(query => query)}
    }
`
    return final
}

/*
query {
  anime1: Media(id: 1, type: ANIME) { title { romaji } }
  anime2: Media(id: 5114, type: ANIME) { title { romaji } }
  anime3: Media(id: 11061, type: ANIME) { title { romaji } }
}
*/