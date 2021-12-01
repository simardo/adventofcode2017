import { INPUT } from './input.ts';

const TEST1: string = `     |          
     |  +--+    
     A  |  C    
 F---|----E|--+ 
     |  |  |  D 
     +B-+  +--+ 
               `;

type Coord = {
    x: number,
    y: number;
}

const toString: (c: Coord) => string = c => {
    return `${c.x},${c.y}`;
};

type WaklFn = (p: Coord) => Coord;

const walk: { [key: string]: WaklFn } = {
    'b': p => { return { x: p.x, y: p.y + 1 } },
    'r': p => { return { x: p.x + 1, y: p.y } },
    't': p => { return { x: p.x, y: p.y - 1 } },
    'l': p => { return { x: p.x - 1, y: p.y } }
}

function doPart12(input: string): void {
    const tubes: string[][] = input.split('\n').map(l => [...l]);
    const visited: Set<string> = new Set<string>();
    let direction: string = 'b';
    const nextDirection: { [key: string]: string } = {
        'b': 'r',
        'r': 't',
        't': 'l',
        'l': 'b'
    }

    let pos: Coord = {
        x: tubes[0].indexOf('|'),
        y: 0
    };

    const result: string[] = [];
    let steps: number = 0;

    let stop: boolean = false;
    while (!stop) {
        visited.add(toString(pos));

        const current: string = tubes[pos.y][pos.x];
        if (current === '+') {
            // turn & next
            let n: number = 0;
            let v: boolean = true;
            do {
                n++;
                direction = nextDirection[direction];
                const nextPos: Coord = walk[direction](pos);
                v = visited.has(toString(nextPos)) || tubes[nextPos.y][nextPos.x] === ' ';
            } while (v && n < 4);
            stop = v;
        } else if (current === '|' || current === '-') {
            // walk;
        } else if (current !== ' ') {
            // collect & next
            result.push(tubes[pos.y][pos.x]);
        } else {
            stop = true;
        }

        if (!stop) {
            pos = walk[direction](pos);
            steps++;
        }

        stop = stop || (pos.x < 0 || pos.y < 0 || pos.y >= tubes.length || pos.x >= tubes[tubes.length - 1].length);
    }

    console.log(result.join(''));
    console.log(steps);
}

doPart12(TEST1);
doPart12(INPUT);
