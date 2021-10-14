import { INPUT } from './input.ts';

const TEST1: string = `pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)`;

const RE: RegExp = /(\w+)\s\((\d+)\)(\s->\s(.+))?/g;

// part 1
function doPart1(input: string): void {
    let match: RegExpMatchArray | null;
    const towers: { [key: string]: string | null } = {};

    while ((match = RE.exec(input)) !== null) {
        const [, bottom, , , subs] = match;

        const tower: string | undefined | null = towers[bottom];
        if (tower === undefined) {
            towers[bottom] = null;
        }

        if (subs) {
            subs.split(', ').forEach(s => {
                const subTower: string | undefined | null = towers[s];
                if (subTower === undefined || subTower === null) {
                    towers[s] = bottom;
                }
            });
        }
    }

    const bottom: [string, string | null] = Object.entries(towers).find(kv => {
        const [, val] = kv;
        return val === null;
    })!;

    console.log(bottom[0]);
}

type Tower = {
    weight: number;
    subs: string[];
    parent?: string;
}

// part 2
function doPart2(input: string): void {
    let match: RegExpMatchArray | null;
    const towers: { [key: string]: Tower } = {};

    while ((match = RE.exec(input)) !== null) {
        const [, bottom, weight, , subs] = match;

        let tower: Tower | undefined = towers[bottom];
        if (tower === undefined) {
            tower = {
                weight: 0,
                subs: []
            };
            towers[bottom] = tower;
        }
        if (tower.weight !== 0) {
            throw 0;
        }
        tower.weight = Number.parseInt(weight);

        if (subs) {
            tower.subs = subs.split(', ');
            tower.subs.forEach(s => {
                let subTower: Tower | undefined = towers[s];
                if (subTower === undefined) {
                    subTower = {
                        weight: 0,
                        subs: []
                    };
                    towers[s] = subTower;
                }
                subTower.parent = bottom;
            });
        }
    }

    const calcWeight: (t: Tower) => number = t => {
        let subsweight: number = 0;
        t.subs.forEach(s => {
            subsweight += calcWeight(towers[s])
        })

        return t.weight + subsweight;
    };

    const options: [string, number][] = [];
    Object.values(towers).forEach(v => {
        if (v.subs.length > 0) {
            const ref: number = calcWeight(towers[v.subs[0]]);
            const unbalanced: string | undefined = v.subs.find(s => calcWeight(towers[s]) !== ref);
            if (unbalanced) {
                const diff: number = Math.abs(ref - calcWeight(towers[unbalanced]));
                options.push([unbalanced, towers[unbalanced].weight + diff]);
                options.push([unbalanced, towers[unbalanced].weight - diff]);
                options.push([v.subs[0], towers[v.subs[0]].weight + diff]);
                options.push([v.subs[0], towers[v.subs[0]].weight - diff]);
            }
        }
    });

    let notBalanced: boolean = true;
    let index: number = 0;
    do {
        const [t, w] = options[index];
        const oldWeight: number = towers[t].weight;
        towers[t].weight = w;

        notBalanced = Object.values(towers).some(v => {
            if (v.subs.length > 0) {
                const ref: number = calcWeight(towers[v.subs[0]]);
                const unbalanced: string | undefined = v.subs.find(s => calcWeight(towers[s]) !== ref);
                return unbalanced !== undefined;
            } else {
                return false;
            }
        });

        towers[t].weight = oldWeight;
        index++;
    } while (notBalanced);

    console.log(options[index - 1]);
}

// doPart1(TEST1);
doPart1(INPUT);
// doPart2(TEST1);
doPart2(INPUT);
