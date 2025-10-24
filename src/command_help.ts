// import type { CLICommand } from "./command.js";
import { State } from "./state.js";

export function commandHelp(input: State){
    console.log(`Welcome to the Pokedex!\nUsage:\n`);

    for(const key in input.commands){
        console.log(`${input.commands[key]['name']}: ${input.commands[key]['description']}`);
    }
}