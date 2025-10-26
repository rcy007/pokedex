import * as commands from "./commandFunctions.js";
export function getCommands() {
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
            description: 'Try to catch a pokemon.',
            callback: commands.commandCatch
        }
    };
}
