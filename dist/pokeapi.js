export class PokeAPI {
    baseURL = "https://pokeapi.co/api/v2";
    offset = 0;
    prev = null;
    next = null;
    locy;
    cache;
    constructor(apiName, cache) {
        this.locy = apiName;
        this.cache = cache;
    }
    async fetchLocations(caller, argument) {
        const pageURL = this.baseURL + this.locy;
        const newURL = pageURL + argument;
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
        if (caller === "mapb") {
            // Case for if(caller === "mapb") , Convert to else if, if more commands are added
            res = await this.fetchLocation(this.prev);
            this.next = res.next;
            this.prev = res.previous;
            return res;
        }
        if (caller === "explore") {
            res = await this.fetchLocation(newURL);
            return res;
        }
        return {};
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
