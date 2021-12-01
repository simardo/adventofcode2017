import { INPUT } from './input.ts';

const TEST1: string = `0
3
0
1
-3`;

// part 1
function doPart1(input: string): void {
    const instructions: number[] = input.split('\n').map(i => Number.parseInt(i));

    let step: number = 0;
    let index: number = 0;
    while (index < instructions.length) {
        const next: number = index + instructions[index];
        instructions[index]++;
        index = next;
        step++;
    }

    console.log(step);
}

// part 2
function doPart2(input: string): void {
    const instructions: number[] = input.split('\n').map(i => Number.parseInt(i));

    let step: number = 0;
    let index: number = 0;
    while (index < instructions.length) {
        const next: number = index + instructions[index];
        if (instructions[index] >= 3) {
            instructions[index]--;
        } else {
            instructions[index]++;
        }
        index = next;
        step++;
    }

    console.log(step);
}

// doPart1(TEST1);
doPart1(INPUT);
// doPart2(TEST1);
doPart2(INPUT);
