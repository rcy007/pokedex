
export type CacheEntry<T> = {
    createdAt: number;
    val: T;
}

export class Cache<T> {
    #cache = new Map<string, CacheEntry<T>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number){
        this.#interval = interval;
        this.#startReapLoop();

    }

    add(key: string, val: CacheEntry<T>){
        this.#cache.set(key, val);
    }

    get(key: string){
        if(this.#cache.has(key)){
            return this.#cache.get(key) as CacheEntry<T>;
        } else{
            return undefined;
        }
    }

    #reap(){
        for(const [key,value] of this.#cache){
            if(value.createdAt < Date.now() - this.#interval){
                this.#cache.delete(key);
            }
        }
    }

    #startReapLoop(){
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);   
    }

    stopReapLoop(){
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }








}