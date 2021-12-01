import { INPUT } from './input.ts';

const TEST1: string = 'ne,ne,ne';
const TEST2: string = 'ne,ne,sw,sw';
const TEST3: string = 'ne,ne,s,s';
const TEST4: string = 'se,sw,se,sw,sw';

type Coords = [number, number];
type DestFn = (c: Coords) => Coords

const goN: DestFn = c => {
    const [x, y] = c;
    return [x, y + 2];
}

const goNE: DestFn = c => {
    const [x, y] = c;
    return [x + 1, y + 1];
}

const goSE: DestFn = c => {
    const [x, y] = c;
    return [x + 1, y - 1];
}

const goS: DestFn = c => {
    const [x, y] = c;
    return [x, y - 2];
}

const goSW: DestFn = c => {
    const [x, y] = c;
    return [x - 1, y - 1];
}

const goNW: DestFn = c => {
    const [x, y] = c;
    return [x - 1, y + 1];
}

const destMap: {[key:string]: DestFn} = {
    'n': goN,
    'ne': goNE,
    'se': goSE,
    's': goS,
    'sw': goSW,
    'nw': goNW,
}

const calcStepsFromOrigin: (to: Coords) => number = t => {
    let newPos: Coords = [0,0];
    const [cx, cy] = t;

    let steps: number = 0;
    while (!(newPos[0] == cx && newPos[1] == cy)) {
        const [nx,ny] = newPos;
        if (nx < cx) {
            if (ny < cy) {
                newPos = goNE(newPos);
            } else {
                newPos = goSE(newPos);
            }
        } else if (nx > cx) {
            if (ny < cy) {
                newPos = goNW(newPos);
            } else {
                newPos = goSW(newPos);
            }
        } else if (ny < cy) {
            newPos = goN(newPos);
        } else {
            newPos = goS(newPos);
        }
        steps++;
    }

    return steps;
}

function doPart12(input: string): void {
    let currentPos: Coords = [0, 0];

    let max: number = Number.MIN_VALUE;
    input.split(',').forEach(d => {
        currentPos = destMap[d](currentPos);
        max = Math.max(max, calcStepsFromOrigin(currentPos));
    });

    console.log(calcStepsFromOrigin(currentPos), max);
}

doPart12(TEST1);
doPart12(TEST2);
doPart12(TEST3);
doPart12(TEST4);
doPart12(INPUT);
