import { Pokemon } from "./pokeapi.js";
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

function getRandomIntInclusive(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); 
  // The maximum is inclusive and the minimum is inclusive
}

export async function commandCatch(state: State, argument: string): Promise<void> {
    try {
        const final = await state.api.fetchLocations("catch", argument);
        if (["name","base_experience"].every(x => x in final)) {
            console.log(`Throwing a Pokeball at ${argument}...`);
            const proby = getRandomIntInclusive(0, final.base_experience as number);
            if(proby >= (final.base_experience as number) / 2){
                // Adding to pokedex
                const pokemon = final.name;
                if(pokemon){
                    const pokemonKeys = ["name", "height", "weight", "stats", "types"] as const;
                    const pick = (obj: Pokemon, keys: typeof pokemonKeys) =>
                        keys.reduce((acc, key) => (key in obj ? { ...acc, [key]: obj[key] } : acc), {});

                    const subset = pick(final as Pokemon, pokemonKeys);
                    state.dex[pokemon] = subset as Pokemon;
                    console.log(`${final.name} was caught!`);
                    console.log("You may now inspect it with the inspect command.");
                }
            } else{
                console.log(`${final.name} escaped!`);
            }
        } else {
            console.log("No such pokemon!!");
        }
    } catch {
        console.log("API Error!!");
    }
}

export async function commandInspect(state: State, argument: string): Promise<void> {
    const pokeDetails = state.dex[argument];
    if(pokeDetails){
        console.log(`Name: ${pokeDetails.name}`);
        console.log(`Height: ${pokeDetails.height}`);
        console.log(`Weight: ${pokeDetails.weight}`);
        console.log(`Stats: `);
        pokeDetails.stats.forEach((value: any)=>console.log(`-${value['stat']['name']}: ${value.base_stat}`));
        console.log(`Types: `);
        pokeDetails.types.forEach((value)=> console.log(`- ${value['type']['name']}`));
        // console.log(pokeDetails);
    } else {
        console.log(`you have not caught that pokemon`);
    }
}

export async function commandPokedex(state: State): Promise<void> {
    try{
    const pokedex = state.dex;
    if(Object.keys(pokedex).length === 0){
        console.log(`Sorry, you havn't caught any pokemons yet.`);
    } else{
        console.log(`Your Pokedex:`);
        for (const key in pokedex) {
        console.log(` - ${key}`);
    }
    }
    } catch(e){
        console.log(`Error fetching Pokedex: ${e}`);
    }
}