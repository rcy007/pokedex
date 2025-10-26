import { createInterface, type Interface } from "readline";
import { getCommands } from "./commandDirectory.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";
import { Cache } from "./pokecache.js";
import { type Location } from "./pokeapi.js";
import { type CLICommand } from "./commandDirectory.js";

export type State = {
    repl: Interface;
    commands: Record<string, CLICommand>;
    api: PokeAPI;
    dex: Record<string, Pokemon>;
};

// /location-area/
export function initState(): State{
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > "
    });
    const cd = getCommands();
    const cache = new Cache(30000);
    const api = new PokeAPI(cache as Cache<Location>);
    const dex = {};
    return {repl: rl, commands: cd, api: api, dex: dex};
}
