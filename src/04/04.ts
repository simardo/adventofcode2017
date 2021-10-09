import { INPUT } from './input.ts';

const TEST1: string = `aa bb cc dd ee
aa bb cc dd aa
aa bb cc dd aaa`;

// part 1
function doPart1(input: string): void {
    const lines: string[] = input.split('\n');
    const valid: number = lines.reduce((p, c) => {
        const line: string[] = c.split(' ');
        if (line.some((vv, ii) => line.filter((vvv, iii) => ii != iii).indexOf(vv) > -1)) {
            return p;
        } else {
            return p + 1;
        }
    }, 0);

    console.log(valid);
}

const TEST2: string = `abcde fghij
abcde xyz ecdab
a ab abc abd abf abj
iiii oiii ooii oooi oooo
oiii ioii iioi iiio`

// part 2
function doPart2(input: string): void {
    const lines: string[] = input.split('\n');
    const valid: number = lines.reduce((p, c) => {
        const line: string[] = c.split(' ');
        if (line.some((vv, ii) => line.filter((vvv, iii) => ii != iii).find(vvvv => {
            const letters: string[] = [...vvvv];
            return vv.length === vvvv.length && [...vv].every(l => letters.indexOf(l) > -1);
         }) !== undefined)) {
            return p;
        } else {
            return p + 1;
        }
    }, 0);

    console.log(valid);
}

// doPart1(TEST1);
doPart1(INPUT);
// doPart2(TEST2);
doPart2(INPUT);
