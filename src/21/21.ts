import { INPUT } from './input.ts';

const TEST1: string = `../.# => ##./#../...
.#./..#/### => #..#/..../..../#..#`;

function rotateR(pattern: string[][]): string[][] {
    return pattern[0].map((_, col) => pattern.map(row => row[col]).reverse());
}

function flipVMap(pattern: string[][]): string[][] {
    return pattern.map(line => line.slice().reverse());
}

function patternToRule(pattern: string[][]): string {
    return pattern.map(line => line.join('')).join('/');
}

function ruleToPattern(rule: string): string[][] {
    return rule.split('/').map(line => [...line]);
}

function patternToString(pattern: string[][]): string {
    return pattern.map(l => l.join('')).join('\n');
}

const INIT_PATTERN: string = `.#.
..#
###`;

const steps: {[key: number]: (p:string[][]) => string[][]} = {
    0: p => p,
    1: p => rotateR(p),
    2: p => rotateR(p),
    3: p => rotateR(p),
    4: p => flipVMap(rotateR(p)),
    5: p => rotateR(p),
    6: p => rotateR(p),
    7: p => rotateR(p),
}

function doPart12(input: string, iterations: number): void {
    const book: { [key: string]: string } = {};
    input.split('\n').forEach(r => {
        const [p, e] = r.split(' => ');
        book[p] = e;
    });

    let pattern: string[][] = INIT_PATTERN.split('\n').map(l => [...l]);

    for (let iter: number = 1; iter <= iterations; iter++) {
        const split: number = pattern.length % 2 === 0 ? 2 : 3;

        let newPattern: string[][] = [];

        let newPatternIndex: number = 0;
        for (let starty: number = 0; starty < pattern.length; starty += split) {
            for (let i: number = 1; i <= split + 1; i++) {
                newPattern.push([]);
            }
            for (let startx: number = 0; startx < pattern.length; startx += split) {
                let tile: string[][] = pattern.slice(starty, starty + split).map(rangey => rangey.slice(startx, startx + split));

                let rule: string | undefined = undefined;
                let step: number = 0;
                do {
                    tile = steps[step++](tile);
                    const patternRule: string = patternToRule(tile);
                    rule = book[patternRule];
                } while (rule === undefined && step < 8);
                
                if (rule === undefined) {
                    throw 2;
                }

                const newTile: string[][] = ruleToPattern(rule);
                newTile.forEach((l, i) => newPattern[starty + newPatternIndex + i].push(...l));
            }
            newPatternIndex++;
        }

        pattern = newPattern;
    }

    const on: number = pattern.reduce((p, v) => p += v.filter(vv => vv === '#').length, 0);

    console.log(on);
}

doPart12(TEST1, 2);
doPart12(INPUT, 5);
doPart12(INPUT, 18);
