import { INPUT } from './input.ts';

const TEST1: string = `b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`;

const RE: RegExp = /(\w+)\s(inc|dec)\s(-?\d+)\sif\s(\w+)\s(>=|<=|==|!=|>|<)\s(-?\d+)/g;

// part 1&2
function doPart12(input: string): void {
    const register: { [key: string]: number } = {};

    const checkCondition: (op: string, register: string, value: number) => boolean = (o, r, v) => {
        let rv: number | undefined = register[r];
        if (rv === undefined) {
            rv = 0;
            register[r] = rv;
        }
        return o === '>=' ? rv >= v
            : o === '<=' ? rv <= v
                : o === '==' ? rv === v
                    : o === '!=' ? rv !== v
                        : o === '>' ? rv > v
                            : rv < v;
    };

    const doOperation: (op: string, register: string, value: number) => void = (o, r, v) => {
        let rv: number | undefined = register[r];
        if (rv === undefined) {
            rv = 0;
            register[r] = rv;
        }

        if (o === 'inc') {
            register[r] = rv + v;
        } else {
            register[r] = rv - v;
        }
    };

    let superMax: number = Number.MIN_VALUE;

    let match: RegExpMatchArray | null;
    while ((match = RE.exec(input)) !== null) {
        const [, reg, operation, value, condRegister, condOperator, condValue] = match;

        if (checkCondition(condOperator, condRegister, Number.parseInt(condValue))) {
            doOperation(operation, reg, Number.parseInt(value));
        }

        superMax = Math.max(superMax, Object.values(register).reduce((p, c) => c > p ? c : p, Number.MIN_VALUE));
    }

    const max: number = Object.values(register).reduce((p, c) => c > p ? c : p, Number.MIN_VALUE);
    console.log(max, superMax);
}

doPart12(TEST1);
doPart12(INPUT);
