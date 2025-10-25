export class PokeAPI {
    baseURL = "https://pokeapi.co/api/v2";
    offset = 0;
    prev = null;
    next = null;
    locy;
    // public locy = "/location-area/";
    constructor(apiName) {
        this.locy = apiName;
    }
    async fetchLocations(caller) {
        // implement this
        const pageURL = this.baseURL + this.locy;
        let res;
        if (caller === "map") {
            if (this.next === null) {
                res = await this.fetchLocation(pageURL);
            }
            else {
                res = await this.fetchLocation(this.next);
            }
            this.next = res.next;
            this.prev = res.previous;
            return res;
            // const final = res.results.map((item) => item.name);
            // return final;
        }
        else {
            // Case for if(caller === "mapb") , Convert to else if, if more commands are added
            // move this check to the mapb command itself
            // if(this.prev === null){
            //     console.log("you're on the first page");
            // } 
            res = await this.fetchLocation(this.prev);
            this.next = res.next;
            this.prev = res.previous;
            return res;
            // const final = res.results.map((item) => item.name);
            // return final;
        }
    }
    async fetchLocation(locationName) {
        // implement this
        const res = await fetch(locationName, {
            method: "GET"
        });
        return res.json();
    }
}
