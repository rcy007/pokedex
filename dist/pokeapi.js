import { Cache } from "./pokecache.js";
export class PokeAPI {
    baseURL = "https://pokeapi.co/api/v2";
    offset = 0;
    prev = null;
    next = null;
    locy;
    cache = new Cache(5000);
    constructor(apiName) {
        this.locy = apiName;
    }
    async fetchLocations(caller) {
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
        }
        else {
            // Case for if(caller === "mapb") , Convert to else if, if more commands are added
            res = await this.fetchLocation(this.prev);
            this.next = res.next;
            this.prev = res.previous;
            return res;
        }
    }
    async fetchLocation(locationName) {
        const cached = this.cache.get(locationName);
        if (cached) {
            console.log("\n\n--- Fetched Cached Result ---\n\n");
            return cached['val'];
        }
        else {
            const res = await fetch(locationName, {
                method: "GET",
            });
            const final = await res.json();
            this.cache.add(locationName, { 'createdAt': Date.now(), 'val': final });
            console.log("\n\n--- Fetched GET Call ---\n\n");
            return final;
        }
    }
}
