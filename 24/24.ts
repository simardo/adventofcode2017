import { INPUT } from './input.ts';

const TEST: string = `0/2
2/2
2/3
3/4
3/5
0/1
10/1
9/10`;

type Component = {
    id: number;
    ports: [number, number];
}

function doPart1(input: string): void {
    const baseComponents: Component[] = input.split('\n').map((c, i) => {
        const [a, b] = c.split('/').map(cc => Number.parseInt(cc));
        return {
            id: i,
            ports: [a, b]
        }
    });

    const components: Component[] = [...baseComponents, ...baseComponents.filter(bc => bc.ports[0] !== bc.ports[1]).map(c => {
        const [a, b] = c.ports;
        return {
            id: c.id,
            ports: [b, a]
        } as Component;
    })];

    const used: Set<number> = new Set<number>();
    let strength: number = Number.MIN_VALUE;

    const link: (component: Component) => number = c => {
        used.add(c.id);

        const [fromPort, toPort] = c.ports;
        let result: number = fromPort + toPort;
        const segmentStrength: number = components.filter(c => {
            const [n] = c.ports;
            return !used.has(c.id) && n === toPort;
        }).reduce((p, c) => Math.max(p, link(c)), Number.MIN_VALUE);
        
        used.delete(c.id);
        
        return result + segmentStrength;
    }

    components.filter(c => c.ports[0] === 0).forEach(c => {
        strength = Math.max(strength, link(c));
    });

    console.log(strength);
}

function doPart2(input: string): void {
    const baseComponents: Component[] = input.split('\n').map((c, i) => {
        const [a, b] = c.split('/').map(cc => Number.parseInt(cc));
        return {
            id: i,
            ports: [a, b]
        }
    });

    const components: Component[] = [...baseComponents, ...baseComponents.filter(bc => bc.ports[0] !== bc.ports[1]).map(c => {
        const [a, b] = c.ports;
        return {
            id: c.id,
            ports: [b, a]
        } as Component;
    })];

    const used: Set<number> = new Set<number>();
    let maxStrength: number = Number.MIN_VALUE;
    let maxBridgeLength: number = Number.MIN_VALUE;

    const link: (component: Component, strength: number) => void = (c, s) => {
        used.add(c.id);

        const [fromPort, toPort] = c.ports;
        let result: number = fromPort + toPort;
        components.filter(c => {
            const [n] = c.ports;
            return !used.has(c.id) && n === toPort;
        }).forEach(c => link(c, s + result));

        if (used.size >= maxBridgeLength) {
            maxStrength = s + result;
            maxBridgeLength = used.size;
        }
        
        used.delete(c.id);
    }

    components.filter(c => c.ports[0] === 0).forEach(c => {
        link(c, 0);
    });

    console.log(maxStrength);
}

// doPart1(TEST);
doPart1(INPUT);
// doPart2(TEST);
doPart2(INPUT);
