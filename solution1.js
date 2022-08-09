
// Task: Implement a class named 'RangeList'
// A pair of integers define a range, for example: [1, 5). This range includes integers: 1, 2, 3, and 4.
// A range list is an aggregate of these ranges: [1, 5), [10, 11), [100, 201)
/**
*
* NOTE: Feel free to add any extra member variables/functions you like.
*/

class RangeList {
    constructor() {
        this.rangeList = [] // initialize an arr to store all the ranges
    }

    /**
    * Adds a range to the list
    * @param {Array<number>} range - Array of two integers that specify
    beginning and end of range.
    */
    add(range) {
        let rangeList = [...this.rangeList] // make a temperary rangeList copy
        // directly push the range into the copy and sort it
        rangeList.push(range)
        rangeList.sort((a, b) => a[0] - b[0])
        // iterate each range and compare them to eliminate intersection, add non-intersect ranges to the new list
        let newRangeList = []
        for (const curRange of rangeList) {
            // get the max range in the new range list *everytime add range to the new range, the max range changes
            const maxRange = newRangeList[newRangeList.length - 1]
            // if the iterated range's min value <= new range list's max value, merge
            if (newRangeList.length && curRange[0] <= maxRange[1]) {
                newRangeList[newRangeList.length - 1] = [maxRange[0], Math.max(maxRange[1], curRange[1])]
            } else newRangeList.push(curRange) //otherwise means they don't intersect, add the range
        }
        this.rangeList = newRangeList
    }

    /**
    * Removes a range from the list
    * @param {Array<number>} range - Array of two integers that specify
    beginning and end of range.
    */
    remove(range) {
        const [left, right] = range
        let i = 0;
        // 当前范围max < 最小值, 跳过
        while (i < this.rangeList.length && this.rangeList[i][1] < left) {
            i++;
        }
        // 当前范围最小值 < 最小值
        if (i < this.rangeList.length && this.rangeList[i][0] < left) {
            // 得到新的范围 [当前最小, 最小]
            let newIntervalBefore = [this.rangeList[i][0], left];
            // the interval to delete is between one of the intervals
            // 若当前最大 > 最大值
            if (right < this.rangeList[i][1]) {
                let newIntervalAfter = [right, this.rangeList[i][1]];
                this.rangeList.splice(i, 1, newIntervalBefore, newIntervalAfter);
                return;
            }
            this.rangeList.splice(i, 1, newIntervalBefore);
            i++;
        }

        // 当前范围最大值 < 最大值, 先吧当前范围删除
        while (i < this.rangeList.length && right >= this.rangeList[i][1]) {
            this.rangeList.splice(i, 1);
        }

        // 当前范围最小值 < 最大值,
        if (i < this.rangeList.length && right > this.rangeList[i][0]) {
            // 得到新的范围 [最大值, 当前范围最大值]
            let newIntervalAfter = [right, this.rangeList[i][1]];
            this.rangeList.splice(i, 1, newIntervalAfter);
        }
    }

    /**
    * Prints out the list of ranges in the range list
    */
    print() {
        // TODO: implement this
        // this.rangeList.sort((arr1, arr2) => {
        //     return arr1[0] - arr2[0]
        // })
        let output = ''
        for (let range of this.rangeList) {
            output += `[${range[0]}, ${range[1]}) `
        }
        console.log(output)
        console.log('--------------------------------------------------')
    }
}
// Example run
const rl = new RangeList();

console.log('\n********************测试开始*********************\n')

// OG test cases
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
