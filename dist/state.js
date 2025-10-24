import { createInterface } from "readline";
import { getCommands } from "./repl.js";
export function initState() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > "
    });
    const cd = getCommands();
    return { repl: rl, commands: cd };
}
