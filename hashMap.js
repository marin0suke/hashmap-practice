export default class HashMap {
    constructor() {
        this.hashMap = new Array(this.capacity).fill(null); // initialise with capacity and fill with nothing.
        this.capacity = 16; // total number of buckets. match this with new Array that was declared.
        this.loadFactor = 0.75; // initialise with typical load factor. resize when 75% full.
        this.size = 0; // total number of elements in map.
    }

    hash(key) {
        let hashCode = 0;

        const prime = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (prime * hashCode + key.charCodeAt(i)) % this.capacity; // apply % on each iteration to ensure key will be valid int. 
            // although this way = slightly less randomness vs applying % to just the end result.
        }

        return Math.abs(hashCode); // ensures positive int.
    }

    set(key, value) {
        const index = this.hash(key); // sets the hash of the key param to const index. using 'this' ensures we stay within the context of this HashMap instance.

        if (!this.hashMap[index]) { // access hashmap index by [] notation.
            this.hashMap[index] = []; // create new bucket in the form of an array (chaining). 
        }

        //check if key exists in bucket
        for (let pair of this.hashMap[index]) {
            if (pair[0] === key) {
                pair[1] = value; // set the value to the passed in value. (update the value).
                return;
            }
        }

        this.hashMap[index].push([key, value]); // add the key value as an array at the created index if it doesn't exist in hashmap yet.  
        this.size++; // increment size of hashmap.

        //check load factor and resize if necessary.

        if (this.size / this.capacity > this.loadFactor) {
            this.resize();
        }

    }

    resize() {
        const oldMap = this.hashMap; // save the current map.
        this.capacity *= 2; // double the size.
        this.hashMap = new Array(this.capacity).fill(null); // new array with new capacity.
        this.size = 0; // resets size, will be filled when rehashing.

        // re-add/rehash all existing key value pairs.
        for (let bucket of oldMap) {
            if (bucket) {
                for (let [key, value] of bucket) {
                    this.set(key, value); // reinserts into new map.
                }
            }
        }

    }

    get(key) {
        const index = this.hash(key);
        const bucket = this.hashMap[index]; // look up bucket.

        if (!bucket) {
            return null; // if no bucket at index, no value to retrieve.
        }

        for (let [storedKey, storedValue] of bucket) {
            if (storedKey === key) {
                return storedValue; // use for of to search by key and retrieve value.
            }
        }
         
        return null;
    }

    has(key) {
        const index = this.hash(key);
        const bucket = this.hashMap[index];

        if (!bucket) {
            return false; 
        }

        for (let [storedKey, storedValue] of bucket) {
            if (storedKey === key) {
                return true;
            }
        }
         
        return false;
    }

    remove(key) {
        const index = this.hash(key);
        const bucket = this.hashMap[index];

        if (!bucket) return false;

        for (let i = 0; i < bucket.length; i++) { // iterate over the bucket.
            const [storedKey] = bucket[i]; // destructure pair
            if (storedKey === key) {
                bucket.splice(i, 1); // remove at i.
                this.size--;
                return true;
            }
        }

        return false; // add error.
    }

    length() {
        //return the number of stored keys in the hashmap.
        let totalKeys = 0;
        
        for (let bucket of this.hashMap) { // iterate over each bucket.
            if (bucket) {
                totalKeys += bucket.length; // adds number of pairs in bucket to count.
            }
        }

        return totalKeys;
    }

    clear() {
        for (let bucket of this.hashMap) {
            if (bucket) {
                bucket.length = 0; // this or splice(0, bucket.length); ?
            }
        }

        this.size = 0;
        return true;
    }

    keys() {
        let keys = []; // to return.

        for (let bucket of this.hashMap) {
            if (bucket) {
                for (let [storedKey] of bucket) {
                    keys.push(storedKey);
                }
            }
        } 

        return keys;
    }

    values() {
        let values = []; // to return.

        for (let bucket of this.hashMap) {
            if (bucket) {
                for (let [_, storedValue] of bucket) { // _ used for ignored variables. could also leave in for readability.
                    values.push(storedValue);
                }
            }
        } 

        return values;
    }

    entries() {
        let entries = []; // to return.

        for (let bucket of this.hashMap) {
            if (bucket) {
                for (let [storedKey, storedValue] of bucket) { // _ used for ignored variables. could also leave in for readability.
                    entries.push([storedKey, storedValue]);
                }
            }
        } 

        return entries;
    }



}

