import { State } from "./state.js";

export async function commandMapb(state: State): Promise<void>{
    if(state.api.prev === null){
        console.log("you're on the first page");
        // Writing this so that when it reaches the first page, the map command also resets.
        state.api.next = null;
        return;
    } 
    const final = await state.api.fetchLocations("mapb");
    if(Array.isArray(final.results)){
        const locations = final.results.map((item) => item.name);
        locations.forEach((item) => console.log(item));
    } else{
        console.log("API Error!!");
    }
}