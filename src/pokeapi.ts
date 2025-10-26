import { Cache } from "./pokecache.js";

export type ShallowLocations = Partial<Location>;

export type Location =  {
  count: number,
  next: string,
  previous: any,
  results: Result[]
}

export type Result = {
  name: string,
  url: string,
}

export class PokeAPI {
  public baseURL = "https://pokeapi.co/api/v2";
  public offset: number = 0;
  public prev: string | null = null;
  public next: string | null = null;
  private locy: string;
  public cache = new Cache<Location>(5000);

  constructor(apiName: string) {
    this.locy = apiName;
  }

  async fetchLocations(caller: string): Promise<ShallowLocations> {
    const pageURL = this.baseURL + this.locy;
    let res: Location;

    if (caller === "map") {
      if (this.next === null) {
        res = await this.fetchLocation(pageURL);
      } else {
        res = await this.fetchLocation(this.next);
      }
      this.next = res.next;
      this.prev = res.previous;
      return res;
    } else {
      // Case for if(caller === "mapb") , Convert to else if, if more commands are added
      res = await this.fetchLocation(this.prev as string);
      this.next = res.next;
      this.prev = res.previous;
      return res;
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
        const cached = this.cache.get(locationName);
        if (cached) {
            console.log("\n\n--- Fetched Cached Result ---\n\n");
            return cached['val'];
        } else {
            const res = await fetch(locationName, {
                method: "GET",
            });
            const final = await res.json()
            this.cache.add(locationName, {'createdAt': Date.now(), 'val': final});
            console.log("\n\n--- Fetched GET Call ---\n\n");
            return final;
        }
    }
}
