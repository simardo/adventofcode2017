const INPUT: string = 'jxqlasbh';
const TEST1: string = 'flqrgnkx';

const INPUT_EX: number[] = [17, 31, 73, 47, 23];
const LIST_COUNT: number = 256;

const getHash: (s: string) => string = s => {
    const list: number[] = [];
    let currentIndex: number = 0;

    for (let i = 0; i < LIST_COUNT; i++) {
        list.push(i);
    }

    const ensureList: (count: number) => void = c => {
        while (list.length < c) {
            list.push(list[list.length - LIST_COUNT]);
        }
    }

    let skipSize: number = 0;

    for (let round: number = 1; round <= 64; round++) {
        [...s].map(c => c.charCodeAt(0)).concat(INPUT_EX).forEach(length => {
            ensureList(currentIndex + length);

            const selection: number[] = [];
            for (let l: number = 0; l < length; l++) {
                selection.push(list[currentIndex + l]);
            }

            selection.reverse().forEach((v, i) => {
                list[currentIndex + i] = v;
            });

            currentIndex += length + skipSize;
            skipSize++;
        });
    }
    ensureList(currentIndex + 1);

    const first: number = Math.floor((list.length - 1) / LIST_COUNT) * LIST_COUNT;
    const result: number[] = list.slice(first).concat(list.slice(first - (LIST_COUNT - (list.length - first)), first));

    const dense: number[] = [];
    for (let i: number = 1; i <= 16; i++) {
        const xor: number = result.splice(0, 16).reduce((p, v, i) => i === 0 ? v : p ^ v, -1);
        dense.push(xor);
    }

    const hash: string = dense.reduce((p, v) => {
        const hex: string = v.toString(16);
        return p += (hex.length === 1 ? `0${hex}` : hex);
    }, '');

    return hash;
}

function doPart1(input: string): void {
    let used: number = 0;
    for (let i: number = 0; i <= 127; i++) {
        const hash: string = getHash(`${input}-${i}`);
        used += [...hash].reduce((p, v) => {
            let bin: string = Number.parseInt(v, 16).toString(2);
            bin = bin.replaceAll('0', '');
            p += bin.length;
            return p;
        }, 0);
    }
    console.log(used);
}

function doPart2(input: string): void {
    const grid: number[][] = [];

    for (let i: number = 0; i <= 127; i++) {
        const hash: string = getHash(`${input}-${i}`);

        const hashbin: string = [...hash].reduce((p, v) => {
            let bin: string = Number.parseInt(v, 16).toString(2);
            while (bin.length < 4) {
                bin = '0' + bin;
            }
            p.push(bin);
            return p;
        }, [] as string[]).join('');

        grid.push([...hashbin].map(v => Number.parseInt(v)));
    }

    const visited: Set<string> = new Set<string>();
    let groups: number = 0;

    const toString: (x: number, y: number) => string = (x, y) => {
        return `${x},${y}`;
    };

    const walkGroup: (x: number, y: number) => void = (x, y) => {
        const key: string = toString(x, y);
        visited.add(key);

        const walk: (xx: number, yy: number) => void = (xx, yy) => {
            const k: string = toString(xx, yy);
            if (grid[yy][xx] === 1 && !visited.has(k)) {
                walkGroup(xx, yy);
            }
        };

        if (y > 0) {
            walk(x, y - 1);
        }
        if (x > 0) {
            walk(x - 1, y);
        }
        if (y < grid.length - 1) {
            walk(x, y + 1);
        }
        if (x < grid[y].length - 1) {
            walk(x + 1, y);
        }
    };

    for (let y: number = 0; y < grid.length; y++) {
        for (let x: number = 0; x < grid[y].length; x++) {
            if (grid[y][x] === 1) {
                const key: string = toString(x, y);
                if (!visited.has(key)) {
                    groups++;
                    walkGroup(x, y);
                }
            }
        }
    }

    console.log(groups);
}

// doPart1(TEST1);
doPart1(INPUT);

// doPart2(TEST1);
doPart2(INPUT);
