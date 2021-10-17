const INPUT: string = '46,41,212,83,1,255,157,65,139,52,39,254,2,86,0,204';

const TEST1: string = '3,4,1,5';

const INPUT_EX: number[] = [17, 31, 73, 47, 23];

function doPart1(input: string, listCount: number): void {
    const list: number[] = [];
    let currentIndex: number = 0;

    for (let i = 0; i < listCount; i++) {
        list.push(i);
    }

    const ensureList: (count: number) => void = c => {
        while (list.length < c) {
            list.push(list[list.length - listCount]);
        }
    }

    let skipSize: number = 0;
    input.split(',').map(n => Number.parseInt(n)).forEach(length => {
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
    ensureList(currentIndex + 1);

    const first: number = Math.floor((list.length - 1) / listCount) * listCount;
    const result: number[] = list.slice(first).concat(list.slice(first - (listCount - (list.length - first)), first));
    console.log(result[0] * result[1]);
}

const TEST2: string = '';
const TEST3: string = 'AoC 2017';
const TEST4: string = '1,2,3';
const TEST5: string = '1,2,4';

function doPart2(input: string, listCount: number): void {
    const list: number[] = [];
    let currentIndex: number = 0;

    for (let i = 0; i < listCount; i++) {
        list.push(i);
    }

    const ensureList: (count: number) => void = c => {
        while (list.length < c) {
            list.push(list[list.length - listCount]);
        }
    }

    let skipSize: number = 0;

    for (let round: number = 1; round <= 64; round++) {
        [...input].map(c => c.charCodeAt(0)).concat(INPUT_EX).forEach(length => {
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

    const first: number = Math.floor((list.length - 1) / listCount) * listCount;
    const result: number[] = list.slice(first).concat(list.slice(first - (listCount - (list.length - first)), first));

    const dense: number[] = [];
    for (let i: number = 1; i <= 16; i++) {
        const xor: number = result.splice(0, 16).reduce((p, v, i) => i === 0 ? v : p ^ v, -1);
        dense.push(xor);
    }

    const hash: string = dense.reduce((p, v) => {
        const hex: string = v.toString(16);
        return p += (hex.length === 1 ? `0${hex}`: hex);
    }, '');
    console.log(hash);
}

// doPart1(TEST, 5);
doPart1(INPUT, 256);

// doPart2(TEST2, 256);
// doPart2(TEST3, 256);
// doPart2(TEST4, 256);
// doPart2(TEST5, 256);
doPart2(INPUT, 256);
