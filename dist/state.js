import { createInterface } from "readline";
import { getCommands } from "./commandDirectory.js";
import { PokeAPI } from "./pokeapi.js";
import { Cache } from "./pokecache.js";
// /location-area/
export function initState() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > "
    });
    const cd = getCommands();
    const cache = new Cache(30000);
    const api = new PokeAPI(cache);
    return { repl: rl, commands: cd, api: api };
}
