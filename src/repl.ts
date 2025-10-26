import { State } from "./state.js";
import { type CLICommand } from "./commandDirectory.js";

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

