// import { createInterface } from "node:readline";
import { CLICommand, State } from "./state.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
// import { initState } from "./state.js";


export function getCommands(): Record<string, CLICommand>{
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
        }
    }
}

export function startREPL(state: State) {
    const cd = state['commands'];
    const rl = state['repl'];
    rl.prompt();
    rl.on("line", (input) => {
        if (input.trim() === "") {
            rl.prompt();
        } else {
            if (input in cd){
                try{
                    cd[input].callback(state);
                    rl.prompt();
                }
                catch(e){
                    console.log(e);
                    rl.prompt();
                }
            } else{
                console.log("Unknown command");
                rl.prompt();
            }
        }
    });
}

