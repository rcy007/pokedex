import { Cache } from "./pokecache.js";
import { test, expect } from "vitest";
import { type CacheEntry } from "./pokecache.js";

test.concurrent.each([
    {
        key: "https://example.com",
        val: "testdata",
        interval: 500, // 1/2 second
    },
    {
        key: "https://example.com/path",
        val: "moretestdata",
        interval: 1000, // 1 second
    },
])("Test Caching $interval ms", async ({ key, val, interval }) => {
    const cache = new Cache(interval);
    let final = { 'createdAt': Date.now(), 'val': val };
    cache.add(key, final);
    const cached = cache.get(key);
    expect(cached).toBe(final);

    await new Promise((resolve) => setTimeout(resolve, interval + 100));
    const reaped = cache.get(key);
    // console.log(reaped);
    expect(reaped).toBe(undefined);

    cache.stopReapLoop();
});