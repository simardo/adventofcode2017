import { INPUT } from './input.ts';

const TEST1: string = `5 1 9 5
7 5 3
2 4 6 8`;

const TEST2: string = `5 9 2 8
9 4 7 3
3 8 6 5`;

// part 1
function doPart1(input: string): void {
    const lines: string[] = input.split('\n');
    const sum: number = lines.reduce((p, c, i) => {
        const line: number[] = c.replaceAll('\t', ' ').split(' ').map(s => Number.parseInt(s));
        const [min, max]: [number, number] = line.reduce((pp, cc, ii) => {
            let [pMin, pMax] = pp;
            return [Math.min(pMin, cc), Math.max(pMax, cc)];
        }, [Number.MAX_VALUE, Number.MIN_VALUE]);
        return p + (max - min);
    }, 0);

    console.log(sum);
}

// part 2
function doPart2(input: string): void {
    const lines: string[] = input.split('\n');
    const sum: number = lines.reduce((p, c) => {
        const line: number[] = c.replaceAll('\t', ' ').split(' ').map(s => Number.parseInt(s));
        let div: number = 0;
        line.some((v, i) => {
            const target: number | undefined = line.filter((vv, ii) => ii != i).find(vvv => v % vvv === 0);
            if (target) {
                div = v / target;
                return true;
            };
            return false;
        })!;

        return p + div;
    }, 0);

    console.log(sum);
}

doPart1(INPUT);
doPart2(INPUT);
