import { INPUT } from './input.ts';

const TEST: string = `Begin in state A.
Perform a diagnostic checksum after 6 steps.

In state A:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state B.
  If the current value is 1:
    - Write the value 0.
    - Move one slot to the left.
    - Continue with state B.

In state B:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the left.
    - Continue with state A.
  If the current value is 1:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state A.`;

type TapeFn = (tape: Set<number>, cursor: number) => number;
type GotoFn = (state: string) => string;

type State = {
    read: TapeFn;
    yesno: [TapeFn[], TapeFn[]];
    goto: [string, string];
}

const write1Fn: TapeFn = (t, c) => {
    t.add(c);
    return c;
}

const write0Fn: TapeFn = (t, c) => {
    t.delete(c);
    return c;
}

const moveLeftFn: TapeFn = (_, c) => c - 1;

const moveRightFn: TapeFn = (_, c) => c + 1;

const readFn: TapeFn = (t, c) => t.has(c) ? 1 : 0;

const gotoFn: GotoFn = s => s;

function doPart1(input: string): void {
    let nextState: string = '';
    let steps: number = 0;
    let parsedState: string = '';
    let parsedYesNo: number = 0;
    const states: Map<string, State> = new Map<string, State>();
    const tape: Set<number> = new Set<number>();

    input.split('\n').map(l => l.trimStart()).forEach(instr => {
        if (instr.startsWith('Begin')) {
            nextState = instr.slice(-2, -1);
        } else if (instr.startsWith('Perform')) {
            steps = Number.parseInt(instr.match(/(\d+)/)![1])
        } else if (instr.startsWith('In state')) {
            parsedState = instr.slice(-2, -1);
            states.set(parsedState, { read: readFn, yesno: [[], []], goto: ['', ''] });
        } else if (instr.startsWith('If')) {
            parsedYesNo = Number.parseInt(instr.slice(-2, -1));
        } else if (instr.startsWith('- Write')) {
            const value: number = Number.parseInt(instr.slice(-2, -1));
            states.get(parsedState)!.yesno[parsedYesNo].push(value === 1 ? write1Fn : write0Fn);
        } else if (instr.startsWith('- Move')) {
            const right: boolean = instr.indexOf('right') >= 0;
            states.get(parsedState)!.yesno[parsedYesNo].push(right ? moveRightFn : moveLeftFn);
        } else if (instr.startsWith('- Continue')) {
            states.get(parsedState)!.goto[parsedYesNo] = instr.slice(-2, -1);
        }
    });

    let cursor: number = 0;
    let step: number = 0;
    do {
        const state: State = states.get(nextState)!;
        const yesNo: number = state.read(tape, cursor);
        state.yesno[yesNo].forEach(f => cursor = f(tape, cursor));
        nextState = gotoFn(state.goto[yesNo]);
    } while (++step < steps);

    console.log(tape.size);
}

function doPart2(input: string): void {

}

// doPart1(TEST);
doPart1(INPUT);
doPart2(INPUT);
