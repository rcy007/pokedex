import { createInterface, type Interface } from "readline";
import { getCommands } from "./commandDirectory.js";
import { PokeAPI } from "./pokeapi.js";
import { Cache } from "./pokecache.js";
import { type Location } from "./pokeapi.js";
import { type CLICommand } from "./commandDirectory.js";

export type State = {
    repl: Interface;
    commands: Record<string, CLICommand>;
    api: PokeAPI;
};


export function initState(): State{
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > "
    });
    const cd = getCommands();
    const cache = new Cache(30000);
    const api = new PokeAPI("/location-area/", cache as Cache<Location>);
    return {repl: rl, commands: cd, api: api};
}
