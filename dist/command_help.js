export function commandHelp(input) {
    console.log(`Welcome to the Pokedex!\nUsage:\n`);
    for (const key in input.commands) {
        console.log(`${input.commands[key]['name']}: ${input.commands[key]['description']}`);
    }
}
