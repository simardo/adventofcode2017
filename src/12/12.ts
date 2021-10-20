import { INPUT } from './input.ts';

const TEST1: string = `0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5`;

const RE: RegExp = /(\d+)\s<->\s(.+)/g;

function doPart1(input: string): void {
    const pipes: { [key: number]: number[] } = {};

    let match: RegExpMatchArray | null;
    while ((match = RE.exec(input)) !== null) {
        const [, id, ids] = match;
        pipes[Number.parseInt(id)] = ids.split(', ').map(i => Number.parseInt(i));
    }

    const visited: Set<number> = new Set<number>();

    const countPipes: (id: number, count: number) => number = (id, c) => {
        if (!visited.has(id)) {
            visited.add(id);
            return pipes[id].reduce((p, v) => p + countPipes(v, 0), c + 1);
        }
        return 0;
    };

    console.log(countPipes(0, 0));
}

function doPart2(input: string): void {
    const pipes: { [key: number]: number[] } = {};

    let match: RegExpMatchArray | null;
    while ((match = RE.exec(input)) !== null) {
        const [, id, ids] = match;
        pipes[Number.parseInt(id)] = ids.split(', ').map(i => Number.parseInt(i));
    }

    const visited: Set<number> = new Set<number>();
    let count: number = 0;

    const visitPipes: (id: number) => void = id => {
        if (!visited.has(id)) {
            visited.add(id);
            pipes[id].forEach(p => visitPipes(p));
        }
    };

    let nextUnvisited: number | undefined = 0;
    while (nextUnvisited !== undefined) {
        count++;
        visitPipes(nextUnvisited);
        const nextUnvisitedKey: string | undefined = Object.keys(pipes).find(k => !visited.has(Number.parseInt(k)));
        nextUnvisited = nextUnvisitedKey !== undefined ? Number.parseInt(nextUnvisitedKey) : undefined;
    }

    console.log(count);
}

// doPart1(TEST1);
doPart1(INPUT);

// doPart2(TEST1);
doPart2(INPUT);
