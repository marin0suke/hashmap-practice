import HashMap from "./hashMap";

export default class HashSet {
    constructor() {
        this.map = new HashMap();
    }

    add(key) {
        this.map.set(key, true); // placeholder for value since we only care about the key here.
    }

    has(key) {
        return this.map.has(key);
    }

    delete(key) {
        return this.map.remove(key);
    }

    clear() {
        this.map.clear();
    }

    size() {
        return this.map.size;
    }

    keys() {
        return this.map.keys();
    }
}

// could add return this to support chaining.