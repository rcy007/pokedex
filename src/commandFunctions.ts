import { State } from "./state.js";

export async function commandHelp(input: State): Promise<void> {
    console.log(`Welcome to the Pokedex!\nUsage:\n`);

    for (const key in input.commands) {
        console.log(`${input.commands[key]['name']}: ${input.commands[key]['description']}`);
    }
}

export async function commandExit(state: State): Promise<void> {
    console.log("Closing the Pokedex... Goodbye!");
    state.repl.close();
    process.exit(0);
}


export async function commandMap(state: State): Promise<void> {

    const final = await state.api.fetchLocations("map");
    if (Array.isArray(final.results)) {
        const locations = final.results.map((item) => item.name);
        locations.forEach((item) => console.log(item));
    } else {
        console.log("API Error!!");
    }

}


export async function commandMapb(state: State): Promise<void> {
    if (state.api.prev === null) {
        console.log("you're on the first page");
        // Writing this so that when it reaches the first page, the map command also resets.
        state.api.next = null;
        return;
    }
    const final = await state.api.fetchLocations("mapb");
    if (Array.isArray(final.results)) {
        const locations = final.results.map((item) => item.name);
        locations.forEach((item) => console.log(item));
    } else {
        console.log("API Error!!");
    }
}


export async function commandExplore(state: State, argument: string): Promise<void> {
    try {
        const final = await state.api.fetchLocations("explore", argument);
        if ("pokemon_encounters" in final && Array.isArray(final.pokemon_encounters)) {
            const locations = final.pokemon_encounters.map((item) => item.pokemon.name);
            locations.forEach((item) => console.log(item));
        } else {
            console.log("API Error!!");
        }
    } catch {
        console.log("API Error!!");
    }
}


export async function commandCatch(state: State, argument: string): Promise<void> {
    try {
        const final = await state.api.fetchLocations("explore", argument);
        if ("pokemon_encounters" in final && Array.isArray(final.pokemon_encounters)) {
            const locations = final.pokemon_encounters.map((item) => item.pokemon.name);
            locations.forEach((item) => console.log(item));
        } else {
            console.log("API Error!!");
        }
    } catch {
        console.log("API Error!!");
    }
}