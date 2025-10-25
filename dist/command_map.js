export async function commandMap(state) {
    const final = await state.api.fetchLocations("map");
    if (Array.isArray(final.results)) {
        const locations = final.results.map((item) => item.name);
        locations.forEach((item) => console.log(item));
    }
    else {
        console.log("API Error!!");
    }
}
