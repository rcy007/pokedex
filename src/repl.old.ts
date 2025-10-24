import { createInterface } from "node:readline";

export function cleanInput(input: string){
    let res = input.toLowerCase().trim().split(/\s+/);
    return res;
}

export function startREPL() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });
    rl.prompt();
    rl.on("line", (input) => {
        if (input.trim() === "") {
            rl.prompt();
        } else {
            const res = cleanInput(input)[0];
            console.log(`Your command was: ${res}`);
            rl.prompt();
        }
    });
}

