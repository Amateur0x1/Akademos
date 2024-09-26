function memoize(fn) {
    const cache = {deps: []}
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            console.log("Fetching from cache:", key);
            return cache.get(key)
        }

        const result = fn(...args);
        cache.set(key, result);
        return result
    }
}

console.log()