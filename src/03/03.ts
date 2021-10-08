type Coords = [number, number];
type GoFn = (xy: Coords) => Coords;

const goLeft: GoFn = xy => {
    const [x, y]: Coords = xy;
    return [x - 1, y];
};

const goRight: GoFn = xy => {
    const [x, y]: Coords = xy;
    return [x + 1, y];
};

const goTop: GoFn = xy => {
    const [x, y]: Coords = xy;
    return [x, y + 1];
};

const goBottom: GoFn = xy => {
    const [x, y]: Coords = xy;
    return [x, y - 1];
};

const turnLeft: (goFn: GoFn) => GoFn = goFn => {
    if (goFn === goRight) {
        return goTop;
    } else if (goFn === goTop) {
        return goLeft;
    } else if (goFn === goLeft) {
        return goBottom;
    } else {
        return goRight;
    }
}

// part 1
function doPart1(input: number): void {
    const store: Coords[] = [];
    let coords: Coords = [0, 0];
    let coordMax: number = 0;
    let go: GoFn = goRight;

    while (store.length < input) {
        store.push(coords);
        const [x, y] = coords;
        if (Math.abs(x) === coordMax && Math.abs(y) === coordMax) {
            if (go === goRight) {
                coordMax++;
                coords = go(coords);
                store.push(coords);
                go = turnLeft(go);
            } else {
                go = turnLeft(go);
            }
        }
        coords = go(coords);
    }

    const [x, y] = store[input - 1];
    console.log(Math.abs(x) + Math.abs(y));
}

const coordsToString: (coords: Coords) => string = coords => {
    const [x, y] = coords;
    return `x:${x}y:${y}`;
}

// part 2
function doPart2(input: number): void {
    const store: { [key: string]: number } = {};
    let coords: Coords = [0, 0];
    let coordMax: number = 0;
    let go: GoFn = goRight;

    let lastValue: number = -1;

    const getValueAt: (coords: Coords) => number = c => {
        const value: number | undefined = store[coordsToString(c)];
        return value !== undefined ? value : 0;
    }

    const calcValue: () => number = () => {
        const [x, y] = coords;
        let result: number = 1;
        if (!(x === 0 && y === 0)) {
            result = getValueAt([x - 1, y]) +
                getValueAt([x - 1, y - 1]) +
                getValueAt([x, y - 1]) +
                getValueAt([x + 1, y - 1]) +
                getValueAt([x + 1, y]) +
                getValueAt([x + 1, y + 1]) +
                getValueAt([x, y + 1]) +
                getValueAt([x - 1, y + 1]);
        }
        lastValue = result;
        return result;
    };

    while (lastValue <= input) {
        store[coordsToString(coords)] = calcValue();
        const [x, y] = coords;
        if (Math.abs(x) === coordMax && Math.abs(y) === coordMax) {
            if (go === goRight) {
                coordMax++;
                coords = go(coords);
                store[coordsToString(coords)] = calcValue();
                go = turnLeft(go);
            } else {
                go = turnLeft(go);
            }
        }
        coords = go(coords);
    }

    console.log(lastValue);
}

// doPart1(1);
// doPart1(12);
// doPart1(23);
// doPart1(1024);
doPart1(277678);

// doPart2(806);
doPart2(277678);
