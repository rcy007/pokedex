// import { createInterface } from "node:readline";
import { CLICommand, State } from "./state.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
// import { initState } from "./state.js";


export function getCommands(): Record<string, CLICommand>{
    return {
        help: {
            name: 'help',
            description: 'Displays a help message.',
            callback: commandHelp
        },
        exit: {
            name: 'exit',
            description: "Exit the Pokedex.",
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
        },
        explore: {
            name: 'explore',
            description: 'Finds all pokemons in the given location area.',
            callback: commandExplore
        }
    }
}

function isCLICommand(value: unknown): value is CLICommand {
  return (
    value !== null &&
    typeof value === "object" &&
    typeof (value as CLICommand).callback === "function"
  );
}


export function startREPL(state: State) {
    const cd = state['commands'];
    const rl = state['repl'];
    rl.prompt();
    rl.on("line", async (input) => {
        if (input.trim() === "") {
            rl.prompt();
        } 
        else {
            const [cmd, argument] = input.split(" ");
            const command = cd[cmd];
            if (!isCLICommand(command)) {
                console.log("Unknown command");
                rl.prompt();
            }
            else {
                try {
                    if(argument){
                        await command.callback(state, argument);
                    } else{
                        await command.callback(state);
                    }
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

