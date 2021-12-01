import { INPUT } from './input.ts';

const TEST1: string = `s1,x3/4,pe/b`;

function doPart1(input: string, numPrograms: number): void {
    const start: number = 'a'.charCodeAt(0);
    const programs: string[] = [];
    for (let i: number = start; i <= start + numPrograms - 1; i++) {
        programs.push(String.fromCharCode(i));
    }

    const spin: (count: number) => void = c => {
        const last: string[] = programs.slice(programs.length - c);
        for (let i: number = programs.length - c - 1; i >= 0; i--) {
            programs[i + c] = programs[i];
        }
        for (let i: number = 0; i < last.length; i++) {
            programs[i] = last[i];
        }
    };

    const exchange: (a: number, b: number) => void = (a, b) => {
        const temp: string = programs[a];
        programs[a] = programs[b];
        programs[b] = temp;
    };

    const partner: (a: string, b: string) => void = (a, b) => {
        const indexA: number = programs.indexOf(a);
        const indexB: number = programs.indexOf(b);
        exchange(indexA, indexB);
    };

    input.split(',').forEach(m => {
        if (m[0] === 's') {
            spin(Number.parseInt(m.substr(1)));
        } else if (m[0] === 'x') {
            const [a, b] = m.substr(1).split('/').map(v => Number.parseInt(v));
            exchange(a, b);
        } else {
            const [a, b] = m.substr(1).split('/');
            partner(a, b);
        }
    });

    console.log(programs.join(''));
}

function doPart2(input: string, numPrograms: number, numDances?: number): number {
    const start: number = 'a'.charCodeAt(0);
    const programs: string[] = [];
    for (let i: number = start; i <= start + numPrograms - 1; i++) {
        programs.push(String.fromCharCode(i));
    }

    const spin: (count: number) => void = c => {
        const last: string[] = programs.slice(programs.length - c);
        for (let i: number = programs.length - c - 1; i >= 0; i--) {
            programs[i + c] = programs[i];
        }
        for (let i: number = 0; i < last.length; i++) {
            programs[i] = last[i];
        }
    };

    const exchange: (a: number, b: number) => void = (a, b) => {
        const temp: string = programs[a];
        programs[a] = programs[b];
        programs[b] = temp;
    };

    const partner: (a: string, b: string) => void = (a, b) => {
        const indexA: number = programs.indexOf(a);
        const indexB: number = programs.indexOf(b);
        exchange(indexA, indexB);
    };

    const init: string = programs.join('');
    let danceCount: number = 0;

    const breakCondition: () => boolean = () => numDances === undefined ? programs.join('') === init : danceCount === numDances;

    do {
        input.split(',').forEach(m => {
            if (m[0] === 's') {
                spin(Number.parseInt(m.substr(1)));
            } else if (m[0] === 'x') {
                const [a, b] = m.substr(1).split('/').map(v => Number.parseInt(v));
                exchange(a, b);
            } else {
                const [a, b] = m.substr(1).split('/');
                partner(a, b);
            }
        });
        danceCount++;
    } while (!breakCondition());

    if (numDances !== undefined) {
        console.log(programs.join(''));
    }

    return danceCount;
}

// doPart1(TEST1, 5);
doPart1(INPUT, 16);

const numDances: number = doPart2(INPUT, 16);
doPart2(INPUT, 16, 1000000000 % numDances);
