function memoize(fn, dependencies) {
    const cache = {deps: [], value: undefined}
    return function() {
        const hasChanged = dependencies.some((dep,i) => dep !== cache.deps[i])
        if (hasChanged || !cache.deps.length) {
            cache.deps = [...dependencies]
            cache.value = fn()
        }

        return cache.value
    }
}

console.log()