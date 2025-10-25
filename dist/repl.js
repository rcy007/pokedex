import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";
// import { initState } from "./state.js";
export function getCommands() {
    return {
        help: {
            name: 'help',
            description: 'Displays a help message',
            callback: commandHelp
        },
        exit: {
            name: 'exit',
            description: "Exit the Pokedex",
            callback: commandExit
        },
        map: {
            name: 'map',
            description: "Displays the frist/next location areas.",
            callback: commandMap
        },
        mapb: {
            name: 'mapb',
            description: "Displays the pervious page of location areas.",
            callback: commandMapb
        }
    };
}
function isCLICommand(value) {
    return (value !== null &&
        typeof value === "object" &&
        typeof value.callback === "function");
}
export function startREPL(state) {
    const cd = state['commands'];
    const rl = state['repl'];
    rl.prompt();
    rl.on("line", async (input) => {
        if (input.trim() === "") {
            rl.prompt();
        }
        else {
            const command = cd[input];
            if (!isCLICommand(command)) {
                console.log("Unknown command");
                rl.prompt();
            }
            else {
                try {
                    await command.callback(state);
                    rl.prompt();
                }
                catch (e) {
                    console.log(e);
                    rl.prompt();
                }
            }
        }
    });
}
