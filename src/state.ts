import { createInterface, type Interface } from "readline";
import { getCommands } from "./repl.js";

export type State = {
    repl: Interface;
    commands: Record<string, CLICommand>;
};

export function initState(): State{
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > "
    });
    const cd = getCommands();
    return {repl: rl, commands: cd};
}

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => void;
}