import { INPUT } from './input.ts';

type Instruction = {
    name: string;
    address: string | number;
    value: number | string;
};

type Register = { [key: string]: number };

type InstructionFn = (register: Register, address: string | number, value: number | string) => void;

function getValue(register: Register, value: number | string): number {
    return typeof value === 'number' ? value : register[value!];
}

const set: InstructionFn = (reg, addr, v) => {
    reg[addr] = getValue(reg, v);
}

const sub: InstructionFn = (reg, addr, v) => {
    reg[addr] -= getValue(reg, v);
}

const mul: InstructionFn = (reg, addr, v) => {
    reg[addr] *= getValue(reg, v);
}

const instructions: { [key: string]: InstructionFn } = {
    'set': set,
    'sub': sub,
    'mul': mul
}

function doPart12(input: string, debug: boolean): void | [number, number] {
    const register: Register = {};
    const program: Instruction[] = input.split('\n').map(i => {
        const [name, reg, value] = i.split(' ');
        let r: number | string = Number.parseInt(reg);
        if (Number.isNaN(r)) {
            r = reg;
        }

        let v: number | string | undefined = undefined;
        v = Number.parseInt(value);
        if (Number.isNaN(v)) {
            v = value;
        }

        return {
            name: name,
            address: r,
            value: v
        };
    });

    program.filter(i => typeof i.address === 'string').forEach(i => register[i.address!] = 0);

    if (!debug) {
        register['a'] = 1;
    }

    let countMul: number = 0;
    let index: number = 0;
    while (!(index < 0 || index >= program.length)) {
        const instruction: Instruction = program[index];

        if (instruction.name === 'jnz') {
            if (getValue(register, instruction.address) !== 0) {
                index += getValue(register, instruction.value);
            } else {
                index++;
            }
        } else {
            if (instruction.name === 'mul') {
                countMul++;
            }
            instructions[instruction.name](register, instruction.address, instruction.value);
            index++;
        }
        if (!debug && index === 8) {
            index = Number.MAX_VALUE;
        }
    }

    if (debug) {
        console.log(countMul);
    } else {
        return [register['b'], register['c']];
    }
}

function isPrime(num: number): boolean {
    let result: boolean = num > 1;
    for (let i: number = 2, s: number = Math.sqrt(num); i <= s && result; i++) {
        result = num % i !== 0;
    }
    return result;
}

function doPart2() {
    let i: number = 0;
    let [b, c] = doPart12(INPUT, false) as [number, number];

    while (b <= c) {
        b += 17;
        if (!isPrime(b)) {
            i++;
        }
    }

    console.log(i);
}

doPart12(INPUT, true);
doPart2();
