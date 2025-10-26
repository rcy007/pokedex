import { createInterface, type Interface } from "readline";
import { getCommands } from "./repl.js";
import { PokeAPI } from "./pokeapi.js";
import { Cache } from "./pokecache.js";

export type State = {
    repl: Interface;
    commands: Record<string, CLICommand>;
    api: PokeAPI;
};

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => Promise<void>;
}

export function initState(): State{
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > "
    });
    const cd = getCommands();
    const api = new PokeAPI("/location-area/");
    return {repl: rl, commands: cd, api: api};
}
