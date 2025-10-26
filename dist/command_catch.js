export async function commandExplore(state, argument) {
    try {
        const final = await state.api.fetchLocations("explore", argument);
        if ("pokemon_encounters" in final && Array.isArray(final.pokemon_encounters)) {
            const locations = final.pokemon_encounters.map((item) => item.pokemon.name);
            locations.forEach((item) => console.log(item));
        }
        else {
            console.log("API Error!!");
        }
    }
    catch {
        console.log("API Error!!");
    }
}
