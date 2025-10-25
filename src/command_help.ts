// import type { CLICommand } from "./command.js";
import { State } from "./state.js";

export async function commandHelp(input: State): Promise<void>{
    console.log(`Welcome to the Pokedex!\nUsage:\n`);

    for(const key in input.commands){
        console.log(`${input.commands[key]['name']}: ${input.commands[key]['description']}`);
    }
}