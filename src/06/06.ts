import { INPUT } from './input.ts';

const TEST1: string = `0 2 7 0`;

const toString: (banks: number[]) => string = b => b.join(',');

// part 1
function doPart1(input: string): void {
    const map: Set<string> = new Set<string>();
    const banks: number[] = input.replaceAll('\t', ' ').split(' ').map(i => Number.parseInt(i));
    let steps: number = 0;

    while (!map.has(toString(banks))) {
        map.add(toString(banks));

        let max: number = Number.MIN_VALUE;
        let maxIndex: number = -1;
        for (let i: number = 0; i < banks.length; i++) {
            if (banks[i] > max) {
                max = banks[i];
                maxIndex = i;
            }
        }

        banks[maxIndex] = 0;
        for (let i: number = 1; i <= max; i++) {
            maxIndex++;
            if (maxIndex >= banks.length) {
                maxIndex = 0;
            }
            banks[maxIndex]++;
        }

        steps++;
    }

    console.log(steps);
}

// part 2
function doPart2(input: string): void {
    const map: {[key:string]: number} = {};
    const banks: number[] = input.replaceAll('\t', ' ').split(' ').map(i => Number.parseInt(i));
    let steps: number = 0;

    while (map[toString(banks)] === undefined) {
        map[toString(banks)] = steps;

        let max: number = Number.MIN_VALUE;
        let maxIndex: number = -1;
        for (let i: number = 0; i < banks.length; i++) {
            if (banks[i] > max) {
                max = banks[i];
                maxIndex = i;
            }
        }

        banks[maxIndex] = 0;
        for (let i: number = 1; i <= max; i++) {
            maxIndex++;
            if (maxIndex >= banks.length) {
                maxIndex = 0;
            }
            banks[maxIndex]++;
        }

        steps++;
    }

    console.log(steps - map[toString(banks)]);
}

// doPart1(TEST1);
doPart1(INPUT);
// doPart2(TEST1);
doPart2(INPUT);
