import { INPUT } from './input.ts';

const TEST1: string = `set a 1
add a 2
mul a a
mod a 5
snd a
set a 0
rcv a
jgz a -1
set a 1
jgz a -2`;

type Instruction = {
    name: string;
    address: string;
    value: number | string | undefined;
};

type Register = { [key: string]: number };

type InstructionFn = (register: Register, address: string, value: number | string | undefined) => void;

function getValue(register: Register, value: number | string | undefined): number {
    return typeof value === 'number' ? value : register[value!];
}

const set: InstructionFn = (reg, addr, v) => {
    reg[addr] = getValue(reg, v);
}

const add: InstructionFn = (reg, addr, v) => {
    reg[addr] += getValue(reg, v);
}

const mul: InstructionFn = (reg, addr, v) => {
    reg[addr] *= getValue(reg, v);
}

const mod: InstructionFn = (reg, addr, v) => {
    reg[addr] = reg[addr] % getValue(reg, v);
}

const instructions: { [key: string]: InstructionFn } = {
    'set': set,
    'add': add,
    'mul': mul,
    'mod': mod
}

function doPart1(input: string): void {
    const register: Register = {};
    const program: Instruction[] = input.split('\n').map(i => {
        const [name, reg, value] = i.split(' ');
        let v: number | string | undefined = undefined;
        if (value !== undefined) {
            v = Number.parseInt(value);
            if (Number.isNaN(v)) {
                v = value;
            }
        }

        return {
            name: name,
            address: reg,
            value: v
        };
    });

    program.forEach(i => register[i.address] = 0);

    let index: number = 0;
    let stop: boolean = false;
    let lastSound: number = 0;
    while (!stop) {
        const instruction: Instruction = program[index];

        if (instruction.name === 'snd') {
            lastSound = register[instruction.address];
            index++;
        } else if (instruction.name === 'rcv') {
            if (register[instruction.address] !== 0) {
                stop = true;
            }
            index++;
        } else if (instruction.name === 'jgz') {
            if (!Number.isNaN(Number.parseInt(instruction.address))) {
                index += getValue(register, instruction.value);
            } else if (register[instruction.address] > 0) {
                index += getValue(register, instruction.value);
            } else {
                index++;
            }
        } else {
            instructions[instruction.name](register, instruction.address, instruction.value);
            index++;
        }
    }
    console.log(lastSound);
}

const TEST2: string = `set z 1
set y 2
snd z
snd y
snd p
rcv a
rcv b
rcv c
rcv d`;

function doPart2(input: string): void {
    const register0: Register = {};
    const register1: Register = {};
    const queues: { [key: number]: number[] } = {
        0: [],
        1: []
    }

    const program: Instruction[] = input.split('\n').map(i => {
        const [name, reg, value] = i.split(' ');

        let v: number | string | undefined = undefined;
        if (value !== undefined) {
            v = Number.parseInt(value);
            if (Number.isNaN(v)) {
                v = value;
            }
        }

        return {
            name: name,
            address: reg,
            value: v
        };
    });

    program.forEach(i => {
        register0[i.address] = 0;
        register1[i.address] = 0;
    });

    register1['p'] = 1;

    let count: number = 0;

    const loop: (index: number, register: Register, id: number) => number = (index, register, id) => {
        let result: number = Number.MIN_VALUE;

        const instruction: Instruction = program[index];

        if (instruction.name === 'snd') {
            queues[id === 0 ? 1 : 0].push(register[instruction.address]);
            result = index + 1;
            if (id === 1) {
                count++;
            }
        } else if (instruction.name === 'rcv') {
            if (queues[id].length > 0) {
                register[instruction.address] = queues[id].splice(0, 1)[0];
                result = index + 1;
            }
        } else if (instruction.name === 'jgz') {
            if (!Number.isNaN(Number.parseInt(instruction.address))) {
                result = index + getValue(register, instruction.value);
            } else if (register[instruction.address] > 0) {
                result = index + getValue(register, instruction.value);
            } else {
                result = index + 1;
            }
        } else {
            instructions[instruction.name](register, instruction.address, instruction.value);
            result = index + 1;
        }
        return result;
    }

    let index0: number = 0;
    let index1: number = 0;
    let wait0: boolean = false;
    let wait1: boolean = false;

    let stop: boolean = false;
    while (!stop) {
        if (index0 >= 0 && index0 < program.length) {
            const r0: number = loop(index0, register0, 0);
            if (r0 === Number.MIN_VALUE) {
                wait0 = true;
            } else {
                index0 = r0;
                wait0 = false;
            }
        }
        if (index1 >= 0 && index1 < program.length) {
            const r1: number = loop(index1, register1, 1);
            if (r1 === Number.MIN_VALUE) {
                wait1 = true;
            } else {
                index1 = r1;
                wait1 = false;
            }
        }

        stop = wait0 && wait1;
        if (!stop) {
            stop = (index0 < 0 || index0 >= program.length) && (index1 < 0 || index1 >= program.length)
        }
    }

    console.log(count);
}

// doPart1(TEST1);
doPart1(INPUT);

// doPart2(TEST2);
doPart2(INPUT);
