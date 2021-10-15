import { INPUT } from './input.ts';

const TEST1: string = '{}';
const TEST2: string = '{{{}}}';
const TEST3: string = '{{},{}}';
const TEST4: string = '{{{},{},{{}}}}';
const TEST5: string = '{<{},{},{{}}>}';
const TEST6: string = '{<a>,<a>,<a>,<a>}';
const TEST7: string = '{{<a>},{<a>},{<a>},{<a>}}';
const TEST8: string = '{{<!>},{<!>},{<!>},{<a>}}';
const TEST9: string = '{{<ab>},{<ab>},{<ab>},{<ab>}}';
const TEST10: string = '{{<!!>},{<!!>},{<!!>},{<!!>}}';
const TEST11: string = '{{<a!>},{<a!>},{<a!>},{<ab>}}';

// part 1&2
function doPart12(input: string): void {
    let isGarbage: boolean = false;
    let cancelNext: boolean = false;
    let nestedRefCount: number = 0;
    let groupScore: number = 0;
    let garbageCount: number = 0;

    [...input].forEach(i => {
        if (cancelNext) {
            cancelNext = false;
        } else if (i === '{' && !isGarbage) {
            nestedRefCount++;
        } else if (i === '}' && !isGarbage) {
            groupScore += nestedRefCount;
            nestedRefCount--;
        } else if (i === '<' && !isGarbage) {
            isGarbage = true;
        } else if (i === '>') {
            isGarbage = false;
        } else if (i === '!') {
            cancelNext = true;
        } else if (isGarbage) {
            garbageCount++;
        }
    });

    console.log(groupScore, garbageCount);
}

const TEST12: string = '<>';
const TEST13: string = '<random characters>';
const TEST14: string = '<<<<>';
const TEST15: string = '<{!>}>';
const TEST16: string = '<!!>';
const TEST17: string = '<!!!>>';
const TEST18: string = '<{o"i!a,<{i<a>';

// doPart12(TEST1);
// doPart12(TEST2);
// doPart12(TEST3);
// doPart12(TEST4);
// doPart12(TEST5);
// doPart12(TEST6);
// doPart12(TEST7);
// doPart12(TEST8);
// doPart12(TEST9);
// doPart12(TEST10);
// doPart12(TEST11);
// doPart12(TEST12);
// doPart12(TEST13);
// doPart12(TEST14);
// doPart12(TEST15);
// doPart12(TEST16);
// doPart12(TEST17);
// doPart12(TEST18);
doPart12(INPUT);
