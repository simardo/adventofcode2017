import { INPUT } from './input.ts';

const TEST1: string = `0: 3
1: 2
4: 4
6: 4`;

type Layer = {
    depth: number;
    direction: boolean;
    position: number;
    initPos?: number;
    initDirection?: boolean;
}

function doPart1(input: string): void {
    const layers: Layer[] = [];

    input.split('\n').forEach(line => {
        const [layer, depth] = line.split(': ').map(v => Number.parseInt(v));

        for (let i: number = layers.length; i < layer; i++) {
            layers.push({
                depth: 0,
                direction: false,
                position: -1
            });
        }
        layers.push({
            depth: depth,
            direction: true,
            position: 0
        });
    });

    let severity: number = 0;
    for (let p: number = 0; p < layers.length; p++) {
        if (layers[p].position === 0) {
            severity += (layers[p].depth * p);
        }

        layers.filter(l => l.depth > 0).forEach(layer => {
            if (layer.direction) {
                if (layer.position < layer.depth - 1) {
                    layer.position++;
                } else {
                    layer.direction = false;
                    layer.position--;
                }
            } else if (!layer.direction) {
                if (layer.position > 0) {
                    layer.position--;
                } else {
                    layer.direction = true;
                    layer.position++;
                }
            }
        });
    }

    console.log(severity);
}

function doPart2(input: string): void {
    const layers: Layer[] = [];

    input.split('\n').forEach(line => {
        const [layer, depth] = line.split(': ').map(v => Number.parseInt(v));

        for (let i: number = layers.length; i < layer; i++) {
            layers.push({
                depth: 0,
                direction: false,
                position: -1,
                initPos: 0,
                initDirection: false
            });
        }
        layers.push({
            depth: depth,
            direction: true,
            position: 0,
            initPos: 0,
            initDirection: true
        });
    });

    let caught: boolean = false;
    let sleep: number = 0;

    const move: () => void = () => {
        layers.filter(l => l.depth > 0).forEach(layer => {
            if (layer.direction) {
                if (layer.position < layer.depth - 1) {
                    layer.position++;
                } else {
                    layer.direction = false;
                    layer.position--;
                }
            } else if (!layer.direction) {
                if (layer.position > 0) {
                    layer.position--;
                } else {
                    layer.direction = true;
                    layer.position++;
                }
            }
        });
    };

    do {
        caught = false;
        for (let p: number = 0; p < layers.length && !caught; p++) {
            if (layers[p].position === 0) {
                caught = true;
            }
            move();
        }
        if (caught) {
            sleep++;
            layers.filter(l => l.depth > 0).forEach(layer => {
                layer.direction = layer.initDirection!;
                layer.position = layer.initPos!;
            });
            move();
            layers.filter(l => l.depth > 0).forEach(layer => {
                layer.initPos = layer.position;
                layer.initDirection = layer.direction;
            });
        }
    } while (caught);

    console.log(sleep);
}

// doPart1(TEST1);
doPart1(INPUT);

// doPart2(TEST1);
doPart2(INPUT);
