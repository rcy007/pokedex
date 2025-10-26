import { Cache } from "./pokecache.js";

export type ShallowLocations = Partial<Location>

//  | { pokemon_encounters: {'pokemon': {'name': string}}[] };

export type Pokemon = {
  name: string,
  height: number,
  weight: number,
  stats: any,
  // stats: Record<string, number | Record<string, string>> [],
  types: Record<string, Record<string,string>>[]
}

export type PokemonEncounter = {
  pokemon: { name: string };
};

export type Location =  {
  count: number,
  next: string,
  previous: any,
  results: Result[],
  // explore - pokemons in location area types
  pokemon_encounters?: PokemonEncounter[],
  // Pokemon type info
  name?: string,
  base_experience?: number

}

export type Result = {
  name: string,
  url: string,
}

export class PokeAPI {
  public readonly baseURL = "https://pokeapi.co/api/v2";
  public offset: number = 0;
  public prev: string | null = null;
  public next: string | null = null;
  public cache: Cache<Location>;
  public pageURL: string | undefined;

  constructor(cache: Cache<Location>) {
    this.cache = cache;
  }

  async fetchLocations(caller: string, argument?: string): Promise<ShallowLocations> {
    // const pageURL = this.baseURL + this.locy;
    // const newURL = pageURL + argument;
    let res: Location;

    if (caller === "map") {
      this.pageURL = this.baseURL + '/location-area/';
      if (this.next === null) {
        res = await this.fetchLocation(this.pageURL);
      } else {
        res = await this.fetchLocation(this.next);
      }
      this.next = res.next;
      this.prev = res.previous;
      return res;
    } 

    if(caller === "mapb") {
      // Case for if(caller === "mapb") , Convert to else if, if more commands are added
      res = await this.fetchLocation(this.prev as string);
      this.next = res.next;
      this.prev = res.previous;
      return res;
    }

    if(caller === "explore") {
      this.pageURL = this.baseURL + '/location-area/' + argument;
      res = await this.fetchLocation(this.pageURL);
      return res;
    }

    if(caller === "catch") {
      this.pageURL = this.baseURL + '/pokemon/' + argument;
      res = await this.fetchLocation(this.pageURL);
      return res;
    }

    return {};

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
