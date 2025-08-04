//official mal api requires user auth just to get episodes???

//scrape instead.. direct html scraping apparently isnt allowed from the browser and should be ran server side
//for now lets just create a basic Episode list without titles and just infer based on anilist episode count and nextairing episode to disable numbers that arent out yet

const MAL_EPISODES_TAB = "Episodes" //this is an a htmlelement -- get the href to ensure we get the accurate episodes list url
const MAL_EPISODES_LIST = "episode-list" //this is the class name of the table that contains the episodes
const MAL_EPISODES_LIST_ROW = "episode-list-data" //each row on the table has a classname of "episode-list-data"


export {} //placeholder for wails errors