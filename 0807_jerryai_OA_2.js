// Task: Implement a class named 'RangeList'
// A pair of integers define a range, for example: [1, 5). This range includes integers: 1, 2, 3, and 4.
// A range list is an aggregate of these ranges: [1, 5), [10, 11), [100, 201)
/**
*
* NOTE: Feel free to add any extra member variables/functions you like.
*/

class RangeList {
    constructor() {
        this.rangeList = [] // initialize a range list(array) to store all the ranges
    }

    /**
    * Adds a range to the list
    * @param {Array<number>} range - Array of two integers that specify
    beginning and end of range.
    */
    add(range) {
        let idx = 0 // initialize the start index, will be used after loop as inertion index
        // go through each range in the list and compare it with the adding range
        for (idx; idx < this.rangeList.length; idx++) {
            const curRange = this.rangeList[idx]
            // if adding range's min value > iterated ranges' max value, no intersect, check next range
            if (curRange[1] < range[0]) continue
            // if the adding range's max value >= the iterated ranges' min value, merge them
            else if (curRange[0] <= range[1]) {
                range = [Math.min(range[0], curRange[0]), Math.max(range[1], curRange[1])]; // get the merged range
                this.rangeList.splice(idx, 1); // delete the range to be merged
                --idx   // rangelist spliced, no need to increment idx, loop again
                continue
            }
            break   // comparing finished, store the index for insertion
        }
        this.rangeList.splice(idx, 0, range); // insert the merged range, or the range without intersections
    }

    /**
    * Removes a range from the list
    * @param {Array<number>} range - Array of two integers that specify
    beginning and end of range.
    */
    remove(range) {
        // make a new list to store the ranges after remove process
        let newRangeList = []
        const [min, max] = range    // name the min,max value to make the code looks more clear
        for (const curRange of this.rangeList) {
            // name the min,max value to make the code looks more clear
            const curMin = curRange[0]
            const curMax = curRange[1]
            // if there's no intersection between the removing range and the current iterated range, store the latter
            if (min > curMax || max < curMin) newRangeList.push(curRange)
            else {
                // split the range according to the removing range
                if (min > curMin) newRangeList.push([curMin, min])
                if (max < curMax) newRangeList.push([max, curMax])
            }
        }
        this.rangeList = newRangeList   // overwrite the rangelist
    }

    /**
    * Prints out the list of ranges in the range list
    */
    print() {
        // simply formatting the output
        let output = ''
        for (let range of this.rangeList) {
            output += `[${range[0]}, ${range[1]}) `
        }
        console.log(output ? output : 'empty')
    }
}

// Example run
const rl = new RangeList();
rl.add([1, 5]);
rl.print();
// Should display: [1, 5)
rl.add([10, 20]);
rl.print();
// Should display: [1, 5) [10, 20)
rl.add([20, 20]);
rl.print();
// Should display: [1, 5) [10, 20)
rl.add([20, 21]);
rl.print();
// Should display: [1, 5) [10, 21)
rl.add([2, 4]);
rl.print();
// Should display: [1, 5) [10, 21)
rl.add([3, 8]);
rl.print();
// Should display: [1, 8) [10, 21)
rl.remove([10, 10]);
rl.print();
// Should display: [1, 8) [10, 21)
rl.remove([10, 11]);
rl.print();
// Should display: [1, 8) [11, 21)
rl.remove([15, 17]);
rl.print();
// Should display: [1, 8) [11, 15) [17, 21)
rl.remove([3, 19]);
rl.print();
// Should display: [1, 3) [19, 21)
