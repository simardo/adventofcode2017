const TEST1: [number, number] = [65, 8921];
const INPUT: [number, number] = [516, 190];

const GEN_A_FACTOR: number = 16807;
const GEN_B_FACTOR: number = 48271;
const REMAINDER_CONST: number = 2147483647;

function doPart1(input: [number, number]): void {
    let [genA, genB] = input;

    const calc: (value: number, factor: number) => number = (v, f) => {
        return (v * f) % REMAINDER_CONST;
    }

    const mask: number = (1 << 16) - 1;

    let count: number = 0;
    for (let i: number = 1; i <= 40000000; i++) {
        genA = calc(genA, GEN_A_FACTOR);
        genB = calc(genB, GEN_B_FACTOR);

        if ((genA & mask) === (genB & mask)) {
            count++;
        }
    }

    console.log(count);
}

function doPart2(input: [number, number]): void {
    let [genA, genB] = input;

    const calc: (value: number, factor: number) => number = (v, f) => {
        return (v * f) % REMAINDER_CONST;
    }

    const doCalc: (value: number, factor: number, multiple: number) => number = (v, f, m) => {
        let result: number = v;
        do {
            result = calc(result, f);
        }
        while (result % m !== 0);
        return result;
    }

    const mask: number = (1 << 16) - 1;

    let count: number = 0;
    for (let i: number = 1; i <= 5000000; i++) {
        genA = doCalc(genA, GEN_A_FACTOR, 4);
        genB = doCalc(genB, GEN_B_FACTOR, 8);

        if ((genA & mask) === (genB & mask)) {
            count++;
        }
    }

    console.log(count);
}

doPart1(TEST1);
doPart1(INPUT);

doPart2(TEST1);
doPart2(INPUT);
