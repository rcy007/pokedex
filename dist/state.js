import { createInterface } from "readline";
import { getCommands } from "./repl.js";
import { PokeAPI } from "./pokeapi.js";
export function initState() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > "
    });
    const cd = getCommands();
    const api = new PokeAPI("/location-area/");
    return { repl: rl, commands: cd, api: api };
}
