import { INPUT } from './input.ts';

const TEST1: string = `..#
#..
...`;

type Coord = [number, number];

function toString(xy: Coord): string {
    const [x, y] = xy;
    return `${x},${y}`;
}

const turnLeft: { [key: string]: () => string } = {
    'up': () => 'left',
    'left': () => 'down',
    'down': () => 'right',
    'right': () => 'up'
}

const turnRight: { [key: string]: () => string } = {
    'up': () => 'right',
    'left': () => 'up',
    'down': () => 'left',
    'right': () => 'down'
}

const move: { [key: string]: (c: Coord) => Coord } = {
    'up': c => [c[0], c[1] - 1],
    'left': c => [c[0] - 1, c[1]],
    'down': c => [c[0], c[1] + 1],
    'right': c => [c[0] + 1, c[1]]
}

function doPart1(input: string, bursts: number): void {
    const map: { [key: string]: string } = {};

    input.split('\n').forEach((l, y) => [...l].forEach((c, x) => map[toString([x, y])] = c));

    const center: number = Math.floor(Math.sqrt(Object.keys(map).length) / 2);

    let position: Coord = [center, center];

    let direction: string = 'up';

    let infectionCount: number = 0;

    for (let i: number = 1; i <= bursts; i++) {
        const nodeId: string = toString(position);
        const node: string = map[nodeId] ?? '.';
        if (node === '#') {
            direction = turnRight[direction]();
            map[nodeId] = '.';
        } else {
            direction = turnLeft[direction]();
            map[nodeId] = '#';
            infectionCount++;
        }
        position = move[direction](position);
    }

    console.log(infectionCount);
}

function doPart2(input: string, bursts: number): void {
    const map: { [key: string]: string } = {};

    input.split('\n').forEach((l, y) => [...l].forEach((c, x) => map[toString([x, y])] = c));

    const center: number = Math.floor(Math.sqrt(Object.keys(map).length) / 2);

    let position: Coord = [center, center];

    let direction: string = 'up';

    let infectionCount: number = 0;

    for (let i: number = 1; i <= bursts; i++) {
        const nodeId: string = toString(position);
        const node: string = map[nodeId] ?? '.';
        if (node === '#') {
            direction = turnRight[direction]();
            map[nodeId] = 'F';
        } else if (node === '.') {
            direction = turnLeft[direction]();
            map[nodeId] = 'W';
        } else if (node === 'W') {
            map[nodeId] = '#';
            infectionCount++;
        } else if (node === 'F') {
            direction = turnLeft[direction]();
            direction = turnLeft[direction]();
            map[nodeId] = '.';
        }
        position = move[direction](position);
    }

    console.log(infectionCount);
}

// doPart1(TEST1, 7);
// doPart1(TEST1, 70);
// doPart1(TEST1, 10000);
doPart1(INPUT, 10000);

// doPart2(TEST1, 100);
// doPart2(TEST1, 10000000);
doPart2(INPUT, 10000000);
