import { INPUT } from './input.ts';

const TEST1: string = '1122';
const TEST2: string = '1111';
const TEST3: string = '1234';
const TEST4: string = '91212129';

const TEST5: string = '1212';
const TEST6: string = '1221';
const TEST7: string = '123425';
const TEST8: string = '123123';
const TEST9: string = '12131415';

// part 1
function doPart1(input: string): void {
    const captcha: number[] = [...input].map(s => Number.parseInt(s));
    const sum: number = captcha.reduce((p, c, i) => {
        const matchIndex: number = i === captcha.length - 1 ? 0 : i + 1;
        return c === captcha[matchIndex] ? p + c : p;
    }, 0);

    console.log(sum);
}

// part 2
function doPart2(input: string): void {
    const captcha: number[] = [...input].map(s => Number.parseInt(s));
    const half: number = captcha.length / 2;
    const sum: number = captcha.reduce((p, c, i) => {
        const matchIndex: number = i + half >= captcha.length ? i + half - captcha.length : i + half;
        return c === captcha[matchIndex] ? p + c : p;
    }, 0);

    console.log(sum);
}

doPart1(INPUT);
doPart2(INPUT);
