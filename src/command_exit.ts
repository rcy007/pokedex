import { State } from "./state.js";

export function commandExit(state: State): void{
    console.log("Closing the Pokedex... Goodbye!");
    state.repl.close();   
    process.exit(0);
}