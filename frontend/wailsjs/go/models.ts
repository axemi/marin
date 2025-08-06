export namespace main {
	
	export class TrackedAnimeTableRow {
	    Anilist_id: number;
	
	    static createFrom(source: any = {}) {
	        return new TrackedAnimeTableRow(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Anilist_id = source["Anilist_id"];
	    }
	}

}

