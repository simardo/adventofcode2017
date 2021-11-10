import { INPUT } from './input.ts';

const TEST1: string = `p=<3,0,0>, v=<2,0,0>, a=<-1,0,0>
p=<4,0,0>, v=<0,0,0>, a=<-2,0,0>`;

const RE: RegExp = /p=<(-?\d+),(-?\d+),(-?\d+)>,\sv=<(-?\d+),(-?\d+),(-?\d+)>,\sa=<(-?\d+),(-?\d+),(-?\d+)>/g;

type Coord = [number, number, number];

function doPart1(input: string): void {
    let match: RegExpMatchArray | null;

    const positions: Coord[] = [];
    const velocities: Coord[] = [];
    const accelerations: Coord[] = [];

    while ((match = RE.exec(input)) !== null) {
        const [, px, py, pz, vx, vy, vz, ax, ay, az] = match;

        const pos: Coord = [Number.parseInt(px), Number.parseInt(py), Number.parseInt(pz)];
        const velo: Coord = [Number.parseInt(vx), Number.parseInt(vy), Number.parseInt(vz)];
        const acc: Coord = [Number.parseInt(ax), Number.parseInt(ay), Number.parseInt(az)];

        positions.push(pos);
        velocities.push(velo);
        accelerations.push(acc);
    }

    let count: number = 0;
    let result: number = -1;
    while (count < 1000) {
        for (let i: number = 0; i < positions.length; i++) {
            let [posx, posy, posz] = positions[i];
            let [velox, veloy, veloz] = velocities[i];
            const [accx, accy, accz] = accelerations[i];

            velox += accx;
            veloy += accy;
            veloz += accz;

            posx += velox;
            posy += veloy;
            posz += veloz;

            velocities[i] = [velox, veloy, veloz];
            positions[i] = [posx, posy, posz];
        }

        let min: number = Number.MAX_VALUE;
        let closest: number = -1;
        positions.forEach((p, i) => {
            const [x, y, z] = p;
            const dist: number = Math.abs(x) + Math.abs(y) + Math.abs(z);
            if (dist < min) {
                min = dist;
                closest = i;
            }
        });

        if (closest !== result) {
            result = closest;
            count = 0;
        } else {
            count++;
        }
    }

    console.log(result);
}

const TEST2: string = `p=<-6,0,0>, v=<3,0,0>, a=<0,0,0>    
p=<-4,0,0>, v=<2,0,0>, a=<0,0,0>
p=<-2,0,0>, v=<1,0,0>, a=<0,0,0>
p=<3,0,0>, v=<-1,0,0>, a=<0,0,0>`;

function doPart2(input: string): void {
    let match: RegExpMatchArray | null;

    const positions: Coord[] = [];
    const velocities: Coord[] = [];
    const accelerations: Coord[] = [];

    while ((match = RE.exec(input)) !== null) {
        const [, px, py, pz, vx, vy, vz, ax, ay, az] = match;

        const pos: Coord = [Number.parseInt(px), Number.parseInt(py), Number.parseInt(pz)];
        const velo: Coord = [Number.parseInt(vx), Number.parseInt(vy), Number.parseInt(vz)];
        const acc: Coord = [Number.parseInt(ax), Number.parseInt(ay), Number.parseInt(az)];

        positions.push(pos);
        velocities.push(velo);
        accelerations.push(acc);
    }

    let noCollisions: number = 0;
    const destroyed: Set<number> = new Set<number>();

    while (noCollisions < 1000) {
        for (let i: number = 0; i < positions.length; i++) {
            let [posx, posy, posz] = positions[i];
            let [velox, veloy, veloz] = velocities[i];
            const [accx, accy, accz] = accelerations[i];

            velox += accx;
            veloy += accy;
            veloz += accz;

            posx += velox;
            posy += veloy;
            posz += veloz;

            velocities[i] = [velox, veloy, veloz];
            positions[i] = [posx, posy, posz];
        }

        let collisions: boolean = false;
        for (let a: number = 0; a < positions.length; a++) {
            if (!destroyed.has(a)) {
                const [ax, ay, az] = positions[a];
                for (let b: number = a + 1; b < positions.length; b++) {
                    if (!destroyed.has(b)) {
                        const [bx, by, bz] = positions[b];

                        if (ax === bx && ay === by && az === bz) {
                            destroyed.add(a);
                            destroyed.add(b);
                            collisions = true;
                        }
                    }
                }
            }
        }

        if (collisions) {
            noCollisions = 0;
        } else {
            noCollisions++;
        }
    }

    console.log(positions.length - destroyed.size);
}

doPart1(TEST1);
doPart1(INPUT);

doPart2(TEST2);
doPart2(INPUT);
