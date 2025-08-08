export namespace main {
	
	export class TrackedAnimeTableRow {
	    Anilist_id: number;
	    Cover_img: string;
	    Eng_title: string;
	    Romaji_title: string;
	
	    static createFrom(source: any = {}) {
	        return new TrackedAnimeTableRow(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Anilist_id = source["Anilist_id"];
	        this.Cover_img = source["Cover_img"];
	        this.Eng_title = source["Eng_title"];
	        this.Romaji_title = source["Romaji_title"];
	    }
	}

}

