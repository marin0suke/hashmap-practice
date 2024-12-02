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
        
    }
}

