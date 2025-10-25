export class PokeAPI {
    public baseURL = "https://pokeapi.co/api/v2";
    public offset: number = 0;
    public prev: string | null = null;
    public next: string | null = null;
    private locy: string;
    // public locy = "/location-area/";

    constructor(apiName: string) {
        this.locy = apiName;
     }

    async fetchLocations(caller: string): Promise<ShallowLocations> {
        // implement this
        const pageURL = this.baseURL+this.locy;
        let res: Location;

        if(caller === "map"){
            if(this.next === null){
                res = await this.fetchLocation(pageURL);
            } else{
                res = await this.fetchLocation(this.next);
            }
            this.next = res.next;
            this.prev = res.previous;
            return res;
            // const final = res.results.map((item) => item.name);
            // return final;
            

        } else {
            // Case for if(caller === "mapb") , Convert to else if, if more commands are added

            // move this check to the mapb command itself
            // if(this.prev === null){
            //     console.log("you're on the first page");
            // } 
            res = await this.fetchLocation(this.prev as string);
            this.next = res.next;
            this.prev = res.previous;
            return res;
            // const final = res.results.map((item) => item.name);
            // return final;
        }

    }

    async fetchLocation(locationName: string): Promise<Location> {
        // implement this
        const res = await fetch(locationName, {
            method: "GET"
        });
        return res.json();
    }
}

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