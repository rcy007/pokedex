import { CLICommand, State } from "./state.js";

import * as commands from "./commands.js";


export function getCommands(): Record<string, CLICommand>{
    return {
        help: {
            name: 'help',
            description: 'Displays a help message.',
            callback: commands.commandHelp
        },
        exit: {
            name: 'exit',
            description: "Exit the Pokedex.",
            callback: commands.commandExit
        },
        map: {
            name: 'map',
            description: "Displays the frist/next location areas.",
            callback: commands.commandMap
        },
        mapb: {
            name: 'mapb',
            description: "Displays the pervious page of location areas.",
            callback: commands.commandMapb
        },
        explore: {
            name: 'explore',
            description: 'Finds all pokemons in the given location area.',
            callback: commands.commandExplore
        },
        catch: {
            name: 'catch',
            description: 'Finds all pokemons in the given location area.',
            callback: commands.commandCatch
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

